// submit.js
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const btnStyle = {
  padding: '12px 28px',
  background: 'linear-gradient(135deg, #7c7cff 0%, #5555cc 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
  letterSpacing: 0.5,
  boxShadow: '0 4px 20px rgba(124,124,255,0.4)',
  transition: 'transform 0.1s, box-shadow 0.1s',
};

const wrapperStyle = {
  position: 'fixed',
  bottom: 28,
  right: 28,
  zIndex: 100,
};

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      alert(
        `Pipeline Analysis:\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag ? 'Yes' : 'No'}`
      );
    } catch (err) {
      alert(`Failed to submit pipeline:\n${err.message}`);
    }
  };

  return (
    <div style={wrapperStyle}>
      <button
        onClick={handleSubmit}
        style={btnStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(124,124,255,0.55)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,124,255,0.4)';
        }}
      >
        Submit Pipeline
      </button>
    </div>
  );
};
