/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { useEffect, useState } from "react";
import { DefaultNode, Graph } from "@visx/network";
import { Zoom } from "@visx/zoom";
//import { RectClipPath } from "@visx/clip-path";
import { localPoint } from "@visx/event";

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
  const [originalSRData, setOriginalSRData] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [firstEffectComplete, setFirstEffectComplete] = useState(false);
  const [iconIsHovered, setIconIsHovered] = useState(false);
  const [iconHoveredID, setIconHoveredID] = useState(null);
  const [linkInfo, setLinkInfo] = useState(null);
  //const [graph, setGraph] = useState(skiResortData);
  //setGraph(skiResortData);

  var viewportHeight = 993;
  var viewportWidth = 1728;
  //var imageWidth = width;
  //var imageHeight = height;
  var imageWidth;
  var imageHeight;
  //var graphOffsetx = 0;
  //var graphOffsety = 0;

  useEffect(() => {
    //console.log("SkiResort Data:", skiResortData);
    //console.log("OriginalSRData:", originalSRData);
    // if (skiResortData && !originalSRData) {
    //   //console.log("setting OriginalData");
    //   setOriginalSRData(skiResortData);
    // }
  }, []);

  useEffect(() => {
    if (linkInfo !== null) {
      console.log(linkInfo.slope);
    }
  }, [linkInfo]);
  useEffect(() => {
    var naturalWidth = 1280;
    var naturalHeight = 854;
    //console.log(naturalWidth, naturalHeight);
    // Get the width and height of the SVG container
    //var svgWidth = imageElement.viewportElement.clientWidth;
    //var svgHeight = imageElement.viewportElement.clientHeight;
    //console.log(svgHeight, svgWidth);
    // Calculate the aspect ratio of the image
    var aspectRatio = naturalWidth / naturalHeight;
    //console.log("AspectRatio:", aspectRatio);
    // Perform your calculations here using imageWidth and imageHeight
    if (width / height > aspectRatio) {
      // The SVG container is wider than the image, so the height of the image will be equal to the height of the SVG container
      console.log("Container is wider than image");
      imageHeight = height;
      //console.log("imageHeight: ", imageHeight);
      imageWidth = imageHeight * aspectRatio;
    } else {
      // The SVG container is taller than the image, so the width of the image will be equal to the width of the SVG container
      console.log("Container is taller than image");
      imageWidth = width;
      imageHeight = imageWidth / aspectRatio;
    }
    let graphOffsetx = (width - imageWidth) / 2;
    let graphOffsety = (height - imageHeight) / 2;
    setOffset({ x: graphOffsetx, y: graphOffsety });
    //console.log(graphOffsetx, graphOffsety);
    var widthScaleFactor = imageWidth / 1728;
    var heightScaleFactor = imageHeight / 993;
    //console.log(widthScaleFactor, heightScaleFactor);
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
    setLinkInfo({ id, source, target, slope, Name });
    setIconHoveredID(id);
  };

  const handleIconMouseLeave = () => {
    setIconIsHovered(false);
    setIconHoveredID(null);
  };

  let graph = {
    nodes: GraphData.nodes,
    links: GraphData.links,
  };
  // Function to handle drawing the Map
  const drawMap = () => {
    // Calculate scale factors for both width and height
    console.log(graph.links);
    //console.log(widthScaleFactor, heightScaleFactor);
    // Choose the smaller scale factor to ensure the entire image fits within the SVG container
    //const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);

    // return true ? (
    //   <HoverBox></HoverBox>
    // ) : (
    return (
      <div>
        <svg width={width} height={height}>
          {/* <rect
              width={width}
              height={height}
              //rx={14}
              fill="transparent"
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd();
              }}
              onDoubleClick={(event) => {
                const point = localPoint(event) || { x: 0, y: 0 };
                zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
              }}
            /> */}
          {/* <g transform={zoom.toString()}> */}
          <image
            id="map-background"
            xlinkHref="Fiona-map.jpeg"
            x={0}
            y={0}
            width={width}
            height={height}
            onClick={handleIconMouseLeave}
            //preserveAspectRatio="xMidYMid meet"
            onLoad={(event) => {
              //imageWidth = event.target.naturalWidth; // Get the intrinsic width of the image
              //imageHeight = event.target.naturalHeight; // Get the intrinsic height of the image
              //console.log(imageWidth, imageHeight);
              // Perform your calculations here using imageWidth and imageHeight
            }}
          />

          <Graph
            graph={graph}
            left={offset.x}
            top={offset.y}
            nodeComponent={({ node }) => {
              var node_color = "green";
              var stroke = "";
              //console.log(offset.x, offset.y);
              //var node_color = node.color;
              //node.x = Math.ceil(node.x * widthScaleFactor);
              //node.y = Math.ceil(node.y * heightScaleFactor);
              var node_txt = "";
              if (node.id === startNodeId) {
                node_color = "red";
                stroke = "white";
                node_txt = "Start";
              } else if (node.id === endNodeId) {
                node_color = "blue";
                node_txt = "End";
              }

              return (
                <g>
                  <DefaultNode
                    fill={node_color}
                    id={node.id}
                    r={10}
                    stroke={stroke}
                    strokeWidth={3}
                    style={{
                      zIndex: 100,
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
              // if (iconHoveredID === id) {
              //   setLinkInfo({
              //     source,
              //     target,
              //     dashed,
              //     slope,
              //     color,
              //     weight,
              //     id,
              //   });
              // }

              // Calculations for the curved line: Bezier
              const dx = target.x - source.x;
              const dy = target.y - source.y;
              const dr = Math.sqrt(dx * dx + dy * dy);
              var qx;
              var qy;
              var isgandondola = false;
              if (id == 109) {
                isgandondola = true;
              }
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

                  break;
                default:
                  qx = 0;
                  qy = 0;
                  break;
              }

              //console.log(color);
              //console.log("Results:", result);
              //const isInResult = result && result.some(({ plink }) => plink === id);
              // const isInResult =
              //   result &&
              //   result.some((path) => path.some(({ plink }) => plink === id));

              const isInResult =
                result &&
                result.some(
                  (pathObj) =>
                    pathObj &&
                    pathObj.path &&
                    pathObj.path.some(({ plink }) => plink === id)
                );
              color = isInResult ? "yellow" : color;
              const strokeWidth = isInResult ? 6 : 2;
              const strokeOpacity = isInResult ? 0.8 : 0.6;
              const splitT = 0.25;
              const arrowHieght = 5;
              const arrowWidth = 3;

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
                    strokeWidth={strokeWidth}
                    stroke={color}
                    strokeOpacity={strokeOpacity}
                    strokeDasharray={dashed ? "8,4" : undefined}
                    fill="none"
                  />
                  <polygon
                    points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                    strokeWidth={2}
                    stroke={color}
                    fill={color}
                    transform={`rotate(${
                      angle * (180 / Math.PI) + 90
                    }, ${px}, ${py})`}
                  />
                  <text
                    x={(source.x + 2 * qx + target.x) / 4}
                    y={(source.y + 2 * qy + target.y) / 4}
                    fontSize="22px"
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  />
                </g>
              ) : (
                <g>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    strokeWidth={5}
                    stroke={color}
                    strokeOpacity={1}
                    strokeDasharray={dashed ? "8,4" : undefined}
                  />
                  <circle
                    // Circle in the middle of the lifts
                    //React.createElement("circle", {
                    cx={(source.x + target.x) / 2}
                    cy={(source.y + target.y) / 2}
                    r={15}
                    fill={"green"} // Change the fill color as needed
                    stroke={color}
                    strokeWidth={2}
                    onMouseEnter={() =>
                      handleIconMouseEnter(id, source, target, slope, Name)
                    }
                    onMouseLeave={handleIconMouseLeave}
                  />
                  {isgandondola && (
                    <FontAwesomeIcon
                      icon={faCableCar}
                      x={(source.x + target.x) / 2 - 10}
                      y={(source.y + target.y) / 2 - 10}
                      width={20}
                      height={20}
                      style={{ pointerEvents: "none" }}
                    />
                  )}
                  {!isgandondola && (
                    <FontAwesomeIcon
                      icon={faPersonSkiing}
                      x={(source.x + target.x) / 2 - 10}
                      y={(source.y + target.y) / 2 - 10}
                      width={20}
                      height={20}
                      style={{ pointerEvents: "none" }}
                    />
                  )}
                  <text
                    x={(source.x + target.x) / 2}
                    y={(source.y + target.y) / 2}
                    fontSize="22px"
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  ></text>
                  <g id="one"></g>
                </g>
              );
            }}
          />

          {/* </g> */}
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

  /*const togglePopup = () => {
    setPopupIsOpen(true);
  };*/

  // States to handle changes
  //const [startNodeId, setStartNodeId] = React.useState(null);
  //const [EndNodeId, setEndNodeId] = React.useState(null);
  //const [result, setResult] = React.useState(null);
  //const [skierLoc, setSkierLoc] = React.useState(null);

  //console.log(height, width);

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
  }, [endNodeId, startNodeId]);

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
