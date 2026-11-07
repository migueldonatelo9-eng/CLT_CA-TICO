export const FPS = 30;

// duração (s) de cada fala, já processada. Vem de durations.json (gerado por mesclar_duracoes.py quando as vozes ficam prontas)
import durations from "./durations.json";
export const D = durations as Record<string, number>;
export type VoiceId = string;

export type BalloonItem = {k: "balloon"; who: "ela" | "chefe" | "think"; text: string; voice: VoiceId; t: number; x: number; y: number; w: number; tail: "bl" | "br"; size?: number; emph?: string[]};
export type SfxItem = {k: "sfx"; text: string; t: number; x: number; y: number; color: string; star?: string; size: number; rot: number; dur?: number};
export type FlashItem = {k: "flash"; t: number; color: string; dur?: number; a?: number};
export type BurstItem = {k: "burst"; t: number; x: number; y: number; color?: string};
export type NarrItem = {k: "narr"; text: string; voice: VoiceId; t: number; x: number; y: number; w: number; size: number};
export type BigItem = {k: "big"; text: string; t: number; until?: number; y: number; bg: string; color: string; size: number};
export type CtaItem = {k: "cta"; t: number; y?: number};
export type LabelItem = {k: "label"; text: string; t: number; x: number; y: number; w: number; size: number; bg: string; color: string; rot: number};
export type ArrowItem = {k: "arrow"; t: number; x: number; y: number; dir: "down" | "up"};
export type Item = BalloonItem | SfxItem | FlashItem | BurstItem | NarrItem | BigItem | CtaItem | LabelItem | ArrowItem;
export type Shake = {t: number; dur: number; amp: number};
export type Snd = {src: string; t: number; vol: number};
export type Scene = {
  id: string;
  images: {src: string; from: number}[];
  dur: number;
  z0: number; z1: number; origin: string;
  items: Item[];
  shakes: Shake[];
  sounds: Snd[];
};

const INK = "#111111", YEL = "#FFE600", MAG = "#FF2D95", CYAN = "#00E5FF", NIGHT = "#1B1464";

// Dia 2: "Só cinco minutinhos no sofá". Cada cena tem uma fala (balão branco) e um pensamento (balão tracejado),
// com corte para um segundo enquadramento (close) quando o pensamento começa.
// Regra do usuário: o rosto da ELA nunca é coberto. Balões e frases ficam no topo (cabelo); efeitos no corpo, ombros e fundo.

// Pensamentos omitidos para o reel caber em ~60 s (as vozes existem; para reativar, tire o id daqui).
const SKIP = new Set<string>(["L01", "L11", "L15"]);
const has = (id: string) => !SKIP.has(id);
const PRE = 0.3, GAP = 0.2, POST = 0.4;

