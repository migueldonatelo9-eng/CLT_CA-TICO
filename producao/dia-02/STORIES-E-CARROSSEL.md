# Dia 2: stories, carrossel e meme

Mesmo método do reel. **O rosto da ELA fica livre em todos os quadros.** Imagens sem texto do agente 01; todo texto é motion graphics.

## Stories (6 vídeos, 1080x1920, áudio em torno de −14 LUFS)

| # | Tipo | Duração | Imagens | Falas (ELA) | Figurinha a colocar no app |
|---|---|---|---|---|---|
| 1 | Recorte do reel (cenas 1 a 4) | 29,1 s | as do reel | as do reel; fecha com a etiqueta "CONTINUA ›" | nenhuma |
| 2 | Recorte do reel (cenas 5 a 8) | 29,9 s | as do reel | as do reel; termina na chamada "COMENTA AQUI" | nenhuma |
| 3 | Enquete | 20 s | `story_q1`, `story_q11` | "Você também deita “só cinco minutinhos” no domingo?" / pensa: "Eu sei que sim. O sofá me contou." | **Enquete** abaixo da etiqueta ENQUETE (opções sugeridas: "Sempre" e "Só hoje") |
| 4 | Caixa de pergunta | 20 s | `story_q3`, `story_q14` | "Qual foi o seu minutinho mais longo?" / pensa: "O meu durou o resto do dia." | **Caixa de perguntas** abaixo de RESPONDE AQUI |
| 5 | Meme em texto | 20 s | `story_q5`, `story_q6` | "Domingo à noite, versão real:" / narra: "Cinco minutinhos de sofá. Cinco horas de sono. Uma segunda-feira de arrependimento." (as três frases aparecem uma de cada vez) | nenhuma |
| 6 | Chamada para comentar | 20 s | `story_q7`, `story_q16` | "Vai lá no reel e comenta o seu minutinho mais longo!" / pensa: "Eu quero ver se alguém dormiu mais que eu." | **Link do post** (o reel) abaixo de VAI NO REEL |

**Zona segura.** Nada abaixo de y = 1650. As etiquetas dos stories 3, 4 e 6 ficam em y = 1290 e a área de y = 1400 a 1650 fica livre para a figurinha.

**Ajustes dos recortes.** Os stories 1 e 2 respeitam os pensamentos omitidos do reel. Para caber em 30 s, as pontas das cenas foram aparadas. A etiqueta "CONTINUA ›" do story 1 fica em y = 1500, abaixo do close do grito. No story 2 a chamada "COMENTA AQUI" cobre a manta, logo abaixo do nariz, com olhos e sobrancelhas livres.

**Vozes.** ST3a, ST3b, ST4a e ST6b no modelo 2.5; ST4b, ST5a, ST5b e ST6a no 3.1. Configuradas em `scripts/vozes-dia-02-stories.json`.

## Carrossel "Cinco desculpas para ficar mais cinco minutinhos no sofá" (7 slides, 1080x1350, 4:5)

| Slide | Imagem | Frase da ELA | O que ela quis dizer |
|---|---|---|---|
| 1 (capa) | `carrossel1_q1` | 5 DESCULPAS PARA FICAR NO SOFÁ | SÓ MAIS CINCO MINUTINHOS › |
| 2 | `carrossel1_q3` | “Está frio demais para levantar.” | O COBERTOR ME PRENDEU. |
| 3 | `carrossel1_q4` | “Preciso pensar na vida.” | PENSAR DE OLHOS FECHADOS CONTA. |
| 4 | `carrossel1_q5` | “Não posso magoar a almofada.” | ELA ME ABRAÇOU PRIMEIRO. |
| 5 | `carrossel1_q6` | “Depois eu te respondo.” | FALA COM A MÃO. |
| 6 | `carrossel1_q7` | “Eu mereço descansar.” | O TRONO É MEU. O CONTROLE TAMBÉM. |
| 7 (fecho) | `carrossel1_q2` | QUAL É A SUA DESCULPA FAVORITA? | COMENTA AQUI! |

**Legenda sugerida:** Cinco desculpas para ficar mais cinco minutinhos no sofá. Qual é a sua? Escreve DESCULPA e conta.

**Música:** nenhuma. Se usar uma faixa, registre na planilha de licenças.

## Meme de vitrine "Domingo à noite, versão real" (1080x1350)

Três variações (a 1 é a principal). Faixa amarela no topo com o título; a piada fica na parte de baixo, sem cobrir o rosto.

1. EU: VOU DORMIR CEDO. / MEU CÉREBRO: VAMOS REVER TODA A SUA VIDA.
2. SEGUNDA-FEIRA CHEGANDO. / E EU AQUI, ESPERANDO UM MILAGRE.
3. ÚLTIMO SEGUNDO DE DOMINGO: / EU E O CELULAR, NO ESCURO.

**Legenda sugerida:** Domingo à noite, versão real. Que horas o seu domingo fica ansioso? Escreve DOMINGO e conta.

## Como renderizar

```bash
cd producao/remotion-dia-02
npx remotion render Story3 out/story3.mp4 --browser-executable=<chromium> --crf=21 --concurrency=2
npx remotion still Carousel out/slide-2.png --props='{"n":2}' --browser-executable=<chromium>
npx remotion still Meme out/meme-1.png --props='{"n":1}' --browser-executable=<chromium>
```

Os stories 1 e 2 reutilizam as cenas do reel (`src/timeline.ts`).
