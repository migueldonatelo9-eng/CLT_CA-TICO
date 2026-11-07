#!/usr/bin/env python3
"""Gera, para o Dia 3, o texto que o painel "Fila de Imagens" (artefato do usuário) copia em "Copiar pendentes para o Claude".

Usa o MESMO bloco base e as mesmas restrições do painel (testados com o veoaifree.com / Nano Banana), a linha de
referência opcional (base_ancora_v3) e o formato de lote: "N) Arquivo: ID.png" + prompt completo.
Uso: python3 gerar_fila_veo.py   -> producao/dia-03/fila-veoaifree/*.txt (4 lotes pequenos, o site é lento)
"""
import pathlib

PREFIX = ("Vertical 9:16 panel for an Instagram story.\n"
          "Style: Brazilian comic and meme style digital illustration, clean bold black ink lines, flat colors, high contrast, a palette of yellow, magenta, black and white.\n"
          "Character: a woman with a delicate face, big expressive brown eyes, round black glasses, soft freckles on her nose and cheeks, dark eyebrows, brown hair in a big high voluminous bun with loose strands. She wears a magenta top with a yellow patterned scarf.\n"
          "Camera: Medium close-up at eye level.\n"
          "Composition: She fills the lower two thirds of the frame. The background is flat yellow, and the top third is empty.")
SUFFIX = "Constraints: The image contains no text of any kind. No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark."
REF_LINE = ("Image 1 is the character reference (base_ancora_v3). Keep the same woman: face, body build and silhouette exactly as in Image 1, "
            "with the same outfit.")
PASTA = r"C:\Users\davi1\Downloads\test claude imagem"

D = "2026-11-09"
MED = "Medium shot at eye level, from the waist up"
CLO = "Extreme close-up of her face and shoulders, at eye level"
CLOSE_ = "Close-up at eye level"
MCL = "Medium close-up at eye level"
TOW = "a plain white gym towel around her neck"

