import { Handle, Position } from '@xyflow/react';
import BaseNode from './BaseNode';

export default function InputNode({ data, selected }) {
  return (
    <BaseNode
      title="User Input"
      icon="login"
      accentColor="var(--color-accent-cyan)"
      selected={selected}
    >
      <p className="pf-description">Capture raw user text stream.</p>
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ borderColor: 'var(--color-accent-green)' }}
      />
    </BaseNode>
  );
}
