import '../styles/NodeLibrary.css';

const NODE_TYPES = [
  { type: 'input',       icon: 'login',        label: 'Input',       accent: 'var(--color-accent-cyan)',   desc: 'Entry point' },
  { type: 'output',      icon: 'logout',       label: 'Output',      accent: 'var(--color-accent-green)',  desc: 'Final sink' },
  { type: 'llm',         icon: 'psychology',   label: 'LLM',         accent: 'var(--color-accent-blue)',   desc: 'AI model call' },
  { type: 'text',        icon: 'subject',      label: 'Text',        accent: 'var(--color-accent-amber)',  desc: 'Prompt template' },
  { type: 'filter',      icon: 'filter_alt',   label: 'Filter',      accent: 'var(--color-accent-purple)', desc: 'Condition gate' },
  { type: 'math',        icon: 'functions',    label: 'Math',        accent: 'var(--color-accent-amber)',  desc: 'Expression eval' },
  { type: 'api',         icon: 'api',          label: 'API',         accent: 'var(--color-accent-cyan)',   desc: 'HTTP request' },
  { type: 'note',        icon: 'sticky_note_2', label: 'Note',       accent: '#6b6b6b',                   desc: 'Annotation' },
  { type: 'conditional', icon: 'call_split',   label: 'Conditional', accent: 'var(--color-accent-red)',    desc: 'Branch logic' },
];

export default function NodeLibrary() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <nav className="node-library">
      {/* Header */}
      <div className="node-library__header">
        <div className="text-label-md" style={{ color: 'var(--color-on-surface)', fontWeight: 700, letterSpacing: '0.1em' }}>
          NODES
        </div>
        <div className="text-label-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
          Drag to canvas
        </div>
      </div>

      {/* Node Items */}
      <div className="node-library__list">
        {NODE_TYPES.map((n) => (
          <div
            key={n.type}
            className="node-library__item"
            draggable
            onDragStart={(e) => onDragStart(e, n.type)}
            title={n.desc}
          >
            <div className="node-library__item-accent" style={{ background: n.accent }} />
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: n.accent }}>
              {n.icon}
            </span>
            <div className="node-library__item-info">
              <span className="text-label-md" style={{ color: 'var(--color-on-surface)' }}>
                {n.label}
              </span>
              <span style={{ fontSize: '10px', color: 'var(--color-on-surface-variant)' }}>
                {n.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
