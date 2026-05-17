// filterNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

const labelStyle = { display: 'flex', flexDirection: 'column', gap: 3, fontSize: 12, color: '#ccc' };
const selectStyle = {
  background: '#2a2a3e', border: '1px solid #444', borderRadius: 5,
  color: '#eee', padding: '4px 6px', fontSize: 12, outline: 'none',
};

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');

  return (
    <BaseNode
      title="Filter"
      titleColor="#e67e22"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
    >
      <label style={labelStyle}>
        Condition
        <select value={condition} onChange={(e) => setCondition(e.target.value)} style={selectStyle}>
          <option value="equals">Equals</option>
          <option value="contains">Contains</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
          <option value="greaterThan">Greater Than</option>
          <option value="lessThan">Less Than</option>
        </select>
      </label>
    </BaseNode>
  );
};
