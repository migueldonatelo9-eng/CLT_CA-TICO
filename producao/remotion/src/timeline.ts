export const FPS = 30;

// duração (s) de cada fala, já processada (sem pausas longas)
export const D = {
  L00: 3.2, L01: 4.67, L02: 3.18, L03: 5.1, L04: 1.15, L05: 6.02,
  L06: 3.83, L07: 4.47, L08: 5.84, L09: 3.12, L10: 7.01,
} as const;
export type VoiceId = keyof typeof D;

export type BalloonItem = {k: "balloon"; who: "ela" | "chefe" | "think"; text: string; voice: VoiceId; t: number; x: number; y: number; w: number; tail: "bl" | "br"; size?: number; emph?: string[]};
export type SfxItem = {k: "sfx"; text: string; t: number; x: number; y: number; color: string; star?: string; size: number; rot: number; dur?: number};
export type FlashItem = {k: "flash"; t: number; color: string; dur?: number; a?: number};
export type BurstItem = {k: "burst"; t: number; x: number; y: number; color?: string};
export type NarrItem = {k: "narr"; text: string; voice: VoiceId; t: number; x: number; y: number; w: number; size: number};
export type BigItem = {k: "big"; text: string; t: number; until?: number; y: number; bg: string; color: string; size: number};
export type CtaItem = {k: "cta"; t: number};
export type Item = BalloonItem | SfxItem | FlashItem | BurstItem | NarrItem | BigItem | CtaItem;
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

// ---------------------------------------------------------------- Cena 1
const s1a = 0.45, s1b = s1a + D.L00 + 0.25;
const S1: Scene = {
  id: "01-gancho", images: [{src: "frames/c1.jpg", from: 0}],
  dur: s1b + D.L01 + 0.6, z0: 1.0, z1: 1.1, origin: "50% 38%",
  items: [
    {k: "balloon", who: "ela", text: "Hoje o dia vai ser tranquilo.", voice: "L00", t: s1a, x: 150, y: 215, w: 780, tail: "bl", emph: ["tranquilo"]},
    {k: "balloon", who: "think", text: "Já devia ter desconfiado: o chefe chegou sorrindo.", voice: "L01", t: s1b, x: 130, y: 215, w: 830, tail: "bl", size: 50, emph: ["sorrindo"]},
  ],
  shakes: [],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}],
};

// ---------------------------------------------------------------- Cena 2
const S2: Scene = {
  id: "02-problema", images: [{src: "frames/c2.jpg", from: 0}],
  dur: 0.6 + D.L02 + 0.7, z0: 1.0, z1: 1.12, origin: "50% 45%",
  items: [
    {k: "flash", t: 0.25, color: "#ffffff", dur: 0.2, a: 0.8},
    {k: "burst", t: 0.25, x: 830, y: 1250},
    {k: "sfx", text: "TUM!", t: 0.25, x: 830, y: 1250, color: YEL, star: MAG, size: 170, rot: -8, dur: 1.3},
    {k: "balloon", who: "chefe", text: "Tem um minutinho? É só um feedback rápido.", voice: "L02", t: 0.6, x: 170, y: 215, w: 740, tail: "br", emph: ["feedback", "rápido"]},
  ],
  shakes: [{t: 0.25, dur: 0.9, amp: 26}],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_boom", t: 0.25, vol: 0.8}],
};

// ---------------------------------------------------------------- Cena 3
const S3: Scene = {
  id: "03-identificacao", images: [{src: "frames/c3.jpg", from: 0}],
  dur: 0.4 + D.L03 + 0.9, z0: 1.06, z1: 1.0, origin: "50% 40%",
  items: [
    {k: "balloon", who: "think", text: "Feedback rápido é o nome que chefe dá para aula de duas horas.", voice: "L03", t: 0.4, x: 120, y: 215, w: 840, tail: "bl", size: 50, emph: ["aula", "duas", "horas"]},
    {k: "burst", t: 3.8, x: 860, y: 1760, color: YEL},
    {k: "sfx", text: "!!!", t: 3.8, x: 860, y: 1760, color: MAG, star: YEL, size: 165, rot: 6, dur: 1.6},
  ],
  shakes: [{t: 3.8, dur: 0.6, amp: 12}],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_zip", t: 0.05, vol: 0.5}, {src: "sfx_pop", t: 3.8, vol: 0.7}],
};

// ---------------------------------------------------------------- Cena 4
const s4b = 0.3 + D.L04 + 0.3;
const S4: Scene = {
  id: "04-resignacao", images: [{src: "frames/c4.jpg", from: 0}],
  dur: s4b + D.L05 + 0.6, z0: 1.0, z1: 1.08, origin: "50% 42%",
  items: [
    {k: "balloon", who: "ela", text: "Claro, pode falar.", voice: "L04", t: 0.3, x: 170, y: 215, w: 600, tail: "bl", size: 56},
    {k: "balloon", who: "think", text: "Claro é a palavra que eu digo quando estou com fome e sem saída.", voice: "L05", t: s4b, x: 110, y: 215, w: 860, tail: "bl", size: 50, emph: ["fome", "sem", "saída"]},
  ],
  shakes: [],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}],
};

