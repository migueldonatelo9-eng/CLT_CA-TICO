import {D, SCENES, sec} from "./timeline";
import type {BalloonItem, BigItem, Item, Scene} from "./timeline";

const INK = "#111111", YEL = "#FFE600", MAG = "#FF2D95";

// Dia 2: stories. Zona segura: balões dos recortes em y=215 (como no reel), balões dos stories novos em y=255
// (o coque chega ao topo da imagem), nada abaixo de y=1650. O rosto da ELA fica sempre livre.

// ---- recortes do reel -------------------------------------------------------------------------------------------
const safe = (s: Scene): Scene => ({
  ...s,
  items: s.items.map((it): Item => (it.k === "cta" ? {...it, y: 1130} : it)),
});

// menor duração que uma cena pode ter sem cortar fala, etiqueta, frase grande ou chamada
const needT = (s: Scene): number => {
  const itens = s.items.map((it): number => {
    switch (it.k) {
      case "balloon": case "narr": return it.t + (D[it.voice] ?? 2) + 0.1;
      case "cta": return it.t + 1.6;
      case "big": return Math.max(it.t + 1.2, it.until ?? 0);
      case "label": return it.t + 1.5;
      default: return it.t + 0.3;
    }
  });
  const sons = s.sounds.map((x) => x.t + 0.6);
  return Math.max(0.5, ...itens, ...sons);
};

// aparar as pontas das cenas (só a folga depois da última fala) para o story caber em `max` segundos
const trimEnds = (scenes: Scene[], max: number): Scene[] => {
  const total = scenes.reduce((a, s) => a + s.dur, 0);
  if (total <= max) return scenes;
  const folga = scenes.map((s) => Math.max(0, s.dur - needT(s)));
  const soma = folga.reduce((a, b) => a + b, 0);
  const f = soma > 0 ? Math.min(1, (total - max) / soma) : 0;
  return scenes.map((s, i) => ({...s, dur: s.dur - folga[i] * f}));
};

// se nem assim couber: tira o último pensamento da cena (balão, efeitos e sons dele) e encurta a cena
const dropThink = (s: Scene): Scene => {
  const ths = s.items.filter((it): it is BalloonItem => it.k === "balloon" && it.who === "think");
  if (!ths.length) return s;
  const cut = ths[ths.length - 1].t - 0.3;
  const base: Scene = {
    ...s,
    items: s.items.filter((it) => it.t < cut),
    sounds: s.sounds.filter((x) => x.t < cut),
    images: s.images.filter((im, i) => i === 0 || im.from < cut),
  };
  return {...base, dur: Math.min(s.dur, Math.max(2.0, needT(base) + 0.4))};
};

// encurta a entrada (silêncio antes da primeira fala) e puxa tudo da cena para trás
const shiftLead = (s: Scene, d: number): Scene => {
  const voz = s.items.filter((it) => "voice" in it).map((it) => it.t);
  const k = Math.max(0, Math.min(d, (voz.length ? Math.min(...voz) : 0.3) - 0.12));
  if (k <= 0) return s;
  const sh = (t: number) => Math.max(0, t - k);
  return {
    ...s, dur: s.dur - k,
    items: s.items.map((it) => ({...it, t: sh(it.t), ...("until" in it && it.until != null ? {until: sh(it.until)} : {})}) as Item),
    sounds: s.sounds.map((x) => ({...x, t: sh(x.t)})),
    shakes: s.shakes.map((x) => ({...x, t: sh(x.t)})),
    images: s.images.map((im) => ({...im, from: im.from === 0 ? 0 : sh(im.from)})),
  };
};

const soma = (sc: Scene[]) => sc.reduce((a, s) => a + s.dur, 0);

// 1) apara as pontas; 2) encurta as entradas; 3) só se ainda não couber, tira pensamentos (`order` = cenas, da primeira a perder)
const fit = (scenes: Scene[], max: number, order: number[] = []): Scene[] => {
  let out = trimEnds(scenes, max);
  if (soma(out) > max + 0.01) out = trimEnds(out.map((s) => shiftLead(s, 0.18)), max);
  for (const i of order) {
    if (soma(out) <= max + 0.01) break;
    out = trimEnds(out.map((s, j) => (j === i ? dropThink(s) : s)), max);
  }
  return out;
};

