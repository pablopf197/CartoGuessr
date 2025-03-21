import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar.jsx';
import 'flag-icon-css/css/flag-icons.css';
import CountryList from '../Components/CountryList.jsx';
import Score from '../Components/Score.jsx';
import Modal from '../Components/Modal.jsx';
import '../styles/flagsGame.css';

function FlagsGame() {
    const [countries, setCountries] = useState([]);
    const [countriesSelected, setCountriesSelected] = useState([]);
    const [country, setCountry] = useState([]);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [flagsShown, setFlagsShown] = useState(1);
    const [enabledButtons, setEnabledButtons] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const MAX_FLAGS = 20;

    useEffect(() => {
        setCountries(CountryList({ count: 136, mainOnly: true, spanishOnly: false }));
    }, []);

    const generateRandomNations = () => {
        let randomNations = new Set();
        while (randomNations.size < 4) {
            let randomIndex = Math.floor(Math.random() * countries.length);
            randomNations.add(countries[randomIndex]);
        }
        randomNations = Array.from(randomNations);
        setCountriesSelected(randomNations);
        const index = Math.floor(Math.random() * 4);
        setCountry(randomNations[index]);
    }

    const checkAnswer = (selectedCountry, index) => {
        if (!enabledButtons) return;
        setEnabledButtons(false);
        let correctIndex;
        if (selectedCountry.name === country.name) {
            setScore(prevScore => ({
                ...prevScore,
                correct: prevScore.correct + 1
            }));
            document.getElementById(`btn-${index}`).classList.add('green');
            const audio = new Audio('/audio/correct.wav');
            audio.play();
            setTimeout(() => {
                document.getElementById(`btn-${index}`).classList.remove('green');
                nextFlag();
            }, 1000);
        } else {
            setScore(prevScore => ({
                ...prevScore,
                incorrect: prevScore.incorrect + 1
            }));
            correctIndex = countriesSelected.findIndex(c => c.name === country.name);
            document.getElementById(`btn-${correctIndex}`).classList.add('green');
            document.getElementById(`btn-${index}`).classList.add('red');
            const audio = new Audio('/audio/error.wav');
            audio.play();
            setTimeout(() => {
                document.getElementById(`btn-${index}`).classList.remove('red');
                document.getElementById(`btn-${correctIndex}`).classList.remove('green');
                nextFlag();
            }, 1000);
        }
    }

    const nextFlag = () => {
        setFlagsShown(prevFlagsShown => prevFlagsShown + 1);
        if (flagsShown < MAX_FLAGS) {
            setEnabledButtons(true);
            generateRandomNations();
        } else {
            setShowModal(true);
        }
    }

    useEffect(() => {
        if (countries.length > 0) {
            generateRandomNations();
        }
    }, [countries]);

    return (
        <>
            <Navbar />
            <div className='container'>
                <Score correct={score.correct} maxFlags={MAX_FLAGS} className="puntuacion"/>
                <div className="banderagame-popup">
                    <h2>Guess the Flag</h2>
                    {country && (
                        <span className={`flag-icon flag-icon-${country.alpha2?.toLowerCase()}`}></span>
                    )}
                    <div className='botones'>
                        <div className='botones-row'>
                            {countriesSelected.slice(0, 2).map((c, index) => (
                                <button key={index} id={`btn-${index}`} className={`btn-Pais`} onClick={() => checkAnswer(c, index)} aria-label={`Country ${index + 1}: ${c.name}`}>{c.name}</button>
                            ))}
                        </div>
                        <div className='botones-row'>
                            {countriesSelected.slice(2, 4).map((c, index) => (
                                <button key={index + 2} id={`btn-${index + 2}`} className={`btn-Pais`} onClick={() => checkAnswer(c, index + 2)} aria-label={`Country ${index + 3}: ${c.name}`}>{c.name}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal 
                show={showModal} 
                score={score.correct} 
                maxFlags={MAX_FLAGS} 
                game='flags'
            />
        </>
    );
}

export default FlagsGame;
