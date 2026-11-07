"""Extrai quadros do vídeo final e monta mosaicos para conferir se algo cobre o rosto.
Uso: python3 mosaico_conferencia.py video.mp4 saida/ 1.5 5.5 9.7 ...   (tempos em segundos)
Gera saida/mosaico1.png, mosaico2.png (12 quadros cada, 4 colunas).
"""
import subprocess, sys, os
from PIL import Image, ImageDraw

video, saida = sys.argv[1], sys.argv[2]
tempos = [float(t) for t in sys.argv[3:]]
os.makedirs(saida, exist_ok=True)
for i, t in enumerate(tempos):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", video, "-frames:v", "1",
                    "-vf", "scale=360:640", f"{saida}/q{i:02d}.png"], check=True)
for folha in range((len(tempos) + 11) // 12):
    im = Image.new("RGB", (1440, 1920), (30, 30, 30))
    d = ImageDraw.Draw(im)
    for k in range(12):
        i = folha * 12 + k
        if i >= len(tempos):
            break
        x, y = (k % 4) * 360, (k // 4) * 640
        im.paste(Image.open(f"{saida}/q{i:02d}.png"), (x, y))
        d.rectangle([x, y, x + 70, y + 20], fill=(0, 0, 0))
        d.text((x + 4, y + 4), f"{tempos[i]}s", fill=(255, 255, 255))
    im.save(f"{saida}/mosaico{folha + 1}.png")
print("ok")
