#!/usr/bin/env python3
"""Monta o texto de um pedido [CLT-PEDIDO] LOTE-00N para o agente 01.

Uso: python3 gerar_pedido.py   (grava os arquivos em producao/dia-02/)

A descrição da personagem e o fechamento são fixos e não podem ser reescritos.
Cada item traz: id, proporção, cena (inglês) e a cor do fundo/terço superior.
"""
import pathlib

CHAR = ("Pop art modern comic book illustration style, an expressive, intellectual young woman. "
        "Fair skin, oval face, large expressive brown eyes, defined eyebrows, long eyelashes. "
        "Large round black-rimmed glasses. Voluminous dark brown hair in a high messy bun, loose strands framing her face. "
        "Small nose, pink lips. Magenta pink shirt, yellow patterned scarf tied around the neck. "
        "Strong bold black outlines, subtle hatch shading, vibrant flat colors, halftone comic print texture, grainy finish.")

CLOSE = ("Full-bleed illustration that fills the entire canvas, with no frame, no border and no white margin. "
         "High contrast, clean editorial art poster aesthetic, no photorealism, no 3D. "
         "The image contains no text of any kind: screens, papers, mugs and walls are completely blank. "
         "No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.")

SIZES = {"9:16": (1080, 1920), "4:5": (1080, 1350)}

HEADER = """lote: {lote}
projeto: CLT Caótica
observacao: {obs}
servico: Pollinations
modelo: tongyi-mai/z-image-turbo
formato: PNG real, no tamanho exato indicado em cada item. Não gravar JPEG ou WebP com extensão .png.
tamanho: passar a largura e a altura do item na chamada. Se o modelo devolver um tamanho maior (múltiplo de 16, por exemplo 1088x1920), cortar no centro até o tamanho exato do item. Nunca esticar a imagem. Se devolver um tamanho menor, entregar como saiu e informar o tamanho no status.
nome do arquivo: exatamente o valor do campo "arquivo" de cada item, sem prefixo, sem horário e sem o nome do serviço.
pasta: 1JwTGv8o34-l1s3N0x3ywew1H2GSJ1ibz
semente: 4321, a mesma para todos os itens. Passar seed=4321 em todas as chamadas. Não trocar a semente por item.
referencia: nenhuma. Não usar imagem de referência. A personagem vem só da descrição fixa que abre o prompt e da semente.
resposta: responder neste mesmo e-mail com uma linha de status por id (concluido ou erro), com o tamanho final em pixels e o modelo usado. Gravar cada imagem na pasta indicada. Se o arquivo já existir, responder [CLT-ERRO] com o motivo "arquivo já existe" para esse id e seguir com os demais.

Regras: uma imagem por id. Usar o prompt exatamente como está, sem acrescentar nem tirar nada. A primeira parte do prompt (a descrição da personagem) é igual em todos os itens com personagem e não pode ser reescrita. Não sobrescrever arquivos existentes. Reel, story e banco de expressões: 9:16, 1080x1920. Carrossel e meme: 4:5, 1080x1350.
"""

TOP = "The top third is an empty, flat {c} area with nothing in it."


def item(n, id_, ratio, scene, cor, frame):
    w, h = SIZES[ratio]
    return (f"--- {n:03d} ---\nid: {id_}\narquivo: {id_}.png\nproporcao: {ratio}\nlargura: {w}\naltura: {h}\nsemente: 4321\n"
            f"prompt:\n{CHAR}\nScene: {scene} {frame} {TOP.format(c=cor)}\n{CLOSE}\n")


D = "2026-11-08"
MED = "Medium shot at eye level, from the waist up. She fills the lower two thirds of the frame."
CLO = "Extreme close-up of her face and shoulders, at eye level. Her face fills the lower two thirds of the frame."
HAND = "Close-up at eye level. No face in the frame. The objects fill the lower two thirds of the frame."
STORY = "Medium close-up at eye level. She fills the lower two thirds of the frame."
CAR = "Medium close-up at eye level. She is centered in the lower two thirds of the frame."