// ---------------------------------------------------------------- Cena 5
const S5: Scene = {
  id: "05-virada", images: [{src: "frames/c5.jpg", from: 0}],
  dur: 0.4 + D.L06 + 0.9, z0: 1.0, z1: 1.14, origin: "50% 60%",
  items: [
    {k: "balloon", who: "chefe", text: "Gostei muito do seu trabalho.", voice: "L06", t: 0.4, x: 230, y: 215, w: 760, tail: "br", emph: ["muito"]},
    {k: "flash", t: 1.4, color: CYAN, dur: 0.25, a: 0.4},
    {k: "sfx", text: "BZZZ!", t: 1.4, x: 540, y: 820, color: CYAN, star: NIGHT, size: 180, rot: -6, dur: 1.6},
  ],
  shakes: [{t: 1.4, dur: 1.3, amp: 14}],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_buzz", t: 1.4, vol: 0.4}],
};

// ---------------------------------------------------------------- Cena 6
const s6a = 0.35, s6b = s6a + D.L07 + 0.5;
const S6: Scene = {
  id: "06-climax", images: [{src: "frames/c6.jpg", from: 0}, {src: "frames/c6b.jpg", from: s6b - 0.25}],
  dur: s6b + D.L08 + 0.55, z0: 1.0, z1: 1.1, origin: "50% 45%",
  items: [
    {k: "balloon", who: "chefe", text: "Só uma coisinha: refaz tudo, e é pra ontem.", voice: "L07", t: s6a, x: 130, y: 215, w: 830, tail: "br", emph: ["refaz", "tudo"]},
    {k: "flash", t: 2.4, color: MAG, dur: 0.4, a: 0.5},
    {k: "burst", t: 2.4, x: 300, y: 1500, color: YEL},
    {k: "sfx", text: "BUM!", t: 2.4, x: 300, y: 1500, color: "#ffffff", star: MAG, size: 200, rot: -10, dur: 1.4},
    {k: "flash", t: s6b - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    {k: "balloon", who: "think", text: "Gostei muito. Essa frase é sempre o começo de um sofrimento.", voice: "L08", t: s6b, x: 110, y: 215, w: 860, tail: "bl", size: 50, emph: ["sofrimento"]},
  ],
  shakes: [{t: 2.4, dur: 1.2, amp: 28}],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_boom", t: 2.4, vol: 0.9}, {src: "sfx_whoosh", t: s6b - 0.3, vol: 0.4}],
};

// ---------------------------------------------------------------- Cena 7
const S7: Scene = {
  id: "07-pausa", images: [{src: "frames/c7.jpg", from: 0}],
  dur: 0.3 + D.L09 + 1.0, z0: 1.12, z1: 1.0, origin: "50% 55%",
  items: [
    {k: "narr", text: "Duas horas... depois.", voice: "L09", t: 0.3, x: 90, y: 215, w: 900, size: 78},
    {k: "sfx", text: "TIC", t: 0.9, x: 250, y: 1000, color: "#ffffff", size: 120, rot: -6, dur: 0.6},
    {k: "sfx", text: "TAC", t: 1.5, x: 830, y: 1060, color: "#ffffff", size: 120, rot: 6, dur: 0.6},
    {k: "sfx", text: "TIC", t: 2.1, x: 250, y: 1420, color: "#ffffff", size: 120, rot: -6, dur: 0.6},
    {k: "sfx", text: "TAC", t: 2.7, x: 830, y: 1480, color: "#ffffff", size: 120, rot: 6, dur: 0.6},
  ],
  shakes: [],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_tick", t: 0.9, vol: 0.6}, {src: "sfx_tock", t: 1.5, vol: 0.6}, {src: "sfx_tick", t: 2.1, vol: 0.6}, {src: "sfx_tock", t: 2.7, vol: 0.6}],
};

// ---------------------------------------------------------------- Cena 8
const S8: Scene = {
  id: "08-punchline", images: [{src: "frames/c8.jpg", from: 0}],
  dur: 0.3 + D.L10 + 2.8, z0: 1.0, z1: 1.07, origin: "50% 55%",
  items: [
    {k: "narr", text: "", voice: "L10", t: 0.3, x: 0, y: 0, w: 0, size: 0},
    {k: "big", text: "FEEDBACK DE CINCO MINUTOS.", t: 0.3, until: 2.95, y: 250, bg: "#ffffff", color: INK, size: 88},
    {k: "big", text: "DUAS HORAS DE REUNIÃO.", t: 3.0, until: 5.2, y: 250, bg: "#ffffff", color: INK, size: 88},
    {k: "big", text: "UM ANO DE PACIÊNCIA.", t: 5.25, y: 250, bg: MAG, color: "#ffffff", size: 96},
    {k: "cta", t: 7.5},
  ],
  shakes: [{t: 5.25, dur: 0.5, amp: 10}],
  sounds: [
    {src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_pop", t: 0.3, vol: 0.7}, {src: "sfx_pop", t: 3.0, vol: 0.7},
    {src: "sfx_pop", t: 5.25, vol: 0.7}, {src: "sfx_trombone", t: 6.7, vol: 0.5}, {src: "sfx_ding", t: 7.5, vol: 0.55},
  ],
};

export const SCENES: Scene[] = [S1, S2, S3, S4, S5, S6, S7, S8];
export const sec = (t: number) => Math.round(t * FPS);
export const sceneDurFrames = SCENES.map((s) => sec(s.dur));
export const sceneStarts = sceneDurFrames.reduce<number[]>((acc, d, i) => { acc.push(i === 0 ? 0 : acc[i - 1] + sceneDurFrames[i - 1]); return acc; }, []);
export const TOTAL_FRAMES = sceneDurFrames.reduce((a, b) => a + b, 0);
