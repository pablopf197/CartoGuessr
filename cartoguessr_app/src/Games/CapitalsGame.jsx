import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../Components/Navbar.jsx';
import 'flag-icon-css/css/flag-icons.css';
import '../styles/capitalsGame.css';
import Score from '../Components/Score.jsx';
import Modal from '../Components/Modal.jsx';
import CountryList from '../Components/CountryList.jsx';

function CapitalsGame() {
    const [countries, setCountries] = useState([]);
    const [countriesSelected, setCountriesSelected] = useState([]);
    const [capital, setCapital] = useState(null);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [capitalsShown, setCapitalsShown] = useState(1);
    const [enabledButtons, setEnabledButtons] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const nameRef = useRef(null);
    const MAX_CAPITALS = 10;

    useEffect(() => {
        setCountries(CountryList({ count: 136, mainOnly: true }));
    }, []);

    const generateRandomCapitals = () => {
        let randomCapitals = new Set();
        while (randomCapitals.size < 4) {
            let randomIndex = Math.floor(Math.random() * countries.length);
            randomCapitals.add(countries[randomIndex]);
        }
        randomCapitals = Array.from(randomCapitals);
        setCountriesSelected(randomCapitals);
        const index = Math.floor(Math.random() * 4);
        setCapital(randomCapitals[index]);
    }

    const checkAnswer = (selectedCapital, index) => {
        if (!enabledButtons) return;
        setEnabledButtons(false);
        let correctIndex;
        if (selectedCapital.capital === capital.capital) {
            setScore(prevScore => ({
                ...prevScore,
                correct: prevScore.correct + 1
            }));
            document.getElementById(`btn-${index}`).classList.add('green');
            const audio = new Audio('/audio/correct.wav');
            audio.play();
            setTimeout(() => {
                document.getElementById(`btn-${index}`).classList.remove('green');
                nextCapital();
            }, 1000);
        } else {
            setScore(prevScore => ({
                ...prevScore,
                incorrect: prevScore.incorrect + 1
            }));
            correctIndex = countriesSelected.findIndex(c => c.capital === capital.capital);
            document.getElementById(`btn-${correctIndex}`).classList.add('green');
            document.getElementById(`btn-${index}`).classList.add('red');
            const audio = new Audio('/audio/error.wav');
            audio.play();
            setTimeout(() => {
                document.getElementById(`btn-${index}`).classList.remove('red');
                document.getElementById(`btn-${correctIndex}`).classList.remove('green');
                nextCapital();
            }, 1000);
        }
    }

    const nextCapital = () => {
        setCapitalsShown(prevCapitalsShown => prevCapitalsShown + 1);
        if (capitalsShown < MAX_CAPITALS) {
            setEnabledButtons(true);
            generateRandomCapitals();
        } else {
            setShowModal(true);
        }
    }

    useEffect(() => {
        if (countries.length > 0) {
            generateRandomCapitals();
        }
    }, [countries]);

    useEffect(() => {
        if (capital) {
            nameRef.current.focus();
        }
    }, [capital]);

    return (
        <>
            <Navbar />
            <div className='container'>
                <Score correct={score.correct} maxFlags={MAX_CAPITALS}  className="puntuacion"/>
                <div className="banderagame-popup">
                    <h2>Guess the Capital</h2>
                    <div className="pais-capital">
                        <label>
                            {capital && <h1 tabIndex="0" aria-label={`Country: ${capital.name.toUpperCase()}`} ref={nameRef}>{capital.name.toUpperCase()}</h1>}
                        </label>
                        {capital && (
                            <span className={`flag-icon flag flag-icon-${capital.alpha2.toLowerCase()}`}></span>
                        )}
                    </div>
                    <div className='botones'>
                        <div className='botones-row'>
                            {countriesSelected.slice(0, 2).map((c, index) => (
                                <button key={index} id={`btn-${index}`} className={`btn-Pais`} onClick={() => checkAnswer(c, index)} tabIndex="0" aria-label={`Capital ${index + 1}: ${c.capital}`}>{c.capital}</button>
                            ))}
                        </div>
                        <div className='botones-row'>
                            {countriesSelected.slice(2, 4).map((c, index) => (
                                <button key={index + 2} id={`btn-${index + 2}`} className={`btn-Pais`} onClick={() => checkAnswer(c, index + 2)} tabIndex="0" aria-label={`Capital ${index + 3}: ${c.capital}`}>{c.capital}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal 
                show={showModal} 
                score={score.correct} 
                maxFlags={MAX_CAPITALS} 
                game='capitals'
            />
        </>
    );
}

export default CapitalsGame;
