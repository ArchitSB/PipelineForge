// noteNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

const textareaStyle = {
  background: '#2a2a3e',
  border: '1px solid #444',
  borderRadius: 5,
  color: '#eee',
  padding: '6px 8px',
  fontSize: 12,
  outline: 'none',
  resize: 'vertical',
  lineHeight: 1.5,
  width: '100%',
  boxSizing: 'border-box',
  minHeight: 80,
};

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');

  return (
    <BaseNode
      title="Note"
      titleColor="#f39c12"
      inputs={[]}
      outputs={[]}
      style={{ minWidth: 200 }}
    >
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a note or annotation..."
        style={textareaStyle}
        rows={4}
      />
    </BaseNode>
  );
};