# ------------------------------------------------------------------ LOTE-007: complemento do Dia 2
L7 = [
    # Reel, segundo enquadramento de cada cena (q9 a q16)
    (f"{D}_reel_q9_v1", "9:16", "A hand holding a TV remote control, thumb on a button, resting on the arm of a sofa in warm golden afternoon light, the sleeve of a magenta shirt and the edge of a yellow patterned scarf visible.", "yellow", HAND),
    (f"{D}_reel_q10_v1", "9:16", "Her eyes are closing slowly and she has a tiny relaxed smile, a plain yellow blanket pulled up to her chin.", "magenta", CLO),
    (f"{D}_reel_q11_v1", "9:16", "Her eyes are huge with tiny pupils and her mouth is wide open in shock, one side of her face lit by cold blue night light.", "magenta", CLO),
    (f"{D}_reel_q12_v1", "9:16", "Both hands press her cheeks in panic like a scream, eyes wide, mouth open, sweat drops flying off her forehead.", "yellow", CLO),
    (f"{D}_reel_q13_v1", "9:16", "A hand tightly gripping a pen over a completely blank open notebook page, the pen tip trembling with short motion lines around it.", "yellow", HAND),
    (f"{D}_reel_q14_v1", "9:16", "Her face is lit by the pale glow of an unseen screen, glassy empty stare, slack jaw, her glasses reflecting a plain blank white rectangle.", "magenta", CLO),
    (f"{D}_reel_q15_v1", "9:16", "A plain round wall clock with a blank white face and two hands fills the right half. On the left edge one of her eyes squints suspiciously behind her glasses under a raised eyebrow.", "yellow", "Close-up at eye level."),
    (f"{D}_reel_q16_v1", "9:16", "She pulls the yellow blanket up to her nose, covering her mouth, and looks straight at the viewer with deadpan exhausted eyes behind her glasses.", "magenta", CLO),
    # Stories: mais expressões, com a coberta amarela
    (f"{D}_story_q9_v1", "9:16", "She winks with one eye and points a finger gun at the viewer with a smug grin, the yellow blanket around her shoulders.", "yellow", STORY),
    (f"{D}_story_q10_v1", "9:16", "She rolls her eyes up and to the side with pressed lips and a tilted head, the yellow blanket around her shoulders.", "magenta", STORY),
    (f"{D}_story_q11_v1", "9:16", "She whispers with one hand beside her mouth, eyes darting sideways in a conspiratorial look, the yellow blanket around her shoulders.", "yellow", STORY),
    (f"{D}_story_q12_v1", "9:16", "She is scandalized, both hands on her cheeks and mouth open in mock shock, the yellow blanket around her shoulders.", "magenta", STORY),
    (f"{D}_story_q13_v1", "9:16", "She laughs out loud with eyes shut and tears of joy, one hand on her stomach, the yellow blanket around her shoulders.", "yellow", STORY),
    (f"{D}_story_q14_v1", "9:16", "She yawns with her mouth wide open and eyes shut, a fist near her mouth, the yellow blanket around her shoulders.", "magenta", STORY),
    (f"{D}_story_q15_v1", "9:16", "She stands with arms crossed and gives a flat unimpressed stare with one eyebrow raised, the yellow blanket around her shoulders.", "yellow", STORY),
    (f"{D}_story_q16_v1", "9:16", "She holds a plain blank white mug with both hands and smiles smugly over the rim, curls of steam rising, the yellow blanket around her shoulders.", "magenta", STORY),
    # Carrossel: uma imagem própria para cada slide (q1 e q2 estão no LOTE-006)
    (f"{D}_carrossel1_q3_v1", "4:5", "She shivers wrapped tightly in a plain yellow blanket, eyes squeezed shut and teeth chattering, small pale snowflake shapes floating around her.", "magenta", CAR),
    (f"{D}_carrossel1_q4_v1", "4:5", "She taps one finger on her temple and looks up with a thoughtful smirk, a simple plain light bulb drawn above her head, the yellow blanket around her shoulders.", "yellow", CAR),
    (f"{D}_carrossel1_q5_v1", "4:5", "She hugs a big plain cushion tightly to her chest with eyes shut and a stubborn pout, refusing to move.", "magenta", CAR),
    (f"{D}_carrossel1_q6_v1", "4:5", "She raises one open palm toward the viewer like a stop sign and turns her head away with eyes closed and a smug expression, the yellow blanket around her shoulders.", "yellow", CAR),
    (f"{D}_carrossel1_q7_v1", "4:5", "She sits like a queen on the sofa with chin up and half-lidded proud eyes, holding the TV remote like a scepter, wearing a small plain golden paper crown, the yellow blanket as a royal cape.", "magenta", CAR),
    # Meme de vitrine (feed 4:5), "Domingo à noite, versão real"
    (f"{D}_meme_q1_v1", "4:5", "She lies in bed with the blanket up to her chin and stares at the ceiling with huge wide-open eyes, sleepless, a small crescent moon visible through a window.", "deep navy blue", "Medium close-up at eye level. She fills the lower two thirds of the frame."),
    (f"{D}_meme_q2_v1", "4:5", "She sits on the edge of a bed in a dark room with her hands on her knees and a hollow tired stare at the viewer, pale moonlight from a window.", "deep navy blue", MED),
    (f"{D}_meme_q3_v1", "4:5", "She sits on the sofa holding a smartphone whose screen is completely blank and softly glowing, lighting her tired wide eyes, the yellow blanket over her legs.", "deep navy blue", MED),
]

