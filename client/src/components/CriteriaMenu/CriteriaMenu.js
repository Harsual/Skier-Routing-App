import React, { useState, useEffect, createContext, useContext } from "react";
import styles from "./CriteriaMenu.module.css";

const CriteriaMenu = ({
  isOpen,
  onClose,
  setResult,
  result,
  allPaths,
  setAllPaths,
  setEndNodeId,
  setStartNodeId,
  setFinalPath,
  setShowDBox,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [shortestPath, setShortestPath] = useState(null);
  const [easiestPath, setEasiestPath] = useState(null);
  const [fastestPath, setFastestPath] = useState(null);
  const [MLUPath, setMLUPath] = useState(null);

  const resetInfo = () => {
    console.log("called");
    setResult(null);
  };

  useEffect(() => {
    if (result == null) {
      setEndNodeId(null);
      setStartNodeId(null);
      setEasiestPath(null);
      setShortestPath(null);
      setFastestPath(null);
      setMLUPath(null);
      setSelectedOption(null);
      setAllPaths(null);
      setShowDBox(false);
      onClose(false);
    }

    return () => {};
  }, [result]);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;

    setSelectedOption(selectedValue);

    switch (selectedValue) {
      case "shortest":
        if (shortestPath !== null) {
          setResult([shortestPath]);
          setFinalPath(shortestPath);
          setShowDBox(true);
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

          setResult([shortestPath]);
          setFinalPath(shortestPath);
          setShortestPath(shortestPath);
          setShowDBox(true);
        }
        break;

      case "easiest":
        if (easiestPath !== null) {
          setResult([easiestPath]);
          setFinalPath(easiestPath);
          setShowDBox(true);
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

          setResult([easiestPath]);
          setFinalPath(easiestPath);
          setEasiestPath(easiestPath);
          setShowDBox(true);
        }
        break;

      case "fastest":
        if (fastestPath !== null) {
          setResult([fastestPath]);
          setFinalPath(fastestPath);
          setShowDBox(true);
        } else {
          const fastestPath = allPaths.reduce((fastest, current) => {
            if (fastest === null || current.totalTime < fastest.totalTime) {
              return current;
            } else {
              return fastest;
            }
          }, null);

          setResult([fastestPath]);
          setFinalPath(fastestPath);
          setFastestPath(fastestPath);
          setShowDBox(true);
        }
        break;

      case "minimumliftusage":
        if (MLUPath !== null) {
          setResult([MLUPath]);
          setFinalPath(MLUPath);
          setShowDBox(true);
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

          setResult([MLUPath]);
          setFinalPath(MLUPath);
          setMLUPath(MLUPath);
          setShowDBox(true);
          break;
        }
    }
  };

  return (
    <div className={`${styles.popup} ${isOpen ? styles.active : ""}`}>
      <div className={styles["popup-header"]}>Please select Criteria:</div>
      <div className={styles["popup-content"]}>
        {/*<div>Please select Criteria:</div>*/}
        <div className={styles.options}>
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
              className={styles["popup-close"]}
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
        <div className={styles.resetButtonContainer}>
          <button className={styles["popup-button"]} onClick={resetInfo}>
            Select Different points
          </button>
        </div>
      </div>
    </div>
  );
};

export default CriteriaMenu;
