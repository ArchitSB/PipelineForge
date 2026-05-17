// outputNode.js
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

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      title="Output"
      titleColor="#2ecc71"
      inputs={[{ id: `${id}-value` }]}
      outputs={[]}
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
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          style={inputStyle}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
