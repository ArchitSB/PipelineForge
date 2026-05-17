// apiNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

const labelStyle = { display: 'flex', flexDirection: 'column', gap: 3, fontSize: 12, color: '#ccc' };
const fieldStyle = {
  background: '#2a2a3e', border: '1px solid #444', borderRadius: 5,
  color: '#eee', padding: '4px 6px', fontSize: 12, outline: 'none',
};

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      title="API"
      titleColor="#27ae60"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
    >
      <label style={labelStyle}>
        Method
        <select value={method} onChange={(e) => setMethod(e.target.value)} style={fieldStyle}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>
      </label>
      <label style={labelStyle}>
        URL
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/..."
          style={{ ...fieldStyle, width: '100%', boxSizing: 'border-box' }}
        />
      </label>
    </BaseNode>
  );
};
