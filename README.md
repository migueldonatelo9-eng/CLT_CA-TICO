# CLT Caótica: notas do projeto

Série de vídeos e posts de humor sobre a rotina CLT.

- **Personagem principal:** ELA, original do projeto. Não é baseada em pessoa real.
- **Chefe e colegas:** são papéis. O chefe aparece só como sombra e voz. Os colegas aparecem de lado. O crush nunca fala.

## Regras da série

- Sem nomes fictícios. Chefe e colegas são papéis.
- O pensamento é sempre mais honesto e mais exagerado que a fala.
- Ironia sobre a situação, nunca sobre pessoa real ou grupo.
- A imagem sai sem texto. Balões e legendas entram depois.
- Toda peça termina com chamada para comentar, na legenda.

## Formatos (especificação atual)

- **Reel:** 1 por dia, de 45 a 60 s.
- **Stories:** 6 por dia, de 20 a 30 s cada.
- **Carrossel:** 5 por semana, de 5 a 7 slides. O Dia 1 tem 6.
- **Meme estático de vitrine:** a confirmar. Pode ser 1 por dia ou 1 por semana.

## Onde estão as coisas no Drive

Pasta raiz: **CLT Caótica - Material** (`1GkbiaWU7Fdph-ONmQXHl2MzgJAlDdwdO`)

- **01-planejamento** (`12cqaaxbBFy4WFt0rEWHGuerHywzBcx8E`): roteiro da Semana 1 e planilha de licenças de músicas.
- **02-dias** (`1M7LDfZiN4bXlmoWLJDbTgKiVA4Z4RLnX`): uma pasta por dia. Hoje existe só `2026-11-07`, com o pacote do Dia 1.
- **03-aprovados** (`17IimcycmxCm8cEUhgVMPwXhQWhOftBWJ`): conteúdo aprovado. Hoje tem só `dia 01`, vazia.
- **04-testes** (`1y6Fzn8Hg26nd003NksWk9Dw31UsSLxEx`): vazia.
- **IMAGENS PARA CLAUDE** (`1JwTGv8o34-l1s3N0x3ywew1H2GSJ1ibz`): imagens geradas. Para o Dia 1 há 13 reels, 8 stories e 2 slides de carrossel, todos com sufixo `_v4`.
- **REFERENCIA** (`1hQE2NH_4MSCpL0BwNUBeDRN23l5Z1LMv`): âncora da personagem, `base_ancora_v3`.

Na raiz do Drive, fora da pasta do projeto, há três scripts do Apps Script editados hoje: "CLT Caótica - gerador imagem script pollination", "automação cloud flare work ai" e "HUGGING FACE GERADOR IMAGENS".

## Estado atual

- **Semana 1 (07 a 13/11):** rascunho, aguardando aprovação de falas, expressões, legendas, comentários fixados e grade de carrosséis e memes.
- **Dia 1:** roteiro e imagens prontos no Drive. Falta escolher a versão de `reel_q11` e `reel_q13`, que têm três arquivos cada.
- **Vídeo de teste** (`reel-teste-sexta-som.mp4`, 19,8 s, com áudio): está no ambiente da sessão "Localização do projeto vídeo". Não foi enviado ao Drive.
- **Vozes:** o storyboard usa Gemini TTS com direção emocional. Os nomes das vozes ainda precisam ser confirmados. Para narração, a pesquisa recomendou o Chatterbox Multilingual, mas não foi testado.
- **Storyboard em quadrinhos** (8 cenas, 64 s): `planejamento/storyboard-dia-1.md`.

## Pendências e inconsistências

- A planilha de licenças de músicas está vazia, mas o roteiro do Dia 1 diz que a faixa está registrada nela.
- No carrossel do Dia 1, o slide 3 aponta para `reel_q4`, mas a frase está no `reel_q5`. O slide 5 aponta para `reel_q13`, mas a frase está no `reel_q7`.
- O cabeçalho da Semana 1 diz 8 quadros por reel, mas o Dia 1 tem 13.
- As imagens de hoje estão com `_v4`, e o pedido do lote 002 era `_v1`.
- Há dois destinos possíveis para o vídeo: "CLT Caótica - Material" e a pasta `1r07eCK20K-RPA94PsqOerfNQGD-ahbEp`, citada no pedido do vídeo. Esta última não está acessível daqui.

## Repositórios

- **migueldonatelo9-eng/CLT_CA-TICO:** este repositório. Está vazio no remoto. Nesta sessão o acesso é só de leitura.
- **pauala899/clt_ca-tico:** tem as branches `main`, `claude/entrega-imagens`, `claude/personagem-universo` e `claude/planejamento-editorial`. Esta sessão não tem acesso. É preciso reconectar a conta no GitHub e abrir uma nova sessão com o repositório selecionado.

## Sessões relacionadas

- **Consolidação de identidade da marca** (`session_018cxR7bQyc7CdoGoQrZxcnm`): tem o commit local `4845cc7` ("Monta roteiros do dia 01: reel, slides do carrossel e story 3"), que não foi enviado por causa de um erro 403 no push. Também gerou o arquivo `migracao-clt-caotica.bundle`.
- **Localização do projeto vídeo** (`session_018cxR7cKgeHFanrB8VT6S1D`): reel de teste pronto. O upload ao Drive aguarda confirmação.
- **Remotion video com imagens e animações** (`session_018cxR7ab5YMz7YS5YjDWNu1`): pesquisa de vozes. Chatterbox recomendado, não testado.
- **Cloudflare API token e geração de imagens** (`session_018cxR7bzBNr16jvLWMvBGof`): `gerar.py` com Cloudflare Workers AI (FLUX) e Pollinations. O Pollinations gera 9:16 nativo e não exige token.
- **Google API key environment check** (`session_018cxR7cAXEcABybHnbKnM4W`): script `gerar_cha_camomila.py`, com a API do Google, para rodar no PC Windows.

## Produção de vídeo

O método completo, o código e os roteiros ficam em `producao/`:

- `producao/PLAYBOOK.md`: pipeline, regras criativas, sistema visual, áudio, agentes e checklist.
- `producao/dia-01/ROTEIRO-FINAL.md`: copy, tempos, vozes e efeitos do Dia 1 (aprovado).
- `producao/remotion/`: projeto Remotion do vídeo (timeline e componentes).
- `producao/scripts/`: vozes (Gemini), tratamento de áudio, efeitos sonoros e conferência do rosto.
