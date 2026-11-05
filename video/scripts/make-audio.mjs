// Original deterministic score. All instruments are synthesized, with no samples.
import fs from 'node:fs';
const rate = 48000,
  seconds = 36,
  count = rate * seconds;
const left = new Float64Array(count),
  right = new Float64Array(count);
let seed = 7553;
const noise = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 2147483648 - 1;
};
const hz = (note) => 440 * 2 ** ((note - 69) / 12);
function add(start, duration, signal, pan = 0) {
  const offset = Math.round(start * rate);
  for (let i = 0; i < Math.min(count - offset, duration * rate); i++) {
    const sample = signal(i / rate);
    left[offset + i] += sample * (1 - pan * 0.32);
    right[offset + i] += sample * (1 + pan * 0.32);
  }
}
// Warm Dmaj9, Bm7, Gmaj9, Asus2. Each harmony lasts four seconds.
const chords = [
  [50, 57, 61, 64, 69],
  [47, 54, 57, 62, 66],
  [43, 50, 54, 57, 62],
  [45, 52, 57, 59, 64],
];
for (let bar = 0; bar < 9; bar++) {
  chords[bar % 4].forEach((note, index) =>
    add(
      bar * 4,
      5.1,
      (t) => {
        const envelope = Math.min(1, t / 0.6) * Math.min(1, (5.1 - t) / 1.4);
        return (
          0.028 *
          envelope *
          (Math.sin(2 * Math.PI * hz(note) * t) +
            0.2 * Math.sin(2 * Math.PI * hz(note) * 1.002 * t))
        );
      },
      (index - 2) * 0.4,
    ),
  );
}
for (let beat = 0; beat < 72; beat++) {
  const start = beat * 0.5,
    active = beat >= 8 && beat < 64;
  const chord = chords[Math.floor(start / 4) % 4];
  if (active) {
    if (beat % 2 === 0)
      add(
        start,
        0.34,
        (t) =>
          0.23 *
          Math.exp(-t * 16) *
          Math.sin(2 * Math.PI * (48 * t + 2.4 * (1 - Math.exp(-28 * t)))),
      );
    if (beat % 4 === 2)
      add(start, 0.15, (t) => noise() * 0.038 * Math.exp(-t * 34));
    add(
      start + 0.25,
      0.07,
      (t) => noise() * 0.012 * Math.exp(-t * 80),
      beat % 2 ? -0.7 : 0.7,
    );
    add(
      start,
      0.46,
      (t) =>
        0.12 *
        Math.sin(2 * Math.PI * hz(chord[0] - 12) * t) *
        Math.exp(-t * 8) *
        Math.min(1, t / 0.008),
    );
  }
  if (active || beat % 2 === 0) {
    const note = chord[[0, 2, 3, 4, 2, 1, 4, 3][beat % 8]] + 12;
    add(
      start + 0.025,
      1.0,
      (t) =>
        0.055 *
        Math.exp(-t * 5) *
        Math.min(1, t / 0.009) *
        (Math.sin(2 * Math.PI * hz(note) * t) +
          0.1 * Math.sin(2 * Math.PI * hz(note) * 3 * t)),
      Math.sin(beat) * 0.7,
    );
  }
}
for (const time of [4, 10, 16, 21, 27, 32]) {
  add(
    time - 0.18,
    0.35,
    (t) => noise() * 0.025 * Math.sin((Math.PI * t) / 0.35) ** 2,
  );
  add(
    time,
    0.6,
    (t) => 0.045 * Math.exp(-t * 8) * Math.sin(2 * Math.PI * 1174.66 * t),
  );
}
for (let i = count - 1; i >= 18000; i--) {
  left[i] += 0.18 * right[i - 18000];
  right[i] += 0.18 * left[i - 14400];
}
let peak = 0,
  square = 0;
for (let i = 0; i < count; i++) {
  const fade = Math.min(1, i / rate / 0.12, (seconds - i / rate) / 1.35);
  left[i] *= fade;
  right[i] *= fade;
  peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
}
const pcm = Buffer.alloc(count * 4),
  gain = 0.79 / peak;
for (let i = 0; i < count; i++) {
  pcm.writeInt16LE(Math.round(left[i] * gain * 32767), i * 4);
  pcm.writeInt16LE(Math.round(right[i] * gain * 32767), i * 4 + 2);
  square += (left[i] ** 2 + right[i] ** 2) * gain ** 2;
}
const header = Buffer.alloc(44);
header.write('RIFF');
header.writeUInt32LE(36 + pcm.length, 4);
header.write('WAVEfmt ', 8);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(2, 22);
header.writeUInt32LE(rate, 24);
header.writeUInt32LE(rate * 4, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write('data', 36);
header.writeUInt32LE(pcm.length, 40);
fs.mkdirSync('public/audio', { recursive: true });
fs.writeFileSync('public/audio/headspace.wav', Buffer.concat([header, pcm]));
console.log(
  JSON.stringify({
    seconds,
    sampleRate: rate,
    channels: 2,
    peak: 0.79,
    rms: Math.sqrt(square / (count * 2)),
  }),
);
