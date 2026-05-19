import { Handle, Position, useReactFlow } from '@xyflow/react';
import BaseNode from './BaseNode';

const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const nokey = (e) => e.stopPropagation();

export default function APINode({ id, data, selected }) {
  const { setNodes } = useReactFlow();

  const set = (key) => (e) =>
    setNodes((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, [key]: e.target.value } } : n));

  return (
    <BaseNode title={data.label || 'API Call'} icon="api" accentColor="var(--color-accent-cyan)" selected={selected}>
      <div className="pf-field">
        <label>Method</label>
        <select
          className="nodrag"
          value={data.method || 'GET'}
          onChange={set('method')}
          onKeyDown={nokey}
          style={{ color: 'var(--color-accent-cyan)', fontWeight: 600 }}
        >
          {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div className="pf-field">
        <label>Endpoint</label>
        <input className="nodrag" type="text" value={data.endpoint || ''} placeholder="/api/v1/endpoint" onChange={set('endpoint')} onKeyDown={nokey} />
      </div>
      <Handle type="target" position={Position.Left} id="input" />
      <Handle type="source" position={Position.Right} id="output" style={{ borderColor: 'var(--color-accent-green)' }} />
    </BaseNode>
  );
}
