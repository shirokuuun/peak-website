import { interpolate, useCurrentFrame } from 'remotion';
import { C, clamp, Native, progress, Reveal, Stage, Title } from '../Design';

export const Attention = () => {
  const f = useCurrentFrame();
  const p = progress(f, 20, 35);
  return (
    <Stage mauve step="03 / WHEN YOU’RE NEEDED">
      <Title
        at={0}
        style={{ left: 100, top: 195, fontSize: 188, letterSpacing: -11 }}
      >
        Your turn.
      </Title>
      <Reveal
        at={12}
        style={{
          position: 'absolute',
          left: 106,
          top: 443,
          fontSize: 35,
          lineHeight: 1.45,
          color: '#e0d8dc',
        }}
      >
        A question. An approval.
        <br />A clear signal to come back.
      </Reveal>
      <div
        style={{
          position: 'absolute',
          right: 127,
          top: 245,
          width: 118,
          height: 118,
          border: '1px solid #ffffff40',
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          opacity: p,
          transform: `scale(${0.7 + p * 0.3})`,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: C.amber,
            boxShadow: `0 0 ${interpolate(f % 60, [0, 30, 60], [20, 45, 20], clamp)}px #f6b63870`,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 100,
          top: 645,
          opacity: p,
          transform: `translateY(${(1 - p) * 80}px)`,
          filter: 'drop-shadow(0 22px 28px #26192235)',
        }}
      >
        <Native src="attention-dark" width={1720} />
      </div>
      <Reveal
        at={43}
        style={{
          position: 'absolute',
          left: 110,
          top: 905,
          fontSize: 20,
          color: '#e0d8dc',
        }}
      >
        Peak observes. Review and respond in Codex.
      </Reveal>
    </Stage>
  );
};
