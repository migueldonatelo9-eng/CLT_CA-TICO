# Playbook de produção de vídeo: CLT Caótica

Método usado no **Dia 1, "Feedback de cinco minutos"** (59,8 s, 9:16). O usuário aprovou em 07/11/2026: "ficou muito bom, edição e áudio maravilhoso". Este documento existe para repetir o mesmo resultado nos próximos dias sem reaprender nada.

## 1. Resumo do que foi feito

- 8 cenas, cada uma com uma imagem **sem texto** gerada pelo agente 01 (LOTE-005).
- 11 falas com Gemini TTS, tratadas (pausas cortadas, eco nos pensamentos, volume nivelado).
- Efeitos sonoros sintetizados com ffmpeg.
- Montagem em motion graphics com Remotion: balões vetoriais, texto sincronizado com a fala, onomatopeias, câmera com zoom e tremor, transições, marca e barra de progresso.
- Saída: MP4 1080x1920, 30 fps, áudio −14 LUFS.

## 2. Pipeline passo a passo

1. **Roteiro e storyboard.** 8 cenas. Copy e tempos em `dia-01/ROTEIRO-FINAL.md`.
2. **Imagens.** Peça ao **agente 01 por e-mail** (seção 7). Não gere imagens por outro serviço. Depois baixe os arquivos do Drive para `public/frames/` (os arquivos chamados `.png` são JPEG de 1072x1920).
3. **Vozes.** `scripts/tts_gemini.py vozes-dia-01.json audio_bruto/` e depois `scripts/processar_vozes.py vozes-dia-01.json audio_bruto/ audio_final/`. Copie as durações impressas para `D` em `src/timeline.ts`.
4. **Efeitos sonoros.** `scripts/sintetizar_sfx.py public/audio/`. Copie também as falas processadas para `public/audio/`.
5. **Timeline.** Edite `remotion/src/timeline.ts`: durações das falas (`D`), cenas, balões, efeitos, tremores e sons. A composição (`Composition.tsx`) quase não muda de um dia para o outro.
6. **Conferir antes de renderizar.** Renderize quadros avulsos e olhe-os:
   ```bash
   npx remotion still CLT-Dia1 out/teste.png --frame=300 --browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell
   ```
7. **Render.** Cerca de 4 minutos com 4 CPUs:
   ```bash
   npx remotion render CLT-Dia1 out/final.mp4 --browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell --crf=21
   ```
8. **Conferência do vídeo pronto.** `scripts/mosaico_conferencia.py` com 2 ou 3 tempos por cena. Procure qualquer elemento sobre o rosto.
9. **Pós.** Normalize e recomprima:
   ```bash
   ffmpeg -i final.mp4 -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -c:a aac -b:a 160k -af "loudnorm=I=-14:TP=-1.5:LRA=7" -movflags +faststart saida-1080p.mp4
   ffmpeg -i saida-1080p.mp4 -vf scale=720:1280 -c:v libx264 -crf 25 -c:a aac -b:a 128k -movflags +faststart saida-720p.mp4
   ```
10. **Salvar.** Vídeo aprovado em `03-aprovados/dia NN` no Drive, enviado **manualmente** (o conector do Drive só aceita arquivos de até 10 MB e 3 MB por pedido). Documentos e zips pequenos podem ir pelo conector. Código e documentos também neste repositório.

### Stories e carrossel (feitos em 07/11/2026)

Detalhes e copy em `dia-01/STORIES-E-CARROSSEL.md`.

