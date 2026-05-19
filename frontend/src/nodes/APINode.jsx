import { Handle, Position } from '@xyflow/react';
import BaseNode from './BaseNode';

export default function APINode({ data, selected }) {
  return (
    <BaseNode
      title={data.label || 'API Call'}
      icon="api"
      accentColor="var(--color-accent-cyan)"
      selected={selected}
    >
      <div className="pf-field">
        <label>Method</label>
        <div className="pf-field-value">
          <span style={{ color: 'var(--color-accent-cyan)', fontWeight: 600 }}>
            {data.method || 'GET'}
          </span>
        </div>
      </div>
      <div className="pf-field">
        <label>Endpoint</label>
        <div className="pf-code-preview">{data.endpoint || '/api/v1/...'}</div>
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
