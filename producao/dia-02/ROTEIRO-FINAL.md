# Dia 2: reel "Só cinco minutinhos no sofá" (domingo 08/11/2026)

Reel de 61,0 s, 1080x1920, 30 fps, 36,6 MB, áudio em −14,2 LUFS. Arquivo: `reel-dia-02.mp4`.
Mesmo método do Dia 1 (`../PLAYBOOK.md`): imagens sem texto do agente 01, vozes do Gemini, efeitos sintetizados e motion graphics em Remotion (`../remotion-dia-02`). **O rosto da ELA fica livre em todos os quadros.**

## Cenas

Cada cena tem uma fala (balão branco) e, na maioria, um pensamento (balão tracejado). Quando o pensamento começa, a imagem corta para um segundo enquadramento (close).

| Cena | Início a fim | Imagens (corte) | Falas usadas |
|---|---|---|---|
| 1 Expectativa | 0,0 a 4,1 s | r1 → r9 (1,9 s) | L00 "Vou deitar só cinco minutinhos e já organizo a semana." |
| 2 Sofá | 4,1 a 11,7 s | r2 → r10 (3,7 s) | L02 "Cinco minutinhos. Só cinco." / L03 (pensa) "O sofá tem mais poder sobre mim do que o chefe." |
| 3 Escureceu | 11,7 a 20,5 s | r3 → r11 (1,6 s) | L04 "Já escureceu?!" / L05 (pensa) "Cinco minutinhos viraram cinco horas. O sofá é um buraco negro com almofada." |
| 4 Pânico | 20,5 a 29,1 s | r4 → r12 (3,3 s) | L06 "É domingo à noite. Eu sei. Não me lembra." / L07 (pensa) "A segunda-feira está chegando. Eu já sinto o cheiro do café requentado." |
| 5 Caderno | 29,1 a 36,9 s | r5 → r13 (3,0 s) | L08 "Amanhã eu organizo a semana." / L09 (pensa) "Amanhã eu começo. Essa frase é a minha assinatura." |
| 6 Episódio | 36,9 a 40,6 s | r6 → r14 (1,7 s) | L10 "Vou ver só um episódio." |
| 7 Relógio | 40,6 a 49,3 s | r7 → r15 (2,7 s) | L12 "Eu preciso dormir cedo." / L13 (pensa) "Dormir cedo no domingo é igual economizar: só no planejamento." |
| 8 Punchline | 49,3 a 61,0 s | r8 → r16 (8,6 s) | L14 "Domingo é o dia que eu mais trabalho: trabalho para não pensar na segunda." (duas frases grandes) e a chamada final |

**Chamada final no vídeo:** QUAL FOI O SEU “SÓ UM POUQUINHO” MAIS LONGO? COMENTA AQUI!

Os quadros `rN` são `reel_qN` do agente 01 (`reel_q14_v2` na cena 6).

## Pensamentos que ficaram de fora

As 16 falas somavam 60,8 s só de voz. Para o reel caber em cerca de 60 s, três pensamentos foram omitidos (`SKIP` em `timeline.ts`): L01 "Eu, a mulher mais produtiva do universo.", L11 "E a vida adulta que se vire sozinha." e L15 "E mesmo assim não funciona." As vozes existem. Para reativar, tire o id do `SKIP` e rode o render (o reel passa de 70 s).

## Textos de publicação

- **Legenda (Semana 1):** O domingo à noite chegou e eu ainda estou no “só cinco minutinhos”. Me conta aqui: qual foi a última vez que você deitou “só um pouquinho”? Escreve MINUTINHOS e conta.
- **Comentário fixado (Semana 1):** O meu “só cinco minutinhos” durou o resto do dia. Alguém supera?

## Vozes

Gemini TTS, voz Kore, configuradas em `scripts/vozes-dia-02.json`. As falas L00 a L03 saíram no modelo `gemini-2.5-flash-preview-tts` e as demais no `gemini-3.1-flash-tts-preview` (a cota do primeiro esgotou). O timbre pode variar entre L03 e L04. Onze das 16 falas estão no limite de aceleração (1,4x). Soma das durações finais: 60,8 s.

## Como renderizar

```bash
cd producao/remotion-dia-02
npx remotion render CLT-Dia2 out/dia2-reel.mp4 --browser-executable=<chromium> --crf=21 --concurrency=2
```

O arquivo entregue foi recomprimido (H.264 a 4,8 Mbps, AAC 192 kbps, `faststart`). O mestre em crf 21 pesa 110 MB.
