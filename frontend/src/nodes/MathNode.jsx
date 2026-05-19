import { Handle, Position } from '@xyflow/react';
import BaseNode from './BaseNode';

export default function MathNode({ data, selected }) {
  return (
    <BaseNode
      title={data.label || 'Math'}
      icon="functions"
      accentColor="var(--color-accent-amber)"
      selected={selected}
    >
      <div className="pf-field">
        <label>Expression</label>
        <div className="pf-code-preview">{data.expression || 'a + b * 2'}</div>
      </div>
      <Handle type="target" position={Position.Left} id="a" style={{ top: '35%' }} />
      <Handle type="target" position={Position.Left} id="b" style={{ top: '65%' }} />
      <Handle
        type="source"
        position={Position.Right}
        id="result"
        style={{ borderColor: 'var(--color-accent-green)' }}
      />
    </BaseNode>
  );
}
