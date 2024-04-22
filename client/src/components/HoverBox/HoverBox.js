import React from "react";
import styles from "./HoverBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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
      style={{ transform: `translate(${props.x - 80}px, ${props.y - 70}px)` }}
    >
      <div className={styles.info}>
        <div className={styles.circle}>
          <FontAwesomeIcon icon={faCheck} color="white" />
        </div>

        <div>{props.liftName}</div>
      </div>

      <div className={styles.tip}></div>
    </div>
  );
};

export default HoverBox;
