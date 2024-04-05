const pathCalculator = require("./pathCalculator");
const pathVerifier = require("./pathVerifier");
var pPaths;
class CPController {
  pathCalculator(graph, startNodeID, endNodeID) {
    return pathCalculator.calculateAllPaths(graph, startNodeID, endNodeID);
  }

  pathVerifier(paths, linkInfo, preference) {
    pPaths = pathVerifier.filterPreferencedPath(paths, preference);
    return pathVerifier.encodePathAttr(pPaths, linkInfo);
  }
}

module.exports = CPController;
