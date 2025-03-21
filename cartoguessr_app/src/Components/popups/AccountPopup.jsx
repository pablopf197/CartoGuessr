import React from 'react';

const AccountPopup = ({
  toggleAccountPopup, 
  openRegisterFormPopup, 
  openLoginFormPopup 
}) => {
  return (
    <div className="account-popup" aria-label="Account">
        <p>Join today</p>
        <button className="principal" onClick={openRegisterFormPopup} aria-label="Register">Register</button>
        <p>Already have an account?</p>
        <button className="principal" onClick={openLoginFormPopup} aria-label="Log In">Log In</button>
        <button className="close-bottom-left-button" onClick={toggleAccountPopup} aria-label="Close">Close</button>
    </div>
  );
};

export default AccountPopup;