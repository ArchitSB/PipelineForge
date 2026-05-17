// conditionalNode.js
import { BaseNode } from './BaseNode';

const branchStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  fontSize: 12,
};

const branchBadge = (color, label) => ({
  display: 'inline-block',
  background: color,
  borderRadius: 4,
  padding: '2px 10px',
  fontSize: 11,
  color: '#fff',
  fontWeight: 600,
});

export const ConditionalNode = ({ id, data }) => {
  return (
    <BaseNode
      title="Conditional"
      titleColor="#e74c3c"
      inputs={[{ id: `${id}-input` }]}
      outputs={[
        { id: `${id}-true`, style: { top: '35%' } },
        { id: `${id}-false`, style: { top: '65%' } },
      ]}
    >
      <div style={branchStyle}>
        <span style={branchBadge('#2ecc71', 'True')}>True  →</span>
        <span style={branchBadge('#e74c3c', 'False')}>False →</span>
      </div>
    </BaseNode>
  );
};
