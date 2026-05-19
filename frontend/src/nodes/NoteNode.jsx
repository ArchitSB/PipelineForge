import { Handle, Position, useReactFlow } from '@xyflow/react';
import BaseNode from './BaseNode';

const stopKeys = (e) => e.stopPropagation();

export default function NoteNode({ id, data, selected }) {
  const { setNodes } = useReactFlow();

  const update = (key) => (e) => {
    setNodes((nds) =>
      nds.map((n) => n.id === id ? { ...n, data: { ...n.data, [key]: e.target.value } } : n)
    );
  };

  return (
    <BaseNode
      title={data.label || 'Note'}
      icon="sticky_note_2"
      accentColor="#6b6b6b"
      selected={selected}
    >
      <textarea
        className="nodrag pf-field-textarea"
        value={data.text || ''}
        placeholder="Add a note here..."
        onChange={update('text')}
        onKeyDown={stopKeys}
        rows={3}
        style={{ fontStyle: 'italic' }}
      />
    </BaseNode>
  );
}
