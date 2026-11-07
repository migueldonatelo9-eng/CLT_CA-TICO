"""Pós-processa as falas: corta pausas longas, acelera as que passam do alvo (máx. 1,4x),
põe eco nos pensamentos e nivela o volume. Grava em audio_final/ e imprime as durações.

Uso: python3 processar_vozes.py vozes-dia-01.json audio_bruto/ audio_final/
"""
import json, subprocess, sys, os

falas = json.load(open(sys.argv[1], encoding="utf-8"))
bruto, final = sys.argv[2], sys.argv[3]
os.makedirs(final, exist_ok=True)


def dur(f):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f],
                                capture_output=True, text=True).stdout)


res = {}
for f in falas:
    n, alvo = f["id"], f["alvo_s"]
    src, tmp, out = f"{bruto}/{n}.wav", f"{final}/{n}_tmp.wav", f"{final}/{n}.wav"
    corta = ("silenceremove=start_periods=1:start_threshold=-50dB:stop_periods=-1:stop_duration=0.45:"
             "stop_threshold=-50dB:stop_silence=0.22,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", src, "-af", corta, tmp], check=True)
    d0 = dur(tmp)
    tempo = min(1.4, max(1.0, d0 / alvo))
    af = []
    if tempo > 1.01:
        af.append(f"atempo={tempo:.3f}")
    if f.get("pensamento"):
        af.append("aecho=0.8:0.5:60|90:0.35|0.2")
    af.append("loudnorm=I=-16:TP=-1.5:LRA=11")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", tmp, "-af", ",".join(af), "-ar", "44100", "-ac", "1", out], check=True)
    os.remove(tmp)
    res[n] = round(dur(out), 2)
    print(f"{n}: {dur(src):.2f}s -> {res[n]}s (tempo {tempo:.2f}x)")
json.dump(res, open(f"{final}/duracoes.json", "w"), indent=1)
print("soma:", round(sum(res.values()), 1), "s  -> copie estes valores para D em timeline.ts")
