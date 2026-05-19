import { Handle, Position, useReactFlow } from '@xyflow/react';
import BaseNode from './BaseNode';

const nokey = (e) => e.stopPropagation();

export default function ConditionalNode({ id, data, selected }) {
  const { setNodes } = useReactFlow();

  const set = (key) => (e) =>
    setNodes((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, [key]: e.target.value } } : n));

  return (
    <BaseNode title={data.label || 'Conditional'} icon="call_split" accentColor="var(--color-accent-red)" selected={selected}>
      <div className="pf-field">
        <label>Branch on</label>
        <input className="nodrag" type="text" value={data.field || ''} placeholder="status" onChange={set('field')} onKeyDown={nokey} />
      </div>
      <Handle type="target" position={Position.Left} id="input" />
      <Handle type="source" position={Position.Right} id="branch-a" style={{ borderColor: 'var(--color-accent-green)', top: '35%' }} />
      <Handle type="source" position={Position.Right} id="branch-b" style={{ borderColor: 'var(--color-accent-red)', top: '65%' }} />
    </BaseNode>
  );
}
