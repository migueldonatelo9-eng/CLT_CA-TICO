import React from "react";
import {AbsoluteFill, Img, staticFile} from "remotion";

const INK = "#111111", YEL = "#FFE600", MAG = "#FF2D95";
const FX = '"Bangers", "DejaVu Sans", sans-serif';
const BODY = '"Comic Neue", "DejaVu Sans", sans-serif';
const TOTAL = 7;

type Frase = {n: 2 | 3 | 4 | 5 | 6; kind: "frase"; img: string; phrase: string; trad: string; bx: number; by: number; bw: number; size?: number; tsize?: number; tail?: boolean; tailSide?: "l" | "r"};
type Slide = {n: 1; kind: "cover"; img: string} | Frase | {n: 7; kind: "fecho"; img: string};

export const SLIDES: Slide[] = [
  {n: 1, kind: "cover", img: "frames/k1.jpg"},
  {n: 2, kind: "frase", img: "frames/k3.jpg", phrase: "“Está frio demais para levantar.”", trad: "O COBERTOR ME PRENDEU.", bx: 60, by: 40, bw: 640, size: 52},
  {n: 3, kind: "frase", img: "frames/k4.jpg", phrase: "“Preciso pensar na vida.”", trad: "PENSAR DE OLHOS FECHADOS CONTA.", bx: 620, by: 40, bw: 400, size: 46, tsize: 74, tailSide: "r"},
  {n: 4, kind: "frase", img: "frames/k5.jpg", phrase: "“Não posso magoar a almofada.”", trad: "ELA ME ABRAÇOU PRIMEIRO.", bx: 60, by: 40, bw: 700, size: 52},
  {n: 5, kind: "frase", img: "frames/k6.jpg", phrase: "“Depois eu te respondo.”", trad: "FALA COM A MÃO.", bx: 330, by: 40, bw: 690, size: 52},
  {n: 6, kind: "frase", img: "frames/k7.jpg", phrase: "“Eu mereço descansar.”", trad: "O TRONO É MEU. O CONTROLE TAMBÉM.", bx: 40, by: 40, bw: 390, size: 46, tsize: 74},
  {n: 7, kind: "fecho", img: "frames/k2.jpg"},
];

const Brand: React.FC<{n: number}> = ({n}) => (
  <>
    <div style={{position: "absolute", left: 56, top: 46, background: INK, color: YEL, fontFamily: FX, fontSize: 36, letterSpacing: 3, padding: "4px 18px 2px", border: `5px solid ${YEL}`, borderRadius: 10, rotate: "-2deg", zIndex: 5}}>CLT CAÓTICA</div>
    <div style={{position: "absolute", right: 50, top: 46, background: YEL, color: INK, fontFamily: BODY, fontWeight: 700, fontSize: 38, letterSpacing: 1, padding: "0 22px", border: `5px solid ${INK}`, borderRadius: 40, boxShadow: `6px 6px 0 ${INK}`, zIndex: 5}}>{n}/{TOTAL}{n < TOTAL ? " ›" : ""}</div>
  </>
);

const Balloon: React.FC<{text: string; x: number; y: number; w: number; size?: number; tail?: boolean; tailSide?: "l" | "r"}> = ({text, x, y, w, size = 58, tail = true, tailSide = "l"}) => (
  <div style={{position: "absolute", left: x, top: y, width: w, zIndex: 4}}>
    <div style={{background: "#FFFFFF", color: INK, border: `8px solid ${INK}`, borderRadius: 48, padding: "22px 32px 24px", fontFamily: BODY, fontWeight: 700, fontSize: size, lineHeight: 1.15, boxShadow: `12px 12px 0 ${INK}`}}>{text}</div>
    {tail && (
      <svg width={120} height={84} viewBox="0 0 120 104" style={{position: "absolute", ...(tailSide === "l" ? {left: 70} : {right: 70, transform: "scaleX(-1)"}), top: "100%", marginTop: -10, overflow: "visible"}}>
        <path d="M8 0 C 14 44, 40 82, 100 100 C 70 72, 66 38, 66 0 Z" fill="#FFFFFF" />
        <path d="M8 0 C 14 44, 40 82, 100 100 C 70 72, 66 38, 66 0" fill="none" stroke={INK} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" clipPath="inset(10px -30px -10px -30px)" />
      </svg>
    )}
  </div>
);

