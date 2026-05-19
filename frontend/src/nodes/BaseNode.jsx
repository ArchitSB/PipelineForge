import '../styles/BaseNode.css';

export default function BaseNode({
  title,
  icon,
  accentColor,
  children,
  headerActions,
  selected,
}) {
  return (
    <div className={`pf-node ${selected ? 'pf-node--selected' : ''}`}>
      {/* Left accent bar */}
      <div className="pf-node__accent" style={{ background: accentColor }} />

      {/* Node body */}
      <div className="pf-node__body">
        {/* Header */}
        <div className="pf-node__header">
          <div className="pf-node__title" style={{ color: accentColor }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              {icon}
            </span>
            <span className="text-label-md" style={{ color: 'var(--color-on-surface)', fontWeight: 700 }}>
              {title}
            </span>
          </div>
          {headerActions && (
            <div className="pf-node__header-actions">{headerActions}</div>
          )}
        </div>

        {/* Content */}
        {children && <div className="pf-node__content">{children}</div>}
      </div>
    </div>
  );
}
