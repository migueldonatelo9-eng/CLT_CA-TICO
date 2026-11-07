# Dia 3 (segunda 09/11): A novela do crush. Fila de produção

Regra: **cada entregável anda sozinho** e é enviado e subido no Drive assim que fica pronto. Não espera o dia inteiro. Etapas que não dependem de imagem (vozes) rodam em paralelo. Atualize a coluna "Estado" a cada entrega.

Etapas de cada entregável: 1 imagens chegaram → 2 conferidas (rosto livre, sem texto, ELA reconhecível) → 3 convertidas para 9:16 ou 4:5 → 4 montado e renderizado → 5 conferido → 6 enviado no chat → 7 no Drive (`03-aprovados/dia 03/...`).

| Ordem | Entregável | Precisa de | Depende de | Estado |
|---|---|---|---|---|
| 1 | Meme "Ele nem sabe que eu existo. Mas o cachorro já tem nome." | `meme_q1..q3` (lote 4) | só imagens | aguardando imagens |
| 2 | Stories 3 a 6 (enquete, pergunta, meme em texto, chamada) | `story_q1..q8` (lote 3) e vozes ST3a..ST6b | imagens e vozes | vozes em geração; aguardando imagens |
| 3 | Reel (8 cenas, 45 a 60 s) | `reel_q1..q8` (lote 1) e `reel_q9..q16` (lote 2) e vozes L00..L14 | imagens e vozes | lote 1 pedido ao Claude do PC; vozes em geração |
| 4 | Stories 1 e 2 (recortes do reel) | reel pronto | reel | aguardando |
| 5 | Pasta `dia 03` no Drive com `reel`, `stories`, `memes` | entregáveis acima | tudo | criar quando o primeiro entregável estiver pronto |

Imagens: 27 prompts no formato do painel "Fila de Imagens" em `fila-veoaifree/` (4 lotes de 3 a 8, gerados no veoaifree.com pelo Claude com Chrome). Um lote por vez; o pedido do lote seguinte só sai quando o anterior voltar.

Vozes: `scripts/vozes-dia-03.json` (15 falas do reel) e `scripts/vozes-dia-03-stories.json` (8 falas). Lição do Dia 2: as falas do Gemini saem mais lentas que o estimado; ao montar o reel, corte pensamentos para ficar em até 60 s.
