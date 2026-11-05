import { interpolate, useCurrentFrame } from 'remotion';
import {
  Arrow,
  C,
  clamp,
  Native,
  progress,
  Provider,
  Reveal,
  Stage,
  Title,
} from '../Design';

export const Intro = () => {
  const f = useCurrentFrame();
  const p = progress(f, 20, 45);
  return (
    <Stage step="A LITTLE MORE HEADSPACE">
      <Title
        at={1}
        style={{ left: 100, top: 215, fontSize: 180, letterSpacing: -11 }}
      >
        Stay in
      </Title>
      <Title
        at={9}
        style={{ left: 172, top: 390, fontSize: 180, letterSpacing: -11 }}
      >
        the work.
      </Title>
      <Reveal
        at={28}
        style={{
          position: 'absolute',
          left: 108,
          top: 670,
          fontSize: 32,
          lineHeight: 1.45,
          color: C.muted,
        }}
      >
        Your AI limits in view.
        <br />
        Your attention where it belongs.
      </Reveal>
      <Reveal
        at={39}
        style={{
          position: 'absolute',
          left: 108,
          top: 843,
          fontSize: 24,
          display: 'flex',
          gap: 26,
          alignItems: 'center',
        }}
      >
        <Provider name="Codex" size={34} />
        <span style={{ color: '#bbb' }}>+</span>
        <Provider name="Claude" size={34} />
      </Reveal>
      <div
        style={{
          position: 'absolute',
          left: 1122,
          top: 220,
          width: 680,
          height: 660,
          borderRadius: 40,
          background: '#e9e7e5',
          transform: `translateY(${(1 - p) * 150}px) rotate(${(1 - p) * 5}deg)`,
          opacity: p,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 1040,
          top: 270,
          transform: `translateY(${(1 - p) * 170}px) scale(${interpolate(f, [20, 120], [0.95, 1.025], clamp)})`,
          opacity: p,
          filter: 'drop-shadow(0 32px 35px #29202725)',
        }}
      >
        <Native src="limits-custom" width={760} />
      </div>
      <Reveal
        at={55}
        style={{
          position: 'absolute',
          right: 130,
          top: 165,
          fontSize: 20,
          color: C.muted,
          display: 'flex',
          gap: 15,
          alignItems: 'center',
        }}
      >
        A small notch. A clearer picture.
        <Arrow size={22} />
      </Reveal>
    </Stage>
  );
};
