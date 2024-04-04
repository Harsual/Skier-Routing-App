import "./MapLegend.css";
const MapLegend = () => (
    <div class="map-key">
    <div class="map-key-item">
      <span class="dot green"></span>
      <span class="label">Lifts</span>
    </div>
    <div class="map-key-item">
      <span class="dot blue"></span>
      <span class="label">Easy Slopes</span>
    </div>
    <div class="map-key-item">
      <span class="dot red"></span>
      <span class="label">Moderate Slopes</span>
    </div>
    <div class="map-key-item">
      <span class="dot black"></span>
      <span class="label">Difficult Slopes</span>
    </div>
  </div>
  );

  export default MapLegend;