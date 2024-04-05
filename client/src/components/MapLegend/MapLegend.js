import React from "react";
import styles from "./MapLegend.module.css";

const MapLegend = () => (
  <div className={styles["map-key"]}>
    <div className={styles["map-key-item"]}>
      <span className={styles.green}></span>
      <span className={styles.label}>Lifts</span>
    </div>
    <div className={styles["map-key-item"]}>
      <span className={styles.blue}></span>
      <span className={styles.label}>Easy Slopes</span>
    </div>
    <div className={styles["map-key-item"]}>
      <span className={styles.red}></span>
      <span className={styles.label}>Moderate Slopes</span>
    </div>
    <div className={styles["map-key-item"]}>
      <span className={styles.black}></span>
      <span className={styles.label}>Difficult Slopes</span>
    </div>
  </div>
);

export default MapLegend;
