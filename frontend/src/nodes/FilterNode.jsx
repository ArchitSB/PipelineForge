import { Handle, Position, useReactFlow } from '@xyflow/react';
import BaseNode from './BaseNode';

const nokey = (e) => e.stopPropagation();

export default function FilterNode({ id, data, selected }) {
  const { setNodes } = useReactFlow();

  const set = (key) => (e) =>
    setNodes((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, [key]: e.target.value } } : n));

  return (
    <BaseNode title={data.label || 'Filter'} icon="filter_alt" accentColor="var(--color-accent-purple)" selected={selected}>
      <div className="pf-field">
        <label>Condition</label>
        <input className="nodrag" type="text" value={data.condition || ''} placeholder="value > 0" onChange={set('condition')} onKeyDown={nokey} />
      </div>
      <Handle type="target" position={Position.Left} id="input" />
      <Handle type="source" position={Position.Right} id="true" style={{ borderColor: 'var(--color-accent-green)', top: '35%' }} />
      <Handle type="source" position={Position.Right} id="false" style={{ borderColor: 'var(--color-accent-red)', top: '65%' }} />
    </BaseNode>
  );
}
