export const scenarios = {
  idle: { label: 'Idle', title: 'Peak', detail: 'Your limits, a glance away.' },
  working: {
    label: 'Working',
    title: 'Build the landing page',
    detail: 'Editing files · peak-workspace',
  },
  approval: {
    label: 'Review requested',
    title: 'Build the landing page',
    detail: 'Approval requested · review in Codex',
  },
  question: {
    label: 'Question for you',
    title: 'Build the landing page',
    detail: 'Question for you · open Codex',
  },
  finished: {
    label: 'Finished',
    title: 'Build the landing page',
    detail: 'Response finished · peak-workspace',
  },
  stale: {
    label: 'Stale data',
    title: 'Peak',
    detail: 'Awaiting provider update',
  },
} as const;

export type Scenario = keyof typeof scenarios;
export type Presence = 'always' | 'active' | 'hover';
export type Theme = 'dark' | 'light' | 'custom';

export function remainingPercent(
  used: number | null,
  fresh = true,
): number | null {
  if (
    !fresh ||
    used === null ||
    !Number.isFinite(used) ||
    used < 0 ||
    used > 100
  )
    return null;
  return 100 - used;
}

export function isAttention(state: Scenario) {
  return state === 'approval' || state === 'question';
}

export function presenceVisible(
  presence: Presence,
  state: Scenario,
  hovered: boolean,
  fullscreen: boolean,
  pinned: boolean,
) {
  if (pinned || isAttention(state)) return true;
  if (fullscreen) return false;
  if (presence === 'always') return true;
  if (presence === 'hover') return hovered;
  return state === 'working' || state === 'finished';
}

function rgb(hex: string) {
  return [1, 3, 5].map((start) =>
    Number.parseInt(hex.slice(start, start + 2), 16),
  );
}
function mix(a: string, b: string, amount: number) {
  return (
    '#' +
    rgb(a)
      .map((value, index) =>
        Math.round(value + (rgb(b)[index] - value) * amount)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  );
}
export function contrast(a: string, b: string) {
  const luminance = (hex: string) =>
    rgb(hex)
      .map((value) => value / 255)
      .map((value) =>
        value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
      )
      .reduce(
        (sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index],
        0,
      );
  const first = luminance(a),
    second = luminance(b);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}
export function readableColor(color: string, background: string) {
  const target =
    contrast(background, '#000000') > contrast(background, '#ffffff')
      ? '#000000'
      : '#ffffff';
  for (let amount = 0; amount <= 1; amount += 0.05) {
    const candidate = mix(color, target, amount);
    if (contrast(candidate, background) >= 4.5) return candidate;
  }
  return target;
}
export function palette(theme: Theme, custom: string) {
  const background =
    theme === 'dark'
      ? '#090909'
      : theme === 'light'
        ? '#f6f6f6'
        : /^#[a-f\d]{6}$/i.test(custom)
          ? custom
          : '#090909';
  const text =
    contrast(background, '#000000') > contrast(background, '#ffffff')
      ? '#000000'
      : '#ffffff';
  const layer = (amount: number) => {
    const candidate = mix(background, text, amount);
    return contrast(candidate, text) >= 4.5 ? candidate : background;
  };
  return {
    background,
    text,
    card: layer(0.09),
    border: layer(0.2),
    muted: readableColor(mix(background, text, 0.65), background),
  };
}
