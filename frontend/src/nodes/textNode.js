// textNode.js
import { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const textareaStyle = {
  background: '#2a2a3e',
  border: '1px solid #444',
  borderRadius: 5,
  color: '#eee',
  padding: '6px 8px',
  fontSize: 12,
  outline: 'none',
  resize: 'none',
  lineHeight: 1.5,
  fontFamily: 'monospace',
};

const handleDotStyle = {
  width: 10,
  height: 10,
  background: '#aaa',
  border: '2px solid #555',
  borderRadius: '50%',
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [nodeWidth, setNodeWidth] = useState(220);

  const parseVariables = useCallback((text) => {
    const matches = new Set();
    let match;
    const re = new RegExp(VAR_REGEX.source, VAR_REGEX.flags);
    while ((match = re.exec(text)) !== null) {
      matches.add(match[1]);
    }
    return Array.from(matches);
  }, []);

  useEffect(() => {
    setVariables(parseVariables(currText));

    const lines = currText.split('\n');
    const longestLine = Math.max(...lines.map((l) => l.length), 20);
    setNodeWidth(Math.max(220, longestLine * 8 + 48));
  }, [currText, parseVariables]);

  const rows = Math.max(3, currText.split('\n').length + 1);

  return (
    <div style={{ position: 'relative' }}>
      {/* Dynamic variable handles on the left */}
      {variables.map((varName, i) => (
        <Handle
          key={`${id}-${varName}`}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            ...handleDotStyle,
            top: `${((i + 1) / (variables.length + 1)) * 100}%`,
          }}
        />
      ))}

      <BaseNode
        title="Text"
        titleColor="#1abc9c"
        inputs={[]}
        outputs={[{ id: `${id}-output` }]}
        style={{ width: nodeWidth }}
      >
        {variables.length > 0 && (
          <div style={{ fontSize: 10, color: '#888', marginBottom: 2 }}>
            Variables: {variables.map((v) => `{{${v}}}`).join(', ')}
          </div>
        )}
        <textarea
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={rows}
          style={{ ...textareaStyle, width: '100%', boxSizing: 'border-box' }}
        />
      </BaseNode>
    </div>
  );
};
