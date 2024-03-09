/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { DefaultNode, Graph } from "@visx/network";

// SETTING NODES AND LINKS
const nodes = [
  { id: 1, x: 40, y: 200 },
  { id: 2, x: 60, y: 40 },
  { id: 3, x: 200, y: 250 },
  { id: 4, x: 200, y: 250 },
  { id: 5, x: 300, y: 40, color: "#26deb0" },
  { id: 6, x: 400, y: 300 },
  { id: 7, x: 200, y: 250 },
];

const links = [
  { source: nodes[0], target: nodes[1], tag: "5" },
  { source: nodes[1], target: nodes[2], tag: "8" },
  { source: nodes[2], target: nodes[0], dashed: true, tag: "15" },
  { source: nodes[2], target: nodes[4], slope: true, color: "blue", tag: "2" },
  { source: nodes[2], target: nodes[4], slope: true, color: "red", tag: "3" },
  { source: nodes[2], target: nodes[4], slope: true, color: "black", tag: "4" },
];

var graph = {
  nodes,
  links,
};

export const background = "#272b4d";

export default function Map({ width, height }) {
  // State to handle selected node
  const [selectedNodeId, setSelectedNodeId] = React.useState(null);
  //const [skierLoc, setSkierLoc] = React.useState(null);

  // Handling a user-location when user clicks any empty space on the svg (UNDER CONSTRUCTION)
  const handleSVGClick = (event) => {
    const svg = event.currentTarget;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());
    const startNode = {
      id: nodes.length + 1,
      x,
      y,
    };

    //setSkierLoc(startNode);
  };

  // Setting the node that is clicked
  const handleNodeClick = (node) => {
    setSelectedNodeId(node.id === selectedNodeId ? null : node.id);
  };

  return width < 10
    ? null
    : React.createElement(
        "svg",
        { width, height, onClick: handleSVGClick },

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

          nodeComponent: ({ node }) =>
            React.createElement(DefaultNode, {
              fill: node.id === selectedNodeId ? "red" : node.color,
              onClick: () => handleNodeClick(node),
            }),

          linkComponent: ({
            link: { source, target, dashed, slope, color, tag },
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
                qy = (source.y + target.y) / 2;
                break;

              case "black":
                qx = (source.x + target.x) / 2 + dr / 4;
                qy = (source.y + target.y) / 2;
                break;

              case "blue":
                qx = (source.x + target.x) / 2 + dr * 0.7;
                qy = (source.y + target.y) / 2;
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
                    tag
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
                    tag
                  )
                );
          },
        })
      );
}
