import { interpolate, useCurrentFrame } from 'remotion';
import { C, clamp, Native, progress, Reveal, Stage, Title } from '../Design';

export const Presence = () => {
  const f = useCurrentFrame();
  const open = progress(f, 30, 27);
  const faded = interpolate(f, [83, 100, 119, 137], [1, 0.16, 0.16, 1], clamp);
  const x = interpolate(
    f,
    [0, 25, 43, 79, 96, 150],
    [1320, 1320, 1370, 1370, 1730, 1730],
    clamp,
  );
  const y = interpolate(
    f,
    [0, 25, 43, 79, 96, 150],
    [660, 660, 230, 230, 755, 755],
    clamp,
  );
  return (
    <Stage step="05 / YOUR KIND OF QUIET">
      <Title at={0} style={{ left: 100, top: 244, fontSize: 119 }}>
        There when
        <br />
        you need it.
      </Title>
      <Reveal
        at={16}
        style={{
          position: 'absolute',
          left: 108,
          top: 560,
          fontSize: 32,
          color: C.muted,
          lineHeight: 1.5,
        }}
      >
        A small place on your desktop.
        <br />A little more room to focus.
      </Reveal>
      <Reveal
        at={28}
        style={{
          position: 'absolute',
          left: 108,
          top: 809,
          fontSize: 21,
          color: C.mauve,
        }}
      >
        Choose your visibility and behavior.
      </Reveal>
      <div
        style={{
          position: 'absolute',
          left: 970,
          top: 180,
          width: 850,
          height: 700,
          background: '#e6e5e2',
          borderRadius: 30,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 30,
            right: 30,
            top: 80,
            bottom: 27,
            background: '#fdfdfc',
            border: '1px solid #d3d3cd',
            borderRadius: 12,
            padding: '25px 32px',
            color: '#9c9c94',
            fontSize: 18,
          }}
        >
          <div style={{ borderBottom: '1px solid #e8e8e3', paddingBottom: 22 }}>
            workspace / ideas.tsx
          </div>
          {[60, 83, 70, 50, 77, 61, 84, 48, 69, 80, 55, 70].map((w, i) => (
            <div
              key={i}
              style={{
                height: 7,
                width: `${w}%`,
                marginTop: 24,
                marginLeft: (i % 3) * 24,
                borderRadius: 5,
                background: i % 3 === 0 ? '#d2c9cf' : '#e4e4de',
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 65,
            top: 0,
            opacity: faded,
            filter: 'drop-shadow(0 18px 25px #29202724)',
          }}
        >
          <div
            style={{
              height: interpolate(open, [0, 1], [60, 634], clamp),
              overflow: 'hidden',
              borderRadius: '0 0 22px 22px',
            }}
          >
            <Native src="limits-custom" width={720} />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 13,
            width: '100%',
            textAlign: 'center',
            fontSize: 14,
            color: '#7c7b77',
          }}
        >
          Editorial hover and fading demonstration
        </div>
      </div>
      <svg
        width="27"
        height="36"
        viewBox="0 0 27 36"
        style={{
          position: 'absolute',
          left: x,
          top: y,
          filter: 'drop-shadow(1px 2px 2px #0003)',
        }}
      >
        <path
          d="M2 2v28l7-8 7 13 6-3-7-12 10-2Z"
          fill="#181818"
          stroke="#fff"
          strokeWidth="2"
        />
      </svg>
    </Stage>
  );
};
