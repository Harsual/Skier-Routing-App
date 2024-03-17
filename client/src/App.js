import React, { useEffect, useState } from "react";
import "./App.css";
import Map from "./Map";

function App() {
  // State to handle interactioon from node.js server and this react app
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return backendData ? (
    <div>
      <div className="container">
        <header>Weclome to the Ski-resort App</header>
        <div className="graph-container">
          <h1>Graph Visualization</h1>
          <Map height={400} width={800} backendData={backendData} />
        </div>
        <div>
          <button className="large-button">Find Path</button>
          <button className="large-button">Find Facility </button>
          <button className="large-button">Create Profile</button>
        </div>
      </div>
    </div>
  ) : (
    <div> Loading Graph Info</div>
  );
}

export default App;
