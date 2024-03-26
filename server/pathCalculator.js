function getPreferencedPath(paths, preference) {
  difficultyPref = preference.skills;
  difficultyPref.push("gray");
  //console.log(difficultyPref);

  let filteredPaths = paths.filter((path) =>
    path.every((item) => !item.color || difficultyPref.includes(item.color))
  );

  return filteredPaths;
}

function bfs(graph, startNodeID, endNodeID) {
  let queue = [[{ pnode: startNodeID, plink: null }]];
  let paths = [];

  while (queue.length > 0) {
    let path = queue.shift();
    let node = path[path.length - 1].pnode;

    if (node === endNodeID) {
      paths.push(path);
      continue;
    }

    for (let edge of graph.links) {
      if (
        edge.source.id === node &&
        !path.some((p) => p.pnode === edge.target.id)
      ) {
        queue.push([
          ...path,
          { pnode: edge.target.id, plink: edge.id, color: edge.color },
        ]);
      }
      if (
        !edge.slope &&
        edge.target.id === node &&
        !path.some((p) => p.pnode === edge.source.id)
      ) {
        queue.push([
          ...path,
          { pnode: edge.source.id, plink: edge.id, color: edge.color },
        ]);
      }
    }
  }

  //getPreferencedPath(paths);
  return paths;
}

// OLD WAY OF CALCULATING SHORTEST PATH

// Finding the next node to start exploring
/*function minDistance(distances, visited) {
  let min = Infinity;
  let minIndex = -1;

  for (let i = 0; i < distances.length; i++) {
    if (!visited[i] && distances[i] < min) {
      min = distances[i];
      minIndex = i;
    }
  }

  return minIndex;
}*/

// Calculating path from A to B. Using Modified Dijkstra's Algorithm
/*function calculatePath(graph, startNodeId, endNodeId) {
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
}*/

module.exports = { bfs, getPreferencedPath };
