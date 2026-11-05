# Peak — Stay in the work

Editable Remotion source for the website’s 36-second product film. 1920 × 1080, 30 fps, H.264/AAC. The current Peak design uses Inter, the supplied app and provider images, native dark/light/mauve controls, and fictional sample data. No app package or version is changed.

## Edit and render

From this `video` directory, using Node 24:

```sh
npm ci
npm run dev
```

Studio runs at http://localhost:3124. The full composition is `Peak-Stay-in-the-Work`; individual scenes are available in the Scenes folder. Native assets and font licenses are copied from the website’s `public` directory by `npm run prepare`. A new, deterministic music score is synthesized locally by the same command. There are no remote rendering, music, or font services.

```sh
npm run check
npm run frames
npm run render
```

The renderer uses Remotion’s Chrome Headless Shell by default. To reuse an installed Chrome, set `PEAK_RENDER_BROWSER` to its executable path. Output is written to ignored `out/`: the MP4, 1920 × 1080 poster, and review frames. Copy the reviewed film and poster to the website’s `public/media/peak-design-film.mp4` and `public/media/peak-design-poster.jpg`. Keep the caption file and the transcript/chapter buttons in `src/components/Film.astro` aligned with `src/timeline.ts`.

## Timeline

| Time        | Scene              | Content                                         |
| ----------- | ------------------ | ----------------------------------------------- |
| 00:00–00:04 | Stay in the work   | Inter headline, mauve native UI, both providers |
| 00:04–00:10 | Know what’s left   | Remaining usage and reset windows               |
| 00:10–00:16 | Keep work in sight | Native Codex activity and task close-ups        |
| 00:16–00:21 | Your turn          | Amber attention; review and respond in Codex    |
| 00:21–00:27 | Make it yours      | Dark, light, and mauve screen wipes             |
| 00:27–00:32 | Your kind of quiet | Editorial hover and fading demonstration        |
| 00:32–00:36 | Meet Peak          | Free Microsoft Store availability and website   |

## Asset provenance

The native screenshots are the same isolated WPF captures used by the website’s feature tour, produced from the existing Peak 1.0.7 development assembly. They use sample fixtures, never live accounts or credentials. Close-up crops preserve the original UI pixels. Current development designs and editorial interaction animations can differ from the installed Store build. Font files retain their full Inter OFL notice; provider images identify compatible tools without implying endorsement.

The new 120 BPM score is original synthesis: warm major/ninth pads, plucks, sub-bass, soft percussion, and scene accents. No third-party samples or recordings. The stereo WAV is generated at 48 kHz with a 0.79 sample peak, then mixed at 0.8 volume into the film. The video has no spoken dialogue; the website provides timed descriptive captions and a transcript.

The website build does not install or render this project. Its separate lockfile pins Remotion 4.0.532 and React 19.2.3. See [Remotion’s license](https://www.remotion.dev/license) for renderer terms. The original `D:/Languages/codex/Peak-Promo-Remotion` project is preserved separately.