const Cover: React.FC<{img: string}> = ({img}) => (
  <>
    <Img src={staticFile(img)} style={{position: "absolute", left: 0, top: 0, width: 1080, height: 1350, objectFit: "cover"}} />
    <Brand n={1} />
    <div style={{position: "absolute", left: 50, top: 120, fontFamily: FX, fontSize: 150, lineHeight: 0.92, letterSpacing: 4, color: "#FFFFFF", WebkitTextStroke: `12px ${INK}`, paintOrder: "stroke fill", textShadow: `10px 10px 0 ${MAG}`, rotate: "-3deg", zIndex: 4}}>
      5 DESCULPAS
    </div>
    <div style={{position: "absolute", left: 60, top: 275, fontFamily: FX, fontSize: 70, lineHeight: 1, letterSpacing: 3, color: YEL, WebkitTextStroke: `8px ${INK}`, paintOrder: "stroke fill", textShadow: `6px 6px 0 ${INK}`, rotate: "-3deg", zIndex: 4}}>
      PARA FICAR NO SOFÁ
    </div>
    <div style={{position: "absolute", left: 60, right: 60, bottom: 60, background: YEL, border: `8px solid ${INK}`, padding: "16px 26px 12px", textAlign: "center", fontFamily: FX, fontSize: 64, letterSpacing: 2, lineHeight: 1.05, color: INK, boxShadow: `12px 12px 0 ${INK}`, rotate: "-1.5deg", zIndex: 4}}>
      SÓ MAIS CINCO MINUTINHOS ›
    </div>
  </>
);

const FraseView: React.FC<{s: Frase}> = ({s}) => (
  <>
    <Img src={staticFile(s.img)} style={{position: "absolute", left: 0, top: 0, width: 1080, height: 1350, objectFit: "cover"}} />
    <Brand n={s.n} />
    <Balloon text={s.phrase} x={s.bx} y={s.by + 80} w={s.bw} size={s.size} tail={s.tail ?? true} tailSide={s.tailSide ?? "l"} />
    <div style={{position: "absolute", left: 60, right: 60, bottom: 50, rotate: "-1.5deg", zIndex: 4}}>
      <div style={{position: "absolute", left: 24, top: -40, background: INK, color: YEL, fontFamily: FX, fontSize: 34, letterSpacing: 2, padding: "2px 18px", border: `5px solid ${YEL}`, borderRadius: 10}}>O QUE ELA QUIS DIZER</div>
      <div style={{background: YEL, border: `8px solid ${INK}`, padding: "18px 28px 10px", textAlign: "center", boxShadow: `12px 12px 0 ${INK}`}}>
        <div style={{fontFamily: FX, fontSize: s.tsize ?? 92, lineHeight: 1.0, letterSpacing: 2, color: MAG, WebkitTextStroke: "7px #111111", paintOrder: "stroke fill"}}>{s.trad}</div>
      </div>
    </div>
  </>
);

const Fecho: React.FC<{img: string}> = ({img}) => (
  <>
    <Img src={staticFile(img)} style={{position: "absolute", left: 0, top: 0, width: 1080, height: 1350, objectFit: "cover"}} />
    <Brand n={7} />
    <div style={{position: "absolute", left: 60, top: 120, right: 60, fontFamily: FX, fontSize: 100, lineHeight: 1.0, letterSpacing: 3, color: "#FFFFFF", WebkitTextStroke: `10px ${INK}`, paintOrder: "stroke fill", textShadow: `8px 8px 0 ${INK}`, rotate: "-2deg", zIndex: 4}}>
      QUAL É A SUA DESCULPA FAVORITA?
    </div>
    <div style={{position: "absolute", left: 60, right: 60, bottom: 50, background: YEL, border: `8px solid ${INK}`, padding: "16px 24px 8px", textAlign: "center", boxShadow: `12px 12px 0 ${INK}`, rotate: "-1.5deg", zIndex: 4}}>
      <div style={{fontFamily: FX, fontSize: 112, lineHeight: 1.0, letterSpacing: 3, color: MAG, WebkitTextStroke: "7px #111111", paintOrder: "stroke fill"}}>COMENTA AQUI!</div>
    </div>
  </>
);

export const CarouselSlide: React.FC<{n: number}> = ({n}) => {
  const s = SLIDES.find((x) => x.n === n) ?? SLIDES[0];
  return (
    <AbsoluteFill style={{background: YEL, overflow: "hidden"}}>
      {s.kind === "cover" && <Cover img={s.img} />}
      {s.kind === "frase" && <FraseView s={s} />}
      {s.kind === "fecho" && <Fecho img={s.img} />}
      <AbsoluteFill style={{pointerEvents: "none", opacity: 0.07, mixBlendMode: "multiply", backgroundImage: "radial-gradient(rgba(0,0,0,0.9) 1.4px, transparent 1.8px)", backgroundSize: "11px 11px"}} />
    </AbsoluteFill>
  );
};
