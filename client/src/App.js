import React, { useEffect, useState } from "react";
import "./App.css";
import Map from "./SkieResort";
import SkiResort from "./SkieResort";
import DifficultyMenu from './components/DifficultyMenu/DifficultyMenu';
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import CriteriaMenu from "./components/CriteriaMenu/CriteriaMenu";
import MapLegend from "./components/MapLegend/MapLegend";

function App() {
  // State to handle interactioon from node.js server and this react app
  const [SkiResortData, setSkiResortData] = useState();
  const [DMenuIsOpen, setDMenuIsOpen] = useState(false);
  const [CMenuIsOpen, setCMenuIsOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [allPaths, setAllPaths] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        //prepareData(data);
        //console.log(data);
        setSkiResortData(data);
      });
  }, []);

  const [viewportDimensions, setViewportDimensions] = useState({
    viewportWidth: 0,
    viewportHeight: 0,
  });

  useEffect(() => {
    // Function to update viewport dimensions
    const updateViewportDimensions = () => {
      setViewportDimensions({
        //width: window.screen.availWidth,
        //height: window.screen.availHeight,
        //viewportWidth: window.innerWidth,
        //viewportHeight: window.innerHeight,
        viewportWidth: document.documentElement.scrollWidth,
        viewportHeight: document.documentElement.scrollHeight,
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
                setSkiResortData={setSkiResortData}
                DMenuIsOpen={DMenuIsOpen}
                setDMenuIsOpen={setDMenuIsOpen}
                result={result}
                setResult={setResult}
              />
            )}
          </ParentSize>
        </div>
        <DifficultyMenu
          setResult={setResult}
          result={result}
          isOpen={DMenuIsOpen}
          onClose={setDMenuIsOpen}
          setCMenu={setCMenuIsOpen}
          setAllPaths={setAllPaths}
        ></DifficultyMenu>
        <MapLegend />
        <CriteriaMenu
          setResult={setResult}
          result={result}
          isOpen={CMenuIsOpen}
          onClose={setCMenuIsOpen}
          setAllPaths={setAllPaths}
          allPaths={allPaths}
        ></CriteriaMenu>
      </div>
    </div>
  ) : (
    <div> Loading Graph Info</div>
  );
}

export default App;
