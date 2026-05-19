import { Handle, Position, useReactFlow } from '@xyflow/react';
import BaseNode from './BaseNode';

const nokey = (e) => e.stopPropagation();

export default function TextNode({ id, data, selected }) {
  const { setNodes } = useReactFlow();

  const set = (key) => (e) =>
    setNodes((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, [key]: e.target.value } } : n));

  return (
    <BaseNode title={data.label || 'Prompt Template'} icon="subject" accentColor="var(--color-accent-amber)" selected={selected}>
      <div className="pf-field">
        <label>Template</label>
        <textarea
          className="nodrag pf-field-textarea"
          value={data.template || ''}
          placeholder='"Analyze: {{input}}"'
          onChange={set('template')}
          onKeyDown={nokey}
          rows={3}
        />
      </div>
      <Handle type="target" position={Position.Left} id="input" />
      <Handle type="source" position={Position.Right} id="output" style={{ borderColor: 'var(--color-accent-green)' }} />
    </BaseNode>
  );
}
