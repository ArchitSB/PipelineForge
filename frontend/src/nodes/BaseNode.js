// BaseNode.js
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ title, inputs = [], outputs = [], children, titleColor = '#4a9eff', style = {} }) => {
  const containerStyle = {
    minWidth: 200,
    minHeight: 80,
    background: '#1e1e2e',
    border: '1px solid #333',
    borderRadius: '10px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
    position: 'relative',
    fontFamily: "'Segoe UI', sans-serif",
    ...style,
  };

  const titleBarStyle = {
    backgroundColor: titleColor,
    padding: '6px 12px',
    borderRadius: '10px 10px 0 0',
    display: 'flex',
    alignItems: 'center',
  };

  const bodyStyle = {
    padding: '10px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  };

  const handleStyle = {
    width: 10,
    height: 10,
    background: '#aaa',
    border: '2px solid #555',
    borderRadius: '50%',
  };

  return (
    <div style={containerStyle}>
      {inputs.map((inp) => (
        <Handle
          key={inp.id}
          type="target"
          position={Position.Left}
          id={inp.id}
          style={{ ...handleStyle, ...(inp.style || {}) }}
        />
      ))}

      <div style={titleBarStyle}>
        {title.icon && (
          <span style={{ marginRight: 6, fontSize: 14 }}>{title.icon}</span>
        )}
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 13, letterSpacing: 0.3 }}>
          {typeof title === 'string' ? title : title.label}
        </span>
      </div>

      <div style={bodyStyle}>
        {children}
      </div>

      {outputs.map((out) => (
        <Handle
          key={out.id}
          type="source"
          position={Position.Right}
          id={out.id}
          style={{ ...handleStyle, ...(out.style || {}) }}
        />
      ))}
    </div>
  );
};
