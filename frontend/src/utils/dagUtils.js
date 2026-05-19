/**
 * Checks whether the given nodes + edges form a valid DAG (no cycles).
 * Uses iterative DFS with a recursion-stack set for cycle detection.
 */
export function isValidDAG(nodes, edges) {
  // Simple cycle detection via DFS
  const adj = {};
  nodes.forEach((n) => { adj[n.id] = []; });
  edges.forEach((e) => {
    if (adj[e.source]) adj[e.source].push(e.target);
  });

  const visited = new Set();
  const stack = new Set();

  function dfs(id) {
    if (stack.has(id)) return false; // cycle
    if (visited.has(id)) return true;
    visited.add(id);
    stack.add(id);
    for (const neighbor of (adj[id] || [])) {
      if (!dfs(neighbor)) return false;
    }
    stack.delete(id);
    return true;
  }

  return nodes.every((n) => dfs(n.id));
}

/**
 * Returns an object mapping node type → count for a given node array.
 */
export function countNodeTypes(nodes) {
  const counts = {};
  nodes.forEach((n) => {
    counts[n.type] = (counts[n.type] || 0) + 1;
  });
  return counts;
}
