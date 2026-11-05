import { Composition, Folder } from 'remotion';
import { PeakPromo, scenes } from './PeakPromo';
import { CHAPTERS, DURATION, FPS, HEIGHT, WIDTH } from './timeline';

export const RemotionRoot = () => (
  <>
    <Composition
      id="Peak-Stay-in-the-Work"
      component={PeakPromo}
      width={WIDTH}
      height={HEIGHT}
      fps={FPS}
      durationInFrames={DURATION}
    />
    <Folder name="Scenes">
      {CHAPTERS.map((chapter, index) => (
        <Composition
          key={chapter.id}
          id={`${index + 1}-${chapter.id}`}
          component={scenes[index]}
          width={WIDTH}
          height={HEIGHT}
          fps={FPS}
          durationInFrames={chapter.duration}
        />
      ))}
    </Folder>
  </>
);
