import React, { useRef, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/countriesGame.css';
import geoJSON from '../assets/countries2.geo.json';
import Navbar from '../Components/Navbar.jsx';
import Score from '../Components/Score.jsx';
import Modal from '../Components/Modal.jsx';
import Timer from '../Components/Timer.jsx';
import CountryList, { getCountryCenterById } from '../Components/CountryList.jsx';


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function CountriesGame() {
  const [searchParams] = useSearchParams();
  const count = parseInt(searchParams.get('count')) || 10;
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [score, setScore] = useState(0);
  const currentCountryIndexRef = useRef(0);
  const hoveredPolygonIdRef = useRef(null);
  const scoreRef = useRef(0);
  const [showModal, setShowModal] = useState(false);
  const gameMode = searchParams.get('mode') || 'normal';

  useEffect(() => {
    if(gameMode === 'crono') {
      setCountries(CountryList({ count: 135, mainOnly: true}));
    }else{
      setCountries(CountryList({ count: count, mainOnly: true }));
    }
  }, [count]);

  useEffect(() => {
    if (mapContainer.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: import.meta.env.VITE_MAPBOX_GAME_STYLE_URL,
        center: [0, 40],
        zoom: 2,
        maxZoom: 20,
        minZoom: 1
      });

      mapRef.current.on('load', () => {
        mapRef.current.addSource('countries', {
          type: 'geojson',
          data: geoJSON
        });

        mapRef.current.addLayer({
          id: 'country-fills',
          type: 'fill',
          source: 'countries',
          layout: {},
          paint: {
            'fill-color': [
              'case',
              ['boolean', ['feature-state', 'selected'], false], 'green',
              ['boolean', ['feature-state', 'error'], false], 'red',
              ['boolean', ['feature-state', 'hover'], false], 'grey',
              'transparent'
            ],
            'fill-opacity': 0.8
          }
        });

        mapRef.current.addLayer({
          id: 'country-borders',
          type: 'line',
          source: 'countries',
          layout: {},
          paint: {
            'line-color': 'black',
            'line-width': 1
          }
        });

        handleMapEvents(mapRef.current);
      });
    }
  }, []);
  
  useEffect(() => {
    if (mapRef.current && countries.length > 0) {
      handleMapEvents(mapRef.current);
    }
  }, [countries]);

  const handleMapEvents = (map) => {
    map.on('mousemove', 'country-fills', (e) => {
      if (e.features.length > 0) {
        if (hoveredPolygonIdRef.current !== e.features[0].id) {
          if (hoveredPolygonIdRef.current) {
            map.setFeatureState({ source: 'countries', id: hoveredPolygonIdRef.current }, { hover: false });
          }
          hoveredPolygonIdRef.current = e.features[0].id;
          map.setFeatureState({ source: 'countries', id: hoveredPolygonIdRef.current }, { hover: true });
          map.getCanvas().style.cursor = 'pointer';
        }
      }
    });

    map.on('mouseleave', 'country-fills', () => {
      if (hoveredPolygonIdRef.current) {
        map.setFeatureState({ source: 'countries', id: hoveredPolygonIdRef.current }, { hover: false });
        hoveredPolygonIdRef.current = null;
      }
      map.getCanvas().style.cursor = '';
    });

    map.on('click', 'country-fills', handleClickOnCountry);
  };
  const handleClickOnCountry = (e) => {
    if (e.features.length > 0 && countries.length > currentCountryIndexRef.current) {
      const clickedFeature = e.features[0];
      const clickedCountryId = clickedFeature.id;
      //const clickedCountryName = clickedFeature.properties.ADMIN;

      const correctCountry = countries[currentCountryIndexRef.current];

      if (clickedCountryId == correctCountry.id) {
        const audio = new Audio('/audio/correct.wav');
        audio.play();
        setScore(prevScore => prevScore + 1);
        scoreRef.current += 1;
        mapRef.current.setFeatureState({ source: 'countries', id: clickedCountryId }, { selected: true });

        const popup = new mapboxgl.Popup({ closeOnClick: true })
          .setLngLat(e.lngLat)
          .setHTML(`<h3>${correctCountry.name}</h3>`)
          .addTo(mapRef.current);

        setTimeout(() => {
          popup.remove();
        }, 3000);
      } else {
        const audio = new Audio('/audio/error.wav');
        audio.play();
        mapRef.current.setFeatureState({ source: 'countries', id: correctCountry.id }, { error: true });

        // Obtain the center of the correct country and redirect to it
        const center = getCountryCenterById(correctCountry.id);
        if (center) {
          mapRef.current.flyTo({
            center: center,
            essential: true
          });
        }

        const popup = new mapboxgl.Popup({ closeOnClick: true })
          .setLngLat(center)
          .setHTML(`<h3>${correctCountry.name}</h3>`)
          .addTo(mapRef.current);

        setTimeout(() => {
          popup.remove();
        }, 3000);
      }
      
      const nextIndex = currentCountryIndexRef.current + 1;
      if (nextIndex < countries.length) {
        currentCountryIndexRef.current = nextIndex;
        document.getElementById('currentCountry').innerText = `Find: ${countries[nextIndex].name}`;
      } else {
        setTimeout(() => {
          setShowModal(true);
        }, 2000);
      }
    }
  };
  const endGame = () => {
    setShowModal(true);
  };
  return (
    <>
      <div>
        <Navbar />
        <div  tabIndex= "-1" ref={mapContainer} style={{ width: '100%', height: '100vh', position: 'relative' }} />
        
        {gameMode === 'normal' && <Score correct={score} maxFlags={countries.length} className="map-score" />}
        {gameMode === 'crono' && <Timer initialTime={60} onTimeUp={endGame} />}
        <div className="centered-text">
          
          <h3 id="currentCountry">Find: {countries.length > 0 ? countries[currentCountryIndexRef.current].name : 'Loading...'}</h3>
        </div>
      </div>
      <Modal 
        show={showModal} 
        score={scoreRef.current} 
        maxFlags={count} 
        game={gameMode}
      />
    </>
  );
}

export default CountriesGame;
