// inputNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  fontSize: 12,
  color: '#ccc',
};

const inputStyle = {
  background: '#2a2a3e',
  border: '1px solid #444',
  borderRadius: 5,
  color: '#eee',
  padding: '4px 6px',
  fontSize: 12,
  outline: 'none',
};

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      title="Input"
      titleColor="#3498db"
      inputs={[]}
      outputs={[{ id: `${id}-value` }]}
    >
      <label style={labelStyle}>
        Name
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Type
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          style={inputStyle}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
