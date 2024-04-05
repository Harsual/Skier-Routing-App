import React from 'react';
// styling
import styles from './InstructionBox.module.css';

const InstructionBox = props => {
    // function that takes boolean as param to conditionally display popup
    const { setPopUp } = props;

    return (
        <div className={styles.PopUp}>
            <div className={styles["PopUp-box"]}>
                {/* x close window */}
                <button className={`${styles["popup-close"]} ${styles["popup-x"]}`} onClick={() => setPopUp(false)}>x</button> 
                <div className={styles["pu-button-container"]}>
                    Choose your current location and your destination on the map to get the path.
                </div>
                {/* button controls */}
                <div className={styles["pu-button-container"]}>
                    <button className={`${styles["popup-button"]}`} onClick={() => setPopUp(false)}>OK</button> 
                    
                </div>
            </div>
        </div>
    );
}

export default InstructionBox;