# ------------------------------------------------------------------ LOTE-008: banco de expressões da ELA (reaproveitável em qualquer dia)
BG = "Medium close-up at eye level, plain shirt and scarf, no blanket. She fills the lower two thirds of the frame."
L8 = [
    ("banco_ela_e01_v1", "9:16", "She laughs out loud with her head back, eyes shut and mouth wide open.", "yellow", BG),
    ("banco_ela_e02_v1", "9:16", "She cries dramatically, streams of tears pouring from her eyes in two arcs, mouth in a wobbly frown.", "magenta", BG),
    ("banco_ela_e03_v1", "9:16", "She is furious with clenched teeth, deeply furrowed eyebrows and simple puffs of steam shapes rising from her head.", "yellow", BG),
    ("banco_ela_e04_v1", "9:16", "She is in love, with simple heart shapes in her eyes and clasped hands under her chin.", "magenta", BG),
    ("banco_ela_e05_v1", "9:16", "She is embarrassed, blushing deeply, one hand covering part of her mouth and eyes looking away.", "yellow", BG),
    ("banco_ela_e06_v1", "9:16", "She is proud, chin high, one fist raised in triumph and a confident grin.", "magenta", BG),
    ("banco_ela_e07_v1", "9:16", "She is confused, head tilted to one side, squinting with one eyebrow up and the other down, lips twisted.", "yellow", BG),
    ("banco_ela_e08_v1", "9:16", "She is completely drained, her head resting on a table next to a closed blank laptop, eyes half shut and lifeless.", "magenta", BG),
    ("banco_ela_e09_v1", "9:16", "She gives a forced fake smile with clenched teeth, a twitching eyebrow and wide stiff eyes.", "yellow", BG),
    ("banco_ela_e10_v1", "9:16", "She celebrates with both arms in the air and a huge smile, colorful plain confetti pieces falling around her.", "magenta", BG),
    ("banco_ela_e11_v1", "9:16", "She gives a suspicious side-eye, face turned slightly away but eyes looking sharply at the viewer, one eyebrow raised.", "yellow", BG),
    ("banco_ela_e12_v1", "9:16", "She stares straight at the viewer with a perfectly flat deadpan expression and a straight mouth, no emotion at all.", "magenta", BG),
]


# ------------------------------------------------------------------ LOTE-009: reposição (itens que não saíram e uma nova versão)
L9 = [
    (f"{D}_reel_q5_v1", "9:16", "She sits at a small desk in front of a completely blank open notebook with a pen in her hand, a tense forced smile with clenched teeth and one eyebrow twitching. The notebook pages are completely blank.", "yellow", MED),
    (f"{D}_reel_q14_v2", "9:16", "Her face is lit by the pale glow of an unseen screen, a glassy tired stare with her eyes clearly visible behind clear transparent glasses lenses, slack jaw.", "magenta", CLO),
    (f"{D}_meme_q3_v1", "4:5", "She sits on the sofa holding a smartphone whose screen is completely blank and softly glowing, lighting her tired wide eyes, the yellow blanket over her legs.", "deep navy blue", MED),
    ("banco_ela_e08_v1", "9:16", "She is completely drained, her head resting on a table next to a closed blank laptop, eyes half shut and lifeless.", "magenta", BG),
    ("banco_ela_e11_v1", "9:16", "She gives a suspicious side-eye, face turned slightly away but eyes looking sharply at the viewer, one eyebrow raised.", "yellow", BG),
]


def montar(lote, obs, itens, saida):
    partes = [HEADER.format(lote=lote, obs=obs)]
    for i, (id_, ratio, scene, cor, frame) in enumerate(itens, 1):
        partes.append(item(i, id_, ratio, scene, cor, frame))
    txt = "\n".join(partes)
    saida.write_text(txt, encoding="utf-8")
    print(saida.name, len(itens), "itens,", len(txt), "caracteres")


if __name__ == "__main__":
    base = pathlib.Path(__file__).resolve().parent.parent / "dia-02"
    base.mkdir(exist_ok=True)
    montar("LOTE-007", "lote complementar do Dia 2 (08/11/2026): segundos enquadramentos do reel, mais expressões para os stories, imagem própria para cada slide do carrossel e o meme de vitrine. Não substitui o LOTE-006 nem nenhum lote anterior.", L7, base / "PEDIDO-LOTE-007.txt")
    montar("LOTE-008", "banco de expressões da personagem para reaproveitar em qualquer dia. Não substitui nenhum lote anterior.", L8, base / "PEDIDO-LOTE-008.txt")
    montar("LOTE-009", "lote de reposição do Dia 2 (08/11/2026): quatro imagens que não foram geradas nos lotes 006, 007 e 008 (reel_q5_v1, meme_q3_v1, banco_ela_e08_v1 e banco_ela_e11_v1) e uma nova versão (reel_q14_v2), porque as lentes dos óculos saíram brancas e escondem os olhos. Não substitui nenhum lote anterior e não mexe nos arquivos que já existem.", L9, base / "PEDIDO-LOTE-009.txt")
