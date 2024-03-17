// Finding the next node to start exploring
function minDistance(distances, visited) {
  let min = Infinity;
  let minIndex = -1;

  for (let i = 0; i < distances.length; i++) {
    if (!visited[i] && distances[i] < min) {
      min = distances[i];
      minIndex = i;
    }
  }

  return minIndex;
}

// Calculating path from A to B. Using Modified Dijkstra's Algorithm
function calculatePath(graph, startNodeId, endNodeId) {
  const distances = new Array(graph.nodes.length).fill(Infinity);
  const visited = new Array(graph.nodes.length).fill(false);
  const parents = new Array(graph.nodes.length).fill(null);

  distances[startNodeId] = 0;

  for (let i = 0; i < graph.nodes.length - 1; i++) {
    const u = minDistance(distances, visited);
    visited[u] = true;

    for (const link of graph.links) {
      if (link.source.id === u) {
        const v = link.target.id;
        const weight = link.weight;

        if (
          !visited[v] &&
          distances[u] !== Infinity &&
          distances[u] + weight < distances[v]
        ) {
          distances[v] = distances[u] + weight;
          parents[v] = { pnode: u, plink: link.id };
        }
      } else if (link.target.id === u && !link.slope) {
        const v = link.source.id;
        const weight = link.weight;

        if (
          !visited[v] &&
          distances[u] !== Infinity &&
          distances[u] + weight < distances[v]
        ) {
          distances[v] = distances[u] + weight;
          parents[v] = { pnode: u, plink: link.id };
        }
      }
    }
  }

  const path = [];

  let current = { pnode: endNodeId, plink: null };

  while (current !== null) {
    path.unshift(current);
    current = parents[current.pnode];
  }

  return path;
}

module.exports = { calculatePath };
