#!/usr/bin/env python3
"""Monta a pasta "clt caotica" com uma subpasta para cada dia e divide em .zip para baixar.

Uso: python3 organizar_pacote.py            (reconstrói tudo a cada execução)

Saída: /home/user/pacote/clt caotica/...  e /home/user/pacote/zips/*.zip
Cada zip tem a pasta raiz "clt caotica/", então basta extrair todos no mesmo lugar
(C:\\Users\\davi1\\Downloads), mesclando as pastas.
"""
import glob, os, shutil, subprocess, zipfile

SP = "/tmp/claude-0/-home-user/b5e84e49-b700-5717-a88b-95394018a136/scratchpad"
REPO = "/home/user/migueldonatelo9-eng/clt_ca-tico"
VID = "/home/user/videos"
OUT = "/home/user/pacote"
RAIZ = f"{OUT}/clt caotica"
CACHE = f"{OUT}/_cache"
LIMITE_ZIP = 62 * 1024 * 1024

D1 = "dia-01 (sab 07-11) - Feedback de cinco minutos"
D2 = "dia-02 (dom 08-11) - So cinco minutinhos no sofa"
OUTROS = [
    ("dia-03 (seg 09-11) - A novela do crush", "academia"),
    ("dia-04 (ter 10-11) - A fofoca sou eu", "trabalho"),
    ("dia-05 (qua 11-11) - Ensaio no espelho", "casa"),
    ("dia-06 (qui 12-11) - Esteira ocupada", "academia"),
    ("dia-07 (sex 13-11) - Desculpa de atraso", "trabalho"),
]


def cp(src, dst):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(src, dst)


def leve(src, dst, maxrate="5M"):
    """Reduz vídeos grandes (mestre em crf 21) para algo fácil de baixar, sem mudar resolução."""
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if os.path.getsize(src) <= 24 * 1024 * 1024:
        shutil.copy2(src, dst); return
    cache = f"{CACHE}/{os.path.basename(os.path.dirname(src))}-{os.path.basename(src)}"
    if not os.path.exists(cache) or os.path.getmtime(cache) < os.path.getmtime(src):
        os.makedirs(CACHE, exist_ok=True)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", src, "-c:v", "libx264", "-crf", "24", "-maxrate", maxrate,
                        "-bufsize", "10M", "-preset", "medium", "-c:a", "copy", "-movflags", "+faststart", cache], check=True)
    shutil.copy2(cache, dst)


def imagens(pasta_orig, destino, prefixo):
    """Os arquivos do agente 01 são JPEG com extensão .png; aqui ganham a extensão certa."""
    for f in sorted(glob.glob(f"{pasta_orig}/{prefixo}*.png")):
        cp(f, f"{destino}/{os.path.basename(f)[:-4]}.jpg")


def texto(caminho, conteudo):
    os.makedirs(os.path.dirname(caminho), exist_ok=True)
    open(caminho, "w", encoding="utf-8").write(conteudo)


