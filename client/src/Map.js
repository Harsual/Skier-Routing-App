/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { DefaultNode, Graph } from "@visx/network";

// SETTING NODES AND LINKS
const nodes = [
  { id: 0, x: 40, y: 200 },
  { id: 1, x: 60, y: 40 },
  { id: 2, x: 200, y: 300 },
  { id: 3, x: 200, y: 50 },
  { id: 4, x: 300, y: 40, color: "#26deb0" },
  { id: 5, x: 400, y: 300 },
  { id: 6, x: 550, y: 250 },
];

const links = [
  { source: nodes[0], target: nodes[1], weight: 5 },
  { source: nodes[1], target: nodes[2], weight: 8 },
  {
    source: nodes[1],
    target: nodes[2],
    slope: true,
    color: "red",
    weight: 15,
  },
  { source: nodes[2], target: nodes[0], dashed: true, weight: 15 },
  {
    source: nodes[2],
    target: nodes[4],
    slope: true,
    color: "blue",
    weight: 2,
  },
  {
    source: nodes[2],
    target: nodes[4],
    slope: true,
    color: "red",
    weight: 3,
  },
  {
    source: nodes[2],
    target: nodes[4],
    slope: true,
    color: "black",
    weight: 4,
  },

  {
    source: nodes[2],
    target: nodes[5],
    slope: true,
    color: "blue",
    weight: 4,
  },
];

var graph = {
  nodes,
  links,
};

export const background = "#272b4d";

// Function to find the vertex with the minimum distance value
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

function calculatePath(graph, startNodeId, endNodeId) {
  console.log(startNodeId, endNodeId);
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
          parents[v] = u;
        }
      } else if (link.target.id === u && !link.slope) {
        const v = link.source.id;
        const weight = link.weight;

        // console.log(u, v, weight);

        if (
          !visited[v] &&
          distances[u] !== Infinity &&
          distances[u] + weight < distances[v]
        ) {
          distances[v] = distances[u] + weight;
          parents[v] = u;
        }
      }
    }
  }

  const path = [];
  let current = endNodeId;
  while (current !== startNodeId) {
    path.unshift(current);
    current = parents[current];
    if (current === null) {
      // If there is no path from start to end
      return [];
    }
  }
  path.unshift(startNodeId);

  return path;
}

// MAIN FUNCTIONAL COMPONENT
export default function Map({ width, height }) {
  // State to handle selected node
  const [startNodeId, setStartNodeId] = React.useState(null);
  const [EndNodeId, setEndNodeId] = React.useState(null);
  //const [skierLoc, setSkierLoc] = React.useState(null);

  React.useEffect(() => {
    // Check if state value is set (not null)
    if (EndNodeId !== null && startNodeId !== null) {
      // Perform calculations based on the state value
      const calculatedResult = calculatePath(graph, startNodeId, EndNodeId);
      //setResult(calculatedResult);
      console.log(calculatedResult);
    }
  }, [EndNodeId, startNodeId]);

  // Handling a user-location when user clicks any empty space on the svg (UNDER CONSTRUCTION)
  // const handleSVGClick = (event) => {
  //   const svg = event.currentTarget;
  //   const point = svg.createSVGPoint();
  //   point.x = event.clientX;
  //   point.y = event.clientY;
  //   const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());
  //   const startNode = {
  //     id: nodes.length + 1,
  //     x,
  //     y,
  //   };

  //setSkierLoc(startNode);
  //};

  // Setting the node that is clicked
  const handleNodeClick = (node) => {
    if (startNodeId === node.id) {
      setStartNodeId(null);
      setEndNodeId(null);
    } else if (EndNodeId === node.id) {
      setEndNodeId(null);
    } else if (startNodeId === null) {
      setStartNodeId(node.id);
    } else if (EndNodeId === null) {
      setEndNodeId(node.id);
    }
  };

  return width < 10
    ? null
    : React.createElement(
        "svg",
        { width, height /*, onClick: handleSVGClick*/ },

        React.createElement("rect", {
          width,
          height,
          rx: 14,
          fill: background,
        }),

        // TRYING TO ADD ARROW AT THE END OF SLOPE LINKS (NOT WORKING)

        //   React.createElement('defs', null,
        //   React.createElement('marker', {
        //     id: 'arrow',
        //     viewBox: '0 0 20 20',
        //     markerUnits: 'userSpaceOnUse',
        //     markerWidth:10,
        //     markerHeight:10,
        //     refX:10,
        //     refY:10,
        //     orient: 'auto',
        //   },
        //     React.createElement('path', {
        //       d: 'M0 0 10 0 20 10 10 20 0 20 10 10Z',
        //       fill: 'green', // Arrow color
        //     })
        //   )
        // ),

        React.createElement(Graph, {
          graph,
          top: 20,
          left: 100,

          nodeComponent: ({ node }) => {
            var node_color = node.color;
            if (node.id === startNodeId) {
              node_color = "red";
            } else if (node.id === EndNodeId) {
              node_color = "blue";
            }

            return React.createElement(
              "g",
              null,

              React.createElement(DefaultNode, {
                fill: node_color,
                onClick: () => handleNodeClick(node),
              }),

              React.createElement(
                "text",
                {
                  fill: "white",
                  fontSize: "13px",
                  textAnchor: "middle",
                  dominantBaseline: "middle",
                },
                node.id
              )
            );
          },

          linkComponent: ({
            link: { source, target, dashed, slope, color, weight },
          }) => {
            // Calculations for the curved line
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            const dr = Math.sqrt(dx * dx + dy * dy);
            var qx;
            var qy;
            // Calculate the control point for the Bézier curve based on color
            switch (color) {
              case "red":
                qx = (source.x + target.x) / 2 - dr / 4;
                qy = (source.y + target.y) / 2 - dr / 4;
                break;

              case "black":
                qx = (source.x + target.x) / 2 + dr / 4;
                qy = (source.y + target.y) / 2 + dr / 4;
                break;

              case "blue":
                qx = (source.x + target.x) / 2 + dr / 2;
                qy = (source.y + target.y) / 2 + dr / 2;
            }

            // Return straight line or curved line based on whether the link is lift or slope
            return slope
              ? React.createElement(
                  "g",
                  null,
                  React.createElement("path", {
                    d: `M${source.x} ${source.y} Q${qx} ${qy} ${target.x} ${target.y}`,
                    strokeWidth: 2,
                    stroke: color,
                    strokeOpacity: 0.6,
                    strokeDasharray: dashed ? "8,4" : undefined,
                    fill: "none",
                    // markerEnd: 'url(#arrow)'
                  }),
                  React.createElement(
                    "text",
                    {
                      x: (source.x + 2 * qx + target.x) / 4,
                      y: (source.y + 2 * qy + target.y) / 4,
                      fontSize: "22px",
                      fill: "white",
                      textAnchor: "middle",
                      dominantBaseline: "middle",
                    },
                    weight
                  )
                )
              : React.createElement(
                  "g",
                  null,
                  React.createElement("line", {
                    x1: source.x,
                    y1: source.y,
                    x2: target.x,
                    y2: target.y,
                    strokeWidth: 2,
                    stroke: "#999",
                    strokeOpacity: 0.6,
                    strokeDasharray: dashed ? "8,4" : undefined,
                  }),
                  React.createElement(
                    "text",
                    {
                      x: (source.x + target.x) / 2,
                      y: (source.y + target.y) / 2,
                      fontSize: "22px",
                      fill: "white",
                      textAnchor: "middle",
                      dominantBaseline: "middle",
                    },
                    weight
                  )
                );
          },
        })
      );
}