- **Stories 1 e 2:** recortes do reel (`STORY1` = cenas 1 a 4, `STORY2` = cenas 5 a 8 com as pontas encurtadas para caber em 30 s). Saem da mesma timeline do reel, então qualquer ajuste no reel vale para eles.
- **Stories 3 a 6:** uma cena de 20 s cada, em `src/stories.ts`. Duas imagens por story, balão da ELA e pensamento com voz, e uma etiqueta ("ENQUETE", "RESPONDE AQUI", "VAI NO REEL") com área livre embaixo para a figurinha do app. Vozes em `scripts/vozes-dia-01-stories.json`.
- **Carrossel:** composição `Carousel` (1080x1350) em `src/Carousel.tsx`, um still por slide: `npx remotion still Carousel out/slide-2.png --props='{"n":2}'`. Os slides 2 a 5 recortam o quadro do reel em 4:5 (campo `y0`), com balão do chefe e painel de tradução.
- **Zona segura dos stories:** nada abaixo de y = 1650. Sem marca "CLT CAÓTICA" nem barra de progresso (o app já mostra a dele).
- **Nos stories novos o coque da ELA ocupa o topo da imagem.** Balões e frases ficam sobre o cabelo (y = 255) e a etiqueta fica no peito (y = 1290). Confira sempre pelo mosaico.

## 3. Regras criativas

**Persona e tom**
- **ELA** é uma personagem original do projeto. O visual vem da âncora `base_ancora_v3` e do prompt fixo do agente 01.
- O pensamento é sempre mais honesto e mais exagerado que a fala.
- Ironia sobre a situação, nunca sobre pessoa real ou grupo. Sem nomes fictícios.
- O **chefe** só aparece como sombra e voz. O balão dele é preto, com etiqueta "CHEFE".
- Humor de exagero: a emoção sobe a cada cena e estoura na punchline.
- Toda peça termina com chamada para comentar.

**Regra do rosto (do usuário, 07/11):** o rosto da ELA é a expressão da personagem e **nunca pode ser coberto**. Balões e frases ficam no terço superior vazio da imagem. Onomatopeias e CTA ficam em ombro, camisa, caneca ou fundo. Transições de listras podem cobrir a tela por 0,4 s. Confira sempre pelo mosaico.

**Imagem sem texto.** Letras, balões e legendas entram só como motion graphics. Nunca peça texto ao gerador de imagens.

**Formatos:** reel de 45 a 60 s (1 por dia), stories de 20 a 30 s (6 por dia), carrossel (5 por semana), meme estático de vitrine (frequência a confirmar).

## 4. Sistema visual

| Item | Valor |
|---|---|
| Tela | 1080x1920, 30 fps |
| Cores | amarelo `#FFE600`, magenta `#FF2D95`, tinta `#111111`, branco, ciano `#00E5FF`, azul-noite `#1B1464` |
| Fontes | **Bangers** (onomatopeias, frases grandes, marca) e **Comic Neue Bold** (balões). Arquivos em `public/fonts/`, carregados com `@remotion/fonts` |
| Posição dos balões | `y = 215`, largura 600 a 860 |
| Marca | etiqueta "CLT CAÓTICA" no canto superior esquerdo e barra magenta de progresso na base |
| Acabamento | vinheta, pontilhado de impressão (halftone) e sombra deslocada de 12 px nos balões |

**Tipos de balão**
- **ELA fala:** fundo branco, borda preta, ponta curva.
- **ELA pensa:** fundo rosa claro, borda rosa tracejada, itálico, ponta com bolinhas.
- **CHEFE:** fundo preto, borda amarela, texto branco, sombra magenta, etiqueta "CHEFE".
- **Narração:** caixa amarela, itálico, levemente inclinada.

**Animação do texto.** As palavras aparecem distribuídas ao longo da duração da fala (proporcional ao número de letras). As palavras-chave (`emph`) ganham marca-texto (amarelo ou rosa) e um pulo de escala.

**Câmera.** Zoom com easing de 1,0 a 1,14, deriva lateral de 10 px e tremor com decaimento nos impactos (`shakes`). Cada tremor também dá um pequeno "soco" de zoom.

**Efeitos.** Onomatopeia em estrela de 12 pontas com contorno preto, raios (`burst`) com máscara radial e flash colorido.

**Transições.** Três listras diagonais (tinta, magenta, amarela) cobrem o corte, entrando no início da cena e saindo no fim.

## 5. Estrutura e tempos

Cena a cena em `dia-01/ROTEIRO-FINAL.md`. Total: **59,78 s**. Regra prática: se a soma passar de 60 s, encurte as falas (alvo em `vozes-dia-01.json`) antes de mexer em cortes.

