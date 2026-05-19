// cycle detection via DFS
export function isValidDAG(nodes, edges) {
  const adj = {};
  nodes.forEach((n) => { adj[n.id] = []; });
  edges.forEach((e) => { if (adj[e.source]) adj[e.source].push(e.target); });

  const visited = new Set();
  const stack = new Set();

  function dfs(id) {
    if (stack.has(id)) return false;
    if (visited.has(id)) return true;
    visited.add(id);
    stack.add(id);
    for (const nb of (adj[id] || [])) {
      if (!dfs(nb)) return false;
    }
    stack.delete(id);
    return true;
  }

  return nodes.every((n) => dfs(n.id));
}

export function countNodeTypes(nodes) {
  const counts = {};
  nodes.forEach((n) => { counts[n.type] = (counts[n.type] || 0) + 1; });
  return counts;
}
