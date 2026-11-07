import {D, SCENES, sec} from "./timeline";
import type {BigItem, Item, Scene} from "./timeline";

const INK = "#111111", YEL = "#FFE600", MAG = "#FF2D95";

// Stories: zona segura. Balões dos recortes ficam em y=215 (como no reel) e nada abaixo de y=1650.
const safe = (s: Scene, trim = 0): Scene => ({
  ...s,
  dur: s.dur - trim,
  items: s.items.map((it): Item => {
    if (it.k === "cta") return {...it, y: 1130};
    return it;
  }),
});

// ------------------------------------------------ Story 1: recorte do reel (cenas 1 a 4)
const s1 = SCENES.slice(0, 4).map((s) => safe(s));
const s1last = s1[s1.length - 1];
s1[s1.length - 1] = {
  ...s1last,
  items: [...s1last.items, {k: "label", text: "CONTINUA ›", t: s1last.dur - 2.6, x: 600, y: 1380, w: 420, size: 64, bg: YEL, color: INK, rot: -3}],
  sounds: [...s1last.sounds, {src: "sfx_pop", t: s1last.dur - 2.6, vol: 0.6}],
};
export const STORY1: Scene[] = s1;

// ------------------------------------------------ Story 2: recorte do reel (cenas 5 a 8), cabe em 30 s
const trims = [0.6, 0.1, 0.6, 0.9];
export const STORY2: Scene[] = SCENES.slice(4).map((s, i) => safe(s, trims[i]));

// ------------------------------------------------ Stories 3 a 6 (novos)
type Base = {id: string; images: {src: string; from: number}[]; items: Item[]; sounds: {src: string; t: number; vol: number}[]; shakes?: {t: number; dur: number; amp: number}[]; dur?: number};
const mk = (b: Base): Scene => ({id: b.id, images: b.images, dur: b.dur ?? 20, z0: 1.0, z1: 1.1, origin: "50% 42%", items: b.items, shakes: b.shakes ?? [], sounds: b.sounds});

// Story 3: enquete (o usuário coloca a figurinha de enquete na área livre abaixo da etiqueta)
const a3 = 0.5, b3 = a3 + D.ST3a + 0.45, l3 = b3 + D.ST3b + 0.5;
export const STORY3: Scene[] = [mk({
  id: "story3-enquete",
  images: [{src: "frames/s1.jpg", from: 0}, {src: "frames/s2.jpg", from: b3 - 0.2}],
  items: [
    {k: "balloon", who: "ela", text: "Seu chefe já disse: é só um feedback rápido?", voice: "ST3a", t: a3, x: 110, y: 255, w: 860, tail: "bl", size: 50, emph: ["feedback", "rápido"]},
    {k: "flash", t: b3 - 0.2, color: "#ffffff", dur: 0.2, a: 0.6},
    {k: "balloon", who: "think", text: "Eu sei que já disse.", voice: "ST3b", t: b3, x: 150, y: 255, w: 760, tail: "bl", size: 56, emph: ["já"]},
    {k: "label", text: "ENQUETE", t: l3, x: 290, y: 1290, w: 500, size: 96, bg: YEL, color: INK, rot: -3},
  ],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_whoosh", t: b3 - 0.25, vol: 0.4}, {src: "sfx_ding", t: l3, vol: 0.55}],
  shakes: [{t: b3 - 0.2, dur: 0.4, amp: 8}],
})];

// Story 4: caixa de pergunta
const a4 = 0.5, b4 = a4 + D.ST4a + 0.45, l4 = b4 + D.ST4b + 0.5;
export const STORY4: Scene[] = [mk({
  id: "story4-pergunta",
  images: [{src: "frames/s3.jpg", from: 0}, {src: "frames/s4.jpg", from: b4 - 0.2}],
  items: [
    {k: "balloon", who: "ela", text: "Qual foi o só um minutinho mais longo da sua vida?", voice: "ST4a", t: a4, x: 110, y: 255, w: 860, tail: "bl", size: 50, emph: ["minutinho", "longo"]},
    {k: "flash", t: b4 - 0.2, color: "#ffffff", dur: 0.2, a: 0.6},
    {k: "balloon", who: "think", text: "O meu durou até a hora do almoço.", voice: "ST4b", t: b4, x: 110, y: 255, w: 860, tail: "bl", size: 54, emph: ["almoço"]},
    {k: "label", text: "RESPONDE AQUI", t: l4, x: 190, y: 1290, w: 700, size: 92, bg: YEL, color: INK, rot: -3},
  ],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_whoosh", t: b4 - 0.25, vol: 0.4}, {src: "sfx_ding", t: l4, vol: 0.55}],
  shakes: [{t: b4 - 0.2, dur: 0.4, amp: 8}],
})];

