import { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import TopBar from './components/TopBar';
import NodeLibrary from './components/NodeLibrary';
import AnalysisPanel from './components/AnalysisPanel';

import InputNode from './nodes/InputNode';
import OutputNode from './nodes/OutputNode';
import LLMNode from './nodes/LLMNode';
import TextNode from './nodes/TextNode';
import FilterNode from './nodes/FilterNode';
import MathNode from './nodes/MathNode';
import APINode from './nodes/APINode';
import NoteNode from './nodes/NoteNode';
import ConditionalNode from './nodes/ConditionalNode';

import CursorGlow from './components/CursorGlow';
import AnimatedEdge from './edges/AnimatedEdge';
import './styles/App.css';

// Register custom node types
const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
  text: TextNode,
  filter: FilterNode,
  math: MathNode,
  api: APINode,
  note: NoteNode,
  conditional: ConditionalNode,
};

// Register custom edge types
const edgeTypes = {
  default: AnimatedEdge,
  animated: AnimatedEdge,
};

// Default nodes matching the Stitch design
const defaultNodes = [
  {
    id: '1',
    type: 'input',
    position: { x: 100, y: 160 },
    data: { label: 'User Input' },
  },
  {
    id: '2',
    type: 'llm',
    position: { x: 420, y: 100 },
    data: { label: 'GPT-4 Processor', model: 'gpt-4-turbo', temperature: '0.7' },
  },
  {
    id: '3',
    type: 'text',
    position: { x: 720, y: 280 },
    data: { label: 'Prompt Template', template: '"Analyze: {{input}}"' },
  },
  {
    id: '4',
    type: 'output',
    position: { x: 1020, y: 180 },
    data: { label: 'Final Response' },
  },
];

const defaultEdges = [
  { id: 'e1-2', type: 'animated', source: '1', target: '2', sourceHandle: 'output', targetHandle: 'input' },
  { id: 'e2-3', type: 'animated', source: '2', target: '3', sourceHandle: 'output', targetHandle: 'input' },
  { id: 'e3-4', type: 'animated', source: '3', target: '4', sourceHandle: 'output', targetHandle: 'input' },
];

let nodeIdCounter = 10;
const getNextId = () => `node_${++nodeIdCounter}`;

// Default data per node type
const NODE_DEFAULTS = {
  input:       { label: 'User Input' },
  output:      { label: 'Final Response' },
  llm:         { label: 'LLM Processor', model: 'gpt-4-turbo', temperature: '0.7' },
  text:        { label: 'Prompt Template', template: '"Enter your prompt here {{var}}"' },
  filter:      { label: 'Filter', condition: 'value > 0' },
  math:        { label: 'Math', expression: 'a + b' },
  api:         { label: 'API Call', method: 'GET', endpoint: '/api/v1/endpoint' },
  note:        { label: 'Note', text: 'Add a note here...' },
  conditional: { label: 'Conditional', field: 'status' },
};

function PipelineEditor() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // Connect two nodes — always use the animated edge type
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: 'animated', id: `edge-${Date.now()}` },
          eds
        )
      ),
    [setEdges]
  );

  // Drop from sidebar
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type || !reactFlowInstance) return;

      const rect = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });

      const newNode = {
        id: getNextId(),
        type,
        position,
        data: { ...(NODE_DEFAULTS[type] || { label: type }) },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleRunPipeline = () => {
    setIsRunning(true);
    setShowAnalysis(true);
    // AnimatedEdge already flows continuously — just reset isRunning after delay
    setTimeout(() => {
      setIsRunning(false);
    }, 2200);
  };

  return (
    <div className="pf-app">
      {/* Cursor proximity dot-grid overlay — pointerEvents:none so ReactFlow is unaffected */}
      <CursorGlow />
      <TopBar
        nodeCount={nodes.length}
        edgeCount={edges.length}
        onRunPipeline={handleRunPipeline}
        isRunning={isRunning}
      />

      <div className="pf-workspace">
        <NodeLibrary />

        <div
          ref={reactFlowWrapper}
          className="pf-canvas"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={{ type: 'animated' }}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.2}
            maxZoom={2}
            deleteKeyCode="Delete"
            connectionRadius={30}
            snapToGrid={true}
            snapGrid={[8, 8]}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={24}
              size={1}
              color="#1e1e1e"
              style={{ backgroundColor: '#0d0d0d' }}
            />
            <Controls position="bottom-left" />
            <MiniMap
              position="bottom-right"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: '8px',
                marginBottom: '60px',
                marginRight: '16px',
              }}
              nodeColor={(node) => {
                const COLORS = {
                  input: '#00bcd4',
                  output: '#3ecf8e',
                  llm: '#5865f2',
                  text: '#ffc107',
                  filter: '#ba68c8',
                  math: '#ffc107',
                  api: '#00bcd4',
                  note: '#6b6b6b',
                  conditional: '#ff5252',
                };
                return COLORS[node.type] || '#404040';
              }}
              maskColor="rgba(13,13,13,0.7)"
            />
          </ReactFlow>

          {/* Floating analysis trigger button */}
          {!showAnalysis && (
            <button
              className="pf-fab animate-fade-in"
              onClick={() => setShowAnalysis(true)}
              title="Open Pipeline Analysis"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>analytics</span>
              Analysis
            </button>
          )}

          {/* Analysis panel */}
          {showAnalysis && (
            <AnalysisPanel
              nodes={nodes}
              edges={edges}
              onClose={() => setShowAnalysis(false)}
              onSubmit={handleRunPipeline}
              isRunning={isRunning}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <PipelineEditor />
    </ReactFlowProvider>
  );
}
