import { Img, staticFile } from 'remotion';
import { Arrow, C, Native, Provider, Reveal, Stage, Title } from '../Design';

export const Outro = () => (
  <Stage step="FREE ON THE MICROSOFT STORE">
    <Title
      at={0}
      style={{ left: 100, top: 213, fontSize: 160, letterSpacing: -9 }}
    >
      Keep your
      <br />
      <span style={{ paddingLeft: 75 }}>head in it.</span>
    </Title>
    <Reveal
      at={15}
      style={{
        position: 'absolute',
        left: 108,
        top: 641,
        fontSize: 31,
        color: C.muted,
        lineHeight: 1.45,
      }}
    >
      Meet Peak.
      <br />A little island. A clearer picture.
    </Reveal>
    <Reveal
      at={25}
      style={{
        position: 'absolute',
        left: 108,
        top: 817,
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        padding: '24px 34px',
        borderRadius: 60,
        background: C.ink,
        color: C.paper,
        fontSize: 25,
        fontWeight: 600,
      }}
    >
      Get Peak for Windows
      <Arrow size={26} />
    </Reveal>
    <Reveal at={12} style={{ position: 'absolute', left: 1324, top: 198 }}>
      <Img
        src={staticFile('peak-icon.png')}
        style={{
          width: 235,
          height: 235,
          borderRadius: 61,
          boxShadow: '0 22px 30px #25212418',
        }}
      />
    </Reveal>
    <Reveal
      at={21}
      style={{
        position: 'absolute',
        left: 1100,
        top: 530,
        filter: 'drop-shadow(0 23px 27px #231c2324)',
      }}
    >
      <Native src="compact-dark" width={720} />
    </Reveal>
    <Reveal
      at={32}
      style={{
        position: 'absolute',
        left: 1180,
        top: 700,
        fontSize: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 28,
      }}
    >
      <Provider name="Codex" size={34} />
      <span style={{ color: '#b4b2b1' }}>+</span>
      <Provider name="Claude" size={34} />
    </Reveal>
    <Reveal
      at={35}
      style={{
        position: 'absolute',
        right: 103,
        top: 878,
        fontSize: 26,
        color: C.muted,
      }}
    >
      peakforwindows.vercel.app
    </Reveal>
  </Stage>
);
