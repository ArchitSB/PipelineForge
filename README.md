# PipelineForge

A visual AI pipeline builder — drag nodes onto a canvas, wire them together, and submit the graph for analysis. Built as a frontend technical assessment for VectorShift.

![PipelineForge UI](public/pipelineforge.png)

---

## Tech Stack

**Frontend**
- React 19 + Vite 8
- [@xyflow/react](https://reactflow.dev) (v12) — canvas, nodes, edges
- Custom canvas-based cursor glow effect
- Pure CSS design system (no Tailwind, no component library)

**Backend**
- FastAPI + Uvicorn
- Pydantic v2 for request validation
- DFS-based DAG cycle detection

---

## Features

- **9 node types** — drag any node from the sidebar onto the canvas
- **Visual edges** — animated bezier edges with travelling pulse dots and glow filter
- **Live node editing** — all node fields (model, endpoint, expression, etc.) are editable in-place
- **Pipeline analysis panel** — node count, edge count, DAG validity check, node type breakdown
- **Background dot grid** — interactive proximity glow that follows the cursor
- **Submit to backend** — sends the pipeline graph to `/pipelines/parse` for structural validation

---

## Node Types

| Node | Description | Editable Fields |
|---|---|---|
| **Input** | Entry point of the pipeline | — |
| **Output** | Final sink / result collector | — |
| **LLM** | AI model call | Model (select), Temperature |
| **Text** | Prompt template with variable slots | Template (textarea) |
| **Filter** | Condition gate — true/false branches | Condition expression |
| **Math** | Arithmetic expression evaluator | Expression |
| **API** | HTTP request node | Method (select), Endpoint |
| **Note** | Freeform annotation | Note text |
| **Conditional** | Branch routing by field value | Branch-on field |

---

## Project Structure

```
PipelineForge/
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # main editor, ReactFlow setup
│   │   ├── components/
│   │   │   ├── CursorGlow.jsx    # canvas dot-grid glow
│   │   │   ├── NodeLibrary.jsx   # drag-and-drop sidebar
│   │   │   ├── TopBar.jsx        # header / actions
│   │   │   └── AnalysisPanel.jsx # pipeline stats + submit
│   │   ├── nodes/                # one file per node type
│   │   ├── edges/
│   │   │   └── AnimatedEdge.jsx  # custom bezier edge with SVG animation
│   │   ├── utils/
│   │   │   └── dagUtils.js       # cycle detection, node type counts
│   │   └── styles/               # CSS per component + global tokens
│   └── package.json
└── backend/
    ├── main.py                   # FastAPI app + /pipelines/parse endpoint
    └── requirements.txt
```

---

## Getting Started

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
# runs on http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# runs on http://localhost:5173
```

Open `http://localhost:5173` — the backend isn't required for the UI to work, but `/pipelines/parse` calls will fail without it.

---

## API

### `GET /`
Health check.
```json
{ "Ping": "Pong" }
```

### `POST /pipelines/parse`
Validates the pipeline graph structure.

**Request**
```json
{
  "nodes": [{ "id": "1", "type": "input", ... }],
  "edges": [{ "source": "1", "target": "2", ... }]
}
```

**Response**
```json
{
  "num_nodes": 4,
  "num_edges": 3,
  "is_dag": true
}
```

---

## Usage

1. **Add nodes** — drag any item from the left sidebar onto the canvas
2. **Edit fields** — click into any input/select/textarea on a node to edit it live
3. **Connect nodes** — drag from the right handle of one node to the left handle of another
4. **Delete** — select a node or edge and press `Delete`
5. **Analyse** — click the **Analysis** button (bottom-right) to see pipeline stats
6. **Submit** — click **Submit Pipeline** to send the graph to the backend for validation
