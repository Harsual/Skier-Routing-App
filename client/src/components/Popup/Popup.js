// import React, { useState } from "react";
// import "./Popup.css";

// const Popup = ({ isOpen, onClose }) => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleCheckboxChange = (option) => {
//     if (selectedOptions.includes(option)) {
//       setSelectedOptions(selectedOptions.filter((item) => item !== option));
//     } else {
//       setSelectedOptions([...selectedOptions, option]);
//     }
//   };

//   const handleSubmit = () => {
//     // Handle submission of selected options
//     console.log("Selected options:", selectedOptions);
//     // Close the popup
//     //onClose();
//   };

//   /*if (!isOpen) {
//     return null;
//   }*/

//   return (
//     <div className="popup">
//       <div className="popup-inner">
//         <h2>Choose Options</h2>
//         <label>
//           <input
//             type="checkbox"
//             checked={selectedOptions.includes("Black")}
//             onChange={() => handleCheckboxChange("Black")}
//           />
//           Black
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             checked={selectedOptions.includes("Red")}
//             onChange={() => handleCheckboxChange("Red")}
//           />
//           Red
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             checked={selectedOptions.includes("Blue")}
//             onChange={() => handleCheckboxChange("Blue")}
//           />
//           Blue
//         </label>
//         <button onClick={handleSubmit}>Submit</button>
//         <button onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default Popup;
import React, { useState } from "react";

const Popup = ({ isOpen, onClose, setResult, set }) => {
  // State to store the checked status of each skill level
  const [skills, setSkills] = useState({
    blue: false,
    red: false,
    black: false,
  });

  // Handler to update the state when a checkbox is clicked
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSkills({
      ...skills,
      [name]: checked,
    });
  };

  // Handler to submit the selected skills
  const handleSubmit = () => {
    // You can process the selected skills here
    // For demonstration, we'll just log them to the console
    const selectedSkills = Object.entries(skills)
      .filter(([skill, isChosen]) => isChosen)
      .map(([skill]) => skill)
      .join(", ");

    setResult([
      [
        { pnode: 0, plink: null },
        { pnode: 2, plink: 3 },
        { pnode: 4, plink: 4 },
      ],
    ]);

    console.log(`Selected skills: ${selectedSkills}`);
    // Close the popup
    onClose(false);
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div
      style={{
        //position: "absolute",
        //marginTop: "200px",
        //top: "50%",
        //left: "50%",
        //transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        //zIndex: 100,
      }}
    >
      <div>Please select your skill level:</div>
      <div>
        <label>
          <input
            type="checkbox"
            name="blue"
            checked={skills.blue}
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
            checked={skills.red}
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
            checked={skills.black}
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

export default Popup;