def montar():
    shutil.rmtree(RAIZ, ignore_errors=True)
    os.makedirs(RAIZ)
    orig = f"{SP}/dia2/orig"

    # ---------------- Dia 1
    d = f"{RAIZ}/{D1}"
    cp(f"{VID}/clt-dia1-motion-final.mp4", f"{d}/01-reel/reel-dia-01.mp4")
    for i in range(1, 7):
        cp(f"{VID}/dia-01/story-{i}.mp4", f"{d}/02-stories/story-{i}.mp4")
        cp(f"{VID}/dia-01/carrossel-slide-{i}.png", f"{d}/03-carrossel/slide-{i}.png")
    for z in ("clt-dia1-audio-vozes-sfx.zip", "clt-dia1-audio-stories.zip"):
        cp(f"{SP}/upload/{z}", f"{d}/04-audio/{z}")
    imagens(orig, f"{d}/05-imagens-sem-texto", "2026-11-07_")
    for f in ("ROTEIRO-FINAL.md", "STORIES-E-CARROSSEL.md"):
        cp(f"{REPO}/producao/dia-01/{f}", f"{d}/06-roteiro/{f}")
    cp(f"{REPO}/planejamento/storyboard-dia-1.md", f"{d}/06-roteiro/storyboard-dia-1.md")

    # ---------------- Dia 2
    d = f"{RAIZ}/{D2}"
    cp(f"{VID}/dia-02/reel-dia-02.mp4", f"{d}/01-reel/reel-dia-02.mp4")
    for f in sorted(glob.glob(f"{VID}/dia-02/story-*.mp4")):
        leve(f, f"{d}/02-stories/{os.path.basename(f)}")
    for f in sorted(glob.glob(f"{VID}/dia-02/carrossel-slide-*.png")):
        cp(f, f"{d}/03-carrossel/{os.path.basename(f).replace('carrossel-', '')}")
    for n in (1, 2, 3):
        cp(f"{VID}/dia-02/meme-dia-02-{n}.png", f"{d}/04-meme/meme-{n}.png")
    for pasta, sub in (("audio_final_reel", "vozes-reel"), ("audio_final_st", "vozes-stories")):
        for f in glob.glob(f"{SP}/dia2/{pasta}/*"):
            cp(f, f"{d}/05-audio/{sub}/{os.path.basename(f)}")
    for f in glob.glob(f"{SP}/clt-d2/public/audio/sfx_*.wav"):
        cp(f, f"{d}/05-audio/efeitos-sonoros/{os.path.basename(f)}")
    imagens(orig, f"{d}/06-imagens-sem-texto", "2026-11-08_")
    imagens(orig, f"{d}/06-imagens-sem-texto", "banco_ela_")
    for f in sorted(glob.glob(f"{REPO}/producao/dia-02/*")):
        cp(f, f"{d}/07-roteiro-e-pedidos/{os.path.basename(f)}")

    # ---------------- Dias 3 a 7 (pastas prontas para os próximos dias)
    for nome, local in OUTROS:
        for sub in ("01-reel", "02-stories", "03-carrossel", "04-meme", "05-audio", "06-imagens-sem-texto", "07-roteiro-e-pedidos"):
            os.makedirs(f"{RAIZ}/{nome}/{sub}", exist_ok=True)
        texto(f"{RAIZ}/{nome}/LEIA-ME.txt", f"{nome}\nLocal: {local}\nAinda não produzido. Roteiro e falas: pasta planejamento/semana-1.md.\n"
              "Cada dia leva: 1 reel (45 a 60 s), 6 stories, carrossel (nos dias 1, 2, 4, 5 e 7) e meme (nos dias 3 e 6).\n")

    # ---------------- Material de apoio
    cp(f"{REPO}/planejamento/semana-1.md", f"{RAIZ}/planejamento/semana-1.md")
    cp(f"{REPO}/producao/PLAYBOOK.md", f"{RAIZ}/planejamento/PLAYBOOK-producao-video.md")
    for f in glob.glob(f"{REPO}/producao/comentarios/*.html"):
        cp(f, f"{RAIZ}/planejamento/{os.path.basename(f)}")
    cp(f"{SP}/upload/clt-dia1-remotion-fonte.zip", f"{RAIZ}/fontes-codigo/remotion-dia-01.zip")
    # fonte Remotion do Dia 2 (sem node_modules, sem quadros e sem saídas)
    z = f"{RAIZ}/fontes-codigo/remotion-dia-02.zip"
    os.makedirs(os.path.dirname(z), exist_ok=True)
    with zipfile.ZipFile(z, "w", zipfile.ZIP_DEFLATED) as zf:
        base = f"{SP}/clt-d2"
        for raiz, dirs, arqs in os.walk(base):
            dirs[:] = [x for x in dirs if x not in ("node_modules", "out", "frames", "audio", ".git")]
            for a in arqs:
                p = os.path.join(raiz, a)
                zf.write(p, os.path.join("remotion-dia-02", os.path.relpath(p, base)))
    shutil.copytree(f"{REPO}/producao/scripts", f"{RAIZ}/fontes-codigo/scripts", ignore=shutil.ignore_patterns("__pycache__", "*.pyc"))

    texto(f"{RAIZ}/LEIA-ME.txt",
          "CLT CAOTICA - material organizado\n\n"
          "Uma pasta para cada dia. Dentro de cada dia:\n"
          "  01-reel  02-stories  03-carrossel  04-meme  05-audio  06-imagens-sem-texto  07-roteiro\n\n"
          "planejamento/   roteiros da Semana 1, PLAYBOOK (método), palavras-chave dos comentários e nota do SendPulse\n"
          "fontes-codigo/  projetos Remotion dos Dias 1 e 2 e scripts (voz, pedidos ao agente 01, este organizador)\n\n"
          "Imagens sem texto: o agente 01 entrega JPEG com extensão .png; aqui ganharam a extensão .jpg.\n"
          "Stories do Dia 2: reencodados com menos bitrate (mesma resolução 1080x1920) para facilitar o download.\n"
          "Os mestres em alta qualidade ficam na nuvem da sessão e no Remotion (fontes-codigo).\n")


