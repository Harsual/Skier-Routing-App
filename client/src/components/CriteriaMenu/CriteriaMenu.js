import React, { useState, useEffect, createContext, useContext } from "react";
import "./CriteriaMenu.css";

const CriteriaMenu = ({
  isOpen,
  onClose,
  setResult,
  result,
  allPaths,
  setAllPaths,
  setEndNodeId,
  setStartNodeId,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [shortestPath, setShortestPath] = useState(null);
  const [easiestPath, setEasiestPath] = useState(null);
  const [fastestPath, setFastestPath] = useState(null);
  const [MLUPath, setMLUPath] = useState(null);

  const resetInfo = () => {
    console.log("called");
    setResult(null);
    setSelectedOption(null);
    setEasiestPath(null);
    setFastestPath(null);
    setMLUPath(null);
    setAllPaths(null);
    setEndNodeId(null);
    setStartNodeId(null);
  };

  useEffect(() => {
    // This code runs once when the component mounts
    //console.log("Component mounted");

    if (result == null) {
      setEasiestPath(null);
      setShortestPath(null);
      setFastestPath(null);
      setMLUPath(null);
      setSelectedOption(null);
      onClose(false);
      console.log("reset Info");
    }

    return () => {
      console.log("Component unmounted");
    };
  }, [result]);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;

    setSelectedOption(selectedValue);

    switch (selectedValue) {
      case "shortest":
        if (shortestPath !== null) {
          setResult([shortestPath]);
        } else {
          // Find the path with the least totalLength
          const shortestPath = allPaths.reduce((shortest, current) => {
            if (
              shortest === null ||
              current.totalLength < shortest.totalLength
            ) {
              return current;
            } else {
              return shortest;
            }
          }, null);

          console.log("Shortest Path:", shortestPath);
          setResult([shortestPath]);
          setShortestPath(shortestPath);
        }
        break;

      case "easiest":
        if (easiestPath !== null) {
          setResult([easiestPath]);
        } else {
          const easiestPath = allPaths.reduce((easiest, current) => {
            if (
              easiest === null ||
              current.difficultyScore < easiest.difficultyScore
            ) {
              return current;
            } else {
              return easiest;
            }
          }, null);

          console.log("Easiest Path:", easiestPath);
          setResult([easiestPath]);
          setEasiestPath(easiestPath);
        }
        break;

      case "fastest":
        if (fastestPath !== null) {
          setResult([fastestPath]);
        } else {
          const fastestPath = allPaths.reduce((fastest, current) => {
            if (fastest === null || current.totalTime < fastest.totalTime) {
              return current;
            } else {
              return fastest;
            }
          }, null);
          console.log("Fastest Path:", fastestPath);
          setResult([fastestPath]);
          setFastestPath(fastestPath);
        }
        break;

      case "minimumliftusage":
        if (MLUPath !== null) {
          setResult([MLUPath]);
        } else {
          const MLUPath = allPaths.reduce((minimunTimeOnLift, current) => {
            if (
              minimunTimeOnLift === null ||
              current.totalTimeOnLift < minimunTimeOnLift.totalTimeOnLift
            ) {
              return current;
            } else {
              return minimunTimeOnLift;
            }
          }, null);
          console.log("MinimumLiftsPath:", MLUPath);
          setResult([MLUPath]);
          setMLUPath(MLUPath);
          break;
        }
    }
  };

  const handleSubmit = () => {};

  /*if (!isOpen) {
    return null;
  }*/
  return (
    <div className={`popup ${isOpen ? "active" : ""}`}>
      <div className="popup-header">Please select Criteria:</div>
      <div className="popup-content">
        {/*<div>Please select Criteria:</div>*/}
        <div className="options">
          <label>
            <input
              type="radio"
              value="shortest"
              checked={selectedOption === "shortest"}
              onChange={handleOptionChange}
            />
            Shortest
          </label>
          <label>
            <input
              type="radio"
              value="easiest"
              checked={selectedOption === "easiest"}
              onChange={handleOptionChange}
            />
            Easiest
          </label>
          <label>
            <input
              type="radio"
              value="fastest"
              checked={selectedOption === "fastest"}
              onChange={handleOptionChange}
            />
            Fastest
          </label>
          <label>
            <input
              type="radio"
              value="minimumliftusage"
              checked={selectedOption === "minimumliftusage"}
              onChange={handleOptionChange}
            />
            minimum lift usage
          </label>
          <div>
            <button
              className="popup-close"
              onClick={resetInfo}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "red",
                color: "white",
              }}
            >
              ×
            </button>
          </div>
        </div>
        <button className="popup-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CriteriaMenu;
