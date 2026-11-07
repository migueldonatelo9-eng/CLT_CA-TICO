import React from "react";
import {Composition} from "remotion";
import {Dia1, Montage} from "./Composition";
import {CarouselSlide} from "./Carousel";
import {MemePost} from "./Meme";
import {FPS, SCENES, layout} from "./timeline";
import {STORY1, STORY2, STORY3, STORY4, STORY5, STORY6} from "./stories";

const story = (id: string, scenes: typeof STORY1, brand: boolean) => {
  const total = layout(scenes).total;
  const C: React.FC = () => <Montage scenes={scenes} brand={brand} progress={false} />;
  return <Composition key={id} id={id} component={C} durationInFrames={total} fps={FPS} width={1080} height={1920} />;
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="CLT-Dia2" component={Dia1} durationInFrames={layout(SCENES).total} fps={FPS} width={1080} height={1920} />
      {story("Story1", STORY1, false)}
      {story("Story2", STORY2, false)}
      {story("Story3", STORY3, false)}
      {story("Story4", STORY4, false)}
      {story("Story5", STORY5, false)}
      {story("Story6", STORY6, false)}
      <Composition id="Carousel" component={CarouselSlide} durationInFrames={1} fps={FPS} width={1080} height={1350} defaultProps={{n: 1}} />
      <Composition id="Meme" component={MemePost} durationInFrames={1} fps={FPS} width={1080} height={1350} defaultProps={{n: 1}} />
    </>
  );
};
