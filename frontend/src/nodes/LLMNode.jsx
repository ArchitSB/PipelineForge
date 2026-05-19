import { Handle, Position } from '@xyflow/react';
import BaseNode from './BaseNode';

const MODELS = ['gpt-4-turbo', 'gpt-4o', 'claude-3.5-sonnet', 'gemini-1.5-pro'];

export default function LLMNode({ data, selected }) {
  return (
    <BaseNode
      title={data.label || 'LLM Processor'}
      icon="psychology"
      accentColor="var(--color-accent-blue)"
      selected={selected}
    >
      <div className="pf-field">
        <label>Model</label>
        <div className="pf-field-value">
          <span>{data.model || 'gpt-4-turbo'}</span>
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
            arrow_drop_down
          </span>
        </div>
      </div>
      <div className="pf-field">
        <label>Temperature</label>
        <div className="pf-field-value">
          <span>{data.temperature ?? '0.7'}</span>
        </div>
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