## 6. Áudio

**Vozes (Gemini 2.5 Flash TTS)**

| Personagem | Voz | Uso |
|---|---|---|
| ELA, pensamentos e narração | Kore | com eco nos pensamentos |
| CHEFE | Charon | grave, seca |

A instrução de estilo vai antes do texto: `Diga <estilo>: <texto>`. Marcações como `[pausa]` funcionam, mas alongam a fala e são cortadas no pós.

**Tratamento (`processar_vozes.py`)**
1. Corta silêncios internos maiores que 0,45 s (mantém 0,22 s).
2. Acelera com `atempo` até o alvo da fala, no máximo **1,4x**.
3. Pensamentos: `aecho=0.8:0.5:60|90:0.35|0.2`.
4. `loudnorm` por fala em −16 LUFS.
5. No fim, mix completo em **−14 LUFS**, pico −1,5 dB.

**Efeitos sonoros (todos sintetizados, sem direitos)**

| Arquivo | Onde |
|---|---|
| `sfx_whoosh` | início de cada cena |
| `sfx_pop` | cada balão e cada frase grande |
| `sfx_boom` | impactos TUM! e BUM! |
| `sfx_buzz` | BZZZ! (caneca vibrando) |
| `sfx_zip` | realização da ELA (cena 3) |
| `sfx_tick` / `sfx_tock` | relógio da cena 7 |
| `sfx_trombone` | "um ano de paciência" |
| `sfx_ding` | chamada para comentar |

**Ainda não tem:** trilha musical. Os agentes de áudio podem entregar. Registre a faixa na planilha de licenças (01-planejamento) antes de publicar.

## 7. Agentes e integrações

**Agente 01 (imagens, por e-mail)**
- Pedido: e-mail com assunto `[CLT-PEDIDO] LOTE-00N` para `migueldonatelo9@gmail.com`. Capacidade: até **170 imagens por dia**.
- Campos do cabeçalho: `lote`, `projeto`, `substitui`, `servico`, `modelo`, `formato` (PNG real), `tamanho`, `nome do arquivo`, `pasta` (`1JwTGv8o34-l1s3N0x3ywew1H2GSJ1ibz`), `semente`, `referencia`, `resposta`. Cada item tem `id`, `arquivo`, `proporcao`, `largura`, `altura`, `semente` e `prompt`.
- Reel e story: 9:16, 1080x1920. Carrossel: 4:5, 1080x1350.
- O **prompt visual fixo da personagem** abre todo prompt e não pode ser reescrito. Leia o e-mail do LOTE-005 (thread `1a1b3e66eb64ec72`) para copiar o texto exato.
- O agente responde com um "Relatório de Execução". As respostas demoraram cerca de 40 minutos.
- Não sobrescreve arquivos existentes. Use `v5`, `v6` etc. para versões novas.
- **Regra fixa (07/11/2026, definida pelo usuário):** sempre que o conteúdo precisar de imagem, o pedido vai por e-mail ao agente 01. Nunca gerar imagem por ImagineArt, Pollinations direto ou outro serviço.
- Histórico de lotes: LOTE-002 a 005 = Dia 1 (v1 a v4). **LOTE-006 = Dia 2** (enviado em 07/11/2026, thread `1a1b65c39db4f648`, 18 itens: `2026-11-08_reel_q1..q8_v1`, `2026-11-08_story_q1..q8_v1`, `2026-11-08_carrossel1_q1_v1`, `2026-11-08_carrossel1_q2_v1`). Texto do pedido em `producao/dia-02/PEDIDO-LOTE-006.txt`.
- **LOTE-007** (thread `1a1b660922d0dc6f`, 24 itens): complemento do Dia 2 com `reel_q9..q16` (segundo enquadramento de cada cena: detalhes e closes), `story_q9..q16` (expressões extras), `carrossel1_q3..q7` (uma imagem própria por slide) e `meme_q1..q3` (4:5, "Domingo à noite, versão real").
- **LOTE-008** (thread `1a1b660f59b6678c`, 12 itens): banco de expressões da ELA `banco_ela_e01..e12_v1` (riso, choro, raiva, paixão, vergonha, orgulho, confusão, exaustão, sorriso falso, comemoração, olhar desconfiado, sem reação), reaproveitável em qualquer dia.
- **Entrega do Dia 2 (conferida em 07/11/2026, 15:02 UTC):** 50 das 54 imagens dos lotes 006, 007 e 008 estavam no Drive, em JPEG de 1072x1920 (ou 1072x1344) com extensão `.png`; o agente não corta nem converte para PNG real. Faltaram `reel_q5_v1`, `meme_q3_v1`, `banco_ela_e08_v1` e `banco_ela_e11_v1`; `reel_q14_v1` saiu com as lentes brancas (olhos escondidos). **LOTE-009** (thread `1a1b6d20b613ae2f`, 5 itens) repõe os quatro e pede `reel_q14_v2`.
- Até o LOTE-009 chegar, a cena 5 do reel pode usar `reel_q13_v1` (mão com a caneta sobre o caderno em branco).
- Os pedidos são gerados por `producao/scripts/gerar_pedido.py` (descrição fixa da personagem e fechamento ficam no script; só os itens mudam).
- **Regra de volume:** uma imagem por cena é pouco. Para cada dia, peça pelo menos dois enquadramentos por cena do reel, uma imagem própria por slide do carrossel, as expressões dos stories e o meme. Meta de 40 a 60 imagens por dia (o agente aguenta 170).

