import { AbsoluteFill, Series, staticFile } from 'remotion';
import { Audio } from '@remotion/media';
import { Intro } from './scenes/Intro';
import { Limits } from './scenes/Limits';
import { Activity } from './scenes/Activity';
import { Attention } from './scenes/Attention';
import { Themes } from './scenes/Themes';
import { Presence } from './scenes/Presence';
import { Outro } from './scenes/Outro';
import { CHAPTERS } from './timeline';
import { Fonts } from './Design';

export const scenes = [
  Intro,
  Limits,
  Activity,
  Attention,
  Themes,
  Presence,
  Outro,
];
export const PeakPromo = () => (
  <AbsoluteFill>
    <Fonts />
    <Audio src={staticFile('audio/headspace.wav')} volume={0.8} />
    <Series>
      {CHAPTERS.map((chapter, index) => {
        const Scene = scenes[index];
        return (
          <Series.Sequence
            key={chapter.id}
            name={chapter.name}
            durationInFrames={chapter.duration}
          >
            <Scene />
          </Series.Sequence>
        );
      })}
    </Series>
  </AbsoluteFill>
);
