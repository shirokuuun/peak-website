import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useDelayRender,
} from 'remotion';

export const C = {
  paper: '#f6f6f4',
  ink: '#131313',
  muted: '#62615f',
  mauve: '#67555f',
  line: '#dcdcd7',
  amber: '#f6b638',
  dark: '#161616',
};
export const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;
export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const progress = (frame: number, start: number, duration = 26) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: ease,
  });

let ready: Promise<unknown> | undefined;
export const Fonts = () => {
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender('Load Peak Inter fonts'));
  useEffect(() => {
    ready ??= Promise.all(
      [
        ['Medium', '500'],
        ['SemiBold', '600'],
        ['Bold', '700'],
      ].map(async ([name, weight]) => {
        const font = new FontFace(
          'Peak Inter',
          `url("${staticFile(`fonts/Inter-${name}.ttf`)}")`,
          { weight },
        );
        await font.load();
        document.fonts.add(font);
      }),
    );
    ready.then(() => continueRender(handle)).catch(cancelRender);
  }, [handle, continueRender, cancelRender]);
  return null;
};

export const Stage = ({
  children,
  dark = false,
  mauve = false,
  step,
}: {
  children: ReactNode;
  dark?: boolean;
  mauve?: boolean;
  step?: string;
}) => (
  <AbsoluteFill
    style={{
      background: mauve ? C.mauve : dark ? C.dark : C.paper,
      color: dark || mauve ? C.paper : C.ink,
      fontFamily: '"Peak Inter", sans-serif',
      overflow: 'hidden',
    }}
  >
    <Fonts />
    <div
      style={{
        position: 'absolute',
        left: 100,
        top: 57,
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        fontSize: 24,
        fontWeight: 600,
      }}
    >
      <Img
        src={staticFile('peak-icon.png')}
        style={{ width: 38, height: 38, borderRadius: 11 }}
      />
      Peak
      <span
        style={{ fontSize: 16, fontWeight: 500, opacity: 0.55, marginLeft: 12 }}
      >
        FOR WINDOWS
      </span>
    </div>
    {step && (
      <div
        style={{
          position: 'absolute',
          right: 100,
          top: 66,
          fontSize: 17,
          letterSpacing: 2,
          opacity: 0.58,
        }}
      >
        {step}
      </div>
    )}
    {children}
    <div
      style={{
        position: 'absolute',
        left: 100,
        bottom: 38,
        right: 100,
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: `1px solid ${dark || mauve ? '#ffffff25' : C.line}`,
        paddingTop: 17,
        fontSize: 15,
        letterSpacing: 0.3,
        opacity: 0.65,
      }}
    >
      <span>Native design preview · sample data</span>
      <span>neorangel / Peak</span>
    </div>
  </AbsoluteFill>
);

export const Reveal = ({
  children,
  at = 0,
  style = {},
  distance = 55,
}: {
  children: ReactNode;
  at?: number;
  style?: CSSProperties;
  distance?: number;
}) => {
  const p = progress(useCurrentFrame(), at);
  return (
    <div
      style={{
        ...style,
        opacity: p,
        transform: `translateY(${(1 - p) * distance}px)`,
      }}
    >
      {children}
    </div>
  );
};

export const Title = ({
  children,
  at = 0,
  style = {},
}: {
  children: ReactNode;
  at?: number;
  style?: CSSProperties;
}) => (
  <Reveal
    at={at}
    style={{
      position: 'absolute',
      fontWeight: 700,
      fontSize: 116,
      lineHeight: 0.99,
      letterSpacing: -7,
      ...style,
    }}
  >
    {children}
  </Reveal>
);

export const Native = ({
  src,
  width,
  style = {},
}: {
  src: string;
  width: number;
  style?: CSSProperties;
}) => (
  <Img
    src={staticFile(`screens/${src}.png`)}
    style={{ display: 'block', width, ...style }}
  />
);

// Crops preserve the pixels and typography of the native WPF capture.
export const Crop = ({
  src,
  width,
  y,
  height,
  style = {},
}: {
  src: string;
  width: number;
  y: number;
  height: number;
  style?: CSSProperties;
}) => (
  <div
    style={{
      width,
      height: (height * width) / 1884,
      overflow: 'hidden',
      position: 'relative',
      ...style,
    }}
  >
    <Native
      src={src}
      width={width}
      style={{ position: 'absolute', top: (-y * width) / 1884 }}
    />
  </div>
);

export const Provider = ({
  name,
  size = 42,
}: {
  name: 'Codex' | 'Claude';
  size?: number;
}) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 15,
      fontWeight: 600,
    }}
  >
    <Img
      src={staticFile(`providers/${name.toLowerCase()}.png`)}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
    {name}
  </span>
);

export const Arrow = ({
  color = 'currentColor',
  size = 26,
}: {
  color?: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 19 19 5M5 5h14v14" />
  </svg>
);
