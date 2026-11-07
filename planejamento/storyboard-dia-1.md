# Storyboard em quadrinhos: "Feedback de cinco minutos" (Dia 1, CLT Caótica)

**Formato:** 9:16 · 8 cenas de 8 s (64 s) · estilo quadrinho · vozes Gemini com direção emocional (estilo drama curto)
**Base:** roteiro do Dia 1 (ainda rascunho para aprovação). As falas seguem o rascunho; se mudarem, ajuste as cenas.

---

## 1. Personagens (originais do projeto)

- **ELA:** personagem principal. Use a âncora `base_ancora_v3` (pasta REFERENCIA) em todas as cenas para manter o visual. Não descrevo traços aqui porque o visual vem da âncora.
- **CHEFE:** papel. Nunca aparece inteiro: só a sombra e a voz.
- **COLEGA:** papel. Aparece só de lado. Não entra neste storyboard para manter 8 cenas.
- **CRUSH:** nunca fala. Não entra neste storyboard.

Regras da série (do roteiro): sem nomes fictícios, ironia sobre a situação e nunca sobre pessoa real, imagem sem texto (balões e legendas entram depois).

---

## 2. Estilo visual (base de todos os prompts)

> Modern comic book illustration, thick black outlines, halftone shading, saturated colors (magenta, yellow, night blue), vertical 9:16, NO text, NO speech balloons, NO letters. Keep the character identical to reference image base_ancora_v3.

---

## 3. Arco narrativo (adaptado de Gancho → Produto → Prova para humor)

Gancho → Problema → Identificação → Resignação → Virada → Clímax → Pausa cômica → Punchline + CTA

---

## 4. Tabela de storyboard

| # | Tempo | Arco | Cena (quadrinho) | Fala | Pensamento (balão) |
|---|---|---|---|---|---|
| 1 | 0–8 s | Gancho | Mesa de trabalho, manhã. ELA com a caneca, sorriso confiante. | ELA: "Hoje o dia vai ser tranquilo." | "Já devia ter desconfiado: o chefe chegou sorrindo." |
| 2 | 8–16 s | Problema | Sombra do chefe cai sobre a mesa. ELA congela com a caneca no ar. | CHEFE (fora de quadro): "Tem um minutinho? É só um feedback rápido." | — |
| 3 | 16–24 s | Identificação | Close nos olhos arregalados de ELA. | — | "Feedback rápido é o nome que chefe dá para aula de duas horas." |
| 4 | 24–32 s | Resignação | ELA olha de canto, sorriso forçado. | ELA: "Claro, pode falar." | "Claro é a palavra que eu digo quando estou com fome e sem saída." |
| 5 | 32–40 s | Virada | Sombra do chefe cresce. A caneca vibra com linhas de movimento. | CHEFE: "Gostei muito do seu trabalho." | — |
| 6 | 40–48 s | Clímax | ELA olha para o teto, fundo magenta pulsando. | CHEFE: "Só uma coisinha: refaz tudo, e é pra ontem." | "Gostei muito. Essa frase é sempre o começo de um sofrimento." |
| 7 | 48–56 s | Pausa cômica | Time-lapse: pilha de papéis em branco, caneca vazia, relógio girando. | NARRAÇÃO (ELA): "Duas horas depois." | — |
| 8 | 56–64 s | Punchline + CTA | ELA deitada na mesa, olhando para a câmera, exausta. | ELA: "Feedback de cinco minutos. Duas horas de reunião. Um ano de paciência." | — |

**Textos na tela (aplicados depois da imagem):**
- Cena 8, legenda do vídeo: "Qual foi o seu feedback mais rápido? Comenta aqui."
- Cena 8, comentário fixado: "O meu durou um ano inteiro. Alguém supera?"

---

## 5. Vozes (Gemini TTS)

**Vozes sugeridas** (confirme os nomes disponíveis na documentação atual do Gemini TTS antes de gerar):
- ELA: voz feminina enérgica (ex.: Kore)
- CHEFE: voz masculina grave (ex.: Charon)
- NARRAÇÃO e pensamentos de ELA: a mesma voz de ELA, com tom mais baixo e eco

**Direção geral (estilo drama curto):** frases curtas, pausas dramáticas, respiração audível, suspiro antes das punchlines, crescendo na escalada e queda no clímax.

**Prompts de voz por fala** (instrução de estilo + texto):

