import React from "react";
import {AbsoluteFill, Img, staticFile} from "remotion";

const INK = "#111111", YEL = "#FFE600", MAG = "#FF2D95";
const FX = '"Bangers", "DejaVu Sans", sans-serif';
const BODY = '"Comic Neue", "DejaVu Sans", sans-serif';

type Slide =
  | {n: 1; kind: "cover"; img: string}
  | {n: 2 | 3 | 4 | 5; kind: "frase"; img: string; y0: number; who: "chefe" | "ela"; phrase: string; trad: string; tab: string; bx: number; by: number; bw: number; size?: number}
  | {n: 6; kind: "fecho"; img: string};

export const SLIDES: Slide[] = [
  {n: 1, kind: "cover", img: "frames/k1.jpg"},
  {n: 2, kind: "frase", img: "frames/c2.jpg", y0: 150, who: "chefe", phrase: "“Tem um minutinho?”", trad: "CANCELE SEUS PLANOS.", tab: "O QUE ELE QUIS DIZER", bx: 70, by: 150, bw: 700},
  {n: 3, kind: "frase", img: "frames/c5.jpg", y0: 480, who: "chefe", phrase: "“Gostei muito do seu trabalho.”", trad: "VEM COISA AÍ.", tab: "O QUE ELE QUIS DIZER", bx: 70, by: 150, bw: 800},
  {n: 4, kind: "frase", img: "frames/c6.jpg", y0: 380, who: "chefe", phrase: "“Refaz tudo, é pra ontem.”", trad: "MEU FIM DE SEMANA ACABOU.", tab: "O QUE ELE QUIS DIZER", bx: 70, by: 140, bw: 800},
  {n: 5, kind: "frase", img: "frames/c7r.jpg", y0: 90, who: "ela", phrase: "“Perfeito, vou ajustar.”", trad: "ESTOU ME SEGURANDO.", tab: "O QUE ELA QUIS DIZER", bx: 230, by: 100, bw: 780, size: 78},
  {n: 6, kind: "fecho", img: "frames/k2.jpg"},
];

const Brand: React.FC<{n: number}> = ({n}) => (
  <>
    <div style={{position: "absolute", left: 56, top: 46, background: INK, color: YEL, fontFamily: FX, fontSize: 36, letterSpacing: 3, padding: "4px 18px 2px", border: `5px solid ${YEL}`, borderRadius: 10, rotate: "-2deg"}}>CLT CAÓTICA</div>
    <div style={{position: "absolute", right: 50, top: 46, background: YEL, color: INK, fontFamily: FX, fontSize: 40, letterSpacing: 2, padding: "2px 22px 0", border: `5px solid ${INK}`, borderRadius: 40, boxShadow: `6px 6px 0 ${INK}`}}>{n}/6{n < 6 ? " ›" : ""}</div>
  </>
);

const Balloon: React.FC<{who: "chefe" | "ela"; text: string; x: number; y: number; w: number; size?: number}> = ({who, text, x, y, w, size = 58}) => {
  const chefe = who === "chefe";
  const bg = chefe ? INK : "#FFFFFF", fg = chefe ? "#FFFFFF" : INK, stroke = chefe ? YEL : INK;
  return (
    <div style={{position: "absolute", left: x, top: y, width: w, rotate: chefe ? "-1.5deg" : "0deg"}}>
      {chefe && <div style={{position: "absolute", left: 24, top: -38, background: YEL, color: INK, fontFamily: FX, fontSize: 38, letterSpacing: 2, padding: "2px 18px", border: `5px solid ${INK}`, borderRadius: 10}}>CHEFE</div>}
      <div style={{background: bg, color: fg, border: `8px solid ${stroke}`, borderRadius: chefe ? 18 : 48, padding: "24px 34px 26px", fontFamily: BODY, fontWeight: 700, fontSize: size, lineHeight: 1.15, boxShadow: `12px 12px 0 ${chefe ? MAG : INK}`}}>{text}</div>
      <svg width={120} height={104} viewBox="0 0 120 104" style={{position: "absolute", left: 70, top: "100%", marginTop: -10, overflow: "visible"}}>
        <path d="M8 0 C 14 44, 40 82, 100 100 C 70 72, 66 38, 66 0 Z" fill={bg} />
        <path d="M8 0 C 14 44, 40 82, 100 100 C 70 72, 66 38, 66 0" fill="none" stroke={stroke} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" clipPath="inset(10px -30px -10px -30px)" />
      </svg>
    </div>
  );
};

