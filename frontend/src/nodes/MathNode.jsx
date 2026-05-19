import { Handle, Position, useReactFlow } from '@xyflow/react';
import BaseNode from './BaseNode';

const nokey = (e) => e.stopPropagation();

export default function MathNode({ id, data, selected }) {
  const { setNodes } = useReactFlow();

  const set = (key) => (e) =>
    setNodes((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, [key]: e.target.value } } : n));

  return (
    <BaseNode title={data.label || 'Math'} icon="functions" accentColor="var(--color-accent-amber)" selected={selected}>
      <div className="pf-field">
        <label>Expression</label>
        <input className="nodrag" type="text" value={data.expression || ''} placeholder="a + b * 2" onChange={set('expression')} onKeyDown={nokey} />
      </div>
      <Handle type="target" position={Position.Left} id="a" style={{ top: '35%' }} />
      <Handle type="target" position={Position.Left} id="b" style={{ top: '65%' }} />
      <Handle type="source" position={Position.Right} id="result" style={{ borderColor: 'var(--color-accent-green)' }} />
    </BaseNode>
  );
}