// ------------------------------------------------ Story 1: recorte do reel (cenas 1 a 4)
const s1 = fit(SCENES.slice(0, 4).map(safe), 29.9, [0, 1, 2]);
const s1last = s1[s1.length - 1];
s1[s1.length - 1] = {
  ...s1last,
  items: [...s1last.items, {k: "label", text: "CONTINUA ›", t: s1last.dur - 2.6, x: 580, y: 1500, w: 420, size: 64, bg: YEL, color: INK, rot: -3}],
  sounds: [...s1last.sounds, {src: "sfx_pop", t: s1last.dur - 2.6, vol: 0.6}],
};
export const STORY1: Scene[] = s1;

// ------------------------------------------------ Story 2: recorte do reel (cenas 5 a 8), cabe em 30 s
export const STORY2: Scene[] = fit(SCENES.slice(4).map(safe), 29.9, [1, 0, 2]); // cena 6, 5 e 7 perdem o pensamento só se não couber

// ---- stories novos (3 a 6) ---------------------------------------------------------------------------------------
type Base = {id: string; images: {src: string; from: number}[]; items: Item[]; sounds: {src: string; t: number; vol: number}[]; shakes?: {t: number; dur: number; amp: number}[]; dur?: number};
const mk = (b: Base): Scene => ({id: b.id, images: b.images, dur: b.dur ?? 20, z0: 1.0, z1: 1.1, origin: "50% 42%", items: b.items, shakes: b.shakes ?? [], sounds: b.sounds});

// Story 3: enquete (o usuário coloca a figurinha de enquete na área livre y 1400 a 1650; opções sugeridas: "Sempre" e "Só hoje")
const a3 = 0.5, b3 = a3 + D.ST3a + 0.45, l3 = b3 + D.ST3b + 0.5;
export const STORY3: Scene[] = [mk({
  id: "story3-enquete",
  images: [{src: "frames/s1.jpg", from: 0}, {src: "frames/s11.jpg", from: b3 - 0.2}],
  items: [
    {k: "balloon", who: "ela", text: "Você também deita “só cinco minutinhos” no domingo?", voice: "ST3a", t: a3, x: 110, y: 255, w: 860, tail: "bl", size: 50, emph: ["cinco", "domingo"]},
    {k: "flash", t: b3 - 0.2, color: "#ffffff", dur: 0.2, a: 0.6},
    {k: "balloon", who: "think", text: "Eu sei que sim. O sofá me contou.", voice: "ST3b", t: b3, x: 130, y: 255, w: 820, tail: "bl", size: 56, emph: ["sim", "sofá"]},
    {k: "label", text: "ENQUETE", t: l3, x: 290, y: 1290, w: 500, size: 96, bg: YEL, color: INK, rot: -3},
  ],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_whoosh", t: b3 - 0.25, vol: 0.4}, {src: "sfx_ding", t: l3, vol: 0.55}],
  shakes: [{t: b3 - 0.2, dur: 0.4, amp: 8}],
})];

// Story 4: caixa de pergunta (figurinha de perguntas na área livre abaixo da etiqueta)
const a4 = 0.5, b4 = a4 + D.ST4a + 0.45, l4 = b4 + D.ST4b + 0.5;
export const STORY4: Scene[] = [mk({
  id: "story4-pergunta",
  images: [{src: "frames/s3.jpg", from: 0}, {src: "frames/s14.jpg", from: b4 - 0.2}],
  items: [
    {k: "balloon", who: "ela", text: "Qual foi o seu minutinho mais longo?", voice: "ST4a", t: a4, x: 110, y: 255, w: 860, tail: "bl", size: 54, emph: ["minutinho", "longo"]},
    {k: "flash", t: b4 - 0.2, color: "#ffffff", dur: 0.2, a: 0.6},
    {k: "balloon", who: "think", text: "O meu durou o resto do dia.", voice: "ST4b", t: b4, x: 110, y: 255, w: 860, tail: "bl", size: 56, emph: ["resto", "dia"]},
    {k: "label", text: "RESPONDE AQUI", t: l4, x: 190, y: 1290, w: 700, size: 92, bg: YEL, color: INK, rot: -3},
  ],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_whoosh", t: b4 - 0.25, vol: 0.4}, {src: "sfx_ding", t: l4, vol: 0.55}],
  shakes: [{t: b4 - 0.2, dur: 0.4, amp: 8}],
})];

