// toolbar.js
import { DraggableNode } from './draggableNode';

const NODE_DEFS = [
  { type: 'customInput',  label: 'Input',       color: '#3498db', icon: '→' },
  { type: 'customOutput', label: 'Output',      color: '#2ecc71', icon: '←' },
  { type: 'llm',          label: 'LLM',         color: '#9b59b6', icon: '◈' },
  { type: 'text',         label: 'Text',        color: '#1abc9c', icon: 'T' },
  { type: 'filter',       label: 'Filter',      color: '#e67e22', icon: '⊘' },
  { type: 'math',         label: 'Math',        color: '#8e44ad', icon: '±' },
  { type: 'api',          label: 'API',         color: '#27ae60', icon: '⚡' },
  { type: 'note',         label: 'Note',        color: '#f39c12', icon: '✎' },
  { type: 'conditional',  label: 'Conditional', color: '#e74c3c', icon: '⑂' },
];

const sidebarStyle = {
  width: 200,
  minHeight: '100vh',
  background: '#12121f',
  borderRight: '1px solid #252540',
  display: 'flex',
  flexDirection: 'column',
  padding: '0 0 24px 0',
  boxSizing: 'border-box',
  flexShrink: 0,
};

const headerStyle = {
  padding: '20px 16px 12px',
  borderBottom: '1px solid #252540',
  marginBottom: 8,
};

const titleStyle = {
  color: '#7c7cff',
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: 1,
  textTransform: 'uppercase',
  margin: 0,
};

const subtitleStyle = {
  color: '#555',
  fontSize: 11,
  marginTop: 4,
};

const sectionLabelStyle = {
  color: '#444',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  padding: '8px 16px 4px',
};

const nodeListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  padding: '0 10px',
};

export const PipelineToolbar = () => {
  return (
    <div style={sidebarStyle}>
      <div style={headerStyle}>
        <p style={titleStyle}>PipelineForge</p>
        <p style={subtitleStyle}>Drag nodes to canvas</p>
      </div>
      <div style={sectionLabelStyle}>Nodes</div>
      <div style={nodeListStyle}>
        {NODE_DEFS.map((n) => (
          <DraggableNode
            key={n.type}
            type={n.type}
            label={n.label}
            color={n.color}
            icon={n.icon}
          />
        ))}
      </div>
    </div>
  );
};
