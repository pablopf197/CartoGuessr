import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';


const Modal = ({ show, score, maxFlags, game }) => {
  const endGameRef = useRef(null);
  const { user, updateUserScores } = useAuth();

  useEffect(() => {
    if (show) {
      endGameRef.current.focus();
    }
  }, [show]);

  if (!show) {
    return null;
  }

  const handleUpdateScore = () => {
    if (user) {
      updateUserScores(user.username, game, score);
    } else {
      console.log('No user is logged in.');
    }
  };
  let scoreMessage = '';
  if (game === 'crono') {
    scoreMessage = `You've guessed ${score} countries correctly.`;
  } else {
    scoreMessage = `You've guessed ${score} out of ${maxFlags} correctly.`;
  }

  return (
    <div className="modal" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
      <div className="modal-content">
        <h2 id="modal-title" ref={endGameRef} tabIndex="0" aria-label="Game Completed!">GAME COMPLETED!</h2>
        {user ? (
          <>
            <h3 id="modal-description">
            <span tabIndex="0" aria-label={`Your score is ${score}${game !== 'crono' ? ` out of ${maxFlags}` : ''}`}>{scoreMessage}</span>
            </h3>
            <p>Your score has been saved successfully.</p>
          </>
        ) : (
          <>
            <h3 id="modal-description">
              <span tabIndex="0" aria-label={`Your score is ${score}${game !== 'crono' ? ` out of ${maxFlags}` : ''}`}>{scoreMessage}</span>
            </h3>
            <p>Log in to save your score and compete with the best in the world.</p>
          </>
        )}
        <Link onClick={handleUpdateScore} to="/principal" className="link-principal" tabIndex="0" aria-label="Return to Main Menu">Return to Main Menu</Link>
      </div>
    </div>
  );
};

export default Modal;
