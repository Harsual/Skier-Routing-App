import React, { useEffect, useState } from "react";
import "./App.css";
import SkiResort from "./SkieResort";

import DifficultyMenu from "./components/DifficultyMenu/DifficultyMenu";
import MapLegend from "./components/MapLegend/MapLegend";

import ParentSize from "@visx/responsive/lib/components/ParentSize";
import CriteriaMenu from "./components/CriteriaMenu/CriteriaMenu";
import DescriptionBox from "./components/DescriptionBox/DescriptionBox";
import InstructionBox from "./components/InstructionBox/InstructionBox";

function App() {
  // State to handle interactioon from node.js server and this react app
  const [SkiResortData, setSkiResortData] = useState();
  const [GraphData, setGraphData] = useState({});
  const [DMenuIsOpen, setDMenuIsOpen] = useState(false);
  const [CMenuIsOpen, setCMenuIsOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [allPaths, setAllPaths] = useState(null);
  const [startNodeId, setStartNodeId] = useState(null);
  const [EndNodeId, setEndNodeId] = useState(null);
  const [finalPath, setFinalPath] = useState(null);
  const [showDBox, setShowDBox] = useState(false);
  const [popUp, setPopUp] = useState(true); {/* State true so that pop up shows with every time that page loads */ }


  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        //prepareData(data);
        //console.log(data);
        setSkiResortData(data);
      });
  }, []);

  return SkiResortData ? (
    <div>
      <div className="container">
        <DescriptionBox
          finalPath={finalPath}
          showDBox={showDBox}
        ></DescriptionBox>
        <div className="graph-container">
          {popUp && <InstructionBox setPopUp={setPopUp} />}
          {/*<ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize>,*/}
          <ParentSize>
            {({ width, height }) => (
              <SkiResort
                width={width}
                height={height}
                skiResortData={SkiResortData}
                setSkiResortData={setSkiResortData}
                GraphData={GraphData}
                setGraphData={setGraphData}
                DMenuIsOpen={DMenuIsOpen}
                setDMenuIsOpen={setDMenuIsOpen}
                result={result}
                setResult={setResult}
                setStartNodeId={setStartNodeId}
                startNodeId={startNodeId}
                setEndNodeId={setEndNodeId}
                endNodeId={EndNodeId}
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
          setStartNodeId={setStartNodeId}
          setEndNodeId={setEndNodeId}
          onClose={setCMenuIsOpen}
          setAllPaths={setAllPaths}
          allPaths={allPaths}
          setFinalPath={setFinalPath}
          setShowDBox={setShowDBox}
        ></CriteriaMenu>
      </div>
    </div>
  ) : (
    <div> Loading Graph Info</div>
  );
}

export default App;
