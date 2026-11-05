import { interpolate, useCurrentFrame } from 'remotion';
import { C, clamp, Native, progress, Reveal, Stage, Title } from '../Design';

export const Themes = () => {
  const f = useCurrentFrame();
  const p = progress(f, 2, 32);
  const themes = ['Dark', 'Light', 'Mauve'];
  const selected = f < 63 ? 0 : f < 117 ? 1 : 2;
  return (
    <Stage step="04 / YOUR DESKTOP, YOUR STYLE">
      <Title at={0} style={{ left: 100, top: 228, fontSize: 121 }}>
        Feels like
        <br />
        your space.
      </Title>
      <Reveal
        at={18}
        style={{
          position: 'absolute',
          left: 108,
          top: 550,
          fontSize: 32,
          lineHeight: 1.45,
          color: C.muted,
        }}
      >
        Dark. Light. Your color.
        <br />
        Make a little room for you.
      </Reveal>
      <Reveal
        at={29}
        style={{
          position: 'absolute',
          left: 108,
          top: 765,
          display: 'flex',
          gap: 13,
        }}
      >
        {themes.map((name, index) => (
          <div
            key={name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              borderRadius: 50,
              padding: '16px 22px',
              border: `1px solid ${selected === index ? C.ink : C.line}`,
              background: selected === index ? C.ink : 'transparent',
              color: selected === index ? C.paper : C.muted,
              fontSize: 23,
            }}
          >
            <span
              style={{
                width: 17,
                height: 17,
                borderRadius: '50%',
                background: [C.dark, '#f6f6f4', C.mauve][index],
                border: '1px solid #ffffff66',
              }}
            />
            {name}
          </div>
        ))}
      </Reveal>
      <div
        style={{
          position: 'absolute',
          left: 980,
          top: 173,
          opacity: p,
          transform: `translateY(${(1 - p) * 95}px) rotate(${interpolate(f, [0, 40], [3, 0], clamp)}deg)`,
          filter: 'drop-shadow(0 30px 35px #271f2420)',
        }}
      >
        <Native src="limits-dark" width={840} />
        <Native
          src="limits-light"
          width={840}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            clipPath: `inset(0 ${100 * (1 - progress(f, 57, 25))}% 0 0)`,
          }}
        />
        <Native
          src="limits-custom"
          width={840}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            clipPath: `inset(0 0 0 ${100 * (1 - progress(f, 111, 25))}%)`,
          }}
        />
      </div>
    </Stage>
  );
};
