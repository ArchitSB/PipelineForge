import { Handle, Position, useReactFlow } from '@xyflow/react';
import BaseNode from './BaseNode';

const MODELS = ['gpt-4-turbo', 'gpt-4o', 'claude-3.5-sonnet', 'gemini-1.5-pro'];
const nokey = (e) => e.stopPropagation();

export default function LLMNode({ id, data, selected }) {
  const { setNodes } = useReactFlow();

  const set = (key) => (e) =>
    setNodes((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, [key]: e.target.value } } : n));

  return (
    <BaseNode title={data.label || 'LLM Processor'} icon="psychology" accentColor="var(--color-accent-blue)" selected={selected}>
      <div className="pf-field">
        <label>Model</label>
        <select className="nodrag" value={data.model || 'gpt-4-turbo'} onChange={set('model')} onKeyDown={nokey}>
          {MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div className="pf-field">
        <label>Temperature</label>
        <input className="nodrag" type="text" value={data.temperature ?? '0.7'} onChange={set('temperature')} onKeyDown={nokey} />
      </div>
      <Handle type="target" position={Position.Left} id="input" />
      <Handle type="source" position={Position.Right} id="output" style={{ borderColor: 'var(--color-accent-green)' }} />
    </BaseNode>
  );
}