**Os 8 agentes (plano para amanhã).** O usuário quer usar os agentes para gerar áudios e vídeo. Preciso da lista com endereço e função de cada um.

**Voicebox (voz local no PC do usuário).** App grátis e de código aberto, com clonagem de voz. Instalar no PC e registrar no Claude Code **do PC**:
```bash
claude mcp add voicebox --transport http --url http://127.0.0.1:17493/mcp --header "X-Voicebox-Client-Id: claude-code"
```
Funciona só no computador onde roda. Daqui, da nuvem, não alcança.

**Chave do Gemini.** O ambiente injeta o cabeçalho `x-goog-api-key` pelo proxy: em Edit do ambiente, adicione um cabeçalho personalizado com nome `x-goog-api-key`, valor a chave, prefixo vazio e site `generativelanguage.googleapis.com`. A chave nova só vale em **sessão nova**. Nunca cole a chave no chat.

## 8. Limites do ambiente na nuvem (o que já se sabe)

- **Bloqueados:** huggingface.co (403), `voicestudio.sh`, `voicebox.sh`, `remotion.media`, edge-tts e gTTS (sem DNS). Por isso os efeitos são sintetizados e a voz vem do Gemini.
- **Liberados:** npm, PyPI, API do Gemini, clonagem pública de repositórios do GitHub.
- **Cota do Gemini TTS:** o plano gratuito devolve 429 por minuto e por dia. Quando o `gemini-2.5-flash-preview-tts` bloqueia, o `gemini-3.1-flash-tts-preview` (mesma voz Kore) respondeu 200; o timbre pode ficar levemente diferente. O `gemini-2.5-pro-preview-tts` também deu 429. Gere as falas uma vez, guarde os WAV e não regere sem necessidade. O script pula falas que já existem.
- **Render:** Remotion usa o Chromium headless já instalado, com `--browser-executable`. 1793 quadros em 1080x1920 levam cerca de 4 minutos.
- **Envio ao Drive pelo conector:** limite de 10 MB por arquivo e 3,1 MB por pedido. Vídeos e zips de áudio grandes precisam de upload manual. Só dá para alterar metadados de um arquivo existente; para corrigir o conteúdo, suba outro e mova o antigo para a lixeira.
- **Arquivos do Drive grandes:** `download_file_content` devolve base64. O resultado grande é salvo em arquivo e decodificado com Python. Não traga isso para o contexto.
- **Acesso aos repositórios:** `migueldonatelo9-eng/CLT_CA-TICO` é só leitura nas sessões atuais (vazio no GitHub). `pauala899/clt_ca-tico` não é acessível (tem as branches `planejamento-editorial`, `personagem-universo` e `entrega-imagens`).

