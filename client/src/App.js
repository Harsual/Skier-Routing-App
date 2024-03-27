import React, { useEffect, useState } from "react";
import "./App.css";
import Map from "./SkieResort";
import SkiResort from "./SkieResort";
import Popup from "./components/Popup/Popup";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

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

  const [viewportDimensions, setViewportDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Function to update viewport dimensions
    const updateViewportDimensions = () => {
      setViewportDimensions({
        width: window.screen.availWidth,
        height: window.screen.availHeight,
      });
    };

    // Initial call to update viewport dimensions
    updateViewportDimensions();

    // Cleanup function to remove event listener after initial render
    // This ensures that the event listener is removed after the first render
    // and doesn't continue to listen for subsequent changes
    window.removeEventListener("resize", updateViewportDimensions);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return SkiResortData ? (
    <div>
      <div className="container">
        <div className="graph-container">
          {/*<ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize>,*/}
          <ParentSize>
            {({ width, height }) => (
              <SkiResort
                width={width}
                height={height}
                skiResortData={SkiResortData}
                popupIsOpen={popupIsOpen}
                setPopupIsOpen={setPopupIsOpen}
                result={result}
                setResult={setResult}
              />
            )}
          </ParentSize>
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
