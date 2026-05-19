import { Handle, Position } from '@xyflow/react';
import BaseNode from './BaseNode';

export default function ConditionalNode({ data, selected }) {
  return (
    <BaseNode
      title={data.label || 'Conditional'}
      icon="call_split"
      accentColor="var(--color-accent-red)"
      selected={selected}
    >
      <div className="pf-field">
        <label>Branch on</label>
        <div className="pf-field-value">
          <span>{data.field || 'status'}</span>
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="input" />
      <Handle
        type="source"
        position={Position.Right}
        id="branch-a"
        style={{ borderColor: 'var(--color-accent-green)', top: '35%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="branch-b"
        style={{ borderColor: 'var(--color-accent-red)', top: '65%' }}
      />
    </BaseNode>
  );
}
