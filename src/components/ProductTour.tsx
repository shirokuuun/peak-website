import { useId, useState, type KeyboardEvent } from 'react';

const screens = [
  {
    id: 'limits',
    label: 'Usage limits',
    summary: 'Codex + Claude',
    title: 'A little more\nperspective.',
    description:
      'Your Codex and Claude subscription limits, together. See what’s left in your 5-hour and weekly windows, and when they reset.',
    detail: 'Remaining usage. Reported reset times. One view.',
    file: 'limits-dark.png',
    alt: 'Peak’s native usage view showing sample Codex and Claude remaining limits.',
  },
  {
    id: 'activity',
    label: 'Task activity',
    summary: 'Codex',
    title: 'Keep the work\nin sight.',
    description:
      'Follow observed Codex activity, project names, and elapsed time. Get the context you need without checking every chat.',
    detail: 'An activity indicator, not a completion percentage.',
    file: 'tasks-dark.png',
    alt: 'Peak’s native task view with two fictional Codex tasks and their activity.',
  },
  {
    id: 'attention',
    label: 'Needs attention',
    summary: 'Codex',
    title: 'Know when\nyou’re needed.',
    description:
      'A reported Codex question or approval request brings the task into view. Review it in Codex, respond, and keep things moving.',
    detail: 'Peak observes. You make the decisions in Codex.',
    file: 'attention-dark.png',
    alt: 'Peak’s native compact island showing a sample Codex approval request.',
  },
  {
    id: 'presence',
    label: 'Presence',
    summary: 'Visibility + behavior',
    title: 'Fits your day.\nAnd your desktop.',
    description:
      'Keep Peak visible or show it when work is active. Hover for details, choose your notch style, and bring it back with a shortcut.',
    detail: 'Your screen. Your preferences.',
    file: 'settings-presence.png',
    alt: 'Peak’s native Presence settings with visibility and fullscreen choices.',
  },
] as const;

export default function ProductTour() {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const [appearance, setAppearance] = useState('custom');
  const screen = screens[selected];
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const key = event.key;
    if (
      ![
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
      ].includes(key)
    )
      return;
    event.preventDefault();
    const next =
      key === 'Home'
        ? 0
        : key === 'End'
          ? screens.length - 1
          : (index +
              (key === 'ArrowRight' || key === 'ArrowDown' ? 1 : -1) +
              screens.length) %
            screens.length;
    setSelected(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  }
  return (
    <div className="product-tour">
      <div
        className="tour-tabs"
        role="tablist"
        aria-label="Explore Peak features"
        aria-orientation="vertical"
      >
        {screens.map((item, index) => (
          <button
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => navigate(event, index)}
            key={item.id}
          >
            <span className="chapter-no">0{index + 1}</span>
            <span className="chapter-label">
              {item.label}
              <small>{item.summary}</small>
            </span>
            <span className="chapter-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      <div
        className={`tour-panel tour-panel-${screen.id}`}
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${selected}`}
      >
        <div className="tour-copy">
          <span className="soft-eyebrow">0{selected + 1} / A CLOSER LOOK</span>
          <h3>
            {screen.title.split('\n').map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h3>
          <p>{screen.description}</p>
          <small>
            <span aria-hidden="true">↳</span> {screen.detail}
          </small>
          {screen.id === 'limits' && (
            <div
              className="tour-theme"
              aria-label="Usage screenshot appearance"
            >
              {['dark', 'light', 'custom'].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={appearance === value}
                  onClick={() => setAppearance(value)}
                >
                  <span className={`theme-${value}`} />
                  {value === 'custom'
                    ? 'Mauve'
                    : value === 'light'
                      ? 'Light'
                      : 'Dark'}
                </button>
              ))}
            </div>
          )}
        </div>
        <figure className="tour-visual">
          <div className="tour-visual-backdrop" aria-hidden="true" />
          <img
            key={`${screen.id}-${appearance}`}
            src={`/screens/${screen.id === 'limits' ? `limits-${appearance}.png` : screen.file}`}
            alt={screen.alt}
            width={screen.id === 'presence' ? 2640 : 1884}
            height={
              screen.id === 'presence'
                ? 2160
                : screen.id === 'attention'
                  ? 234
                  : 1656
            }
            loading="lazy"
          />
          <figcaption>Native design preview · sample data</figcaption>
        </figure>
      </div>
    </div>
  );
}
