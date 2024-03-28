/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { useEffect, useState } from "react";
import { DefaultNode, Graph } from "@visx/network";
import { Zoom } from "@visx/zoom";
//import { RectClipPath } from "@visx/clip-path";
import { localPoint } from "@visx/event";

//export const background = "#272b4d";

// MAIN FUNCTIONAL COMPONENT
export default function SkiResort({
  width,
  height,
  skiResortData,
  setDMenuIsOpen = { setDMenuIsOpen },
  result = { result },
  setResult = { setResult },
}) {
  const initialTransform = {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0,
  };

  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  /*useEffect(() => {
    // Function to calculate container dimensions
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight; // or any other way you calculate height
      console.log(width, height);
      setContainerWidth(width);
      setContainerHeight(height);
    };

    // Initial call to set dimensions
    updateDimensions();

    // Event listener for window resize
    window.addEventListener("resize", updateDimensions);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);*/

  const { nodes, links } = skiResortData;
  //const [popupIsOpen, setPopupIsOpen] = useState(false);

  // Function to handle drawing the Map
  const drawMap = () => {
    return React.createElement(
      Zoom,
      {
        width: width,
        height: height,
        scaleXMin: 1,
        scaleXMax: 4,
        scaleYMin: 1,
        scaleYMax: 4,
        initialTransformMatrix: initialTransform,
      },
      (zoom) =>
        React.createElement(
          "svg",
          {
            width,
            height,
            //ref: zoom.containerRef,
            //transform: zoom.toString(),
            //style: { touchAction: "none" },
          },

          React.createElement("image", {
            xlinkHref: "mountain.jpg",
            x: 0,
            y: 0,
            width,
            height,
            preserveAspectRatio: "xMidYMid slice",
          }),

          /*React.createElement(
            "defs",
            null,
            React.createElement(
              "pattern",
              {
                id: "image-background",
                width: "100%",
                height: "100%",
                patternContentUnits: "objectBoundingBox",
              },
              React.createElement("image", {
                xlinkHref: "mountainmap.jpg",
                width: "1",
                height: "1",
                preserveAspectRatio: "xMidYMid slice",
              })
            )
          ),
          // Drawing the background
          /*React.createElement("rect", {
            width,
            height,
            rx: 14,
            fill: "url(#image-background)",
            /*onTouchStart: zoom.dragStart,
            onTouchMove: zoom.dragMove,
            onTouchEnd: zoom.dragEnd,
            onMouseDown: zoom.dragStart,
            onMouseMove: zoom.dragMove,
            onMouseUp: zoom.dragEnd,
            onDoubleClick: (e) => {
              console.log("clicked!!");
              console.log(zoom);
              //console.log(localPoint(e.nativeEvent));
              const point2 = localPoint(e.nativeEvent) || { x: 0, y: 0 };
              //console.log(zoom.transformMatrix);
              //console.log(zoom.transformMatrix.scaleX);
              zoom.scale({ scaleX: 1.1, scaleY: 1.1, point2 });
              //zoom.scale({ x: 0, y: 0 }, 1.7);
            },
            //transform: zoom.toString(),
          }),*/

          // Drawing the graph
          React.createElement(
            "g",
            {
              //transform: zoom.toString(),
            },

            React.createElement(Graph, {
              graph,
              //top: 0,
              left: 100,
              //transform: zoom.toString(),

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
                    id: node.id,
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
                // Calculations for the curved line: Bezier
                const dx = target.x - source.x;
                const dy = target.y - source.y;
                const dr = Math.sqrt(dx * dx + dy * dy);
                var qx;
                var qy;
                //console.log(color);
                //const fromNode = slope ? source.id : null;
                //const toNode = slope ? target.id : null;
                // Calculate the control point for the Bézier curve based on color
                switch (color) {
                  case "red":
                    qx = (source.x + target.x) / 2 - dr / 4;
                    qy = (source.y + target.y) / 2 - dr / 4;
                    break;

                  case "black":
                    qx = (source.x + target.x) / 2 + dr / 2;
                    qy = (source.y + target.y) / 2 + dr / 2;
                    break;

                  case "blue":
                    qx = (source.x + target.x) / 2 + dr / 4;
                    qy = (source.y + target.y) / 2 + dr / 4;
                    console.log("its entering");

                    break;
                  default:
                    qx = 0;
                    qy = 0;
                    break;
                }

                console.log(color);
                //console.log("Results:", result);
                //const isInResult = result && result.some(({ plink }) => plink === id);
                const isInResult =
                  result &&
                  result.some((path) => path.some(({ plink }) => plink === id));
                color = isInResult ? "yellow" : color;
                const strokeWidth = isInResult ? 6 : 2;
                const strokeOpacity = isInResult ? 0.8 : 0.6;
                const splitT = 0.75;
                const arrowHieght = 10;
                const arrowWidth = 10;

                let px =
                  (1 - splitT) ** 2 * source.x +
                  2 * (1 - splitT) * splitT * qx +
                  splitT ** 2 * target.x;

                let py =
                  (1 - splitT) ** 2 * source.y +
                  2 * (1 - splitT) * splitT * qy +
                  splitT ** 2 * target.y;

                let x1 = px,
                  y1 = py - arrowHieght;
                let x2 = px - arrowWidth,
                  y2 = py + arrowHieght;
                let x3 = px + arrowWidth,
                  y3 = py + arrowHieght;

                // Calculate the derivative at the 75% point
                let dx75 =
                  2 * (1 - splitT) * (qx - source.x) +
                  2 * splitT * (target.x - qx);
                let dy75 =
                  2 * (1 - splitT) * (qy - source.y) +
                  2 * splitT * (target.y - qy);

                // Calculate the angle of the derivative
                let angle = Math.atan2(dy75, dx75);
                // Return straight line or curved line based on whether the link is lift or slope
                return slope
                  ? React.createElement(
                      "g",
                      null,

                      React.createElement("path", {
                        d: `M${source.x} ${source.y} Q${qx} ${qy} ${target.x} ${target.y}`,
                        strokeWidth: strokeWidth,
                        stroke: color,
                        strokeOpacity: strokeOpacity,
                        strokeDasharray: dashed ? "8,4" : undefined,
                        fill: "none",
                        //markerStart: "url(#arrow)",
                      }),

                      React.createElement("polygon", {
                        points: `${x1},${y1} ${x2},${y2} ${x3},${y3}`,
                        strokeWidth: 2,
                        stroke: color,
                        fill: color,
                        transform: `rotate(${
                          angle * (180 / Math.PI) + 90
                        }, ${px}, ${py})`,
                      }),

                      React.createElement("text", {
                        x: (source.x + 2 * qx + target.x) / 4,
                        y: (source.y + 2 * qy + target.y) / 4,
                        fontSize: "22px",
                        fill: "white",
                        textAnchor: "middle",
                        dominantBaseline: "middle",
                      })
                    )
                  : React.createElement(
                      "g",
                      null,
                      React.createElement("line", {
                        x1: source.x,
                        y1: source.y,
                        x2: target.x,
                        y2: target.y,
                        strokeWidth: 5,
                        stroke: color,
                        strokeOpacity: 1,
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
                        id
                      )
                    );
              },
            })
          )
        )
    );
  };

  let graph = {
    nodes,
    links,
  };

  /*const togglePopup = () => {
    setPopupIsOpen(true);
  };*/

  // States to handle changes
  const [startNodeId, setStartNodeId] = React.useState(null);
  const [EndNodeId, setEndNodeId] = React.useState(null);
  //const [result, setResult] = React.useState(null);
  //const [skierLoc, setSkierLoc] = React.useState(null);

  // Function waiting on start and endpoint selection
  React.useEffect(() => {
    if (EndNodeId !== null && startNodeId !== null) {
      // Calling the server path calculation API
      fetch("/calculate-paths", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
          setResult(data.paths);
          //console.log(setPopupIsOpen);
          setDMenuIsOpen(true);
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });

      //togglePopup();
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