## 9. Checklist antes de entregar

- [ ] Rosto da ELA livre em todos os quadros do mosaico.
- [ ] Duração entre 45 e 60 s.
- [ ] Imagens sem texto, balões só em motion.
- [ ] Cada palavra aparece junto da fala correspondente.
- [ ] Áudio em −14 LUFS e pico abaixo de −1 dB.
- [ ] Texto dentro da área segura (80 px dos lados, 100 px do topo e da base).
- [ ] Final com chamada para comentar.
- [ ] Faixa de música (se houver) anotada na planilha de licenças.

## 10. Como fazer os Dias 2 a 7

| Dia | Tema | Local |
|---|---|---|
| 2 (dom 08/11) | Só cinco minutinhos no sofá | casa |
| 3 (seg 09/11) | A novela do crush | academia |
| 4 (ter 10/11) | A fofoca sou eu | trabalho |
| 5 (qua 11/11) | Ensaio no espelho | casa |
| 6 (qui 12/11) | Esteira ocupada | academia |
| 7 (sex 13/11) | Desculpa de atraso | trabalho |

Para cada dia:
1. Reduza o roteiro a **8 cenas** com falas curtas (cada uma cabe em 5 s) e 11 a 12 falas no total.
2. Peça as 8 a 10 imagens ao agente 01 (LOTE novo, ids `v1`), sempre com o prompt fixo da personagem e o terço superior vazio para os balões.
3. Escreva `vozes-dia-NN.json`, gere e processe as vozes.
4. Copie `timeline.ts` do Dia 1 e troque textos, tempos e posições.
5. Siga os passos 6 a 10 da seção 2.

## 11. Pendências

- **Palavras-chave dos comentários (Semana 1):** documento no Drive em `01-planejamento` (id `1iUgCPFRmrhnncF2aDxxxmT-fQAudnIUAM3AZeUWuW24`), fonte em `producao/comentarios/palavras-chave-comentarios.html`. Uma palavra principal por dia (Dia 1 FEEDBACK, 2 MINUTINHOS, 3 CRUSH, 4 FOFOCA, 5 ENSAIO, 6 ESTEIRA, 7 ATRASO), com texto da chamada final, legenda e comentário fixado aprovados na Semana 1 e banco de respostas no tom da ELA. A palavra do dia entra só no fim da legenda ("Escreve PALAVRA e conta."); a chamada final no vídeo e o comentário fixado seguem o roteiro aprovado.
- **SendPulse (anotação para quando ligar):** documento no Drive em `01-planejamento` (id `15xX62TMU27zH8uP8nH4WTHw54jtSvV6dbLwCRsrYZQQ`), fonte em `producao/comentarios/anotacao-sendpulse.html`. Gatilho por post com a palavra do dia (modo "Contém"), nunca para todos os posts. Falta definir o que a DM entrega e conectar a conta profissional. Nada foi ligado.
- Aprovação formal da Semana 1 (falas, expressões, legendas, grade de carrosséis e memes).
- Planilha de licenças de músicas: vazia.
- Trilha musical: não existe ainda.
- Listar os 8 agentes (endereço e função) para usar amanhã.
- Dia 1: stories (6) e carrossel prontos e entregues no chat em 07/11/2026. Falta subir ao Drive (`03-aprovados/dia 01`) e salvar em `C:\Users\davi1\Downloads\clt caotica`, que o ambiente em nuvem não alcança.
- Voz do story 4 (`ST4b`) gerada com outro modelo; regerar quando houver cota se quiser timbre idêntico.
- Subir ao Drive, manualmente, o vídeo aprovado em `03-aprovados/dia 01` e o zip de vozes e efeitos (entregues no chat em 07/11/2026).
- Enviar este repositório ao GitHub: precisa de acesso de escrita (a conta `migueldonatelo9-eng` ou reconexão).
