import { useCurrentFrame } from 'remotion';
import { Crop, progress, Reveal, Stage, Title } from '../Design';

export const Activity = () => {
  const f = useCurrentFrame();
  const p = progress(f, 13, 36);
  return (
    <Stage dark step="02 / CODEX ACTIVITY">
      <Title at={1} style={{ left: 100, top: 195, fontSize: 104 }}>
        Keep the work
        <br />
        in sight.
      </Title>
      <Reveal
        at={19}
        style={{
          position: 'absolute',
          left: 108,
          top: 508,
          fontSize: 31,
          lineHeight: 1.5,
          color: '#b9b7b7',
        }}
      >
        The task. The project.
        <br />
        What’s happening right now.
      </Reveal>
      <Reveal
        at={35}
        style={{
          position: 'absolute',
          left: 108,
          top: 757,
          fontSize: 20,
          color: '#a9a6a8',
          borderLeft: '2px solid #67555f',
          paddingLeft: 24,
          lineHeight: 1.6,
        }}
      >
        Local Codex observations.
        <br />
        No need to keep checking every chat.
      </Reveal>
      <div
        style={{
          position: 'absolute',
          left: 830,
          top: 182,
          width: 990,
          opacity: p,
          transform: `translateY(${(1 - p) * 95}px)`,
        }}
      >
        <Crop
          src="tasks-dark"
          width={990}
          y={0}
          height={254}
          style={{ borderRadius: 22 }}
        />
        <Crop
          src="tasks-dark"
          width={990}
          y={275}
          height={1020}
          style={{ marginTop: 25, borderRadius: 25 }}
        />
        <div style={{ fontSize: 17, color: '#9c9a9b', padding: '23px 30px' }}>
          Activity reflects observations, not completion percentage.
        </div>
      </div>
    </Stage>
  );
};
