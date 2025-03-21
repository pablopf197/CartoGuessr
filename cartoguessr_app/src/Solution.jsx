import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles/principal.css';
import Navbar from './Components/Navbar';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function Map() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: import.meta.env.VITE_MAPBOX_STYLE_URL,
      center: [0, 40],
      zoom: 3,
      minZoom: 1,
    });

  }, []);

  return (
    <div>
      <Navbar />
      <div ref={mapContainer} style={containerStyle} />
    </div>
  );
}
const containerStyle = {
  width: '100%',
  height: '100vh',
};

export default Map;
