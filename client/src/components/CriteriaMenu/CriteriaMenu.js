import React, { useState } from "react";
import "./CriteriaMenu.css";

const CriteriaMenu = ({ isOpen, onClose, setResult, set }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    // console.log(skills);
    // // Calling the server path calculation API
    // fetch("/calculate-preference", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     skills: skills,
    //   }),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setResult(data.paths);
    //   })
    //   .catch((error) => {
    //     console.error("There was a problem with your fetch operation:", error);
    //   });
    // // Close the popup
    onClose(false);
    // setCMenu(true);
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className="popup">
      <div className="popup-header">
        Please select Criteria:
        </div>
      <div className="popup-content">
        
        {/*<div>Please select Criteria:</div>*/}
        <div className="options">
          <label>
            <input
              type="radio"
              value="shortest"
              checked={selectedOption === "shortest"}
              onChange={handleOptionChange}
            />
            Shortest
          </label>
          <label>
            <input
              type="radio"
              value="easiest"
              checked={selectedOption === "easiest"}
              onChange={handleOptionChange}
            />
            Easiest
          </label>
          <label>
            <input
              type="radio"
              value="fastest"
              checked={selectedOption === "fastest"}
              onChange={handleOptionChange}
            />
            Fastest
          </label>
          <label>
            <input
              type="radio"
              value="minimumliftusage"
              checked={selectedOption === "minimumliftusage"}
              onChange={handleOptionChange}
            />
            minimum lift usage
          </label>
          <div>
          <button className="popup-close" 
          onClick={() => onClose(false)} 
          style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white' }}
          >
            ×
          </button>
          </div> 
          
        </div>
        <button className="popup-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default CriteriaMenu;