# (id, proporção, cor do fundo, câmera, cena)
LOTES = {
    "1-reel-cenas": [
        (f"{D}_reel_q1_v1", "9:16", "yellow", MED, "In a gym, she holds a plain water bottle and raises a fist with a big confident smile and shining eyes; plain dumbbells on a rack behind her."),
        (f"{D}_reel_q2_v1", "9:16", "magenta", MED, "She freezes mid-step with one hand over her mouth and wide shining eyes, looking into the distance; far behind her, small and blurred, a tall athletic person lifting a dumbbell, seen only from behind, no face."),
        (f"{D}_reel_q3_v1", "9:16", "magenta", MED, "She has a dreamy smile and heart-shaped eyes with hands clasped under her chin; above her head a big plain cloud shape containing a tiny drawing of two silhouettes holding hands on a beach at sunset."),
        (f"{D}_reel_q4_v1", "9:16", "yellow", MED, "She hugs a heavy plain dumbbell to her chest like a baby, with panicked wide eyes and sweat drops on her forehead."),
        (f"{D}_reel_q5_v1", "9:16", "yellow", MED, "She waves goodbye with a stiff hand and a forced sad smile; far behind her, small and blurred, a tall person wiping sweat walks away looking at a phone, seen from behind, no face."),
        (f"{D}_reel_q6_v1", "9:16", "magenta", MED, "She looks sideways with a suspicious squint and one raised eyebrow, arms crossed, a plain dumbbell on the floor next to her."),
        (f"{D}_reel_q7_v1", "9:16", "yellow", MED, "She lifts a small plain dumbbell with no energy, drooping shoulders and tired half-closed eyes."),
        (f"{D}_reel_q8_v1", "9:16", "magenta", MED, "She looks straight at the viewer with one fist half raised and an awkward sheepish half-smile, a light blush on her cheeks."),
    ],
    "2-reel-closes": [
        (f"{D}_reel_q9_v1", "9:16", "yellow", CLOSE_, "A hand gripping a plain dumbbell, the sleeve of a magenta shirt and the edge of a yellow patterned scarf visible. No face in the frame."),
        (f"{D}_reel_q10_v1", "9:16", "magenta", CLO, "Her eyes are wide and shining, one hand covering her mouth in a secret gasp."),
        (f"{D}_reel_q11_v1", "9:16", "magenta", CLO, "Dreamy half-closed eyes with tiny heart shapes in them and a soft smile."),
        (f"{D}_reel_q12_v1", "9:16", "yellow", CLO, "Panicked wide eyes and an open mouth, sweat drops flying, hugging a plain dumbbell."),
        (f"{D}_reel_q13_v1", "9:16", "yellow", CLOSE_, "A hand waving goodbye with stiff fingers, a small sad face partly visible in the background."),
        (f"{D}_reel_q14_v1", "9:16", "magenta", CLO, "A suspicious side-eye, one eyebrow raised, lips pressed. Her eyes are clearly visible behind clear glasses lenses."),
        (f"{D}_reel_q15_v1", "9:16", "yellow", CLO, "Tired face with heavy eyelids, a few sweat drops, lips slightly open."),
        (f"{D}_reel_q16_v1", "9:16", "magenta", CLO, "She looks straight at the viewer with a sheepish half-smile and flushed cheeks."),
    ],
    "3-stories": [
        (f"{D}_story_q1_v1", "9:16", "yellow", MCL, f"She raises one eyebrow high with a curious questioning look, head slightly tilted, {TOW}."),
        (f"{D}_story_q2_v1", "9:16", "magenta", MCL, f"Dreamy look with heart shapes in her eyes and a soft smile, {TOW}."),
        (f"{D}_story_q3_v1", "9:16", "yellow", MCL, f"She rests her chin on her hand, looking up and thinking, lips pursed, {TOW}."),
        (f"{D}_story_q4_v1", "9:16", "magenta", MCL, f"She shrugs with both palms open and raised and eyebrows up, {TOW}."),
        (f"{D}_story_q5_v1", "9:16", "yellow", MCL, f"She points a finger at the viewer with a mock-serious look and one eyebrow lowered, {TOW}."),
        (f"{D}_story_q6_v1", "9:16", "magenta", MCL, f"She covers her face with one hand in a facepalm, peeking through her fingers with one tired eye, {TOW}."),
        (f"{D}_story_q7_v1", "9:16", "yellow", MCL, f"She cups both hands around her mouth as if calling out, wide excited eyes and an open mouth, {TOW}."),
        (f"{D}_story_q8_v1", "9:16", "magenta", MCL, f"She gives a tired thumbs-up with a forced smile and heavy eyelids, {TOW}."),
    ],
    "4-memes": [
        (f"{D}_meme_q1_v1", "4:5", "yellow", MED, "She hugs a cute plain small dog with a dreamy sad look, resting her cheek on the dog's head."),
        (f"{D}_meme_q2_v1", "4:5", "magenta", MED, "She holds a dog leash with a small dog sitting beside her and looks straight at the viewer with a lovesick, hopeful expression."),
        (f"{D}_meme_q3_v1", "4:5", "yellow", MED, "She sits on a gym bench with a small dog next to her and gazes dreamily into the distance with a soft smile."),
    ],
}


def completo(ratio, cor, cam, cena, com_ref):
    p = PREFIX.replace("Vertical 9:16", "Vertical " + ratio)
    p = p.replace("Camera: Medium close-up at eye level.", f"Camera: {cam}.")
    p = p.replace("flat yellow", f"flat {cor}")
    partes = ([REF_LINE] if com_ref else []) + [p, "Scene: " + cena, SUFFIX]
    return "\n".join(partes)


def lote(itens, com_ref):
    cab = ("Claude, gere estas imagens no veoaifree.com (Nano Banana) com a skill gerar-imagem-veoaifree. "
           "Espere cada imagem ficar pronta, baixe e me confirme uma a uma. Pasta de destino: " + PASTA + "\n")
    if com_ref:
        cab += "Use a imagem de referência base_ancora_v3 em todas.\n"
    corpo = "\n\n".join(f"{k}) Arquivo: {i[0]}.png\n" + completo(i[1], i[2], i[3], i[4], com_ref) for k, i in enumerate(itens, 1))
    return cab + "\n" + corpo + "\n"


def main():
    base = pathlib.Path(__file__).resolve().parent.parent / "dia-03" / "fila-veoaifree"
    base.mkdir(parents=True, exist_ok=True)
    for f in base.glob("*.txt"):
        f.unlink()
    for nome, itens in LOTES.items():
        for com_ref in (False, True):
            arq = base / f"{nome}{'-COM-REFERENCIA' if com_ref else ''}.txt"
            arq.write_text(lote(itens, com_ref), encoding="utf-8")
            print(arq.name, len(itens), "itens,", arq.stat().st_size, "bytes")


if __name__ == "__main__":
    main()
