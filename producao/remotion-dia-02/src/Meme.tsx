import React from "react";
import {AbsoluteFill, Img, staticFile} from "remotion";

const INK = "#111111", YEL = "#FFE600", MAG = "#FF2D95";
const FX = '"Bangers", "DejaVu Sans", sans-serif';

type Variant = {img: string; l1: string; l2: string; l1y: number; l2y?: number; size1?: number; size2?: number};

// Meme de vitrine "Domingo à noite, versão real": faixa amarela no topo e piada em duas linhas,
// sempre sobre o fundo azul-noite do topo ou sobre a coberta/roupa. O rosto da ELA fica livre.
const VARIANTS: Record<number, Variant> = {
  1: {img: "frames/m1.jpg", l1: "EU: VOU DORMIR CEDO.", l2: "MEU CÉREBRO: VAMOS REVER TODA A SUA VIDA.", l1y: 150, size1: 82, size2: 70},
  2: {img: "frames/m2.jpg", l1: "SEGUNDA-FEIRA CHEGANDO.", l2: "E EU AQUI, ESPERANDO UM MILAGRE.", l1y: 150, size1: 82, size2: 70},
  3: {img: "frames/m3.jpg", l1: "ÚLTIMO SEGUNDO DE DOMINGO:", l2: "EU E O CELULAR, NO ESCURO.", l1y: 150, size1: 82, size2: 70},
};

const Stroke: React.FC<{size: number; color?: string; children: React.ReactNode; rot?: number}> = ({size, color = "#FFFFFF", children, rot = 0}) => (
  <div style={{fontFamily: FX, fontSize: size, lineHeight: 1.0, letterSpacing: 2, color, textAlign: "center", WebkitTextStroke: `10px ${INK}`, paintOrder: "stroke fill", textShadow: `6px 6px 0 ${INK}`, rotate: `${rot}deg`}}>{children}</div>
);

export const MemePost: React.FC<{n: number}> = ({n}) => {
  const v = VARIANTS[n] ?? VARIANTS[1];
  return (
    <AbsoluteFill style={{background: "#0b1040", overflow: "hidden"}}>
      <Img src={staticFile(v.img)} style={{position: "absolute", left: 0, top: 0, width: 1080, height: 1350, objectFit: "cover"}} />
      <div style={{position: "absolute", left: 56, top: 46, background: INK, color: YEL, fontFamily: FX, fontSize: 36, letterSpacing: 3, padding: "4px 18px 2px", border: `5px solid ${YEL}`, borderRadius: 10, rotate: "-2deg"}}>CLT CAÓTICA</div>
      <div style={{position: "absolute", left: 40, right: 40, top: v.l1y - 40, background: YEL, border: `8px solid ${INK}`, padding: "12px 20px 6px", textAlign: "center", boxShadow: `10px 10px 0 ${INK}`, rotate: "-1.2deg"}}>
        <div style={{fontFamily: FX, fontSize: 60, letterSpacing: 2, color: INK, lineHeight: 1.0}}>DOMINGO À NOITE, VERSÃO REAL:</div>
      </div>
      <div style={{position: "absolute", left: 40, right: 40, bottom: 46}}>
        <Stroke size={v.size1 ?? 80} color="#FFFFFF" rot={-1.5}>{v.l1}</Stroke>
        <div style={{height: 10}} />
        <Stroke size={v.size2 ?? 70} color={YEL} rot={1}>{v.l2}</Stroke>
      </div>
      <AbsoluteFill style={{pointerEvents: "none", opacity: 0.07, mixBlendMode: "multiply", backgroundImage: "radial-gradient(rgba(0,0,0,0.9) 1.4px, transparent 1.8px)", backgroundSize: "11px 11px"}} />
    </AbsoluteFill>
  );
};
