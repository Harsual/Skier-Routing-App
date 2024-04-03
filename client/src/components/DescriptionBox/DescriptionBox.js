import React, { useState } from "react";
import styles from "./DescriptionBox.module.css";
import { PiPathBold } from "react-icons/pi";
import { GiPathDistance } from "react-icons/gi";
import { TbAerialLift } from "react-icons/tb";
import { RiMapPinTimeFill } from "react-icons/ri";
import { SiLevelsdotfyi } from "react-icons/si";

const DescriptionBox = ({}) => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [showContainer, setShowContainer] = useState(true);

  const data = [
    {
      path: ["apple", "banana", "orange"],
      totalLength: 700,
      totalTime: 12.84000336001344,
      totalTimeOnLift: 12,
      difficultyScore: 700,
    },
    {
      path: ["pineapple", "mango", "grape"],
      totalLength: 0,
      totalTime: 19,
      totalTimeOnLift: 19,
      difficultyScore: 0,
    },
  ];

  const handleClick = (path) => {
    setSelectedPath(path === selectedPath ? null : path);
  };
  const handleCloseContainer = () => {
    setShowContainer(false);
  };

  return (
    <div
      className={`${styles.container} ${showContainer ? "" : styles.hidden}`}
    >
      <div className={styles["close-button"]} onClick={handleCloseContainer}>
        x
      </div>
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
          <div>
            {selectedPath === "finalpath" && (
              <div>
                <p>Path:</p>
                {data[0].path.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            )}
            {selectedPath === "distance" && (
              <div>Total Length: {data[0].totalLength}</div>
            )}
            {selectedPath === "time" && (
              <div>Total Time: {data[0].totalTime}</div>
            )}
            {selectedPath === "lift" && (
              <div>Total Time on Lift: {data[0].totalTimeOnLift}</div>
            )}
            {selectedPath === "difficulty" && (
              <div>Difficulty Score: {data[0].difficultyScore}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
