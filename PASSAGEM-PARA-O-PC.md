# Continuar do PC: passo a passo

Estado em 07/11/2026: **Dia 1 e Dia 2 prontos e organizados** em `03-aprovados` (Drive) e em `C:\Users\davi1\Downloads\clt caotica`. **Próximo: Dia 3, "A novela do crush"** (`producao/dia-03/FILA.md`). As vozes do Dia 3 estão parcialmente geradas na nuvem (ST3a e ST3b) e retomam de onde pararam.

## 1. Abrir o projeto no PC
```bash
cd %USERPROFILE%\Downloads
git clone https://github.com/migueldonatelo9-eng/CLT_CA-TICO.git "clt caotica repo"
cd "clt caotica repo"
```
Abra o Claude Code nessa pasta, com a extensão **Claude no Chrome** conectada. Ele lê o `CLAUDE.md` sozinho.

## 2. O que roda onde
| No PC (esta sessão) | Na nuvem |
|---|---|
| Gerar imagens no veoaifree.com pelo Chrome (skill `gerar-imagem-veoaifree`) | Renderizar vídeos no Remotion (Chromium e ffmpeg já instalados) |
| Mover e organizar arquivos em `C:\Users\davi1\Downloads\clt caotica` | Pedir lotes ao agente 01 por e-mail (Gmail) |
| Vozes pelo Voicebox, sem cota | Vozes pelo Gemini TTS (cota limitada) |

## 3. Primeira mensagem para colar no Claude do PC
> Leia o CLAUDE.md, o producao/PLAYBOOK.md e o producao/dia-03/FILA.md. Vamos produzir o Dia 3. Gere as imagens com a skill gerar-imagem-veoaifree usando os lotes de producao/dia-03/fila-veoaifree/, um lote por vez, começando pelo 4-memes.txt (3 imagens). Depois de cada lote, mova os arquivos para C:\Users\davi1\Downloads\clt caotica\dia-03 (seg 09-11) - A novela do crush\06-imagens-sem-texto, me mostre as imagens e espere eu aprovar antes do próximo lote. Não use anúncios do site e pare se pedir login, captcha ou pagamento.

## 4. Depois das imagens
As imagens do site são quadradas (1024x1024). Peça para converter para 9:16 e 4:5: ancorar o quadrado embaixo e estender a cor chapada do fundo para cima, sem esticar. Para montar e renderizar, volte à sessão da nuvem (ou rode o Remotion no PC: `producao/remotion-dia-02` é o modelo) e use `producao/scripts/preparar_entrega.py` para gerar o 720p, as imagens leves e a fila do Drive.

## 5. Regra de ouro
Cada entregável anda sozinho e é enviado assim que fica pronto. Lotes pequenos, um de cada vez, sem juntar o dia inteiro.
