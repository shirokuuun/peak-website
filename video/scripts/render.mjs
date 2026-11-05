import { bundle } from '@remotion/bundler';
import {
  openBrowser,
  selectComposition,
  renderStill,
  renderMedia,
} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';

// Remotion's documented renderer produces frames; it is not used for browser QA.
const serveUrl = await bundle({
  entryPoint: path.resolve('src/index.ts'),
  rspack: true,
});
const options = process.env.PEAK_RENDER_BROWSER
  ? { browserExecutable: process.env.PEAK_RENDER_BROWSER }
  : {};
const browser = await openBrowser('chrome', options);
try {
  const composition = await selectComposition({
    serveUrl,
    id: 'Peak-Stay-in-the-Work',
    puppeteerInstance: browser,
  });
  const common = {
    serveUrl,
    composition,
    puppeteerInstance: browser,
    logLevel: 'error',
  };
  const errors = [];
  const onBrowserLog = (log) => {
    if (log.type === 'error') errors.push(log.text);
  };
  fs.mkdirSync('out/frames', { recursive: true });
  for (const frame of [
    0, 75, 210, 400, 570, 678, 735, 786, 825, 870, 915, 1035, 1079,
  ]) {
    await renderStill({
      ...common,
      onBrowserLog,
      frame,
      output: `out/frames/${frame}.png`,
      imageFormat: 'png',
    });
    console.log(`Rendered review frame ${frame}`);
  }
  await renderStill({
    ...common,
    frame: 75,
    output: 'out/peak-design-poster.jpg',
    imageFormat: 'jpeg',
    jpegQuality: 92,
  });
  if (!process.argv.includes('--stills')) {
    let last = -1;
    await renderMedia({
      ...common,
      onBrowserLog,
      codec: 'h264',
      crf: 18,
      pixelFormat: 'yuv420p',
      audioCodec: 'aac',
      audioBitrate: '192k',
      x264Preset: 'medium',
      concurrency: 4,
      imageFormat: 'jpeg',
      jpegQuality: 94,
      outputLocation: 'out/peak-design-film.mp4',
      overwrite: true,
      onProgress: ({ progress }) => {
        const percent = Math.floor((progress * 100) / 10) * 10;
        if (percent > last) {
          last = percent;
          console.log(`Render ${percent}%`);
        }
      },
    });
  }
  if (errors.length)
    throw new Error(`Browser rendering errors: ${errors.join('; ')}`);
  console.log(
    JSON.stringify({
      width: composition.width,
      height: composition.height,
      fps: composition.fps,
      frames: composition.durationInFrames,
      seconds: composition.durationInFrames / composition.fps,
      browserErrors: errors.length,
    }),
  );
} finally {
  await browser.close({ silent: true });
}
