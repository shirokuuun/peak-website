import test from 'node:test';
import assert from 'node:assert/strict';
import {
  remainingPercent,
  palette,
  contrast,
  presenceVisible,
} from '../src/lib/demo.ts';
test('remaining usage is separate from consumed usage and unknown data', () => {
  assert.equal(remainingPercent(90), 10);
  assert.equal(remainingPercent(32), 68);
  assert.equal(remainingPercent(0), 100);
  assert.equal(remainingPercent(100), 0);
  for (const value of [null, NaN, -1, 101])
    assert.equal(remainingPercent(value), null);
  assert.equal(remainingPercent(32, false), null);
});
test('reported attention and manual reveal stay visible across presence modes', () => {
  assert.equal(presenceVisible('active', 'idle', false, false, false), false);
  assert.equal(presenceVisible('hover', 'idle', true, false, false), true);
  assert.equal(presenceVisible('always', 'working', false, true, false), false);
  assert.equal(presenceVisible('hover', 'approval', false, true, false), true);
  assert.equal(presenceVisible('active', 'question', false, true, false), true);
  assert.equal(presenceVisible('active', 'idle', false, true, true), true);
});
test('custom colors keep readable text and card layers', () => {
  for (const color of [
    '#ffffff',
    '#000000',
    '#bfe7d3',
    '#7f87ff',
    '#888888',
    '#00ffff',
  ]) {
    const colors = palette('custom', color);
    assert.ok(contrast(colors.text, colors.background) >= 4.5);
    assert.ok(contrast(colors.text, colors.card) >= 4.5);
    assert.ok(contrast(colors.muted, colors.background) >= 4.5);
  }
});
