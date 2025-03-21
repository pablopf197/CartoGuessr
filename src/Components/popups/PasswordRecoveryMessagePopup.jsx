const PasswordRecoveryMessagePopup = ({ onClose }) => {
  
    return (
      <div className="main-container">
        <div className="blur-background"></div>
        <div className="recover-password-popup" aria-label="Password Recovery Message">
          <p>An email has been sent with instructions to recover your password.</p>
          <button onClick={onClose} aria-label="Close">Close</button>
        </div>
      </div>
    );
  };
  
  export default PasswordRecoveryMessagePopup;