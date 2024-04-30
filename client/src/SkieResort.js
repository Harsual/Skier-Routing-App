/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { useEffect, useState, useRef } from "react";
import { DefaultNode, Graph } from "@visx/network";

import HoverBox from "./components/HoverBox/HoverBox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCableCar } from "@fortawesome/free-solid-svg-icons";
import { faPersonSkiing } from "@fortawesome/free-solid-svg-icons";

//export const background = "#272b4d";

// MAIN FUNCTIONAL COMPONENT
export default function SkiResort({
  width,
  height,
  skiResortData,
  setSkiResortData = { setSkiResortData },
  GraphData,
  setStartNodeId = { setStartNodeId },
  setEndNodeId = { setEndNodeId },
  startNodeId,
  endNodeId,
  setGraphData = { setGraphData },
  setDMenuIsOpen = { setDMenuIsOpen },
  result = { result },
  setResult = { setResult },
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [iconIsHovered, setIconIsHovered] = useState(false);
  const [hoveredID, setHoveredID] = useState(null);

  const [linkInfo, setLinkInfo] = useState(null);
  const timerRef = useRef(null);
  //const [graph, setGraph] = useState(skiResortData);
  //setGraph(skiResortData);

  //var imageWidth = width;
  //var imageHeight = height;
  var imageWidth;
  var imageHeight;
  //var graphOffsetx = 0;
  //var graphOffsety = 0;

  useEffect(() => {
    var naturalWidth = 1280;
    var naturalHeight = 854;

    // Calculate the aspect ratio of the image
    var aspectRatio = naturalWidth / naturalHeight;

    if (width / height > aspectRatio) {
      // The SVG container is wider than the image, so the height of the image will be equal to the height of the SVG container

      imageHeight = height;
      //console.log("imageHeight: ", imageHeight);
      imageWidth = imageHeight * aspectRatio;
    } else {
      // The SVG container is taller than the image, so the width of the image will be equal to the width of the SVG container

      imageWidth = width;
      imageHeight = imageWidth / aspectRatio;
    }
    let graphOffsetx = (width - imageWidth) / 2;
    let graphOffsety = (height - imageHeight) / 2;
    setOffset({ x: graphOffsetx, y: graphOffsety });

    var widthScaleFactor = imageWidth / 1728;
    var heightScaleFactor = imageHeight / 993;

    if (skiResortData && skiResortData.nodes && skiResortData.links) {
      console.log("Testing");
      const updatedNodes = skiResortData.nodes.map((node) => ({
        ...node,
        x: Math.round(node.x * widthScaleFactor),
        y: Math.round(node.y * heightScaleFactor),
      }));
      // Update links
      const updatedLinks = skiResortData.links.map((link) => ({
        ...link,
        source: {
          ...link.source,
          x: Math.round(link.source.x * widthScaleFactor),
          y: Math.round(link.source.y * heightScaleFactor),
        },
        target: {
          ...link.target,
          x: Math.round(link.target.x * widthScaleFactor),
          y: Math.round(link.target.y * heightScaleFactor),
        },
      }));
      const updatedGraphData = {
        ...GraphData,
        nodes: updatedNodes,
        links: updatedLinks,
      };
      setGraphData(updatedGraphData);
    }
  }, [width, height, skiResortData]);

  const handleIconMouseEnter = (id, source, target, slope, Name) => {
    setIconIsHovered(true);
    setHoveredID(id);
    setLinkInfo({ id, source, target, slope, Name });

    timerRef.current = setTimeout(() => {
      setIconIsHovered(false);
    }, 5000);
  };

  const handleIconMouseLeave = () => {
    clearTimeout(timerRef.current);
    setIconIsHovered(false);
  };

  let graph = {
    nodes: GraphData.nodes,
    links: GraphData.links,
  };
  // Function to handle drawing the Map
  const drawMap = () => {
    return (
      <div>
        <svg width={width} height={height}>
          <image
            id="map-background"
            xlinkHref="Fiona-map.jpeg"
            x={0}
            y={0}
            width={width}
            height={height}
            onClick={handleIconMouseLeave}
            //preserveAspectRatio="xMidYMid meet"
          />

          <Graph
            graph={graph}
            left={offset.x}
            top={offset.y}
            nodeComponent={({ node }) => {
              //var node_color = "green";
              var node_color = "#15BC3F";
              var strokeWidth = 2;

              const isInResult =
                result &&
                result.some(
                  (pathObj) =>
                    pathObj &&
                    pathObj.path &&
                    pathObj.path.some(({ pnode }) => pnode === node.id)
                );

              node_color = isInResult ? "#FFD700" : node_color;

              var stroke = "";
              var node_txt = "";
              if (node.id === startNodeId) {
                node_color = "red";
                stroke = "white";
                node_txt = "Start";
                strokeWidth = 3;
              } else if (node.id === endNodeId) {
                node_color = "blue";
                node_txt = "End";
                stroke = "blue";
                strokeWidth = 3;
              }

              return (
                <g>
                  <DefaultNode
                    fill={node_color}
                    id={node.id}
                    r={10}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    style={{
                      zIndex: 100,
                      cursor: "pointer",
                    }}
                    onClick={() => handleNodeClick(node)}
                  />
                  <text
                    fill="white"
                    fontSize="13px"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    pointerEvents="none"
                  ></text>
                </g>
              );
            }}
            linkComponent={({
              link: { source, target, dashed, slope, color, weight, id, Name },
            }) => {
              // Calculations for the curved line: Bezier
              const dx = target.x - source.x;
              const dy = target.y - source.y;
              const dr = Math.sqrt(dx * dx + dy * dy);
              var qx;
              var qy;
              var strokeOpacity = 1;
              var slopeWidth = 2;
              var liftWidth = 4;
              var isgandondola = false;
              if (id === 109) {
                isgandondola = true;
              }

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

                  break;
                default:
                  qx = 0;
                  qy = 0;
                  color = "#15BC3F";
                  break;
              }

              const isInResult =
                result &&
                result.some(
                  (pathObj) =>
                    pathObj &&
                    pathObj.path &&
                    pathObj.path.some(({ plink }) => plink === id)
                );
              color = isInResult ? "#FFD700" : color;
              slopeWidth = isInResult ? 6 : 2;
              liftWidth = isInResult ? 6 : 4;
              strokeOpacity = 1;
              const splitT = 0.25;
              const arrowHieght = 5;
              const arrowWidth = 3;
              const fillColor =
                iconIsHovered && hoveredID === id ? "lightblue" : color;

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
              return slope ? (
                <g>
                  <path
                    d={`M${source.x} ${source.y} Q${qx} ${qy} ${target.x} ${target.y}`}
                    strokeWidth={slopeWidth}
                    stroke={color}
                    strokeOpacity={strokeOpacity}
                    strokeDasharray={dashed ? "8,4" : undefined}
                    fill="none"
                  />
                  <polygon
                    points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                    strokeWidth={slopeWidth}
                    strokeOpacity={strokeOpacity}
                    stroke={color}
                    fill={color}
                    transform={`rotate(${
                      angle * (180 / Math.PI) + 90
                    }, ${px}, ${py})`}
                  />
                  {/* <text
                    x={(source.x + 2 * qx + target.x) / 4}
                    y={(source.y + 2 * qy + target.y) / 4}
                    fontSize="22px"
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  /> */}
                </g>
              ) : (
                <g>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    strokeWidth={liftWidth}
                    stroke={color}
                    strokeOpacity={strokeOpacity}
                    strokeDasharray={dashed ? "8,4" : undefined}
                  />
                  <circle
                    // Circle in the middle of the lifts

                    cx={(source.x + target.x) / 2}
                    cy={(source.y + target.y) / 2}
                    r={15}
                    fill={fillColor} // Change the fill color as needed
                    //stroke={color}
                    strokeWidth={2}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() =>
                      handleIconMouseEnter(id, source, target, slope, Name)
                    }
                    onMouseLeave={handleIconMouseLeave}
                  />
                  {isgandondola && (
                    <FontAwesomeIcon
                      icon={faCableCar}
                      x={(source.x + target.x) / 2 - 8}
                      y={(source.y + target.y) / 2 - 8}
                      width={16}
                      height={16}
                      color="white"
                      style={{ pointerEvents: "none" }}
                    />
                  )}
                  {!isgandondola && (
                    <FontAwesomeIcon
                      icon={faPersonSkiing}
                      x={(source.x + target.x) / 2 - 8}
                      y={(source.y + target.y) / 2 - 8}
                      width={16}
                      height={16}
                      color="white"
                      style={{ pointerEvents: "none" }}
                    />
                  )}
                  {/* <text
                    x={(source.x + target.x) / 2}
                    y={(source.y + target.y) / 2}
                    fontSize="22px"
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  ></text> */}
                </g>
              );
            }}
          />
        </svg>
        {iconIsHovered && (
          <HoverBox
            x={(linkInfo.source.x + linkInfo.target.x) / 2 + offset.x}
            y={(linkInfo.source.y + linkInfo.target.y) / 2 + offset.y}
            liftName={linkInfo.Name}
          ></HoverBox>
        )}
      </div>
    );
  };

  // Function waiting on start and endpoint selection
  React.useEffect(() => {
    if (endNodeId !== null && startNodeId !== null) {
      // Calling the server path calculation API
      fetch("/calculate-paths", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startNodeId: startNodeId,
          endNodeId: endNodeId,
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
          setDMenuIsOpen(true);
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });
    }
  }, [endNodeId, startNodeId]);

  // Setting the node that is clicked
  const handleNodeClick = (node) => {
    if (startNodeId === node.id) {
      setStartNodeId(null);
      setEndNodeId(null);
      setResult(null);
    } else if (endNodeId === node.id) {
      setEndNodeId(null);
      setResult(null);
    } else if (startNodeId === null) {
      setStartNodeId(node.id);
    } else if (endNodeId === null) {
      setEndNodeId(node.id);
    }
  };

  return width < 10 ? null : drawMap();
}
