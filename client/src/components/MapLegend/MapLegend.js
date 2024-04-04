import "./MapLegend.css";
const MapLegend = () => (
    <div className="map-key">
    <div className="map-key-item">
      <span className="dot green"></span>
      <span className="label">Lifts</span>
    </div>
    <div className="map-key-item">
      <span className="dot blue"></span>
      <span className="label">Easy Slopes</span>
    </div>
    <div className="map-key-item">
      <span className="dot red"></span>
      <span className="label">Moderate Slopes</span>
    </div>
    <div className="map-key-item">
      <span className="dot black"></span>
      <span className="label">Difficult Slopes</span>
    </div>
  </div>
  );

  export default MapLegend;