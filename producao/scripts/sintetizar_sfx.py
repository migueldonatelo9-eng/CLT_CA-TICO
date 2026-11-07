"""Sintetiza os efeitos sonoros com ffmpeg (sem internet, sem direitos autorais).
Uso: python3 sintetizar_sfx.py public/audio/
Gera sfx_pop, tick, tock, boom, buzz, zip, ding, trombone, whoosh.
"""
import subprocess, sys, os

pasta = sys.argv[1]
os.makedirs(pasta, exist_ok=True)


def aeval(nome, expr, dur, pos=""):
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi", "-i", f"aevalsrc='{expr}':d={dur}:s=44100:c=mono"]
    if pos:
        cmd += ["-af", pos]
    subprocess.run(cmd + [f"{pasta}/sfx_{nome}.wav"], check=True)


aeval("pop", "0.9*sin(2*PI*t*(1100-4200*t))*exp(-22*t)", 0.16)
aeval("tick", "0.9*sin(2*PI*2200*t)*exp(-120*t)", 0.1)
aeval("tock", "0.9*sin(2*PI*1300*t)*exp(-90*t)", 0.12)
aeval("boom", "0.9*sin(2*PI*50*t)*exp(-5*t)+0.5*sin(2*PI*100*t)*exp(-9*t)+0.3*(random(0)-0.5)*exp(-22*t)", 1.0, "volume=1.2")
aeval("buzz", "0.5*sin(2*PI*110*t)*(0.55+0.45*sin(2*PI*30*t))+0.3*sin(2*PI*220*t)", 1.1, "afade=t=in:d=0.05,afade=t=out:st=0.75:d=0.35")
aeval("zip", "0.8*sin(2*PI*t*(3000*exp(-5*t)))*exp(-3.5*t)", 0.6)
aeval("ding", "0.7*sin(2*PI*1568*t)*exp(-6*t)+0.35*sin(2*PI*2349*t)*exp(-8*t)", 1.0)
f = "if(lt(t,0.35),311,if(lt(t,0.7),294,if(lt(t,1.05),277,262-35*(t-1.05))))"
vib = "(1+0.04*sin(2*PI*6*t)*gt(t,1.05))"
env = "if(lt(t,1.05),exp(-1.2*mod(t,0.35)),exp(-1.1*(t-1.05)))"
aeval("trombone", f"0.4*(sin(2*PI*({f})*t*{vib})+0.5*sin(4*PI*({f})*t)+0.3*sin(6*PI*({f})*t))*{env}", 2.0, "lowpass=f=1200")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi", "-i", "anoisesrc=d=0.6:c=pink:r=44100", "-af",
                "highpass=f=500,lowpass=f=7000,afade=t=in:st=0:d=0.22,afade=t=out:st=0.28:d=0.32,volume=0.9,"
                "aformat=sample_rates=44100:channel_layouts=mono", f"{pasta}/sfx_whoosh.wav"], check=True)
print("sfx ok em", pasta)
