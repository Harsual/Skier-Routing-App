function getPreferencedPath(paths, preference) {
  difficultyPref = preference.skills;
  difficultyPref.push("green");
  //console.log(difficultyPref);

  // let filteredPaths = paths.filter((path) =>
  //   path.every((item) => !item.color || difficultyPref.includes(item.color))
  // );

  let filteredPaths = paths.filter((pathObj) =>
    pathObj.path.every(
      (item) => !item.color || difficultyPref.includes(item.color)
    )
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

  //getPreferencedPath(paths);
  return paths;
}

function encodePathInfo(paths, linkInfo) {
  //console.log(linkInfo);

  paths.forEach((pathObj) => {
    let path = pathObj.path; // Extract the path array from the path object
    let totalLength = 0; // Initialize total length for the current path
    let totalTime = 0;
    let totalTimeOnLift = 0;
    let difficultyScore = 0;
    // Iterate through each step in the path
    for (let i = 1; i < path.length; i++) {
      let plinkId = path[i].plink; // Get the plink id for the current step
      let link = linkInfo.find((info) => info.id === plinkId); // Find the corresponding link info

      if (link.length) {
        totalLength += link.length;
      }

      if (!link.slope) {
        totalTimeOnLift += link.time;
        totalTime += link.time;
      } else if (link.slope) {
        totalTime += link.length / 833.33;

        switch (link.color) {
          case "blue":
            difficultyScore += link.length;
            break;

          case "red":
            difficultyScore += link.length * 1.5;
            break;

          case "black":
            difficultyScore += link.length * 2;
            break;
        }
      }
    }

    // Add the total length attribute to the path object
    pathObj.totalLength = totalLength;
    pathObj.totalTime = totalTime;
    pathObj.totalTimeOnLift = totalTimeOnLift;
    pathObj.difficultyScore = difficultyScore;
  });

  //console.log(paths);

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

module.exports = { bfs, getPreferencedPath, encodePathInfo };
