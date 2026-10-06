import { useEffect, useId, useState, type CSSProperties } from 'react';
import {
  isAttention,
  palette,
  presenceVisible,
  readableColor,
  remainingPercent,
  scenarios,
  type Presence,
  type Scenario,
  type Theme,
} from '../lib/demo';

function Ring({
  remaining,
  name,
}: {
  remaining: number | null;
  name: 'Codex' | 'Claude';
}) {
  const color =
    remaining === null ? 'var(--island-muted)' : 'var(--island-text)';
  return (
    <span
      className="provider-ring"
      aria-label={`${name}: ${remaining === null ? 'unavailable' : `${remaining}% remaining`}`}
    >
      <span className="ring-dial">
        <svg viewBox="0 0 36 36" aria-hidden="true">
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="var(--island-border)"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${((remaining ?? 0) / 100) * 87.96} 87.96`}
            transform="rotate(-90 18 18)"
          />
        </svg>
        <span>{name === 'Codex' ? 'Cx' : 'Cl'}</span>
      </span>
      <strong>{remaining === null ? '—' : `${remaining}%`}</strong>
    </span>
  );
}

function Limit({
  name,
  used,
  reset,
  fresh,
}: {
  name: string;
  used: number;
  reset: string;
  fresh: boolean;
}) {
  const remaining = remainingPercent(used, fresh);
  return (
    <div className="demo-limit">
      <div className="demo-limit-heading">
        <span>{name}</span>
        <strong>{remaining === null ? '—' : `${remaining}% left`}</strong>
      </div>
      <div
        className="demo-meter"
        role={remaining === null ? 'img' : 'meter'}
        aria-label={`${name} remaining usage${remaining === null ? ': unavailable' : ''}`}
        aria-valuemin={remaining === null ? undefined : 0}
        aria-valuemax={remaining === null ? undefined : 100}
        aria-valuenow={remaining ?? undefined}
        aria-valuetext={
          remaining === null ? undefined : `${remaining}% remaining`
        }
      >
        <span style={{ width: `${remaining ?? 0}%` }} />
      </div>
      <small>{fresh ? reset : 'Awaiting provider update'}</small>
    </div>
  );
}

export default function PeakDemo({
  mode = 'playground',
}: {
  mode?: 'hero' | 'playground';
}) {
  const hero = mode === 'hero';
  const [state, setState] = useState<Scenario>(hero ? 'working' : 'idle');
  const [pinned, setPinned] = useState(false);
  const [islandHovered, setIslandHovered] = useState(false);
  const [stageHovered, setStageHovered] = useState(false);
  const [view, setView] = useState<'limits' | 'tasks'>('limits');
  const [theme, setTheme] = useState<Theme>('dark');
  const [custom, setCustom] = useState('#c7c7c7');
  const [presence, setPresence] = useState<Presence>('always');
  const [fullscreen, setFullscreen] = useState(false);
  const [fade, setFade] = useState(false);
  const id = useId();
  const selected = scenarios[state];
  const colors = palette(theme, custom);
  const color = readableColor(colors.text, colors.background);
  const attention = isAttention(state);
  const active = state !== 'idle' && state !== 'stale';
  const expanded = pinned || (islandHovered && !fade);
  const visible = presenceVisible(
    presence,
    state,
    stageHovered,
    fullscreen,
    pinned,
  );
  const fresh = state !== 'stale';
  const css = {
    '--island-bg': colors.background,
    '--island-text': colors.text,
    '--island-card': colors.card,
    '--island-border': colors.border,
    '--island-muted': colors.muted,
    '--state-color': color,
  } as CSSProperties;

  useEffect(() => {
    if (state !== 'finished') return;
    const timeout = window.setTimeout(() => setState('idle'), 5000);
    return () => window.clearTimeout(timeout);
  }, [state]);

  function choose(next: Scenario) {
    setState(next);
  }
  function reset() {
    setState('idle');
    setPinned(false);
    setView('limits');
    setTheme('dark');
    setCustom('#c7c7c7');
    setPresence('always');
    setFullscreen(false);
    setFade(false);
  }

  return (
    <div className={`peak-demo peak-demo-${mode}`}>
      <div
        className="desktop-stage"
        onMouseEnter={() => setStageHovered(true)}
        onMouseLeave={() => {
          setStageHovered(false);
          setIslandHovered(false);
        }}
      >
        <div className="stage-label">
          <span className="status-dot" /> PEAK IN YOUR WORKSPACE{' '}
          <span className="sample-tag">DEMO</span>
        </div>
        <div className="wallpaper-orbit orbit-one" aria-hidden="true" />
        <div className="wallpaper-orbit orbit-two" aria-hidden="true" />
        <div
          className={`desktop-editor ${fullscreen ? 'editor-fullscreen' : ''}`}
          aria-hidden="true"
        >
          <div className="editor-title">
            <span className="editor-mark">⌘</span> peak-workspace{' '}
            <span className="editor-window-buttons">— &nbsp; □ &nbsp; ×</span>
          </div>
          <div className="editor-body">
            <div className="editor-sidebar">
              <span>EXPLORER</span>
              <p>⌄ &nbsp; PEAK-WORKSPACE</p>
              <p className="editor-file-active">↳ &nbsp; overview.tsx</p>
              <p>↳ &nbsp; styles.css</p>
              <p>↳ &nbsp; readme.md</p>
            </div>
            <div className="editor-code">
              <div className="editor-tab">
                overview.tsx <span>×</span>
              </div>
              <div className="code-line">
                <i>1</i>
                <span className="code-purple">export default</span>{' '}
                <span>function</span> Overview() {'{'}
              </div>
              <div className="code-line">
                <i>2</i> &nbsp; <span className="code-purple">return</span> (
              </div>
              <div className="code-line">
                <i>3</i> &nbsp; &nbsp;{' '}
                <span className="code-mint">&lt;Workspace&gt;</span>
              </div>
              <div className="code-line">
                <i>4</i> &nbsp; &nbsp; &nbsp;{' '}
                <span className="code-muted">
                  {'// a little more room to focus'}
                </span>
              </div>
              <div className="code-line">
                <i>5</i> &nbsp; &nbsp; &nbsp; &lt;Ideas /&gt;
              </div>
              <div className="code-line">
                <i>6</i> &nbsp; &nbsp;{' '}
                <span className="code-mint">&lt;/Workspace&gt;</span>
              </div>
              <div className="code-line">
                <i>7</i> &nbsp; );
              </div>
              <div className="code-line">
                <i>8</i>
                {'}'}
              </div>
            </div>
          </div>
          <div className="editor-status">
            <span>⎇ main &nbsp; ✓</span>
            <span>TypeScript &nbsp; UTF-8</span>
          </div>
        </div>
        <div
          className={`island-position ${expanded ? 'island-position-expanded' : ''} ${visible ? '' : 'island-hidden'}`}
          style={css}
          onMouseEnter={() => setIslandHovered(true)}
          onMouseLeave={() => setIslandHovered(false)}
        >
          <div
            className={`demo-island ${active ? 'island-active' : ''} ${expanded ? 'island-expanded' : ''} ${fade && islandHovered && !pinned && !attention ? 'island-faded' : ''}`}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setPinned(false);
                setIslandHovered(false);
              }
            }}
          >
            <button
              type="button"
              className="island-header"
              aria-label={`${expanded ? 'Collapse' : 'Expand'} Peak ${hero ? 'hero' : 'playground'} preview`}
              aria-expanded={expanded}
              aria-controls={`${id}-details`}
              onClick={() => {
                setPinned(!pinned);
                if (pinned) setIslandHovered(false);
              }}
            >
              <Ring name="Codex" remaining={remainingPercent(90, fresh)} />
              <span className="island-title">
                <span className="island-state-dot" />
                {active ? selected.title : 'Peak'}
                {active && <small>+1</small>}
              </span>
              <Ring name="Claude" remaining={remainingPercent(32, fresh)} />
            </button>
            {active && (
              <div className="island-activity">
                <span>{selected.detail}</span>
                <small>
                  {state === 'working' ? 'Elapsed 00:42' : 'Seen just now'}
                </small>
                {state === 'working' && (
                  <div className="island-activity-track">
                    <span />
                  </div>
                )}
              </div>
            )}
            <div
              id={`${id}-details`}
              className="island-details"
              hidden={!expanded}
            >
              <div className="island-details-top">
                <span>
                  {view === 'limits' ? 'Subscription limits' : 'Codex tasks'}
                </span>
                <button
                  type="button"
                  aria-label="Close Peak details"
                  onClick={() => {
                    setPinned(false);
                    setIslandHovered(false);
                  }}
                >
                  ×
                </button>
              </div>
              <p className="island-demo-label">DEMO · sample data</p>
              <div className="island-tabs" aria-label="Preview views">
                <button
                  type="button"
                  aria-pressed={view === 'limits'}
                  onClick={() => setView('limits')}
                >
                  Limits
                </button>
                <button
                  type="button"
                  aria-pressed={view === 'tasks'}
                  onClick={() => setView('tasks')}
                >
                  Tasks {attention ? '· 1 review' : ''}
                </button>
              </div>
              {view === 'limits' ? (
                <div className="island-limits">
                  <div className="island-provider">
                    <h3>
                      Codex <span>Sample plan</span>
                    </h3>
                    <div className="island-provider-card">
                      <Limit
                        name="5-hour limit"
                        used={90}
                        reset="Resets in 1h 59m"
                        fresh={fresh}
                      />
                      <Limit
                        name="Weekly limit"
                        used={45}
                        reset="Resets in 3d 23h"
                        fresh={fresh}
                      />
                    </div>
                  </div>
                  <div className="island-provider">
                    <h3>
                      Claude <span>Sample plan</span>
                    </h3>
                    <div className="island-provider-card">
                      <Limit
                        name="5-hour limit"
                        used={32}
                        reset="Resets in 1h 59m"
                        fresh={fresh}
                      />
                      <Limit
                        name="Weekly limit"
                        used={68}
                        reset="Resets in 3d 23h"
                        fresh={fresh}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="demo-task-list">
                  <div className="demo-task">
                    <strong>Build the landing page</strong>
                    <small>peak-workspace</small>
                    <span style={{ color }}>{selected.detail}</span>
                    <p>
                      {state === 'stale'
                        ? 'Observation expired · current state unknown'
                        : 'Sample observation · seen just now'}
                    </p>
                    {attention && (
                      <p className="demo-task-note">
                        Respond in Codex. This browser preview cannot open or
                        approve a real task.
                      </p>
                    )}
                  </div>
                  <div className="demo-task">
                    <strong>Review the color palette</strong>
                    <small>design-system</small>
                    <span>Response finished</span>
                    <p>Sample observation · 2 minutes ago</p>
                  </div>
                </div>
              )}
              <div className="island-footer">
                <span>Local observations</span>
                <span>
                  {attention
                    ? 'Review in Codex ↗'
                    : 'Demo · no provider connection'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="desktop-taskbar" aria-hidden="true">
          <span className="windows-symbol">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="taskbar-search">⌕ &nbsp; Search</span>
          <span className="taskbar-app">⌘</span>
          <img src="/peak-icon.png" width="22" height="22" alt="" />
          <span className="taskbar-clock">09:41</span>
        </div>
        {hero && (
          <div className="hero-demo-controls">
            <span>Try a moment</span>
            <div className="segmented">
              {(['idle', 'working', 'approval'] as Scenario[]).map((value) => (
                <button
                  type="button"
                  key={value}
                  aria-pressed={state === value}
                  onClick={() => choose(value)}
                >
                  {value === 'approval' ? 'Your turn' : scenarios[value].label}
                </button>
              ))}
            </div>
          </div>
        )}
        {!visible && (
          <div className="hidden-hint">
            Peak steps out of the way.
            <br />
            <small>Hover over the desktop or use Reveal below.</small>
          </div>
        )}
      </div>
      {!hero && (
        <div className="playground-controls">
          <div className="control-heading">
            <span className="eyebrow">YOUR DEMO DESK</span>
            <button type="button" className="text-button" onClick={reset}>
              Reset ↺
            </button>
          </div>
          <fieldset>
            <legend>
              01 <span>Set the moment</span>
            </legend>
            <div className="state-buttons">
              {(Object.keys(scenarios) as Scenario[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={state === value}
                  onClick={() => choose(value)}
                >
                  <span
                    style={{
                      background: state === value ? '#ffffff' : '#777777',
                    }}
                  />
                  {scenarios[value].label}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>
              02 <span>Make it yours</span>
            </legend>
            <div className="segmented theme-options">
              {(['dark', 'light', 'custom'] as Theme[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={theme === value}
                  onClick={() => setTheme(value)}
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </button>
              ))}
            </div>
            {theme === 'custom' && (
              <label className="color-control">
                Island color{' '}
                <input
                  type="color"
                  aria-label="Custom island color"
                  value={custom}
                  onChange={(event) => setCustom(event.target.value)}
                />
                <span>{custom.toUpperCase()}</span>
              </label>
            )}
          </fieldset>
          <fieldset>
            <legend>
              03 <span>Give it some space</span>
            </legend>
            <label className="select-control">
              Presence{' '}
              <select
                aria-label="Peak presence"
                value={presence}
                onChange={(event) =>
                  setPresence(event.target.value as Presence)
                }
              >
                <option value="always">Always visible</option>
                <option value="active">When active</option>
                <option value="hover">On hover</option>
              </select>
            </label>
            <label className="toggle-control">
              <input
                type="checkbox"
                checked={fullscreen}
                onChange={(event) => setFullscreen(event.target.checked)}
              />
              <span>Fullscreen · alerts only</span>
            </label>
            <label className="toggle-control">
              <input
                type="checkbox"
                checked={fade}
                onChange={(event) => setFade(event.target.checked)}
              />
              <span>Fade under the pointer</span>
            </label>
          </fieldset>
          <button
            type="button"
            className="button reveal-button"
            onClick={() => {
              setPinned(true);
              setView('limits');
            }}
          >
            Reveal & pin details <span>↗</span>
          </button>
          <p className="demo-status" aria-live="polite">
            {selected.label}
            {state === 'finished'
              ? ' · returns to idle after 5 seconds'
              : ''}.{' '}
            {fresh
              ? 'Sample readings, no live connection.'
              : 'A dash means unknown, never zero.'}
          </p>
        </div>
      )}
    </div>
  );
}
