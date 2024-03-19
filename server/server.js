const express = require("express");
const calculatePath = require("./pathCalculator").calculatePath;
const app = express();

app.use(express.json());

// SETTING NODES AND LINKS
const areas = [
  { id: 0, x: 40, y: 200 },
  { id: 1, x: 60, y: 40 },
  { id: 2, x: 200, y: 300 },
  { id: 3, x: 200, y: 50 },
  { id: 4, x: 300, y: 40 /*color: "#26deb0"*/ },
  { id: 5, x: 400, y: 300 },
  { id: 6, x: 550, y: 250 },
];

const slopesAndLifts = [
  { id: 0, source: areas[0], target: areas[1], color: "gray", weight: 5 },
  { id: 1, source: areas[1], target: areas[2], color: "gray", weight: 8 },
  {
    id: 2,
    source: areas[1],
    target: areas[2],
    slope: true,
    color: "red",
    weight: 15,
  },
  {
    id: 3,
    source: areas[2],
    target: areas[0],
    /*dashed: true,*/
    color: "gray",
    weight: 15,
  },
  {
    id: 4,
    source: areas[2],
    target: areas[4],
    slope: true,
    color: "blue",
    weight: 2,
  },
  {
    id: 5,
    source: areas[2],
    target: areas[4],
    slope: true,
    color: "red",
    weight: 3,
  },
  {
    id: 6,
    source: areas[2],
    target: areas[4],
    slope: true,
    color: "black",
    weight: 4,
  },

  {
    id: 7,
    source: areas[2],
    target: areas[5],
    slope: true,
    color: "blue",
    weight: 4,
  },
];
app.get("/api", (req, res) => {
  res.json({ nodes: areas, links: slopesAndLifts });
});

app.post("/calculate-path", (req, res) => {
  const { graph, startNodeId, endNodeId } = req.body;

  // Performing path calculation based on the provided data
  const path = calculatePath(graph, startNodeId, endNodeId);

  // Sending the calculated path as the response
  res.json({ path });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
