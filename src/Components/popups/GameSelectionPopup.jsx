import { Link } from "react-router-dom";

const GameSelectionPopup = ({ setShowGamePopup, openGameModePopup, countriesButtonRef }) => {
  return (
    <div className="main-container">
      <div className="blur-background"></div>
      <div className="game-popup" aria-label="Selecciona un juego">
        <h2>Select a game</h2>
        <div className="map-grid">
          <button ref={countriesButtonRef} className="map" onClick={openGameModePopup} aria-label="Countries">
            <img src="/images/countriesGame.jpg" alt="Countries Game" />
            <div className="description">Countries</div>
          </button>
          <Link to="/flagsGame" className="map" aria-label="Flags Game">
            <div className="map">
              <img src="/images/flagsGame.jpg" alt="Flags Game" />
              <div className="description">Flags</div>
            </div>
          </Link>
          <Link to="/capitalsGame" className="map" aria-label="Capitals">
            <div className="map">
              <img src="/images/capitalsGame.jpg" alt="Capitals Game" />
              <div className="description">Capitals</div>
            </div>
          </Link>
        </div>
        <button className="game-close-button" onClick={() => setShowGamePopup(false)} aria-label="Close">
          Close
        </button>
      </div>
    </div>
  );
};

export default GameSelectionPopup;