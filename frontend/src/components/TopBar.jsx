import '../styles/TopBar.css';

export default function TopBar({ nodeCount, edgeCount, onRunPipeline, isRunning }) {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <polygon points="10,1 18.66,6 18.66,14 10,19 1.34,14 1.34,6" fill="var(--color-primary-container)" opacity="0.2" />
          <polygon points="10,1 18.66,6 18.66,14 10,19 1.34,14 1.34,6" fill="none" stroke="var(--color-primary-container)" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="2.5" fill="var(--color-primary)" />
        </svg>
        <span className="text-headline-md topbar__title">PipelineForge</span>
      </div>

      <div className="topbar__stats">
        <span className="topbar__stat">
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>account_tree</span>
          {nodeCount} nodes
        </span>
        <span className="topbar__divider" />
        <span className="topbar__stat">
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>device_hub</span>
          {edgeCount} edges
        </span>
      </div>

      <div className="topbar__actions">
        <button className="btn-secondary" title="Save pipeline">
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>save</span>
          Save
        </button>
        <button
          id="run-pipeline-btn"
          className={`btn-primary ${isRunning ? 'btn-primary--loading' : ''}`}
          onClick={onRunPipeline}
          disabled={isRunning}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
            {isRunning ? 'sync' : 'play_arrow'}
          </span>
          {isRunning ? 'Running…' : 'Submit Pipeline'}
        </button>
        <button className="btn-ghost" title="Settings">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button className="btn-ghost" title="Account">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  );
}
