import React from "react";
import {AbsoluteFill, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {Audio} from "@remotion/media";
import {loadFont} from "@remotion/fonts";
import {D, FPS, SCENES, TOTAL_FRAMES, sceneDurFrames, sceneStarts, sec} from "./timeline";
import type {BalloonItem, BigItem, BurstItem, FlashItem, Item, NarrItem, Scene, SfxItem} from "./timeline";

loadFont({family: "Bangers", url: staticFile("fonts/Bangers.woff2"), weight: "400"});
loadFont({family: "Comic Neue", url: staticFile("fonts/ComicNeue-Bold.woff2"), weight: "700"});

const INK = "#111111", YEL = "#FFE600", MAG = "#FF2D95", MAGD = "#C4005F", CYAN = "#00E5FF", NIGHT = "#1B1464";
const FX = '"Bangers", "DejaVu Sans", sans-serif';
const BODY = '"Comic Neue", "DejaVu Sans", sans-serif';
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

// ----------------------------------------------------------------- balões
const normWord = (w: string) => w.toLowerCase().replace(/[.,!?:;…]/g, "");

const Tail: React.FC<{side: "bl" | "br"; fill: string; stroke: string; w: number; think: boolean}> = ({side, fill, stroke, w, think}) => {
  const left = side === "bl" ? 70 : w - 190;
  if (think) {
    return (
      <>
        <div style={{position: "absolute", left: left + 20, top: "100%", marginTop: 8, width: 38, height: 38, borderRadius: 19, background: fill, border: `6px solid ${stroke}`}} />
        <div style={{position: "absolute", left: left - 6, top: "100%", marginTop: 56, width: 22, height: 22, borderRadius: 11, background: fill, border: `5px solid ${stroke}`}} />
      </>
    );
  }
  const flip = side === "br";
  const id = React.useId().replace(/:/g, "");
  return (
    <svg width={120} height={104} viewBox="0 0 120 104" style={{position: "absolute", left, top: "100%", marginTop: -10, overflow: "visible", scale: flip ? "-1 1" : "1 1"}}>
      <defs><clipPath id={id}><rect x={-30} y={10} width={200} height={120} /></clipPath></defs>
      <path d="M8 0 C 14 44, 40 82, 100 100 C 70 72, 66 38, 66 0 Z" fill={fill} />
      <path d="M8 0 C 14 44, 40 82, 100 100 C 70 72, 66 38, 66 0" fill="none" stroke={stroke} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" clipPath={`url(#${id})`} />
    </svg>
  );
};

const BalloonView: React.FC<{b: BalloonItem}> = ({b}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t0 = sec(b.t);
  const aud = Math.round(D[b.voice] * fps);
  const end = t0 + aud + 12;
  if (frame < t0 || frame > end + 8) return null;
  const local = frame - t0;
  const pop = spring({frame: local, fps, config: {damping: 9, stiffness: 230, mass: 0.55}});
  const exit = interpolate(frame, [end, end + 8], [1, 0], clamp);
  const think = b.who === "think", chefe = b.who === "chefe";
  const bg = chefe ? INK : think ? "#FFF1F8" : "#FFFFFF";
  const fg = chefe ? "#FFFFFF" : think ? "#3A0A2A" : INK;
  const stroke = chefe ? YEL : think ? MAG : INK;
  const size = b.size ?? 54;
  const words = b.text.split(" ");
  const total = words.reduce((a, w) => a + w.length + 1, 0);
  let cum = 0;
  return (
    <div style={{
      position: "absolute", left: b.x, top: b.y, width: b.w,
      scale: String(interpolate(pop, [0, 1], [0.15, 1]) * interpolate(exit, [0, 1], [0.85, 1])),
      rotate: `${interpolate(pop, [0, 1], [chefe ? 5 : -5, chefe ? -1.5 : 0])}deg`,
      opacity: exit, transformOrigin: b.tail === "bl" ? "14% 100%" : "86% 100%",
    }}>
      {chefe && (
        <div style={{position: "absolute", left: 24, top: -38, background: YEL, color: INK, fontFamily: FX, fontSize: 38, letterSpacing: 2, padding: "2px 18px", border: `5px solid ${INK}`, borderRadius: 10}}>CHEFE</div>
      )}
      <div style={{
        background: bg, color: fg, border: `8px ${think ? "dashed" : "solid"} ${stroke}`,
        borderRadius: think ? 72 : chefe ? 18 : 48, padding: "28px 38px 30px",
        fontFamily: BODY, fontWeight: 700, fontStyle: think ? "italic" : "normal", fontSize: size, lineHeight: 1.18,
        boxShadow: `12px 12px 0 ${chefe ? MAG : INK}`,
      }}>
        {words.map((w, i) => {
          const startF = t0 + 4 + Math.floor((cum / total) * aud * 0.9);
          cum += w.length + 1;
          const lf = frame - startF;
          const vis = lf >= 0;
          const emph = (b.emph ?? []).includes(normWord(w));
          const wp = spring({frame: Math.max(0, lf), fps, config: {damping: 10, stiffness: 260, mass: 0.5}});
          const mark = interpolate(lf, [2, 10], [0, 1], clamp);
          return (
            <span key={i} style={{
              position: "relative", display: "inline-block", marginRight: emph ? 24 : 20, marginLeft: emph ? 6 : 0,
              opacity: vis ? 1 : 0,
              scale: String(vis ? interpolate(wp, [0, 1], [0.6, emph ? 1.1 : 1]) : 0.6),
              color: emph ? (chefe ? YEL : think ? MAGD : INK) : fg, fontWeight: emph ? 700 : 700,
            }}>
              {emph && vis && !chefe && (
                <span style={{position: "absolute", left: -4, right: -4, bottom: 4, height: "42%", background: think ? "#FFD3EB" : YEL, zIndex: -1, transformOrigin: "left", scale: `${mark} 1`}} />
              )}
              {emph && vis && chefe && (
                <span style={{position: "absolute", left: 0, right: 0, bottom: -2, height: 8, background: MAG, transformOrigin: "left", scale: `${mark} 1`}} />
              )}
              {w}
            </span>
          );
        })}
      </div>
      <Tail side={b.tail} fill={bg} stroke={stroke} w={b.w} think={think} />
    </div>
  );
};

// ------------------------------------------------------- caixa de narração
const NarrView: React.FC<{n: NarrItem}> = ({n}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (!n.text) return null;
  const t0 = sec(n.t);
  const local = frame - t0;
  if (local < 0) return null;
  const pop = spring({frame: local, fps, config: {damping: 10, stiffness: 200}});
  const words = n.text.split(" ");
  const aud = Math.round(D[n.voice] * fps);
  const total = words.reduce((a, w) => a + w.length + 1, 0);
  let cum = 0;
  return (
    <div style={{
      position: "absolute", left: n.x, top: n.y, width: n.w, background: YEL, border: `8px solid ${INK}`, padding: "30px 40px",
      fontFamily: BODY, fontWeight: 700, fontStyle: "italic", fontSize: n.size, lineHeight: 1.15, textAlign: "center", color: INK,
      boxShadow: `14px 14px 0 ${INK}`, scale: String(interpolate(pop, [0, 1], [0.3, 1])), rotate: "-2deg",
    }}>
      {words.map((w, i) => {
        const st = t0 + 4 + Math.floor((cum / total) * aud * 0.9);
        cum += w.length + 1;
        return <span key={i} style={{display: "inline-block", marginRight: 16, opacity: frame >= st ? 1 : 0}}>{w}</span>;
      })}
    </div>
  );
};

// ------------------------------------------------------------ onomatopeia
const starPoints = (r1: number, r2: number, n: number) =>
  Array.from({length: n * 2}, (_, i) => {
    const r = i % 2 === 0 ? r1 : r2;
    const a = (Math.PI * i) / n - Math.PI / 2;
    return `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

const SfxView: React.FC<{s: SfxItem}> = ({s}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t0 = sec(s.t), dur = sec(s.dur ?? 1.0);
  const local = frame - t0;
  if (local < 0 || local > dur) return null;
  const sp = spring({frame: local, fps, config: {damping: 6, stiffness: 320, mass: 0.5}});
  const out = interpolate(local, [dur - 8, dur], [1, 0], clamp);
  const wob = Math.sin(local * 0.9) * 2.5;
  const R = s.size * 1.25;
  return (
    <div style={{position: "absolute", left: s.x, top: s.y, translate: "-50% -50%", rotate: `${s.rot + wob}deg`, scale: String(interpolate(sp, [0, 1], [0.2, 1])), opacity: out}}>
      {s.star && (
        <svg width={R * 2} height={R * 2} viewBox={`${-R} ${-R} ${R * 2} ${R * 2}`} style={{position: "absolute", left: "50%", top: "50%", translate: "-50% -50%", rotate: `${local * 2}deg`, overflow: "visible"}}>
          <polygon points={starPoints(R, R * 0.62, 12)} fill={s.star} stroke={INK} strokeWidth={9} strokeLinejoin="round" />
        </svg>
      )}
      <div style={{position: "relative", fontFamily: FX, fontSize: s.size, color: s.color, letterSpacing: 4, whiteSpace: "nowrap", WebkitTextStroke: `${Math.round(s.size / 14)}px ${INK}`, paintOrder: "stroke fill", textShadow: `8px 8px 0 ${INK}`}}>{s.text}</div>
    </div>
  );
};

const BurstView: React.FC<{b: BurstItem}> = ({b}) => {
  const t = useCurrentFrame() - sec(b.t);
  const dur = 28;
  if (t < 0 || t > dur) return null;
  return (
    <div style={{
      position: "absolute", left: b.x - 480, top: b.y - 480, width: 960, height: 960, borderRadius: "50%",
      scale: String(interpolate(t, [0, dur], [0.35, 1.35])), rotate: `${t * 5}deg`, opacity: interpolate(t, [0, dur], [0.9, 0]),
      background: `repeating-conic-gradient(${b.color ?? YEL} 0deg 7deg, transparent 7deg 20deg)`,
      maskImage: "radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)",
    }} />
  );
};

const FlashView: React.FC<{f: FlashItem}> = ({f}) => {
  const t = useCurrentFrame() - sec(f.t);
  const dur = sec(f.dur ?? 0.3);
  if (t < 0 || t > dur) return null;
  return <AbsoluteFill style={{background: f.color, opacity: interpolate(t, [0, dur], [f.a ?? 0.6, 0]), pointerEvents: "none"}} />;
};

// ------------------------------------------------------ frases de impacto
const BigView: React.FC<{b: BigItem}> = ({b}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - sec(b.t);
  if (local < 0) return null;
  const endF = b.until !== undefined ? sec(b.until) : Infinity;
  if (frame > endF + 6) return null;
  const sp = spring({frame: local, fps, config: {damping: 8, stiffness: 240, mass: 0.6}});
  const out = b.until !== undefined ? interpolate(frame, [endF, endF + 6], [1, 0], clamp) : 1;
  const alt = b.t > 4;
  return (
    <div style={{
      position: "absolute", left: 60, top: b.y, width: 960, background: b.bg, color: b.color, border: `8px solid ${INK}`,
      padding: "24px 34px 20px", fontFamily: FX, fontSize: b.size, letterSpacing: 2, lineHeight: 1.05, textAlign: "center",
      boxShadow: `14px 14px 0 ${INK}`, scale: String(interpolate(sp, [0, 1], [0.4, 1]) * interpolate(out, [0, 1], [0.8, 1])), rotate: `${alt ? 2 : -2}deg`,
      opacity: interpolate(local, [0, 4], [0, 1], clamp) * out,
    }}>{b.text}</div>
  );
};

const CtaView: React.FC<{t: number}> = ({t}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - sec(t);
  if (local < 0) return null;
  const sp = spring({frame: local, fps, config: {damping: 9, stiffness: 200}});
  const bounce = Math.sin(local * 0.45) * 14;
  return (
    <div style={{position: "absolute", left: 60, top: 1290, width: 960, scale: String(interpolate(sp, [0, 1], [0.5, 1])), opacity: interpolate(local, [0, 5], [0, 1], clamp)}}>
      <div style={{background: YEL, border: `8px solid ${INK}`, padding: "22px 30px 18px", textAlign: "center", boxShadow: `14px 14px 0 ${INK}`, rotate: "-1.5deg"}}>
        <div style={{fontFamily: FX, fontSize: 70, lineHeight: 1.05, color: INK, letterSpacing: 2}}>QUAL FOI O SEU FEEDBACK MAIS RÁPIDO?</div>
        <div style={{fontFamily: FX, fontSize: 104, lineHeight: 1.0, color: MAG, WebkitTextStroke: `6px ${INK}`, paintOrder: "stroke fill", letterSpacing: 3}}>COMENTA AQUI!</div>
      </div>
      <svg width={160} height={150} viewBox="0 0 160 150" style={{display: "block", margin: "14px auto 0", translate: `0 ${bounce}px`}}>
        <path d="M80 8 V96 M34 62 L80 118 L126 62" fill="none" stroke={INK} strokeWidth={34} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M80 8 V96 M34 62 L80 118 L126 62" fill="none" stroke={MAG} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

const ItemView: React.FC<{item: Item}> = ({item}) => {
  switch (item.k) {
    case "balloon": return <BalloonView b={item} />;
    case "sfx": return <SfxView s={item} />;
    case "flash": return <FlashView f={item} />;
    case "burst": return <BurstView b={item} />;
    case "narr": return <NarrView n={item} />;
    case "big": return <BigView b={item} />;
    case "cta": return <CtaView t={item.t} />;
  }
};

// ------------------------------------------------ transição: listras de tinta
const Wipes: React.FC<{dur: number}> = ({dur}) => {
  const frame = useCurrentFrame();
  const cols = [INK, MAG, YEL];
  return (
    <>
      {cols.map((c, i) => {
        const inP = interpolate(frame, [i * 2, 12 + i * 2], [0, 1], {...clamp, easing: Easing.bezier(0.7, 0, 0.3, 1)});
        const outP = interpolate(frame, [dur - 10 - i * 2, dur - i * 2], [0, 1], {...clamp, easing: Easing.bezier(0.7, 0, 0.3, 1)});
        const x = frame < dur / 2 ? inP * 1700 : -1700 + outP * 1700;
        const show = frame < 16 + i * 2 || frame > dur - 12 - i * 2;
        if (!show) return null;
        return <div key={i} style={{position: "absolute", top: -50, left: -300 + i * 70, width: 1500, height: 2020, background: c, transform: `translateX(${x}px) skewX(-10deg)`}} />;
      })}
    </>
  );
};

// ------------------------------------------------------------------ cena
const SceneView: React.FC<{scene: Scene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const durF = sec(scene.dur);
  let dx = 0, dy = 0, punch = 0;
  for (const s of scene.shakes) {
    const t = frame - sec(s.t), d = sec(s.dur);
    if (t >= 0 && t <= d) {
      const k = 1 - t / d;
      dx += s.amp * k * Math.sin(t * 2.7);
      dy += s.amp * k * Math.cos(t * 3.9);
      punch += 0.05 * k * k;
    }
  }
  const z = interpolate(frame, [0, durF], [scene.z0, scene.z1], {...clamp, easing: Easing.bezier(0.3, 0.1, 0.3, 1)}) + punch;
  const drift = interpolate(frame, [0, durF], [-10, 10], clamp);
  const img = [...scene.images].reverse().find((i) => frame >= sec(i.from)) ?? scene.images[0];
  return (
    <AbsoluteFill style={{background: YEL, overflow: "hidden"}}>
      <AbsoluteFill style={{translate: `${dx + drift}px ${dy}px`}}>
        <Img src={staticFile(img.src)} style={{width: 1080, height: 1920, objectFit: "cover", scale: String(z), transformOrigin: scene.origin}} />
        {scene.items.map((it, i) => <ItemView key={i} item={it} />)}
      </AbsoluteFill>
      <Wipes dur={durF} />
    </AbsoluteFill>
  );
};

// -------------------------- camada global: marca, progresso, pontilhado, vinheta
const GlobalOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      <AbsoluteFill style={{background: "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,0.32) 100%)"}} />
      <AbsoluteFill style={{opacity: 0.07, mixBlendMode: "multiply", backgroundImage: "radial-gradient(rgba(0,0,0,0.9) 1.4px, transparent 1.8px)", backgroundSize: "11px 11px"}} />
      <div style={{position: "absolute", left: 56, top: 66, background: INK, color: YEL, fontFamily: FX, fontSize: 38, letterSpacing: 3, padding: "4px 20px 2px", border: `5px solid ${YEL}`, borderRadius: 10, rotate: "-2deg"}}>CLT CAÓTICA</div>
      <div style={{position: "absolute", left: 0, bottom: 0, height: 12, width: `${(frame / TOTAL_FRAMES) * 100}%`, background: MAG}} />
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ áudio
type AudioEvt = {src: string; at: number; vol: number};
const buildAudio = (): AudioEvt[] => {
  const evts: AudioEvt[] = [];
  SCENES.forEach((s, i) => {
    const base = sceneStarts[i];
    s.items.forEach((it) => {
      if (it.k === "balloon" || it.k === "narr") evts.push({src: it.voice, at: base + sec(it.t), vol: 1});
      if (it.k === "balloon" || it.k === "narr") { if (it.k === "balloon" || it.text) evts.push({src: "sfx_pop", at: base + sec(it.t) - 1, vol: 0.35}); }
    });
    s.sounds.forEach((sn) => evts.push({src: sn.src, at: base + sec(sn.t), vol: sn.vol}));
  });
  return evts;
};
const AUDIO = buildAudio();

export const Dia1: React.FC = () => (
  <AbsoluteFill style={{background: "#000"}}>
    {SCENES.map((s, i) => (
      <Sequence key={s.id} name={s.id} from={sceneStarts[i]} durationInFrames={sceneDurFrames[i]} premountFor={FPS}>
        <SceneView scene={s} />
      </Sequence>
    ))}
    <GlobalOverlay />
    {AUDIO.map((a, i) => (
      <Sequence key={i} from={Math.max(0, a.at)} layout="none">
        <Audio src={staticFile(`audio/${a.src}.wav`)} volume={a.vol} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
