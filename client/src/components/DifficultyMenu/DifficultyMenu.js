import React, { useState, useEffect } from "react";
import "./DifficultyMenu.css";

const DifficultyMenu = ({
  isOpen,
  onClose,
  setResult,
  result,
  setCMenu,
  setAllPaths,
}) => {
  // State to store the checked status of each skill level
  const [skills, setSkills] = useState([]);

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
    // console
    onClose(false);
    setCMenu(true);
    setSkills([]);
  };

  /*if (!isOpen) {
    return null;
  }*/
  return (
    <div className={`popupd ${isOpen ? "active" : ""}`}>
      <div className="popupd-header">Please select your skill level:</div>
      <div className="popupd-content">
        <div className="popupd-labels">
          <label>
            <input type="checkbox" name="blue" onChange={handleChange} />
            Blue
          </label>
          <label>
            <input type="checkbox" name="red" onChange={handleChange} />
            Red
          </label>
          <label>
            <input type="checkbox" name="black" onChange={handleChange} />
            Black
          </label>
        </div>
        {/* Additional checkboxes for other skill levels */}
      </div>
      <button
        className="popupd-close"
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
      <button className="popupd-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default DifficultyMenu;
