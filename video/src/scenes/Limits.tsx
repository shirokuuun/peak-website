import { interpolate, useCurrentFrame } from 'remotion';
import {
  C,
  clamp,
  Native,
  progress,
  Provider,
  Reveal,
  Stage,
  Title,
} from '../Design';

export const Limits = () => {
  const f = useCurrentFrame();
  const p = progress(f, 0, 35);
  return (
    <Stage step="01 / YOUR LIMITS">
      <div
        style={{
          position: 'absolute',
          left: 100,
          top: 174,
          transform: `translateX(${(1 - p) * -110}px) scale(${interpolate(f, [35, 180], [1, 1.035], clamp)})`,
          opacity: p,
          transformOrigin: 'left top',
          filter: 'drop-shadow(0 25px 35px #2018201c)',
        }}
      >
        <Native src="limits-custom" width={835} />
      </div>
      <Title at={5} style={{ left: 1060, top: 215, fontSize: 112 }}>
        Less guessing.
        <br />
        More making.
      </Title>
      <Reveal
        at={21}
        style={{
          position: 'absolute',
          left: 1067,
          top: 505,
          fontSize: 31,
          lineHeight: 1.5,
          color: C.muted,
        }}
      >
        See what’s left in your
        <br />
        5-hour and weekly windows.
        <br />
        Know when they reset.
      </Reveal>
      <Reveal
        at={33}
        style={{
          position: 'absolute',
          left: 1067,
          top: 725,
          fontSize: 27,
          display: 'flex',
          gap: 29,
          alignItems: 'center',
        }}
      >
        <Provider name="Codex" />
        <span style={{ color: '#b9b7b7' }}>+</span>
        <Provider name="Claude" />
      </Reveal>
      <Reveal
        at={55}
        style={{
          position: 'absolute',
          left: 1067,
          top: 865,
          fontSize: 19,
          color: C.mauve,
          display: 'flex',
          gap: 15,
          alignItems: 'center',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: C.mauve,
          }}
        />
        Remaining usage. One quick glance.
      </Reveal>
    </Stage>
  );
};
