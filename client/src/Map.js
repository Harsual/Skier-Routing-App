/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { DefaultNode, Graph } from "@visx/network";

export const background = "#272b4d";

// MAIN FUNCTIONAL COMPONENT
export default function Map({ width, height, backendData }) {
  const { nodes, links } = backendData;

  // Function to handle drawing the Mao
  const drawMap = () => {
    return React.createElement(
      "svg",
      { width, height /*, onClick: handleSVGClick*/ },

      // Drawing the background
      React.createElement("rect", {
        width,
        height,
        rx: 14,
        fill: background,
      }),

      // Drawing the graph
      React.createElement(Graph, {
        graph,
        top: 20,
        left: 100,

        // Drawing the nodes
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
                pointerEvents: "none",
              },
              node.id
            )
          );
        },

        // Drawing the links
        linkComponent: ({
          link: { source, target, dashed, slope, color, weight, id },
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

          const isInResult = result && result.some(({ plink }) => plink === id);
          color = isInResult ? "yellow" : color;
          const strokeWidth = isInResult ? 6 : 2;
          const strokeOpacity = isInResult ? 0.8 : 0.6;

          // Return straight line or curved line based on whether the link is lift or slope
          return slope
            ? React.createElement(
                "g",
                null,

                // Trying to draw an arrow on the ski slopes (Not working yet)
                // React.createElement(
                //   "defs",
                //   null,
                //   React.createElement(
                //     "marker",
                //     {
                //       id: "arrow",
                //       viewBox: "0 0 20 20",
                //       //markerUnits: "userSpaceOnUse",
                //       markerWidth: 10,
                //       markerHeight: 10,
                //       refX: 15,
                //       refY: 10,
                //       orient: "auto",
                //     },
                //     React.createElement("path", {
                //       d: "M0 0 10 0 20 10 10 20 0 20 10 10Z",
                //       fill: "green", // Arrow color
                //     })
                //   )
                // ),

                React.createElement("path", {
                  d: `M${source.x} ${source.y} Q${qx} ${qy} ${target.x} ${target.y}`,
                  strokeWidth: strokeWidth,
                  stroke: color,
                  strokeOpacity: strokeOpacity,
                  strokeDasharray: dashed ? "8,4" : undefined,
                  fill: "none",
                  markerEnd: "url(#arrow)",
                }),

                // Calculate the points for the 75% path and the 25% path

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
                  strokeWidth: strokeWidth,
                  stroke: color,
                  strokeOpacity: strokeOpacity,
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
  };

  let graph = {
    nodes,
    links,
  };

  // States to handle changes
  const [startNodeId, setStartNodeId] = React.useState(null);
  const [EndNodeId, setEndNodeId] = React.useState(null);
  const [result, setResult] = React.useState(null);
  //const [skierLoc, setSkierLoc] = React.useState(null);

  // Function waiting on start and endpoint selection
  React.useEffect(() => {
    if (EndNodeId !== null && startNodeId !== null) {
      // Calling the server path calculation API
      fetch("/calculate-path", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          graph: graph,
          startNodeId: startNodeId,
          endNodeId: EndNodeId,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setResult(data.path);
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });
    }
  }, [EndNodeId, startNodeId]);

  // Handling a user-location when user clicks any empty space on the map (UNDER DEVELOPMENT)
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
      setResult(null);
    } else if (EndNodeId === node.id) {
      setEndNodeId(null);
      setResult(null);
    } else if (startNodeId === null) {
      setStartNodeId(node.id);
    } else if (EndNodeId === null) {
      setEndNodeId(node.id);
    }
  };

  return width < 10 ? null : drawMap();
}
