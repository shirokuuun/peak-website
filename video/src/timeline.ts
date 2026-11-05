export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION = 1080;
export const CHAPTERS = [
  { id: 'Intro', name: 'Stay in the work', from: 0, duration: 120 },
  { id: 'Limits', name: 'Know what’s left', from: 120, duration: 180 },
  { id: 'Activity', name: 'Keep work in sight', from: 300, duration: 180 },
  { id: 'Attention', name: 'Your turn', from: 480, duration: 150 },
  { id: 'Themes', name: 'Make it yours', from: 630, duration: 180 },
  { id: 'Presence', name: 'Your kind of quiet', from: 810, duration: 150 },
  { id: 'Outro', name: 'Meet Peak', from: 960, duration: 120 },
] as const;
