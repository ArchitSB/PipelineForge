// mathNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

const labelStyle = { display: 'flex', flexDirection: 'column', gap: 3, fontSize: 12, color: '#ccc' };
const selectStyle = {
  background: '#2a2a3e', border: '1px solid #444', borderRadius: 5,
  color: '#eee', padding: '4px 6px', fontSize: 12, outline: 'none',
};
const inputLabelStyle = { fontSize: 11, color: '#888' };

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || '+');

  return (
    <BaseNode
      title="Math"
      titleColor="#8e44ad"
      inputs={[
        { id: `${id}-a`, style: { top: '35%' } },
        { id: `${id}-b`, style: { top: '65%' } },
      ]}
      outputs={[{ id: `${id}-result` }]}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#888', marginBottom: 2 }}>
        <span style={inputLabelStyle}>a</span>
        <span style={inputLabelStyle}>b</span>
      </div>
      <label style={labelStyle}>
        Operation
        <select value={operation} onChange={(e) => setOperation(e.target.value)} style={selectStyle}>
          <option value="+">Add  (+)</option>
          <option value="-">Subtract  (-)</option>
          <option value="*">Multiply  (×)</option>
          <option value="/">Divide  (÷)</option>
        </select>
      </label>
    </BaseNode>
  );
};
