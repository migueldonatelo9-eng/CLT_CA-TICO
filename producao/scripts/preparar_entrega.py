#!/usr/bin/env python3
"""Prepara a entrega de um dia no PADRÃO do projeto (definido em 07/11/2026):

  1. Vídeo em 720x1280 ("720p padrão"): H.264 crf 25, até 2 Mbps, AAC 96 kbps. Reel de 60 s fica em ~12 a 15 MB.
  2. Imagens comprimidas (JPEG q84 progressivo), MESMAS dimensões, ~300 KB cada em vez de ~2 MB. Deixa a edição mais leve.
  3. Cópia "drive-lite" dos vídeos (até 3 MB, dois passos) para subir pelo conector do Drive da nuvem, que só aceita
     ~3 MB de arquivo por envio.
  4. Fila de envio ao Drive em LOTES PEQUENOS (até 6 arquivos por lote), um lote de cada vez: FILA-DRIVE.md.

Uso:
    python3 preparar_entrega.py DIA ORIGEM [SAIDA]
    ex.: python3 preparar_entrega.py 02 /home/user/videos/dia-02 /home/user/pacote/entrega

ORIGEM tem os finais: reel*.mp4, story-N.mp4, carrossel-slide-N.png, meme*.png.
"""
import glob, json, os, re, subprocess, sys
from PIL import Image

LOTE_MAX = 6                 # arquivos por lote de envio ao Drive
LITE_ALVO, LITE_LIMITE = 2_900_000, 3_000_000


def dur(f):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f],
                                capture_output=True, text=True).stdout)


def video_720p_padrao(src, dst):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", src, "-vf", "scale=720:1280:flags=lanczos", "-c:v", "libx264",
                    "-preset", "medium", "-crf", "25", "-maxrate", "2000k", "-bufsize", "4000k", "-pix_fmt", "yuv420p",
                    "-c:a", "aac", "-b:a", "96k", "-ac", "1", "-ar", "44100", "-movflags", "+faststart", dst], check=True)


def video_drive_lite(src, dst, workdir):
    d = dur(src)
    for t in range(5):
        v = max(150_000, int(LITE_ALVO * 8 / d * (0.93 ** t) - 54_000))
        base = ["ffmpeg", "-y", "-loglevel", "error", "-i", src, "-vf", "scale=720:1280:flags=lanczos,fps=24", "-c:v", "libx264",
                "-preset", "slow", "-b:v", str(v), "-maxrate", str(int(v * 1.4)), "-bufsize", str(v * 2), "-pix_fmt", "yuv420p",
                "-passlogfile", os.path.join(workdir, "pass")]
        subprocess.run(base + ["-pass", "1", "-an", "-f", "null", "/dev/null"], check=True)
        subprocess.run(base + ["-pass", "2", "-c:a", "aac", "-b:a", "48k", "-ac", "1", "-ar", "32000", "-movflags", "+faststart", dst], check=True)
        if os.path.getsize(dst) <= LITE_LIMITE:
            break
    for f in glob.glob(os.path.join(workdir, "pass*")):
        os.remove(f)


def imagem_leve(src, dst):
    im = Image.open(src).convert("RGB")
    im.save(dst, quality=84, optimize=True, progressive=True)
    return im.size


def nome_padrao(dia, arq):
    b = os.path.splitext(os.path.basename(arq))[0]
    if b.startswith("reel"):
        return f"reel-dia-{dia}"
    if b.startswith("story-"):
        return f"story-{b.split('-')[1]}-dia-{dia}"
    if "slide" in b:
        return f"carrossel-dia-{dia}-slide-{b.split('-')[-1]}"
    if b.startswith("meme"):
        return f"meme-dia-{dia}-{b.split('-')[-1]}"
    return b


def main():
    dia, origem = sys.argv[1], sys.argv[2]
    saida = sys.argv[3] if len(sys.argv) > 3 else "/home/user/pacote/entrega"
    base = os.path.join(saida, f"dia-{dia}")
    d720, dimg, dlite = (os.path.join(base, x) for x in ("720p-padrao", "imagens-leves", "drive-lite"))
    for d in (d720, dimg, dlite):
        os.makedirs(d, exist_ok=True)
    fila = []
    for src in sorted(glob.glob(os.path.join(origem, "*.mp4"))):
        n = nome_padrao(dia, src)
        video_720p_padrao(src, os.path.join(d720, n + ".mp4"))
        lite = os.path.join(dlite, n + ".mp4")
        video_drive_lite(src, lite, base)
        print(f"{n:28s} 720p {os.path.getsize(os.path.join(d720, n + '.mp4')) / 1e6:6.1f} MB | lite {os.path.getsize(lite) / 1e6:5.2f} MB")
        fila.append({"arquivo": lite, "destino": "reel" if n.startswith("reel") else "stories", "tipo": "video-lite"})
    for src in sorted(glob.glob(os.path.join(origem, "*.png"))):
        if re.fullmatch(r"meme-dia-\d+", os.path.splitext(os.path.basename(src))[0]):
            continue  # cópia sem número da variante principal (ex.: meme-dia-02.png): já existe como meme-dia-02-1
        n = nome_padrao(dia, src)
        dst = os.path.join(dimg, n + ".jpg")
        sz = imagem_leve(src, dst)
        print(f"{n:28s} {sz[0]}x{sz[1]}  {os.path.getsize(src) / 1024:5.0f} KB -> {os.path.getsize(dst) / 1024:4.0f} KB")
        fila.append({"arquivo": dst, "destino": "memes" if n.startswith("meme") else "carrossel", "tipo": "imagem-leve"})
    # fila em lotes pequenos: imagens primeiro (leves), depois vídeos; cada lote só sai quando o anterior terminar
    fila.sort(key=lambda x: (x["tipo"] != "imagem-leve", x["destino"], x["arquivo"]))
    lotes = [fila[i:i + LOTE_MAX] for i in range(0, len(fila), LOTE_MAX)]
    md = [f"# Fila de envio ao Drive: dia {dia}\n", f"Destino: `03-aprovados/dia {dia}/<subpasta>`. Lotes de até {LOTE_MAX} arquivos, um lote por vez.\n"]
    for k, lote in enumerate(lotes, 1):
        md.append(f"\n## Lote {k}\n")
        for it in lote:
            md.append(f"- [ ] `{os.path.basename(it['arquivo'])}` -> `{it['destino']}` ({os.path.getsize(it['arquivo']) / 1e6:.2f} MB)")
    open(os.path.join(base, "FILA-DRIVE.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
    json.dump(lotes, open(os.path.join(base, "fila-drive.json"), "w"), indent=1)
    print(f"\n{len(fila)} arquivos em {len(lotes)} lotes. Fila: {os.path.join(base, 'FILA-DRIVE.md')}")


if __name__ == "__main__":
    main()
