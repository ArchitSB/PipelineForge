// draggableNode.js
export const DraggableNode = ({ type, label, color = '#4a9eff', icon = '' }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
    event.target.style.opacity = '0.6';
  };

  const onDragEnd = (event) => {
    event.target.style.opacity = '1';
  };

  const containerStyle = {
    cursor: 'grab',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 10px',
    borderRadius: 8,
    background: '#1a1a2e',
    border: `1px solid #252540`,
    userSelect: 'none',
    transition: 'background 0.15s, border-color 0.15s',
  };

  const dotStyle = {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: color,
    flexShrink: 0,
    boxShadow: `0 0 6px ${color}88`,
  };

  const iconStyle = {
    width: 22,
    height: 22,
    borderRadius: 5,
    background: color + '22',
    border: `1px solid ${color}44`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    color: color,
    flexShrink: 0,
  };

  const labelStyle = {
    color: '#ccc',
    fontSize: 13,
    fontWeight: 500,
    flex: 1,
  };

  const gripStyle = {
    color: '#444',
    fontSize: 12,
    letterSpacing: -1,
  };

  return (
    <div
      className={type}
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      onDragEnd={onDragEnd}
      style={containerStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#1e1e3a';
        e.currentTarget.style.borderColor = color + '66';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#1a1a2e';
        e.currentTarget.style.borderColor = '#252540';
      }}
    >
      <div style={iconStyle}>{icon}</div>
      <span style={labelStyle}>{label}</span>
      <span style={gripStyle}>⠿</span>
    </div>
  );
};