- **C1 ELA:** "Diga com entusiasmo exagerado e otimismo ingênuo, como quem acredita no próprio plano: 'Hoje o dia vai ser tranquilo.'"
- **C1 ELA pensando:** "Mesma voz, mais baixa, com eco leve, desconfiada: 'Já devia ter desconfiado: o chefe chegou sorrindo.'"
- **C2 CHEFE:** "Voz grave e mandona, tom casual que esconde algo: 'Tem um minutinho? [pausa] É só um feedback rápido.'"
- **C3 ELA pensando:** "Eco baixo, incrédula, com pausa depois de 'rápido': 'Feedback rápido... é o nome que chefe dá para aula de duas horas.'"
- **C4 ELA:** "Falsamente tranquila, sorriso na voz, um fio de desconfiança: 'Claro, pode falar.'"
- **C4 ELA pensando:** "Eco, cansada e irônica: 'Claro é a palavra que eu digo quando estou com fome e sem saída.'"
- **C5 CHEFE:** "Grave, elogio falso, pausa longa antes de 'muito': 'Gostei... [pausa] muito do seu trabalho.'"
- **C6 CHEFE:** "Grave, seco, quase um sussurro de ameaça: 'Só uma coisinha: refaz tudo, e é pra ontem.'"
- **C6 ELA pensando:** "Baixa, com eco, sarcástica e dramática: 'Gostei muito. [pausa] Essa frase é sempre o começo de um sofrimento.'"
- **C7 NARRAÇÃO:** "Narrador de drama de TV, lento, com suspense: 'Duas horas... depois.'"
- **C8 ELA:** "Exausta e teatral, com pausas entre as frases: 'Feedback de cinco minutos. [pausa] Duas horas de reunião. [pausa longa] Um ano de paciência.'"

---

## 6. Prompts de imagem (um por cena, Nano Banana ou ImagineArt)

Use sempre o **Estilo visual** da seção 2 junto com cada prompt, e anexe a âncora `base_ancora_v3` como referência.

- **C1:** "Close-medium shot, morning office desk, the character holds a coffee mug with a confident smile, eyes half-closed, warm yellow light through the window. [style]"
- **C2:** "Over-the-shoulder shot, a large dark shadow of a boss falls across the desk, the character frozen with the mug midair, eyes wide. Only the boss's shadow is visible, no face. [style]"
- **C3:** "Extreme close-up of the character's wide-open eyes, pupils shaking, comic motion lines around the head. [style]"
- **C4:** "Medium shot, the character glances sideways with a forced smile, a single sweat drop, unsure. [style]"
- **C5:** "Dramatic low angle, the boss's shadow growing larger, the coffee in the mug rippling with vibration lines. [style]"
- **C6:** "Wide shot, the character staring at the ceiling, magenta background with radial comic burst lines, arms limp. [style]"
- **C7:** "Top-down shot, a huge pile of blank white papers on the desk, an empty mug, a wall clock with spinning hands. [style]"
- **C8:** "Low-angle shot, the character lying face-down on the desk, looking at the camera with an exhausted expression, one eye open. [style]"

---

## 7. Movimento para o vídeo (8 s por cena)

- **C1:** ELA ergue a caneca devagar, zoom leve.
- **C2:** A sombra avança sobre a mesa. ELA congela.
- **C3:** As pupilas tremem, zoom rápido.
- **C4:** ELA desvia o olhar e volta a sorrir sem vontade.
- **C5:** A sombra cresce, a caneca vibra, leve tremor de quadro.
- **C6:** Impacto: o quadro treme e a cor magenta pulsa.
- **C7:** A pilha de papéis cresce, o relógio gira.
- **C8:** ELA desliza a cabeça em direção à câmera e faz uma pausa de meio segundo antes da última frase.

---

## 8. Checklist de revisão (a cada cena, antes da próxima)

- [ ] ELA igual à âncora `base_ancora_v3`?
- [ ] Sem texto nem balão dentro da imagem?
- [ ] Sem mãos ou objetos deformados?
- [ ] Enquadramento do chefe só como sombra (sem rosto)?
- [ ] Voz com a direção emocional da cena?

Se uma cena falhar, gere só essa de novo antes de seguir.

---

## 9. Montagem

1. Gerar as 8 imagens-chave, sempre com a mesma âncora.
2. Gerar os 8 clipes de vídeo a partir das imagens.
3. Gerar as vozes por cena com os prompts da seção 5.
4. Unir na ordem, 9:16.
5. Adicionar balões, onomatopeias, legenda e comentário fixado.
6. Exportar.
