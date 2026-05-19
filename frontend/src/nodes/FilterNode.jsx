import { Handle, Position } from '@xyflow/react';
import BaseNode from './BaseNode';

export default function FilterNode({ data, selected }) {
  return (
    <BaseNode
      title={data.label || 'Filter'}
      icon="filter_alt"
      accentColor="var(--color-accent-purple)"
      selected={selected}
    >
      <div className="pf-field">
        <label>Condition</label>
        <div className="pf-field-value">
          <span>{data.condition || 'value > 0'}</span>
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="input" />
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{ borderColor: 'var(--color-accent-green)', top: '35%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        style={{ borderColor: 'var(--color-accent-red)', top: '65%' }}
      />
    </BaseNode>
  );
}
