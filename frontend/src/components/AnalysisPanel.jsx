import { useEffect, useState } from 'react';
import '../styles/AnalysisPanel.css';
import { isValidDAG, countNodeTypes } from '../utils/dagUtils';

const typeColors = {
  input: 'var(--color-accent-cyan)',
  output: 'var(--color-accent-green)',
  llm: 'var(--color-accent-blue)',
  text: 'var(--color-accent-amber)',
  filter: 'var(--color-accent-purple)',
  math: 'var(--color-accent-amber)',
  api: 'var(--color-accent-cyan)',
  note: '#6b6b6b',
  conditional: 'var(--color-accent-red)',
};

// count-up animation for a number target
function useCountUp(target, delay = 50) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let n = 0;
    const t = setInterval(() => {
      n++;
      setVal(n);
      if (n >= target) clearInterval(t);
    }, delay);
    return () => clearInterval(t);
  }, [target, delay]);
  return val;
}

export default function AnalysisPanel({ nodes, edges, onClose, onSubmit, isRunning }) {
  const [result, setResult] = useState(null);
  const dagOk = isValidDAG(nodes, edges);
  const nodeCounts = countNodeTypes(nodes);
  const animNodes = useCountUp(nodes.length, 50);
  const animEdges = useCountUp(edges.length, 60);

  function submit() {
    onSubmit();
    setTimeout(() => {
      setResult({
        status: 'success',
        executionTime: (Math.random() * 2 + 0.5).toFixed(2) + 's',
        tokensUsed: Math.floor(Math.random() * 1500 + 300),
        nodesProcessed: nodes.length,
      });
    }, 2000);
  }

  return (
    <div className="analysis-panel animate-slide-up">
      <div className="analysis-panel__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-primary)' }}>analytics</span>
          <span style={{ color: '#f0f0f0', fontWeight: 600, fontSize: '13px' }}>Pipeline Analysis</span>
        </div>
        <button className="btn-ghost" onClick={onClose} style={{ padding: '2px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
        </button>
      </div>

      <div className="analysis-panel__stats">
        <div className="analysis-stat">
          <span className="analysis-stat__label">Nodes</span>
          <span className="analysis-stat__value" style={{ color: 'var(--color-accent-blue)' }}>{animNodes}</span>
        </div>
        <div className="analysis-stat">
          <span className="analysis-stat__label">Edges</span>
          <span className="analysis-stat__value" style={{ color: 'var(--color-accent-blue)' }}>{animEdges}</span>
        </div>
        <div className="analysis-stat">
          <span className="analysis-stat__label">Valid DAG</span>
          <span className="analysis-stat__value" style={{ color: dagOk ? 'var(--color-accent-green)' : 'var(--color-error)' }}>
            {dagOk ? 'Yes ✓' : 'No ✗'}
          </span>
        </div>
      </div>

      {Object.keys(nodeCounts).length > 0 && (
        <div className="analysis-panel__breakdown">
          <div className="analysis-panel__section-label">Node Types</div>
          {Object.entries(nodeCounts).map(([type, count]) => (
            <div key={type} className="analysis-type-row">
              <div className="analysis-type-dot" style={{ background: typeColors[type] || 'var(--color-outline)' }} />
              <span style={{ flex: 1, fontSize: '12px', color: 'var(--color-on-surface-variant)', textTransform: 'capitalize' }}>
                {type}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-on-surface)', fontWeight: 600 }}>{count}</span>
            </div>
          ))}
        </div>
      )}

      {nodes.length === 0 && (
        <div className="analysis-panel__warning">
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>warning</span>
          Canvas is empty. Add nodes to start.
        </div>
      )}

      {!dagOk && nodes.length > 0 && (
        <div className="analysis-panel__error">
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>error</span>
          Cycle detected in pipeline graph.
        </div>
      )}

      {result && (
        <div className="analysis-panel__result animate-fade-in">
          <div style={{ color: 'var(--color-accent-green)', fontWeight: 600, fontSize: '12px', marginBottom: '4px' }}>
            ✓ Pipeline Executed
          </div>
          <div className="analysis-stat">
            <span className="analysis-stat__label">Time</span>
            <span style={{ fontSize: '12px', color: 'var(--color-secondary)' }}>{result.executionTime}</span>
          </div>
          <div className="analysis-stat">
            <span className="analysis-stat__label">Tokens</span>
            <span style={{ fontSize: '12px', color: 'var(--color-secondary)' }}>{result.tokensUsed.toLocaleString()}</span>
          </div>
        </div>
      )}

      <button
        className={`btn-primary analysis-panel__submit ${!dagOk || nodes.length === 0 ? 'analysis-panel__submit--disabled' : ''}`}
        onClick={submit}
        disabled={!dagOk || nodes.length === 0 || isRunning}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
          {isRunning ? 'sync' : 'arrow_forward'}
        </span>
        {isRunning ? 'Running…' : 'Submit Pipeline'}
      </button>
    </div>
  );
}