def zips():
    zd = f"{OUT}/zips"
    shutil.rmtree(zd, ignore_errors=True)
    os.makedirs(zd)
    todos = []
    for raiz, _, arqs in os.walk(RAIZ):
        for a in arqs:
            p = os.path.join(raiz, a)
            todos.append((os.path.relpath(p, OUT), p))
    todos.sort()

    def grupo(chave):
        return [(a, p) for a, p in todos if chave(a)]

    grupos = [
        ("1-dia-01-reel-carrossel-e-apoio", grupo(lambda a: D1 in a and any(s in a for s in ("01-reel", "03-carrossel", "04-audio", "06-roteiro")))),
        ("2-dia-01-stories", grupo(lambda a: D1 in a and "02-stories" in a)),
        ("3-dia-02-reel-carrossel-meme-audio-roteiro", grupo(lambda a: D2 in a and not any(s in a for s in ("02-stories", "06-imagens")))),
        ("4-dia-02-stories", grupo(lambda a: D2 in a and "02-stories" in a)),
        ("5-imagens-sem-texto-dias-01-e-02", grupo(lambda a: "06-imagens" in a or "05-imagens" in a)),
        ("6-planejamento-fontes-e-pastas-dos-dias-03-a-07", grupo(lambda a: not any(k in a for k in (D1, D2)) or ("LEIA-ME.txt" == os.path.basename(a) and "clt caotica/LEIA" in a))),
    ]
    # LEIA-ME.txt da raiz vai no primeiro zip também
    raiz_leia = [(a, p) for a, p in todos if a == "clt caotica/LEIA-ME.txt"]
    grupos[0] = (grupos[0][0], raiz_leia + grupos[0][1])
    grupos[5] = (grupos[5][0], [x for x in grupos[5][1] if x[0] != "clt caotica/LEIA-ME.txt"])
    usados = set()
    saidas = []
    for nome, itens in grupos:
        parte, atual, tam = 1, [], 0
        pedacos = []
        for a, p in itens:
            if a in usados:
                continue
            usados.add(a)
            s = os.path.getsize(p)
            if atual and tam + s > LIMITE_ZIP:
                pedacos.append(atual); atual, tam = [], 0
            atual.append((a, p)); tam += s
        if atual:
            pedacos.append(atual)
        for i, ped in enumerate(pedacos, 1):
            fn = f"{zd}/{nome}.zip" if len(pedacos) == 1 else f"{zd}/{nome}-parte{i}.zip"
            with zipfile.ZipFile(fn, "w") as zf:
                for a, p in ped:
                    ext = os.path.splitext(p)[1].lower()
                    zf.write(p, a, compress_type=zipfile.ZIP_STORED if ext in (".mp4", ".png", ".jpg", ".zip", ".wav") else zipfile.ZIP_DEFLATED)
            saidas.append(fn)
    # pastas vazias (dias ainda não produzidos) entram como entradas de diretório no último zip
    vazias = []
    for raiz, dirs, arqs in os.walk(RAIZ):
        if not dirs and not arqs:
            vazias.append(os.path.relpath(raiz, OUT) + "/")
    if vazias and saidas:
        with zipfile.ZipFile(saidas[-1], "a") as zf:
            for v in sorted(vazias):
                zf.writestr(v, "")
    faltou = [a for a, _ in todos if a not in usados]
    for f in saidas:
        print(f"{os.path.getsize(f)/1048576:7.1f} MB  {os.path.basename(f)}")
    print("arquivos fora dos zips:", faltou)


if __name__ == "__main__":
    montar()
    zips()
