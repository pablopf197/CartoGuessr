import React from 'react';

const LoggedUserPopup = ({ 
  user,
  handleLogOut,
  toggleAccountPopup 
}) => {
  return (
    <div className='main-container'>
        <div className="blur-background"></div>
        <div className="account-popup" aria-label="Logged in user">
        <div className="user-info">
            <p><strong>Username:</strong> </p><span>{user.username}</span>
            <p><strong>Email:</strong> </p><span>{user.email}</span>
        </div>
        <br/>
        <button className="principal-sesionIniciada" onClick={handleLogOut} aria-label="Log Out">Log Out</button>
        <button className="close-bottom-left-button" onClick={toggleAccountPopup} aria-label="Close">Close</button>
        </div>
    </div>
  );
};

export default LoggedUserPopup;