const Cover: React.FC<{img: string}> = ({img}) => (
  <>
    <Img src={staticFile(img)} style={{position: "absolute", left: 0, top: 0, width: 1080, height: 1350, objectFit: "cover"}} />
    <Brand n={1} />
    <div style={{position: "absolute", left: 60, top: 130, fontFamily: FX, fontSize: 178, lineHeight: 0.95, letterSpacing: 4, color: "#FFFFFF", WebkitTextStroke: `12px ${INK}`, paintOrder: "stroke fill", textShadow: `10px 10px 0 ${MAG}`, rotate: "-3deg"}}>
      TRADUTOR<br />DE CHEFE
    </div>
    <div style={{position: "absolute", left: 60, right: 60, bottom: 70, background: YEL, border: `8px solid ${INK}`, padding: "18px 26px 16px", textAlign: "center", fontFamily: BODY, fontWeight: 700, fontSize: 46, lineHeight: 1.15, boxShadow: `12px 12px 0 ${INK}`, rotate: "-1.5deg"}}>
      O QUE ELE DIZ × O QUE ELE QUIS DIZER
    </div>
  </>
);

const Frase: React.FC<{s: Extract<Slide, {kind: "frase"}>}> = ({s}) => (
  <>
    <Img src={staticFile(s.img)} style={{position: "absolute", left: 0, top: -s.y0, width: 1080, height: 1920, objectFit: "cover"}} />
    <Brand n={s.n} />
    <Balloon who={s.who} text={s.phrase} x={s.bx} y={s.by} w={s.bw} />
    <div style={{position: "absolute", left: 60, right: 60, bottom: 56, rotate: "-1.5deg"}}>
      <div style={{position: "absolute", left: 24, top: -40, background: INK, color: YEL, fontFamily: FX, fontSize: 34, letterSpacing: 2, padding: "2px 18px", border: `5px solid ${YEL}`, borderRadius: 10}}>{s.tab}</div>
      <div style={{background: YEL, border: `8px solid ${INK}`, padding: "20px 28px 12px", textAlign: "center", boxShadow: `12px 12px 0 ${INK}`}}>
        <div style={{fontFamily: FX, fontSize: s.size ?? 92, lineHeight: 1.0, letterSpacing: 2, color: MAG, WebkitTextStroke: `7px ${INK}`, paintOrder: "stroke fill"}}>{s.trad}</div>
      </div>
    </div>
  </>
);

const Fecho: React.FC<{img: string}> = ({img}) => (
  <>
    <Img src={staticFile(img)} style={{position: "absolute", left: 0, top: 0, width: 1080, height: 1350, objectFit: "cover"}} />
    <Brand n={6} />
    <div style={{position: "absolute", left: 60, top: 130, right: 60, fontFamily: FX, fontSize: 112, lineHeight: 1.0, letterSpacing: 3, color: "#FFFFFF", WebkitTextStroke: `10px ${INK}`, paintOrder: "stroke fill", textShadow: `8px 8px 0 ${INK}`, rotate: "-2deg"}}>
      QUAL FRASE DE CHEFE VOCÊ TRADUZIRIA?
    </div>
    <div style={{position: "absolute", left: 60, right: 60, bottom: 56, background: YEL, border: `8px solid ${INK}`, padding: "16px 24px 8px", textAlign: "center", boxShadow: `12px 12px 0 ${INK}`, rotate: "-1.5deg"}}>
      <div style={{fontFamily: FX, fontSize: 112, lineHeight: 1.0, letterSpacing: 3, color: MAG, WebkitTextStroke: `7px ${INK}`, paintOrder: "stroke fill"}}>COMENTA AQUI!</div>
    </div>
  </>
);

export const CarouselSlide: React.FC<{n: number}> = ({n}) => {
  const s = SLIDES.find((x) => x.n === n) ?? SLIDES[0];
  return (
    <AbsoluteFill style={{background: YEL, overflow: "hidden"}}>
      {s.kind === "cover" && <Cover img={s.img} />}
      {s.kind === "frase" && <Frase s={s} />}
      {s.kind === "fecho" && <Fecho img={s.img} />}
      <AbsoluteFill style={{pointerEvents: "none", opacity: 0.07, mixBlendMode: "multiply", backgroundImage: "radial-gradient(rgba(0,0,0,0.9) 1.4px, transparent 1.8px)", backgroundSize: "11px 11px"}} />
    </AbsoluteFill>
  );
};
