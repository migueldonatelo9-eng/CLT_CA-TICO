#!/usr/bin/env python3
"""Vídeos 720x1280 em dois passos com tamanho-alvo, para caber no limite do conector do Drive (~3 MB por arquivo)."""
import subprocess, os, sys
ALVO, LIMITE = 2_900_000, 3_000_000
def dur(f):
    return float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f],capture_output=True,text=True).stdout)
def enc(src, dst, w=720, h=1280):
    d = dur(src)
    for t in range(5):
        total = ALVO*8/d*(0.93**t); v = max(150_000, int(total-48_000-6_000))
        base = ["ffmpeg","-y","-loglevel","error","-i",src,"-vf",f"scale={w}:{h}:flags=lanczos,fps=24","-c:v","libx264","-preset","slow","-b:v",str(v),"-maxrate",str(int(v*1.4)),"-bufsize",str(v*2),"-pix_fmt","yuv420p"]
        subprocess.run(base+["-pass","1","-an","-f","null","/dev/null"],check=True)
        subprocess.run(base+["-pass","2","-c:a","aac","-b:a","48k","-ac","1","-ar","32000","-movflags","+faststart",dst],check=True)
        for f in os.listdir("."):
            if f.startswith("ffmpeg2pass"): os.remove(f)
        s = os.path.getsize(dst)
        if s <= LIMITE: break
    print(f"{dst:34s} {d:5.1f}s  {w}x{h}  video {v//1000:4d} kbps  {s/1e6:5.2f} MB ({s} bytes)")
if __name__ == "__main__":
    os.chdir("/home/user/pacote/drive-720-saida")
    enc("/home/user/videos/dia-NN/reel-dia-02.mp4", "reel-dia-02.mp4")
    for i in range(1,7): enc(f"/home/user/videos/dia-NN/story-{i}.mp4", f"story-{i}-dia-02.mp4")