// Story 5: meme em texto (frases grandes, uma de cada vez, sobre o cabelo)
const a5 = 0.5, b5 = a5 + D.ST5a + 0.5;
const w1 = 26 / 69, w2 = 47 / 69;
const big = (text: string, t: number, until: number | undefined, bg: string, color: string): BigItem => ({k: "big", text, t, until, y: 270, bg, color, size: 84});
export const STORY5: Scene[] = [mk({
  id: "story5-meme",
  images: [{src: "frames/s5.jpg", from: 0}, {src: "frames/s6.jpg", from: b5 - 0.2}],
  items: [
    {k: "balloon", who: "ela", text: "Feedback rápido, versão real:", voice: "ST5a", t: a5, x: 110, y: 255, w: 860, tail: "bl", size: 54, emph: ["real"]},
    {k: "flash", t: b5 - 0.2, color: "#ffffff", dur: 0.2, a: 0.6},
    {k: "narr", text: "", voice: "ST5b", t: b5, x: 0, y: 0, w: 0, size: 0},
    big("5 MINUTOS DE CONVERSA", b5, b5 + w1 * D.ST5b - 0.05, "#ffffff", INK),
    big("2 HORAS DE REUNIÃO", b5 + w1 * D.ST5b, b5 + w2 * D.ST5b - 0.05, "#ffffff", INK),
    big("1 ANO DE PACIÊNCIA", b5 + w2 * D.ST5b, undefined, MAG, "#ffffff"),
  ],
  sounds: [
    {src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_pop", t: b5, vol: 0.7}, {src: "sfx_pop", t: b5 + w1 * D.ST5b, vol: 0.7},
    {src: "sfx_pop", t: b5 + w2 * D.ST5b, vol: 0.7}, {src: "sfx_trombone", t: b5 + D.ST5b + 0.3, vol: 0.5},
  ],
  shakes: [{t: b5 + w2 * D.ST5b, dur: 0.5, amp: 10}],
})];

// Story 6: chamada para comentar no reel
const a6 = 0.5, b6 = a6 + D.ST6a + 0.45, l6 = b6 + D.ST6b + 0.5;
export const STORY6: Scene[] = [mk({
  id: "story6-cta",
  images: [{src: "frames/s7.jpg", from: 0}, {src: "frames/s8.jpg", from: b6 - 0.2}],
  items: [
    {k: "balloon", who: "ela", text: "Vai lá no reel e comenta o seu feedback mais longo!", voice: "ST6a", t: a6, x: 110, y: 255, w: 860, tail: "bl", size: 50, emph: ["reel", "comenta"]},
    {k: "flash", t: b6 - 0.2, color: "#ffffff", dur: 0.2, a: 0.6},
    {k: "balloon", who: "think", text: "Eu quero ver se alguém supera o meu.", voice: "ST6b", t: b6, x: 110, y: 255, w: 860, tail: "bl", size: 54, emph: ["supera"]},
    {k: "label", text: "VAI NO REEL", t: l6, x: 240, y: 1290, w: 600, size: 96, bg: MAG, color: "#ffffff", rot: -3},
  ],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_whoosh", t: b6 - 0.25, vol: 0.4}, {src: "sfx_ding", t: l6, vol: 0.55}],
  shakes: [{t: b6 - 0.2, dur: 0.4, amp: 8}],
})];

export const STORY_DURATIONS = {a3, b3, l3, a4, b4, l4, a5, b5, a6, b6, l6, sec};
