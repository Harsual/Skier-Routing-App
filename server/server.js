const CPControllerClass = require("./CPController.js");
const CPController = new CPControllerClass();
const express = require("express");

const pathCalculator = require("./pathCalculator");

const app = express();
app.use(express.json());

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
} catch (error) {
  console.error("Error reading file:", error);
}

var graph = {
  nodes: locations,
  links: slopesAndLifts,
};

var paths;

app.get("/getDB", (req, res) => {
  try {
    const data = {
      nodes: locations,
      links: slopesAndLifts,
    };

    res.json(data);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/calculate-paths", (req, res) => {
  try {
    const { startNodeId, endNodeId } = req.body;

    paths = CPController.pathCalculator(graph, startNodeId, endNodeId);

    res.json({ paths });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/calculate-preference", (req, res) => {
  try {
    const preference = req.body;

    paths = CPController.pathVerifier(paths, graph.links, preference);

    console.log(JSON.stringify(paths, null, 2));

    res.json({ paths });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

try {
  app.listen(4000, () => {
    console.log("Server started on port 4000");
  });
} catch (error) {
  console.error("Error occurred during server startup:", error);
}
