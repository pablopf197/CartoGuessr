import React from 'react';

const RecoverPasswordFirstPopup = ({openPasswordRecoveryMessage }) => {
  
    const handlePasswordRecovery = (event) => {
      event.preventDefault();
      const emailInput = event.target.elements.email.value;
      if (!emailInput) {
        alert('Please enter your email address.');
      } else {
        openPasswordRecoveryMessage();
      }
    };
  
    return (
        <div className="main-container">
        <div className="blur-background"></div>
        <div className="recover-passwordFirst-popup" aria-label="Recover Password">
            <h2>Recover Password</h2>
            <form onSubmit={handlePasswordRecovery}>
            <label className="label-email">
                Your email:
                <input type="email" className="user-input" aria-label="Email" name="email" required />
            </label>
            <button type="submit" aria-label="Recover">Recover</button>
            </form>
        </div>
        </div>
    );
  };
  
  export default RecoverPasswordFirstPopup;