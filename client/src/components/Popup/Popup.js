import React, { useState } from "react";
import "./Popup.css";

const Popup = ({ isOpen, onClose }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      //setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      //setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSubmit = () => {
    // Handle submission of selected options
    console.log("Selected options:", selectedOptions);
    // Close the popup
    //onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Choose Options</h2>
        <label>
          <input
            type="checkbox"
            checked={selectedOptions.includes("Option 1")}
            onChange={() => handleCheckboxChange("Option 1")}
          />
          Option 1
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedOptions.includes("Option 2")}
            onChange={() => handleCheckboxChange("Option 2")}
          />
          Option 2
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedOptions.includes("Option 3")}
            onChange={() => handleCheckboxChange("Option 3")}
          />
          Option 3
        </label>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Popup;
