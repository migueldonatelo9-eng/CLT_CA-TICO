# CLT Caótica: guia para qualquer sessão do Claude

Perfil de humor no Instagram (`cltcaotica`) sobre a vida caótica de quem trabalha de CLT, estrelado pela **ELA**, personagem original. Produção diária: 1 reel (45 a 60 s), 6 stories (20 a 30 s), carrossel (5 por semana), meme. Leia `producao/PLAYBOOK.md` (método completo) e `producao/dia-NN/FILA.md` (o que falta no dia) antes de agir.

## Regras que valem sempre
- **O rosto da ELA nunca é coberto** por balão, frase, efeito ou chamada. Balões e frases ficam no terço superior, sobre o cabelo.
- **Imagem sem texto.** Letras, balões e legendas entram só como motion graphics. Nunca peça texto ao gerador de imagem.
- Tom: o pensamento é sempre mais honesto e mais exagerado que a fala; ironia sobre a situação, nunca sobre pessoa real ou grupo; sem nomes fictícios; o chefe é só voz e sombra. Toda peça termina com chamada para comentar.
- Sem personagens protegidos (ex.: não usar o Sid de "A Era do Gelo"). A ELA é a personagem.
- Fala em português do Brasil, frases curtas e diretas, sem enrolação.

## Como gerar imagem (ver PLAYBOOK, seção 7)
- **Rota A, agente 01 por e-mail** (`migueldonatelo9@gmail.com`, assunto `[CLT-PEDIDO] LOTE-00N`, descrição fixa da ELA em `producao/scripts/gerar_pedido.py`). Saída na pasta IMAGENS PARA CLAUDE do Drive (id `1JwTGv8o34-l1s3N0x3ywew1H2GSJ1ibz`), JPEG 9:16 ou 4:5 com extensão `.png`.
- **Rota B, veoaifree.com (Nano Banana) pelo Chrome**, skill `gerar-imagem-veoaifree`, prompts prontos em `producao/dia-03/fila-veoaifree/` (formato do painel "Fila de Imagens"). Saída quadrada 1024x1024; depois converter para 9:16 ou 4:5.
- **Não misture as rotas no mesmo dia** (a ELA muda de cara). Lotes pequenos (3 a 8 imagens), um de cada vez.

## Entrega
- Vídeo em **720p** (padrão), imagens comprimidas (JPEG q84, mesmas dimensões), envio ao Drive **em fila de lotes pequenos** (até 6 arquivos). Script: `producao/scripts/preparar_entrega.py`.
- Cada entregável anda sozinho (imagem, conferir, montar, renderizar, enviar, subir ao Drive); não junte o dia para entregar de uma vez.
- Drive: `CLT Caótica - Material/03-aprovados/dia NN/{reel,stories,carrossel,memes}`. Ids: `03-aprovados` `17IimcycmxCm8cEUhgVMPwXhQWhOftBWJ`, `dia 01` `1JC6r4V3HQSzwWwnXx1f0B4SF2SmM3XuJ`, `dia 02` `1qU0ZX9NDeZGc4Hwd52wScISvMLoFIrDO`. Material de apoio em `02-dias/AAAA-MM-DD`.
- Pasta local do usuário: `C:\Users\davi1\Downloads\clt caotica`, uma subpasta por dia (`dia-01 (sab 07-11) - ...`), cada uma com `01-reel`, `02-stories`, `03-carrossel`, `04-meme`, `05-audio`, `06-imagens-sem-texto`, `07-roteiro-e-pedidos`.

## Produção
- Vídeo: Remotion (`producao/remotion` do Dia 1 e `producao/remotion-dia-02`), vozes do Gemini TTS (voz Kore; `producao/scripts/tts_gemini.py`), efeitos sintetizados com ffmpeg. As vozes saem mais lentas que o estimado: corte pensamentos para o reel ficar em até 60 s.
- No PC, a voz também pode sair do Voicebox (MCP local, sem cota).
- A sessão na nuvem não alcança o PC, o Chrome do usuário nem o `veoaifree.com` (bloqueado pela rede). O que exige Chrome ou pasta local roda no PC.

## Antes de publicar
Conferir rosto livre, texto legível, áudio em torno de -14 LUFS e nome padrão do arquivo (`reel-dia-NN.mp4`, `story-N-dia-NN.mp4`, `carrossel-dia-NN-slide-N.jpg`, `meme-dia-NN-N.jpg`).
