import React, { useState } from "react";
import "./DifficultyMenu.css";

const DifficultyMenu = ({ isOpen, onClose, setResult, setCMenu }) => {
  // State to store the checked status of each skill level
  const [skills, setSkills] = useState([]);

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
    console.log(skills);

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
        setResult(data.paths);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });

    // Close the popup
    onClose(false);
    setCMenu(true);
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className="popup">
      <div>Please select your skill level:</div>
      <div>
        <label>
          <input
            type="checkbox"
            name="blue"
            //checked={skills.blue}
            onChange={handleChange}
          />
          Blue
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="red"
            //checked={skills.red}
            onChange={handleChange}
          />
          Red
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="black"
            //checked={skills.black}
            onChange={handleChange}
          />
          Black
        </label>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {/* <button onClick={onClose}>Close</button> */}
    </div>
  );
};

export default DifficultyMenu;
