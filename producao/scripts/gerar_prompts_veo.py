#!/usr/bin/env python3
"""Lista de prompts para colar no veoaifree.com (Nano Banana, saída quadrada 1024x1024) via skill gerar-imagem-veoaifree.

Uso: python3 gerar_prompts_veo.py   -> grava producao/dia-03/PROMPTS-VEOAIFREE.txt

Cada prompt traz a descrição fixa da ELA (igual à do agente 01), a cena, e pede composição QUADRADA com a ELA no
centro e fundo de cor chapada. Depois a conversão para 9:16 ou 4:5 ancora o quadrado embaixo e estende a cor do
fundo para cima (topo vazio para os balões).
"""
import importlib.util, pathlib

aqui = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("gp", aqui / "gerar_pedido.py")
gp = importlib.util.module_from_spec(spec); spec.loader.exec_module(gp)

D = "2026-11-09"
SQ = "Square 1:1 composition. She is centered, the background is a flat solid {c} color with a subtle halftone texture, and the top third of the image is empty flat {c} color."
CLOSE = ("Full-bleed illustration, no frame, no border and no white margin. High contrast, clean editorial art poster aesthetic, "
         "no photorealism, no 3D. The image contains no text of any kind: screens, papers, towels, bottles and walls are completely blank. "
         "No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.")
TOW = "a plain white gym towel around her neck"

# (arquivo, cor do fundo, cena)
ITENS = [
    # Reel, cena principal (q1 a q8)
    (f"{D}_reel_q1", "yellow", "In a gym, she holds a plain water bottle and raises a fist with a big confident smile and shining eyes; plain dumbbells on a rack behind her. Medium shot from the waist up."),
    (f"{D}_reel_q2", "magenta", "She freezes mid-step with one hand over her mouth and wide shining eyes, looking into the distance; far behind her, small and blurred, a tall athletic person lifting a dumbbell, seen only from behind, no face. Medium shot."),
    (f"{D}_reel_q3", "magenta", "She has a dreamy smile and heart-shaped eyes with hands clasped under her chin; above her head a big plain cloud shape containing a tiny drawing of two silhouettes holding hands on a beach at sunset. Medium shot."),
    (f"{D}_reel_q4", "yellow", "She hugs a heavy plain dumbbell to her chest like a baby, with panicked wide eyes and sweat drops on her forehead. Medium shot."),
    (f"{D}_reel_q5", "yellow", "She waves goodbye with a stiff hand and a forced sad smile; far behind her, small and blurred, a tall person wiping sweat walks away looking at a phone, seen from behind, no face. Medium shot."),
    (f"{D}_reel_q6", "magenta", "She looks sideways with a suspicious squint and one raised eyebrow, arms crossed, a plain dumbbell on the floor next to her. Medium shot."),
    (f"{D}_reel_q7", "yellow", "She lifts a small plain dumbbell with no energy, drooping shoulders and tired half-closed eyes. Medium shot."),
    (f"{D}_reel_q8", "magenta", "She looks straight at the viewer with one fist half raised and an awkward sheepish half-smile, a light blush on her cheeks. Medium shot."),
    # Reel, segundo enquadramento (q9 a q16)
    (f"{D}_reel_q9", "yellow", "Close-up of a hand gripping a plain dumbbell, the sleeve of a magenta shirt and the edge of a yellow patterned scarf visible. No face in the frame."),
    (f"{D}_reel_q10", "magenta", "Extreme close-up of her face and shoulders, eyes wide and shining, one hand covering her mouth in a secret gasp."),
    (f"{D}_reel_q11", "magenta", "Extreme close-up of her face and shoulders, dreamy half-closed eyes with tiny heart shapes in them and a soft smile."),
    (f"{D}_reel_q12", "yellow", "Extreme close-up of her face and shoulders, panicked wide eyes and an open mouth, sweat drops flying, hugging a plain dumbbell."),
    (f"{D}_reel_q13", "yellow", "Close-up of a hand waving goodbye, fingers stiff, with a small sad face partly visible in the background."),
    (f"{D}_reel_q14", "magenta", "Extreme close-up of her face and shoulders in a suspicious side-eye, one eyebrow raised, lips pressed."),
    (f"{D}_reel_q15", "yellow", "Extreme close-up of her tired face and shoulders, heavy eyelids, a few sweat drops, lips slightly open."),
    (f"{D}_reel_q16", "magenta", "Extreme close-up of her face and shoulders looking straight at the viewer with a sheepish half-smile and flushed cheeks."),
    # Stories (expressões), toalha no pescoço
    (f"{D}_story_q1", "yellow", f"Medium close-up. She raises one eyebrow high with a curious questioning look, head slightly tilted, {TOW}."),
    (f"{D}_story_q2", "magenta", f"Medium close-up. Dreamy look with heart shapes in her eyes and a soft smile, {TOW}."),
    (f"{D}_story_q3", "yellow", f"Medium close-up. She rests her chin on her hand, looking up and thinking, lips pursed, {TOW}."),
    (f"{D}_story_q4", "magenta", f"Medium close-up. She shrugs with both palms open and raised and eyebrows up, {TOW}."),
    (f"{D}_story_q5", "yellow", f"Medium close-up. She points a finger at the viewer with a mock-serious look and one eyebrow lowered, {TOW}."),
    (f"{D}_story_q6", "magenta", f"Medium close-up. She covers her face with one hand in a facepalm, peeking through her fingers with one tired eye, {TOW}."),
    (f"{D}_story_q7", "yellow", f"Medium close-up. She cups both hands around her mouth as if calling out, wide excited eyes and an open mouth, {TOW}."),
    (f"{D}_story_q8", "magenta", f"Medium close-up. She gives a tired thumbs-up with a forced smile and heavy eyelids, {TOW}."),
    # Meme "Ele nem sabe que eu existo. Mas o cachorro já tem nome."
    (f"{D}_meme_q1", "yellow", "Medium shot. She hugs a cute plain small dog with a dreamy sad look, resting her cheek on the dog's head."),
    (f"{D}_meme_q2", "magenta", "Medium shot. She holds a dog leash with a small dog sitting beside her and looks straight at the viewer with a lovesick, hopeful expression."),
    (f"{D}_meme_q3", "yellow", "Medium shot. She sits on a gym bench with a small dog next to her and gazes dreamily into the distance with a soft smile."),
]


def main():
    saida = aqui.parent / "dia-03" / "PROMPTS-VEOAIFREE.txt"
    saida.parent.mkdir(exist_ok=True)
    topo = ("PROMPTS DO DIA 3 (segunda 09/11, academia): A NOVELA DO CRUSH\n"
            "Para o veoaifree.com (Nano Banana), uma imagem por prompt. A saída do site é quadrada (1024x1024).\n"
            "Nome do arquivo = valor depois do número (acrescente .png). A ELA vem só da descrição em texto (sem referência).\n"
            "Se conseguir enviar a base_ancora_v3 como imagem de referência no campo do site, use-a e mantenha o texto.\n\n")
    blocos = []
    for i, (nome, cor, cena) in enumerate(ITENS, 1):
        prompt = f"{gp.CHAR}\nScene: {cena} {SQ.format(c=cor)}\n{CLOSE}"
        blocos.append(f"### {i:02d} | {nome}\n{prompt}\n")
    saida.write_text(topo + "\n".join(blocos), encoding="utf-8")
    print(saida, len(ITENS), "prompts,", saida.stat().st_size, "bytes")


if __name__ == "__main__":
    main()
