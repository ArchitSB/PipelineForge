import { Handle, Position } from '@xyflow/react';
import BaseNode from './BaseNode';

export default function NoteNode({ data, selected }) {
  return (
    <BaseNode
      title={data.label || 'Note'}
      icon="sticky_note_2"
      accentColor="#6b6b6b"
      selected={selected}
    >
      <p className="pf-description" style={{ fontStyle: 'italic' }}>
        {data.text || 'Add a note here...'}
      </p>
    </BaseNode>
  );
}
