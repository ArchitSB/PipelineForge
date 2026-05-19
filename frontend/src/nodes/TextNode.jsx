import { Handle, Position } from '@xyflow/react';
import BaseNode from './BaseNode';

export default function TextNode({ data, selected }) {
  return (
    <BaseNode
      title={data.label || 'Prompt Template'}
      icon="subject"
      accentColor="var(--color-accent-amber)"
      selected={selected}
    >
      <div className="pf-code-preview">
        {data.template || '"Analyze: {{input}}"'}
      </div>
      <Handle type="target" position={Position.Left} id="input" />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ borderColor: 'var(--color-accent-green)' }}
      />
    </BaseNode>
  );
}
