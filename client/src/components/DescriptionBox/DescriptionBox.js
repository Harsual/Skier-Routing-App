import React, { useState } from "react";
import styles from "./DescriptionBox.module.css";
import { PiPathBold } from "react-icons/pi";
import { GiPathDistance } from "react-icons/gi";
import { TbAerialLift } from "react-icons/tb";
import { RiMapPinTimeFill } from "react-icons/ri";
import { SiLevelsdotfyi } from "react-icons/si";

const DescriptionBox = ({ finalPath, showDBox }) => {
  const [selectedPath, setSelectedPath] = useState("finalpath");

  const handleClick = (path) => {
    setSelectedPath(path === selectedPath ? null : path);
  };

  return (
    <div className={`${styles.container} ${showDBox ? styles.active : ""}`}>
      <div className={styles["menu-container"]}>
        <div className={styles.menu}>
          <div
            className={`${styles.path} ${
              selectedPath === "finalpath" ? styles.clicked : ""
            }`}
            onClick={() => handleClick("finalpath")}
          >
            <PiPathBold className={styles.imagestyle} />
          </div>
          <div
            className={`${styles.path} ${
              selectedPath === "distance" ? styles.clicked : ""
            }`}
            onClick={() => handleClick("distance")}
          >
            <GiPathDistance />
          </div>
          <div
            className={`${styles.path} ${
              selectedPath === "time" ? styles.clicked : ""
            }`}
            onClick={() => handleClick("time")}
          >
            <RiMapPinTimeFill />
          </div>
          <div
            className={`${styles.path} ${
              selectedPath === "lift" ? styles.clicked : ""
            }`}
            onClick={() => handleClick("lift")}
          >
            <TbAerialLift />
          </div>
          <div
            className={`${styles.path} ${
              selectedPath === "difficulty" ? styles.clicked : ""
            }`}
            onClick={() => handleClick("difficulty")}
          >
            <SiLevelsdotfyi />
          </div>
        </div>
      </div>

      {selectedPath && (
        <div className={styles.box}>
          {finalPath && (
            <div>
              {selectedPath === "finalpath" && (
                <div>
                  <p>Path:</p>
                  {finalPath && finalPath.path && finalPath.path.length > 0 ? (
                    finalPath.path.map((item, index) => <div>{item.name}</div>)
                  ) : (
                    <div>No paths available</div>
                  )}
                </div>
              )}
              {selectedPath === "distance" && (
                <div>Total Length: {finalPath.totalLength} meters</div>
              )}
              {selectedPath === "time" && (
                <div>Total Time: {finalPath.totalTime.toFixed(2)} minutes</div>
              )}
              {selectedPath === "lift" && (
                <div>
                  Total Time on Lift: {finalPath.totalTimeOnLift} minutes
                </div>
              )}
              {selectedPath === "difficulty" && (
                <div>Difficulty Score: {finalPath.difficultyScore}</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
