// llmNode.js
import { BaseNode } from './BaseNode';

const infoStyle = {
  fontSize: 12,
  color: '#aaa',
  lineHeight: 1.5,
};

const badgeStyle = {
  display: 'inline-block',
  background: '#2a2a3e',
  border: '1px solid #555',
  borderRadius: 4,
  padding: '2px 8px',
  fontSize: 11,
  color: '#bbb',
  marginBottom: 4,
};

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      title="LLM"
      titleColor="#9b59b6"
      inputs={[
        { id: `${id}-system`, style: { top: '33%' } },
        { id: `${id}-prompt`, style: { top: '67%' } },
      ]}
      outputs={[{ id: `${id}-response` }]}
    >
      <div style={infoStyle}>
        <span style={badgeStyle}>system</span>
        <br />
        <span style={badgeStyle}>prompt</span>
      </div>
      <span style={{ ...infoStyle, color: '#666' }}>LLM inference node</span>
    </BaseNode>
  );
};
