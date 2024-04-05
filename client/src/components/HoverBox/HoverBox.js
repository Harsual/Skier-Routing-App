import React from "react";
import styles from "./HoverBox.module.css";

const HoverBox = (props) => {
  return (
    // <rect
    //   x={props.x - 50} // Adjust x position as needed
    //   y={props.y - 60} // Adjust y position as needed
    //   width="100"
    //   height="50"
    //   className={styles.box}
    //   fill="white"
    //   opacity="1"
    // ></rect>

    <div
      className={styles.box}
      //style={{ left: `${props.x}px`, top: `${props.y}px` }}
      style={{ transform: `translate(${props.x - 50}px, ${props.y - 60}px)` }}
    >
      {props.liftName}
    </div>
  );
};

export default HoverBox;
