var pPaths;

function verifyPath(paths, linkInfo, preference) {
  pPaths = filterPreferencedPath(paths, preference);
  return encodePathAttr(pPaths, linkInfo);
}

function filterPreferencedPath(paths, preference) {
  difficultyPref = preference.skills;
  difficultyPref.push("green");

  // let filteredPaths = paths.filter((path) =>
  //   path.every((item) => !item.color || difficultyPref.includes(item.color))
  // );

  let filteredPaths = paths.filter((pathObj) =>
    pathObj.path.every(
      (item) => !item.color || difficultyPref.includes(item.color)
    )
  );

  return filteredPaths;
}

function encodePathAttr(paths, linkInfo) {
  //console.log(linkInfo);

  paths.forEach((pathObj) => {
    let path = pathObj.path; // Extract the path array from the path object
    let totalLength = 0; // Initialize total length for the current path
    let totalTime = 0;
    let totalTimeOnLift = 0;
    let difficultyScore = 0;
    // Iterate through each step in the path
    for (let i = 1; i < path.length; i++) {
      let plinkId = path[i].plink; // Get the plink id for the current step
      let link = linkInfo.find((info) => info.id === plinkId); // Find the corresponding link info
      //console.log(link);
      if (link.Name) {
        //console.log(link.Name);
        path[i].name = link.Name;
      }
      if (link.length) {
        totalLength += link.length;
      }

      if (!link.slope) {
        totalTimeOnLift += link.time;
        totalTime += link.time;
      } else if (link.slope) {
        totalTime += link.length / 416.667;

        switch (link.color) {
          case "blue":
            difficultyScore += link.length;
            break;

          case "red":
            difficultyScore += link.length * 1.5;
            break;

          case "black":
            difficultyScore += link.length * 2;
            break;
        }
      }
    }

    // Add the total length attribute to the path object
    pathObj.totalLength = totalLength;
    pathObj.totalTime = totalTime;
    pathObj.totalTimeOnLift = totalTimeOnLift;
    pathObj.difficultyScore = difficultyScore;
  });

  //console.log(paths);

  return paths;
}

module.exports = {
  verifyPath,
};