// Story 5: meme em texto (frases grandes, uma de cada vez, sobre o cabelo). Tempo de cada frase proporcional ao texto falado.
const a5 = 0.5, b5 = a5 + D.ST5a + 0.5;
const p1 = "Cinco minutinhos de sofá.".length, p2 = "Cinco horas de sono.".length, p3 = "Uma segunda-feira de arrependimento.".length;
const w1 = p1 / (p1 + p2 + p3), w2 = (p1 + p2) / (p1 + p2 + p3);
const big = (text: string, t: number, until: number | undefined, bg: string, color: string, size = 84): BigItem => ({k: "big", text, t, until, y: 270, bg, color, size});
export const STORY5: Scene[] = [mk({
  id: "story5-meme",
  images: [{src: "frames/s5.jpg", from: 0}, {src: "frames/s6.jpg", from: b5 - 0.2}],
  items: [
    {k: "balloon", who: "ela", text: "Domingo à noite, versão real:", voice: "ST5a", t: a5, x: 110, y: 255, w: 860, tail: "bl", size: 56, emph: ["real"]},
    {k: "flash", t: b5 - 0.2, color: "#ffffff", dur: 0.2, a: 0.6},
    {k: "narr", text: "", voice: "ST5b", t: b5, x: 0, y: 0, w: 0, size: 0},
    big("5 MINUTINHOS DE SOFÁ", b5, b5 + w1 * D.ST5b - 0.05, "#ffffff", INK),
    big("5 HORAS DE SONO", b5 + w1 * D.ST5b, b5 + w2 * D.ST5b - 0.05, "#ffffff", INK),
    big("1 SEGUNDA DE ARREPENDIMENTO", b5 + w2 * D.ST5b, undefined, MAG, "#ffffff", 76),
  ],
  sounds: [
    {src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_pop", t: b5, vol: 0.7}, {src: "sfx_pop", t: b5 + w1 * D.ST5b, vol: 0.7},
    {src: "sfx_pop", t: b5 + w2 * D.ST5b, vol: 0.7}, {src: "sfx_trombone", t: b5 + D.ST5b + 0.3, vol: 0.5},
  ],
  shakes: [{t: b5 + w2 * D.ST5b, dur: 0.5, amp: 10}],
})];

// Story 6: chamada para comentar no reel (figurinha de link do post, abaixo da etiqueta)
const a6 = 0.5, b6 = a6 + D.ST6a + 0.45, l6 = b6 + D.ST6b + 0.5;
export const STORY6: Scene[] = [mk({
  id: "story6-cta",
  images: [{src: "frames/s7.jpg", from: 0}, {src: "frames/s16.jpg", from: b6 - 0.2}],
  items: [
    {k: "balloon", who: "ela", text: "Vai lá no reel e comenta o seu minutinho mais longo!", voice: "ST6a", t: a6, x: 110, y: 255, w: 860, tail: "bl", size: 50, emph: ["reel", "comenta"]},
    {k: "flash", t: b6 - 0.2, color: "#ffffff", dur: 0.2, a: 0.6},
    {k: "balloon", who: "think", text: "Eu quero ver se alguém dormiu mais que eu.", voice: "ST6b", t: b6, x: 110, y: 255, w: 860, tail: "bl", size: 54, emph: ["dormiu"]},
    {k: "label", text: "VAI NO REEL", t: l6, x: 240, y: 1290, w: 600, size: 96, bg: MAG, color: "#ffffff", rot: -3},
  ],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_whoosh", t: b6 - 0.25, vol: 0.4}, {src: "sfx_ding", t: l6, vol: 0.55}],
  shakes: [{t: b6 - 0.2, dur: 0.4, amp: 8}],
})];

export const STORY_DURATIONS = {a3, b3, l3, a4, b4, l4, a5, b5, a6, b6, l6, sec};
