import { useEffect, useState } from 'react';
import '../styles/AnalysisPanel.css';
import { isValidDAG, countNodeTypes } from '../utils/dagUtils';

export default function AnalysisPanel({ nodes, edges, onClose, onSubmit, isRunning }) {
  const [animatedNodes, setAnimatedNodes] = useState(0);
  const [animatedEdges, setAnimatedEdges] = useState(0);
  const [result, setResult] = useState(null);

  const validDAG = isValidDAG(nodes, edges);
  const typeCounts = countNodeTypes(nodes);

  // Count-up animation
  useEffect(() => {
    const target = nodes.length;
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setAnimatedNodes(current);
      if (current >= target) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [nodes.length]);

  useEffect(() => {
    const target = edges.length;
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setAnimatedEdges(current);
      if (current >= target) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [edges.length]);

  const handleSubmit = () => {
    onSubmit();
    setTimeout(() => {
      setResult({
        status: 'success',
        executionTime: (Math.random() * 2 + 0.5).toFixed(2) + 's',
        tokensUsed: Math.floor(Math.random() * 1500 + 300),
        nodesProcessed: nodes.length,
      });
    }, 2000);
  };

  const NODE_TYPE_COLORS = {
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

  return (
    <div className="analysis-panel animate-slide-up">
      {/* Header */}
      <div className="analysis-panel__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-primary)' }}>
            analytics
          </span>
          <span style={{ color: '#f0f0f0', fontWeight: 600, fontSize: '13px' }}>
            Pipeline Analysis
          </span>
        </div>
        <button className="btn-ghost" onClick={onClose} style={{ padding: '2px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
        </button>
      </div>

      {/* Stats */}
      <div className="analysis-panel__stats">
        <div className="analysis-stat">
          <span className="analysis-stat__label">Nodes</span>
          <span className="analysis-stat__value" style={{ color: 'var(--color-accent-blue)' }}>
            {animatedNodes}
          </span>
        </div>
        <div className="analysis-stat">
          <span className="analysis-stat__label">Edges</span>
          <span className="analysis-stat__value" style={{ color: 'var(--color-accent-blue)' }}>
            {animatedEdges}
          </span>
        </div>
        <div className="analysis-stat">
          <span className="analysis-stat__label">Valid DAG</span>
          <span
            className="analysis-stat__value"
            style={{ color: validDAG ? 'var(--color-accent-green)' : 'var(--color-error)' }}
          >
            {validDAG ? 'Yes ✓' : 'No ✗'}
          </span>
        </div>
      </div>

      {/* Node Type Breakdown */}
      {Object.keys(typeCounts).length > 0 && (
        <div className="analysis-panel__breakdown">
          <div className="analysis-panel__section-label">Node Types</div>
          {Object.entries(typeCounts).map(([type, count]) => (
            <div key={type} className="analysis-type-row">
              <div
                className="analysis-type-dot"
                style={{ background: NODE_TYPE_COLORS[type] || 'var(--color-outline)' }}
              />
              <span style={{ flex: 1, fontSize: '12px', color: 'var(--color-on-surface-variant)', textTransform: 'capitalize' }}>
                {type}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-on-surface)', fontWeight: 600 }}>
                {count}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Errors */}
      {nodes.length === 0 && (
        <div className="analysis-panel__warning">
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>warning</span>
          Canvas is empty. Add nodes to start.
        </div>
      )}

      {!validDAG && nodes.length > 0 && (
        <div className="analysis-panel__error">
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>error</span>
          Cycle detected in pipeline graph.
        </div>
      )}

      {/* Result */}
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

      {/* Submit button */}
      <button
        className={`btn-primary analysis-panel__submit ${!validDAG || nodes.length === 0 ? 'analysis-panel__submit--disabled' : ''}`}
        onClick={handleSubmit}
        disabled={!validDAG || nodes.length === 0 || isRunning}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
          {isRunning ? 'sync' : 'arrow_forward'}
        </span>
        {isRunning ? 'Running…' : 'Submit Pipeline'}
      </button>
    </div>
  );
}
