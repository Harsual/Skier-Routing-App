function calculateAllPaths(graph, startNodeID, endNodeID) {
  console.log("Fun called");
  let queue = [[{ pnode: startNodeID, plink: null }]];
  let paths = [];

  while (queue.length > 0) {
    let path = queue.shift();
    let node = path[path.length - 1].pnode;

    if (node === endNodeID) {
      paths.push({ path: path });
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

  return paths;
}

module.exports = {
  calculateAllPaths,
};