// ---------------------------------------------------------------- Cena 1: expectativa (r1 -> r9)
const a1 = PRE, b1 = a1 + D.L00 + GAP;
const c1 = has("L01") ? b1 : a1 + 0.55 * D.L00; // momento do corte para o close
const S1: Scene = {
  id: "01-expectativa", images: [{src: "frames/r1.jpg", from: 0}, {src: "frames/r9.jpg", from: c1 - 0.25}],
  dur: (has("L01") ? b1 + D.L01 : a1 + D.L00) + POST, z0: 1.0, z1: 1.09, origin: "50% 45%",
  items: [
    {k: "balloon", who: "ela", text: "Vou deitar só cinco minutinhos e já organizo a semana.", voice: "L00", t: a1, x: 130, y: 215, w: 830, tail: "bl", size: 52, emph: ["cinco", "minutinhos"]},
    {k: "flash", t: c1 - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    ...(has("L01") ? [{k: "balloon", who: "think", text: "Eu, a mulher mais produtiva do universo.", voice: "L01", t: b1, x: 130, y: 215, w: 830, tail: "bl", size: 52, emph: ["produtiva"]} as Item] : []),
    {k: "sfx", text: "CLIC!", t: c1 + 0.2, x: 840, y: 1560, color: YEL, star: MAG, size: 130, rot: 7, dur: 1.0},
  ],
  shakes: [],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_whoosh", t: c1 - 0.3, vol: 0.4}, {src: "sfx_tick", t: c1 + 0.2, vol: 0.6}],
};

// ---------------------------------------------------------------- Cena 2: o sofá vence (r2 -> r10)
const a2 = PRE, b2 = a2 + D.L02 + GAP;
const S2: Scene = {
  id: "02-sofa", images: [{src: "frames/r2.jpg", from: 0}, {src: "frames/r10.jpg", from: b2 - 0.25}],
  dur: b2 + D.L03 + POST, z0: 1.0, z1: 1.1, origin: "50% 42%",
  items: [
    {k: "balloon", who: "ela", text: "Cinco minutinhos. Só cinco.", voice: "L02", t: a2, x: 180, y: 215, w: 720, tail: "bl", size: 54, emph: ["cinco"]},
    {k: "flash", t: b2 - 0.25, color: "#ffffff", dur: 0.2, a: 0.6},
    {k: "balloon", who: "think", text: "O sofá tem mais poder sobre mim do que o chefe.", voice: "L03", t: b2, x: 120, y: 215, w: 840, tail: "bl", size: 52, emph: ["sofá", "poder"]},
    {k: "sfx", text: "ZZZ...", t: b2 + 0.7, x: 840, y: 1560, color: "#ffffff", star: NIGHT, size: 130, rot: -8, dur: 1.8},
  ],
  shakes: [],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_whoosh", t: b2 - 0.3, vol: 0.4}, {src: "sfx_pop", t: b2 + 0.7, vol: 0.5}],
};

// ---------------------------------------------------------------- Cena 3: já escureceu? (r3 -> r11)
const a3 = 0.25, b3 = a3 + D.L04 + GAP;
const S3: Scene = {
  id: "03-escureceu", images: [{src: "frames/r3.jpg", from: 0}, {src: "frames/r11.jpg", from: b3 - 0.25}],
  dur: b3 + D.L05 + POST, z0: 1.08, z1: 1.0, origin: "40% 40%",
  items: [
    {k: "balloon", who: "ela", text: "Já escureceu?!", voice: "L04", t: a3, x: 190, y: 215, w: 560, tail: "bl", size: 62, emph: ["escureceu"]},
    {k: "burst", t: a3 + 0.05, x: 850, y: 1700, color: YEL},
    {k: "sfx", text: "!!!", t: a3 + 0.05, x: 850, y: 1700, color: MAG, star: YEL, size: 165, rot: 6, dur: 1.4},
    {k: "flash", t: b3 - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    {k: "balloon", who: "think", text: "Cinco minutinhos viraram cinco horas. O sofá é um buraco negro com almofada.", voice: "L05", t: b3, x: 110, y: 215, w: 860, tail: "bl", size: 50, emph: ["horas", "buraco", "negro"]},
  ],
  shakes: [{t: a3 + 0.05, dur: 0.7, amp: 16}],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_pop", t: a3 + 0.05, vol: 0.7}, {src: "sfx_whoosh", t: b3 - 0.3, vol: 0.4}],
};

// ---------------------------------------------------------------- Cena 4: pânico no armário (r4 -> r12)
const a4 = PRE, b4 = a4 + D.L06 + GAP;
const S4: Scene = {
  id: "04-panico", images: [{src: "frames/r4.jpg", from: 0}, {src: "frames/r12.jpg", from: b4 - 0.25}],
  dur: b4 + D.L07 + POST, z0: 1.0, z1: 1.1, origin: "42% 40%",
  items: [
    {k: "balloon", who: "ela", text: "É domingo à noite. Eu sei. Não me lembra.", voice: "L06", t: a4, x: 130, y: 215, w: 820, tail: "bl", size: 52, emph: ["domingo", "noite"]},
    {k: "sfx", text: "GULP!", t: a4 + 1.0, x: 850, y: 1580, color: "#ffffff", star: MAG, size: 140, rot: -7, dur: 1.2},
    {k: "flash", t: b4 - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    {k: "balloon", who: "think", text: "A segunda-feira está chegando. Eu já sinto o cheiro do café requentado.", voice: "L07", t: b4, x: 110, y: 215, w: 860, tail: "bl", size: 50, emph: ["café", "requentado"]},
    {k: "sfx", text: "ÓH-ÓH!", t: b4 + 0.9, x: 830, y: 1660, color: CYAN, star: NIGHT, size: 130, rot: 6, dur: 1.4},
  ],
  shakes: [{t: a4 + 1.0, dur: 0.5, amp: 12}, {t: b4 + 0.9, dur: 0.6, amp: 14}],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_pop", t: a4 + 1.0, vol: 0.6}, {src: "sfx_whoosh", t: b4 - 0.3, vol: 0.4}, {src: "sfx_buzz", t: b4 + 0.9, vol: 0.35}],
};

// ---------------------------------------------------------------- Cena 5: caderno em branco (r5 -> r13)
const a5 = PRE, b5 = a5 + D.L08 + GAP;
const S5: Scene = {
  id: "05-caderno", images: [{src: "frames/r5.jpg", from: 0}, {src: "frames/r13.jpg", from: b5 - 0.25}],
  dur: b5 + D.L09 + POST, z0: 1.0, z1: 1.12, origin: "50% 55%",
  items: [
    {k: "balloon", who: "ela", text: "Amanhã eu organizo a semana.", voice: "L08", t: a5, x: 150, y: 215, w: 780, tail: "bl", size: 54, emph: ["amanhã"]},
    {k: "sfx", text: "TIC TIC", t: a5 + 0.9, x: 840, y: 1450, color: YEL, star: MAG, size: 120, rot: -6, dur: 1.2},
    {k: "flash", t: b5 - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    {k: "balloon", who: "think", text: "Amanhã eu começo. Essa frase é a minha assinatura.", voice: "L09", t: b5, x: 120, y: 215, w: 840, tail: "bl", size: 52, emph: ["assinatura"]},
  ],
  shakes: [{t: b5 + 0.2, dur: 0.6, amp: 6}],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_tick", t: a5 + 0.9, vol: 0.6}, {src: "sfx_tock", t: a5 + 1.25, vol: 0.5}, {src: "sfx_whoosh", t: b5 - 0.3, vol: 0.4}],
};

// ---------------------------------------------------------------- Cena 6: só um episódio (r6 -> r14)
const a6 = PRE, b6 = a6 + D.L10 + GAP;
const c6 = has("L11") ? b6 : a6 + 0.55 * D.L10;
const S6: Scene = {
  id: "06-episodio", images: [{src: "frames/r6.jpg", from: 0}, {src: "frames/r14.jpg", from: c6 - 0.25}],
  dur: (has("L11") ? b6 + D.L11 : a6 + D.L10) + POST, z0: 1.0, z1: 1.1, origin: "50% 40%",
  items: [
    {k: "balloon", who: "ela", text: "Vou ver só um episódio.", voice: "L10", t: a6, x: 170, y: 215, w: 740, tail: "bl", size: 56, emph: ["só", "episódio"]},
    {k: "sfx", text: "PLAY!", t: a6 + 0.5, x: 860, y: 1180, color: CYAN, star: NIGHT, size: 130, rot: 7, dur: 1.0},
    {k: "flash", t: c6 - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    ...(has("L11") ? [{k: "balloon", who: "think", text: "E a vida adulta que se vire sozinha.", voice: "L11", t: b6, x: 140, y: 215, w: 800, tail: "bl", size: 54, emph: ["vida", "sozinha"]} as Item] : []),
    {k: "sfx", text: "AHN...", t: c6 + 0.25, x: 800, y: 1660, color: "#ffffff", star: MAG, size: 130, rot: -6, dur: 1.2},
  ],
  shakes: [{t: a6 + 0.5, dur: 0.4, amp: 8}],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_pop", t: a6 + 0.5, vol: 0.6}, {src: "sfx_whoosh", t: c6 - 0.3, vol: 0.4}],
};

// ---------------------------------------------------------------- Cena 7: o relógio (r7 -> r15)
const a7 = PRE, b7 = a7 + D.L12 + GAP;
const S7: Scene = {
  id: "07-relogio", images: [{src: "frames/r7.jpg", from: 0}, {src: "frames/r15.jpg", from: b7 - 0.25}],
  dur: b7 + D.L13 + POST, z0: 1.08, z1: 1.0, origin: "40% 45%",
  items: [
    {k: "balloon", who: "ela", text: "Eu preciso dormir cedo.", voice: "L12", t: a7, x: 170, y: 215, w: 740, tail: "bl", size: 56, emph: ["dormir", "cedo"]},
    {k: "sfx", text: "TIC", t: a7 + 0.4, x: 900, y: 560, color: "#ffffff", size: 120, rot: -6, dur: 0.6},
    {k: "sfx", text: "TAC", t: a7 + 1.1, x: 900, y: 1190, color: "#ffffff", size: 120, rot: 6, dur: 0.6},
    {k: "flash", t: b7 - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    {k: "balloon", who: "think", text: "Dormir cedo no domingo é igual economizar: só no planejamento.", voice: "L13", t: b7, x: 110, y: 215, w: 860, tail: "bl", size: 50, emph: ["economizar", "planejamento"]},
    {k: "sfx", text: "TIC", t: b7 + 0.7, x: 900, y: 1010, color: "#ffffff", size: 120, rot: -6, dur: 0.6},
    {k: "sfx", text: "TAC", t: b7 + 1.4, x: 900, y: 1250, color: "#ffffff", size: 120, rot: 6, dur: 0.6},
  ],
  shakes: [],
  sounds: [
    {src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_tick", t: a7 + 0.4, vol: 0.6}, {src: "sfx_tock", t: a7 + 1.1, vol: 0.6},
    {src: "sfx_whoosh", t: b7 - 0.3, vol: 0.4}, {src: "sfx_tick", t: b7 + 0.7, vol: 0.6}, {src: "sfx_tock", t: b7 + 1.4, vol: 0.6},
  ],
};

// ---------------------------------------------------------------- Cena 8: punchline (r8 -> r16)
const a8 = PRE;
const p1 = 37 / 73; // parte da fala L14 antes da pausa dramática (por número de letras)
const e1 = a8 + p1 * D.L14, e2 = a8 + D.L14;
const b8 = e2 + 0.45; // com L15: balão do pensamento; sem L15: corte para r16 + chamada final
const ctaT = has("L15") ? b8 + D.L15 + 0.3 : b8 + 0.1;
const S8: Scene = {
  id: "08-punchline", images: [{src: "frames/r8.jpg", from: 0}, {src: "frames/r16.jpg", from: b8 - 0.25}],
  dur: ctaT + (has("L15") ? 3.0 : 2.7), z0: 1.0, z1: 1.07, origin: "50% 55%",
  items: [
    {k: "narr", text: "", voice: "L14", t: a8, x: 0, y: 0, w: 0, size: 0},
    {k: "big", text: "DOMINGO É O DIA QUE EU MAIS TRABALHO:", t: a8, until: e1 - 0.05, y: 250, bg: "#ffffff", color: INK, size: 84},
    {k: "big", text: "TRABALHO PARA NÃO PENSAR NA SEGUNDA.", t: e1, until: e2 + 0.1, y: 250, bg: MAG, color: "#ffffff", size: 84},
    {k: "flash", t: b8 - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    ...(has("L15") ? [{k: "balloon", who: "think", text: "E mesmo assim não funciona.", voice: "L15", t: b8, x: 150, y: 215, w: 780, tail: "bl", size: 56, emph: ["não", "funciona"]} as Item] : []),
    {k: "cta", t: ctaT, y: 1340},
  ],
  shakes: [{t: e1, dur: 0.5, amp: 10}],
  sounds: [
    {src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_pop", t: a8, vol: 0.7}, {src: "sfx_pop", t: e1, vol: 0.7},
    {src: "sfx_whoosh", t: b8 - 0.3, vol: 0.4}, {src: "sfx_trombone", t: has("L15") ? b8 + D.L15 - 0.4 : b8 - 0.1, vol: 0.5}, {src: "sfx_ding", t: ctaT, vol: 0.55},
  ],
};

export const SCENES: Scene[] = [S1, S2, S3, S4, S5, S6, S7, S8];
export const sec = (t: number) => Math.round(t * FPS);
export const sceneDurFrames = SCENES.map((s) => sec(s.dur));
export const sceneStarts = sceneDurFrames.reduce<number[]>((acc, d, i) => { acc.push(i === 0 ? 0 : acc[i - 1] + sceneDurFrames[i - 1]); return acc; }, []);
export const TOTAL_FRAMES = sceneDurFrames.reduce((a, b) => a + b, 0);

export const layout = (scenes: Scene[]) => {
  const durs = scenes.map((s) => sec(s.dur));
  const starts = durs.reduce<number[]>((acc, d, i) => { acc.push(i === 0 ? 0 : acc[i - 1] + durs[i - 1]); return acc; }, []);
  return {durs, starts, total: durs.reduce((a, b) => a + b, 0)};
};
