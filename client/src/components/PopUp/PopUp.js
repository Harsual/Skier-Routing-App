import React from 'react';
// styling
import styles from './PopUp.module.css';

const PopUp = props => {
    // function that takes boolean as param to conditionally display popup
    const { setPopUp } = props;

    return (
        <div className={styles.PopUp}>
            <div className={styles["PopUp-box"]}>
                {/* x close window */}
                <button className={`${styles["popup-button"]} ${styles["popup-x"]}`} onClick={() => setPopUp(false)}>X</button> 
                <div className={styles["pu-button-container"]}>
                    <h4>Choose your current location and your destination on the map to get the path.</h4>
                </div>
                {/* button controls */}
                <div className={styles["pu-button-container"]}>
                    <button className={`${styles["popup-button"]} ${styles["popup-x"]}`} onClick={() => setPopUp(false)}>OK</button>
                </div>
            </div>
        </div>
    );
}

export default PopUp;