# Remotion do Dia 2

Cópia do projeto do Dia 1 com o conteúdo do Dia 2 (`src/timeline.ts`, `src/stories.ts`, `src/Carousel.tsx`, `src/Meme.tsx`).
Para renderizar é preciso repor as pastas que não vão no repositório:

- `public/frames/`: quadros do agente 01 renomeados (r1..r16 = reel_q1..q16, com r14 = reel_q14_v2; s1..s16 = story_q1..q16; k1..k7 = carrossel1_q1..q7; m1..m3 = meme_q1..q3), em JPEG.
- `public/audio/`: vozes processadas (L00..L15, ST3a..ST6b, geradas por `../scripts/processar_vozes.py`) e os `sfx_*.wav` (`../scripts/sintetizar_sfx.py`).
- `src/durations.json`: durações reais das vozes (o `timeline.ts` lê daqui).

Depois: `npm install` e os comandos de `../dia-02/ROTEIRO-FINAL.md` e `../dia-02/STORIES-E-CARROSSEL.md`.
