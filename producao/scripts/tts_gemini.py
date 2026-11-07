"""Gera as falas com o Gemini TTS e salva WAV 24 kHz mono (L00.wav, L01.wav...).

Uso (a partir da pasta do projeto Remotion):
    python3 tts_gemini.py vozes-dia-01.json audio_bruto/

- A chave pode vir do cabeçalho injetado pelo ambiente (sem GOOGLE_API_KEY) ou da
  variável de ambiente GOOGLE_API_KEY.
- Limites do plano gratuito: erro 429 = cota por minuto ou por dia. O script espera e
  tenta de novo; se continuar 429, pare e retome depois. Não gere mais de ~10 falas
  seguidas sem pausa de ~30 s.
"""
import base64, json, os, sys, time, urllib.request, wave

# Modelo selecionável: TTS_MODEL=gemini-3.1-flash-tts-preview python3 tts_gemini.py ...
MODEL = os.environ.get("TTS_MODEL") or "gemini-2.5-flash-preview-tts"
TENTATIVAS = int(os.environ.get("TTS_TENTATIVAS") or 6)
ESPERA = float(os.environ.get("TTS_ESPERA") or 40)
PAUSA = float(os.environ.get("TTS_PAUSA") or 30)  # pausa entre falas
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"


def tts(texto, voz, estilo, saida):
    corpo = {
        "contents": [{"parts": [{"text": f"Diga {estilo}: {texto}"}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voz}}},
        },
    }
    headers = {"Content-Type": "application/json"}
    if os.environ.get("GOOGLE_API_KEY"):
        headers["x-goog-api-key"] = os.environ["GOOGLE_API_KEY"]
    req = urllib.request.Request(URL, data=json.dumps(corpo).encode(), headers=headers)
    for tentativa in range(TENTATIVAS):
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                d = json.load(r)
            pcm = base64.b64decode(d["candidates"][0]["content"]["parts"][0]["inlineData"]["data"])
            with wave.open(saida, "wb") as w:
                w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
            return True
        except Exception as e:  # 429, 502...
            print(saida, "tentativa", tentativa + 1, "falhou:", e, flush=True)
            time.sleep(ESPERA)
    return False


if __name__ == "__main__":
    falas = json.load(open(sys.argv[1], encoding="utf-8"))
    destino = sys.argv[2]
    os.makedirs(destino, exist_ok=True)
    for f in falas:
        saida = os.path.join(destino, f["id"] + ".wav")
        if os.path.exists(saida):
            continue  # não gasta cota de novo
        ok = tts(f["texto"], f["voz"], f["estilo"], saida)
        print(f["id"], "ok" if ok else "FALHOU", flush=True)
        time.sleep(PAUSA)
