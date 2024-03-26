import React, { useEffect, useState } from "react";
import "./App.css";
import Map from "./SkieResort";
import SkiResort from "./SkieResort";
import Popup from "./components/Popup/Popup";

function App() {
  // State to handle interactioon from node.js server and this react app
  const [SkiResortData, setSkiResortData] = useState([{}]);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setSkiResortData(data);
      });
  }, []);

  return SkiResortData ? (
    <div>
      <div className="container">
        <div className="graph-container">
          <SkiResort
            height="100vh"
            width="100vw"
            skiResortData={SkiResortData}
            popupIsOpen={popupIsOpen}
            setPopupIsOpen={setPopupIsOpen}
            result={result}
            setResult={setResult}
          />
        </div>
        <Popup
          setResult={setResult}
          isOpen={popupIsOpen}
          onClose={setPopupIsOpen}
        ></Popup>
      </div>
    </div>
  ) : (
    <div> Loading Graph Info</div>
  );
}

export default App;
