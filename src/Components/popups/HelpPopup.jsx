import React, { useRef } from 'react';

const HelpPopup = ({toggleHelp }) => {
  const helpPopupFirstElementRef = useRef(null);

  return (
    <div className='main-container'>
    <div className="blur-background"></div>
      <div className="help-popup" aria-label="Help">
        <h2 tabIndex="1" ref={helpPopupFirstElementRef} role="heading" aria-level="2" aria-label="About the screen symbols">About the screen symbols:</h2>
        <div className="simbolos">
          <div className='home'>
            <img src="../images/homeIcon.png" aria-label="Home Icon" />
            <p tabIndex="1" aria-label="Clicking on this symbol returns you to the home screen.">Clicking on this symbol returns you to the home screen.</p>
          </div>
          <div className='cartoguessr'>
            <h1>CARTOGUESSR</h1>
            <p tabIndex="1" aria-label="Clicking on this symbol returns you to the home screen.">Clicking on this symbol returns you to the home screen.</p>
          </div>
          <div className='usuario'>
            <img src="images/userIcon.png" aria-label="User Icon" />
            <p tabIndex="1" aria-label="Clicking on this symbol displays the user registration and login.">Clicking on this symbol displays the user registration and login.</p>
          </div>
        </div>
        <h2 tabIndex="1" role="heading" aria-level="2" aria-label="About the game types">About the game types:</h2>
        <div className="juego">
          <img src="../images/countriesGame.jpg" aria-label="Countries game image" />
          <div>
            <h2 tabIndex="1" role="heading" aria-level="2" aria-label="Countries Game">Countries Game</h2>
            <p tabIndex="1" aria-label="In this exciting game, you'll immerse yourself in a fascinating world map.">In this exciting game, you'll immerse yourself in a fascinating world map.</p>
            <p tabIndex="1" aria-label="Each round, you'll be shown the name of a country and you'll have to locate it on the map by clicking on its location.">Each round, you'll be shown the name of a country and you'll have to locate it on the map by clicking on its location.</p>
            <p tabIndex="1" aria-label="For each correct country, you'll earn 1 point, and if you miss, your score remains the same.">For each correct country, you'll earn 1 point, and if you miss, your score remains the same.</p>
            <p tabIndex="1" aria-label="Below we explain the different game modes and options for this game.">Below we explain the different game modes and options for this game.</p>
            <p tabIndex="1" aria-label="Demonstrate your mastery of world geography and achieve the highest score in this challenging country game!">Demonstrate your mastery of world geography and achieve the highest score in this challenging country game!</p>
          </div>
        </div>
        <div className="juego" >
          <img src="images/flagsGame.jpg" aria-label="Flags game image" />
          <div>
            <h2 tabIndex="1" role="heading" aria-level="2" aria-label="Flags Game">Flags Game</h2>
            <p tabIndex="1" aria-label="With this game, you'll test your knowledge of national flags from different countries.">With this game, you'll test your knowledge of national flags from different countries.</p>
            <p tabIndex="1" aria-label="Each round, you'll be shown a flag and four random countries. Your task is to identify the country that corresponds to that flag.">Each round, you'll be shown a flag and four random countries. Your task is to identify the country that corresponds to that flag.</p>
            <p tabIndex="1" aria-label="Each correct choice will earn you 1 point and if you miss, your score remains the same.">Each correct choice will earn you 1 point and if you miss, your score remains the same.</p>
            <p tabIndex="1" aria-label="Demonstrate your skill and knowledge of world flags and achieve the highest score in this exciting challenge!">Demonstrate your skill and knowledge of world flags and achieve the highest score in this exciting challenge!</p>
          </div>
        </div>
        <div className="juego">
          <img src="images/capitalsGame.jpg" aria-label="Capitals game image" />
          <div>
            <h2 tabIndex="1" role="heading" aria-level="2" aria-label="Capitals Game">Capitals Game</h2>
            <p tabIndex="1" aria-label="Welcome to the fun challenge of world capitals!">Welcome to the fun challenge of world capitals!</p>
            <p tabIndex="1" aria-label="In each round of this game, you'll be presented with the name of a country and the names of 4 cities. Your goal is to identify the capital of that country.">In each round of this game, you'll be presented with the name of a country and the names of 4 cities. Your goal is to identify the capital of that country.</p>
            <p tabIndex="1" aria-label="For each correct capital, you'll earn 1 point, and if you select an incorrect capital, your score remains the same.">For each correct capital, you'll earn 1 point, and if you select an incorrect capital, your score remains the same.</p>
            <p tabIndex="1" aria-label="Become a master of capitals and get the highest score possible!">Become a master of capitals and get the highest score possible!</p>
          </div>
        </div>
        <h2 tabIndex="1" role="heading" aria-level="2" aria-label="About the game modes">About the game modes:</h2>
        <div className="modos">
          <p tabIndex="1" aria-label="Our main game, the countries game, has 2 game modes:">Our main game, the countries game, has 2 game modes:</p>
          <ul>
            <li tabIndex="1" aria-label="By selecting this mode, you can play without any time restrictions. It's ideal for those who prefer a more relaxed pace, enjoying and memorizing each country on the globe.">
              <b>Normal:</b> By selecting this mode, you can play without any time restrictions. It's ideal for those who prefer a more relaxed pace, enjoying and memorizing each country on the globe.
              <img src="images/normalModeHelp.png" aria-label="Normal mode image" />
            </li>
            <p tabIndex="1" aria-label="Country options: You can also choose how many countries you want to include in your game. The options are: 10, 40, 75, or 135 countries.">Country options: You can also choose how many countries you want to include in your game. The options are: 10, 40, 75, or 135 countries.</p>
            <p tabIndex="1" aria-label="The more you choose, the more chances you'll have to reach the maximum score!">The more you choose, the more chances you'll have to reach the maximum score!</p>
            <img src="images/numberCountriesOptions.png" aria-label="Image of country number options" id="opciones"/>
            <li tabIndex="1" aria-label="Time trial: get ready to play under pressure if you select this mode. You'll have a time limit to respond, which makes it a true test of speed and knowledge. Recommended if you like real challenges.">
              <b>Time Trial:</b> get ready to play under pressure if you select this mode.
              <p tabIndex="1" aria-label="You'll have a time limit to respond, which makes it a true test of speed and knowledge. Recommended if you like real challenges.">You'll have a time limit to respond, which makes it a true test of speed and knowledge. Recommended if you like real challenges.</p>
              <img src="images/cronoModeHelp.png" aria-label="Time trial mode image" />
            </li>
          </ul>
          <p tabIndex="1" aria-label="Additionally, it has the following option from which you can access the real map where you can see the locations of all countries and cities in the world:">Additionally, it has the following option from which you can access the real map where you can see the locations of all countries and cities in the world:</p>
          <ul>
            <li tabIndex="1" aria-label="Solution: This option takes you to the complete world map, ideal for studying and improving your geographical knowledge before playing.">
              <b>Solution:</b> This option takes you to the complete world map, ideal for studying and improving your geographical knowledge before playing.
            </li>
            <img src="images/solutionHelp.png" aria-label="Solution button image" id="solucion"/>
          </ul>
        </div>
        <button onClick={toggleHelp} aria-label="Close help" tabIndex="1">Close</button>
      </div>
      </div>
  );
};

export default HelpPopup;