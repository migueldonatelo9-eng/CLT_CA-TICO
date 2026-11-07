# Dia 1: stories e carrossel

Mesmo método do reel (`../PLAYBOOK.md`): imagens do agente 01 sem texto, vozes do Gemini, efeitos sintetizados, motion graphics em Remotion. **O rosto da ELA fica livre em todos os quadros.**

## Stories (6 vídeos, 1080x1920)

| # | Tipo | Duração | Imagens (Drive) | Fala (ELA) | Figurinha a colocar no app |
|---|---|---|---|---|---|
| 1 | Recorte do reel (cenas 1 a 4) | 28,4 s | as do reel | as do reel. Fecha com a etiqueta "CONTINUA ›" | nenhuma |
| 2 | Recorte do reel (cenas 5 a 8) | 29,2 s | as do reel | as do reel. Termina na chamada para comentar | nenhuma |
| 3 | Enquete | 20 s | `story_q1` e `story_q2` | "Seu chefe já disse: é só um feedback rápido?" / pensa: "Eu sei que já disse." | **Enquete** com as opções "Já" e "Muitas vezes", logo abaixo da etiqueta ENQUETE |
| 4 | Caixa de pergunta | 20 s | `story_q3` e `story_q4` | "Qual foi o só um minutinho mais longo da sua vida?" / pensa: "O meu durou até a hora do almoço." | **Caixa de perguntas**, logo abaixo da etiqueta RESPONDE AQUI |
| 5 | Meme em texto | 20 s | `story_q5` e `story_q6` | "Feedback rápido, versão real:" / pensa: "Cinco minutos de conversa, duas horas de reunião e um ano de paciência." (as três frases aparecem uma de cada vez) | nenhuma |
| 6 | Chamada para comentar | 20 s | `story_q7` e `story_q8` | "Vai lá no reel e comenta o seu feedback mais longo!" / pensa: "Eu quero ver se alguém supera o meu." | **Link do post** (o reel), logo abaixo da etiqueta VAI NO REEL |

**Zona segura.** Os balões ficam a partir de y = 215 (recortes) ou 255 (stories novos), abaixo da barra do app. Nada fica abaixo de y = 1650, onde fica a barra de resposta. As etiquetas dos stories 3, 4 e 6 ficam em y = 1290, abaixo do queixo da ELA, e a área de y = 1400 a 1650 fica livre para a figurinha.

**Stories novos:** o balão e as frases ficam sobre o cabelo da ELA (o coque ocupa o topo da imagem), nunca sobre a testa ou os olhos.

**IDs das imagens (versão mais recente de cada)**

| Quadro | ID no Drive |
|---|---|
| `story_q1_v4` | `1_CdeybiP-3vca4QnR76xlCdigsMnFAuq` |
| `story_q2_v4` | `1WGIViX74zTgJn3tDRAxp8J4ezspQyEZi` |
| `story_q3_v4` | `130gnjOxseUp__jVgbZ6QG00X_E8AfFRQ` |
| `story_q4_v4` | `1w2jgzfXyJ5DJCCTbkP2fs5RadyC1fIUq` |
| `story_q5_v4` | `1v-yedSQq81KB9z4igyi7zQluiVVj_Yl4` |
| `story_q6_v4` | `18MRiEp7mZrilwmGtpoA6iWyYZnqhWJxr` |
| `story_q7_v4` | `1YCp1bJmGvEV0nJQnf6G5NY5OdXgUM35N` |
| `story_q8_v4` | `1Zf7vICvoK3XInTthWw0BTqWofMCeAB3h` |
| `reel_q7_v4` | `1MTZ7z50wAgMkm3E3qvTVfQtqRgn0k0ZH` |
| `carrossel1_q1_v4` | `1x8c_sAeKrXx1m9d3ZW96OrIhsemDJqDe` |
| `carrossel1_q2_v4` | `12omziVDk5sQc6bXv8Ap9F35raKZFUcd6` |

**Vozes.** Kore (Gemini TTS), configuradas em `scripts/vozes-dia-01-stories.json`. A fala ST4b ("O meu durou até a hora do almoço.") foi gerada com o modelo `gemini-3.1-flash-tts-preview`, porque o `gemini-2.5-flash-preview-tts` estava sem cota. O timbre pode soar um pouco diferente das outras. Para regerar com o mesmo modelo das demais, apague `ST4b.wav` e rode `tts_gemini.py` quando houver cota.

**Duração dos stories novos.** A voz ocupa de 7 a 12 s. O restante é o tempo para o público votar ou responder: a etiqueta pulsa e a câmera avança devagar. Se preferir stories mais curtos, reduza `dur` em `src/stories.ts` (hoje 20 s).

## Carrossel "Tradutor de chefe" (6 slides, 1080x1350, 4:5)

| Slide | Imagem | Frase | Tradução |
|---|---|---|---|
| 1 (capa) | `carrossel1_q1_v4` | TRADUTOR DE CHEFE | O QUE ELE DIZ × O QUE ELE QUIS DIZER |
| 2 | `reel_q2_v4` | "Tem um minutinho?" (CHEFE) | CANCELE SEUS PLANOS. |
| 3 | `reel_q5_v4` | "Gostei muito do seu trabalho." (CHEFE) | VEM COISA AÍ. |
| 4 | `reel_q6_v4` | "Refaz tudo, é pra ontem." (CHEFE) | MEU FIM DE SEMANA ACABOU. |
| 5 | `reel_q7_v4` | "Perfeito, vou ajustar." (ELA) | ESTOU ME SEGURANDO. |
| 6 (fecho) | `carrossel1_q2_v4` | QUAL FRASE DE CHEFE VOCÊ TRADUZIRIA? | COMENTA AQUI! |

**Correção do roteiro original.** O pacote do Dia 1 apontava `reel_q4` no slide 3 e `reel_q13` no slide 5. As frases "Gostei muito do seu trabalho" e "Perfeito, vou ajustar" estão em `reel_q5` e `reel_q7`, que são as usadas aqui.

**Legenda do post:** Traduzi as frases do chefe. Faltou alguma? Comenta a sua aqui embaixo.

**Música:** nenhuma. Se usar uma faixa, registre na planilha de licenças.

## Como renderizar

```bash
cd producao/remotion
# stories (1 a 6) e carrossel (n de 1 a 6)
npx remotion render Story3 out/story3.mp4 --browser-executable=<chromium> --crf=21
npx remotion still Carousel out/slide-2.png --props='{"n":2}' --browser-executable=<chromium>
```

Os dados dos stories ficam em `src/stories.ts` e os slides em `src/Carousel.tsx`. Os recortes 1 e 2 reutilizam as cenas do reel (`src/timeline.ts`), com as pontas das cenas encurtadas no story 2 para caber em 30 s.
