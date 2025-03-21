import { Link } from "react-router-dom";
import React from "react";

const GameModePopup = ({ openGamePopup, openNormalModePopup, selectedCount }) => {
  return (
    <div className="main-container">
      <div className="blur-background"></div>
      <div className="game-mode-popup" aria-label="Select a game mode">
        <h2>Select a game mode</h2>
        <br />
        <div className="Tipo-modo">
          <div className="link-button">
            <button id="modo" tabIndex={-1} onClick={openNormalModePopup}>
              Normal
            </button>
          </div>
          <Link to={`/countriesGame?count=${selectedCount}&mode=crono`} className="link-button" aria-label="Crono">
            <button id="modo" tabIndex={-1}>Crono</button>
          </Link>
          <Link to="/solution" className="link-button" aria-label="Solution">
            <button id="solucion" tabIndex={-1}>Solution</button>
          </Link>
        </div>
        <button className="game-mode-back-button" onClick={openGamePopup} aria-label="Back">
          Back
        </button>
      </div>
    </div>
  );
};

export default GameModePopup;