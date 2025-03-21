import { Link } from "react-router-dom";
import React from "react";

const NormalModePopup = ({ openGamePopup }) => {
  return (
    <div className="main-container">
      <div className="blur-background"></div>
      <div className="game-mode-popup-normal" aria-label="Select the number of countries">
        <h2 tabIndex={0} aria-label="Select the number of countries">Select the number of countries</h2>
        <br />
        <div className="Tipo-modo">
          {[10, 20, 50, 75, 135].map((count) => (
            <Link 
              key={count} 
              to={`/countriesGame?count=${count}&mode=normal`} 
              className="link-button-normal" 
              aria-label={`${count} countries`}
            >
              <button id="modo-normal" tabIndex={-1}>{count}</button>
            </Link>
          ))}
        </div>
        <button className="game-mode-back-button" onClick={openGamePopup} aria-label="Back">
          Back
        </button>
      </div>
    </div>
  );
};

export default NormalModePopup;