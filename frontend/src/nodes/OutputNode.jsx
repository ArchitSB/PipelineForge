import { Handle, Position } from '@xyflow/react';
import BaseNode from './BaseNode';

export default function OutputNode({ data, selected }) {
  return (
    <BaseNode
      title={data.label || 'Final Response'}
      icon="logout"
      accentColor="var(--color-accent-green)"
      selected={selected}
    >
      <div className="badge badge-success" style={{ display: 'inline-flex' }}>
        Ready
      </div>
      <Handle type="target" position={Position.Left} id="input" />
    </BaseNode>
  );
}
