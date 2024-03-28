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
    // onClose(false);
    // setCMenu(true);
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className="popup">
      <div>Please select Criteria:</div>
      <div>
        <label>
          <input
            type="radio"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={handleOptionChange}
          />
          Option 1
        </label>

        <label>
          <input
            type="radio"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={handleOptionChange}
          />
          Option 2
        </label>

        <label>
          <input
            type="radio"
            value="option3"
            checked={selectedOption === "option3"}
            onChange={handleOptionChange}
          />
          Option 3
        </label>
      </div>

      <button onClick={handleSubmit}>Submit</button>
      {/* <button onClick={onClose}>Close</button> */}
    </div>
  );
};

export default CriteriaMenu;
