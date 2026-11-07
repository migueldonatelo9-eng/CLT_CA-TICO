import React from "react";
import {Composition} from "remotion";
import {Dia1} from "./Composition";
import {FPS, TOTAL_FRAMES} from "./timeline";

export const RemotionRoot: React.FC = () => {
  return <Composition id="CLT-Dia1" component={Dia1} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1080} height={1920} />;
};
