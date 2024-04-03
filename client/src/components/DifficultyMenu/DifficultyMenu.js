import React, { useState, useEffect } from "react";
import styles from "./DifficultyMenu.module.css";

const DifficultyMenu = ({
  isOpen,
  onClose,
  setResult,
  result,
  setCMenu,
  setAllPaths,
}) => {
  // State to store the checked status of each skill level
  const [skills, setSkills] = useState(["blue", "black", "red"]);

  useEffect(() => {
    // This code runs once when the component mounts
    //console.log("Component mounted");

    if (result == null) {
      setSkills(["blue", "black", "red"]);
      onClose(false);

      console.log("reset Info");
    }

    return () => {
      console.log("Component unmounted");
    };
  }, [result]);
  /*useEffect(() => {
    // This code runs once when the component mounts
    //console.log("Component mounted");

    if (!isOpen) {
      console.log("reset skills!!");
    }

    /*return () => {
      console.log("Difficulty: Component unmounted");
    };
  }, [isOpen]);*/

  // Handler to update the state when a checkbox is clicked
  const handleChange = (e) => {
    let name = e.target.name;

    if (skills.includes(name)) {
      setSkills(skills.filter((skill) => skill !== name));
    } else {
      setSkills([...skills, name]);
    }
  };

  // Handler to submit the selected skills
  const handleSubmit = () => {
    //console.log(skills);

    // Calling the server path calculation API
    fetch("/calculate-preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skills: skills,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.paths);
        setAllPaths(data.paths);
        setResult(data.paths);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });

    // Close the popup
    onClose(false);
    setCMenu(true);
    setSkills(["blue", "red", "black"]);
  };

  return (
    <div className={`${styles.popupd} ${isOpen ? styles.active : ""}`}>
      <div className={styles["popupd-header"]}>
        Please select your skill level:
      </div>
      <div className={styles["popupd-content"]}>
        <div className={styles["popupd-labels"]}>
          <label>
            <input
              type="checkbox"
              name="blue"
              checked={skills.includes("blue")}
              onChange={handleChange}
            />
            Blue
          </label>
          <label>
            <input
              type="checkbox"
              name="red"
              checked={skills.includes("red")}
              onChange={handleChange}
            />
            Red
          </label>
          <label>
            <input
              type="checkbox"
              name="black"
              checked={skills.includes("black")}
              onChange={handleChange}
            />
            Black
          </label>
        </div>
        {/* Additional checkboxes for other skill levels */}
      </div>
      <button
        className={styles["popupd-close"]}
        onClick={() => onClose(false)}
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
      <button className={styles["popupd-button"]} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default DifficultyMenu;
