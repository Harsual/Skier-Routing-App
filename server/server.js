const express = require("express");
//const calculatePath = require("./pathCalculator").calculatePath;
//const bfs = require("./pathCalculator").bfs;
//const getPreferencedPath = require("./pathCalculator").getPreferencedPath;
const pathCalculator = require("./pathCalculator");

const app = express();

app.use(express.json());

// SETTING NODES AND LINKS

// const locations = [
//   { id: 0, x: 40, y: 200 },
//   { id: 1, x: 60, y: 40 },
//   { id: 2, x: 200, y: 300 },
//   { id: 3, x: 200, y: 50 },
//   { id: 4, x: 300, y: 40 /*color: "#26deb0"*/ },
//   { id: 5, x: 400, y: 300 },
//   { id: 6, x: 550, y: 250 },
// ];

// const slopesAndLifts = [
//   {
//     id: 0,
//     source: locations[0],
//     target: locations[1],
//     color: "gray",
//     weight: 5,
//   },
//   {
//     id: 1,
//     source: locations[1],
//     target: locations[2],
//     color: "gray",
//     weight: 8,
//   },
//   {
//     id: 2,
//     source: locations[1],
//     target: locations[2],
//     slope: true,
//     color: "red",
//     weight: 15,
//   },
//   {
//     id: 3,
//     source: locations[2],
//     target: locations[0],
//     /*dashed: true,*/
//     color: "gray",
//     weight: 15,
//   },
//   {
//     id: 4,
//     source: locations[2],
//     target: locations[4],
//     slope: true,
//     color: "blue",
//     weight: 2,
//   },
//   {
//     id: 5,
//     source: locations[2],
//     target: locations[4],
//     slope: true,
//     color: "red",
//     weight: 3,
//   },
//   {
//     id: 6,
//     source: locations[2],
//     target: locations[4],
//     slope: true,
//     color: "black",
//     weight: 4,
//   },

//   {
//     id: 7,
//     source: locations[2],
//     target: locations[5],
//     slope: true,
//     color: "blue",
//     weight: 4,
//   },
// ];

const fs = require("fs");

var locations = [];
var slopesAndLifts = [];

try {
  const jsonData = fs.readFileSync("Ski-Resort-test.json", "utf-8");
  const data = JSON.parse(jsonData);
  const conc = data.Slopes.concat(data.Lifts);

  locations = data.startandEndpoints;
  slopesAndLifts = conc.map((link) => {
    let sourceNode = locations.find((node) => node.id === link.StartNodeID);
    let targetNode = locations.find((node) => node.id === link.EndNodeID);
    if (!sourceNode || !targetNode) {
      console.error(
        `Missing location for link with StartNodeid ${link.StartNodeID} and EndNodeid ${link.EndNodeID}`
      );
      return link; // Return the original link if a location is missing
    }
    // Return the updated link object with source and target properties
    let slope = link.color !== "green";
    return {
      ...link,
      source: sourceNode,
      target: targetNode,
      slope: slope,
    };
  });

  //console.log(slopesAndLifts);
  //console.log(locations);
} catch (error) {
  console.error("Error reading file:", error);
}

var graph = {
  nodes: locations,
  links: slopesAndLifts,
};

var paths;

app.get("/api", (req, res) => {
  res.json({ nodes: locations, links: slopesAndLifts });
});

app.post("/calculate-paths", (req, res) => {
  const { startNodeId, endNodeId } = req.body;
  //console.log("HELLO");

  // Performing path calculation based on the provided data
  paths = pathCalculator.bfs(graph, startNodeId, endNodeId);

  //console.log(paths);
  res.json({ paths });
});

app.post("/calculate-preference", (req, res) => {
  const preference = req.body;
  //console.log(preference);
  paths = pathCalculator.getPreferencedPath(paths, preference);
  pathCalculator.encodePathInfo(paths);
  res.json({ paths });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
