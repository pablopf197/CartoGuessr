import React, { useEffect, useState, useRef } from 'react';
import RankingPopup from './popups/RankingPopup.jsx';
import 'flag-icon-css/css/flag-icons.css';
import '../styles/navbar.css';
import { MdHelp } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import GameSelectionPopup from './popups/GameSelectionPopup.jsx';
import NormalModePopup from './popups/NormalModePopup.jsx';
import AccountPopup from './popups/AccountPopup.jsx';
import LoggedUserPopup from './popups/LoggedUserPopup.jsx';
import GameModePopup from './popups/GameModePopup.jsx';
import RegisterFormPopup from './popups/RegisterFormPopup.jsx';
import LoginFormPopup from './popups/LoginFormPopup.jsx';
import HelpPopup from './popups/HelpPopup.jsx';
import useAccessibility from '../Components/Accessibility.jsx';
import { useAuth } from '../AuthContext.jsx';
import RecoverPasswordFirstPopup from './popups/RecoverPasswordFirstPopup.jsx';
import PasswordRecoveryMessagePopup from './popups/PasswordRecoveryMessagePopup.jsx';

function Navbar() {
  const [popups, setPopups] = useState({
    help: false,
    account: false,
    login: false,
    register: false,
    loginConf: false,
    registerConf: false,
    loggedUser: false,
    game: false,
    gameMode: false,
    normalMode: false,
    ranking: false,
    recoverPasswordFirst: false,
    recoverPasswordMessage: false
  });
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    usernameRegister: '',
    passwordRegister: '',
    showPassword: false,
    error: '',
    successMessage: false
  });

  const [highlightToggleAccount, setHighlightToggleAccount] = useState(false);
  const [selectedCount, setSelectedCount] = useState(10);
  
  const { user, login, logout, register } = useAuth();
  
  useAccessibility();
  
  const countriesButtonRef = useRef(null);
  const helpPopupFirstElementRef = useRef(null);

  // Function to update a unique value of popups
  const updatePopup = (popupName, value) => {
    setPopups(prev => ({ ...prev, [popupName]: value }));
  };

  // Function to close all the popups
  const closeAllPopups = () => {
    const closedPopups = Object.keys(popups).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    setPopups(closedPopups);
  };

  // Function to update a field of the form
  const updateFormField = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  // Function to clear all the fields of the form
  const clearFormFields = () => {
    setFormData(prev => ({
      ...prev,
      username: '',
      password: '',
      email: '',
      usernameRegister: '',
      passwordRegister: '',
      error: ''
    }));
  };
  const openPopup = (popupName) => {
    closeAllPopups();
    updatePopup(popupName, true);
    
    if (['login', 'register'].includes(popupName)) {
      setHighlightToggleAccount(true);
    } else {
      setHighlightToggleAccount(false);
    }
    
    clearFormFields();
  };

  const toggleHelp = () => {
    if (popups.help) {
      updatePopup('help', false);
    } else {
      openPopup('help');
    }
  };

  const toggleAccountPopup = () => {
    setHighlightToggleAccount(!highlightToggleAccount);
    
    if (user) {
      updatePopup('loggedUser', !popups.loggedUser);
    } else {
      updatePopup('account', !popups.account);
    }
    
    Object.keys(popups).forEach(key => {
      if (key !== 'account' && key !== 'loggedUser') {
        updatePopup(key, false);
      }
    });
  };

  const handleLogOut = () => {
    logout();
    updatePopup('loggedUser', false);
    setHighlightToggleAccount(false);
    updateFormField('username', '');
    updateFormField('password', '');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    updateFormField('error', '');
    setFormData(formData.successMessage = false);
    if (login(formData.username, formData.password)) {
      updatePopup('login', false);
      setHighlightToggleAccount(true);
      updatePopup('loggedUser', true);
    } else {
      updateFormField('error', 'Invalid credentials. Please try again.');
      updateFormField('username', '');
      updateFormField('password', '');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    updateFormField('error', '');
    
    const { email, usernameRegister, passwordRegister } = formData;
    
    if (email.trim() === '' || usernameRegister.trim() === '' || passwordRegister.trim() === '') {
      updateFormField('error', 'Please fill in all fields.');
    } else {
      if (register(usernameRegister, passwordRegister, email) === false) {
        updateFormField('usernameRegister', '');
        updateFormField('passwordRegister', '');
        updateFormField('email', '');
        updateFormField('error', 'The username is already taken. Please choose another one.');
      } else {
        updateFormField('usernameRegister', '');
        updateFormField('passwordRegister', '');
        updateFormField('email', '');
        updatePopup('register', false);
        updatePopup('login', true);
        updateFormField('successMessage', true);
      }
    }
  };

  const togglePasswordVisibility = () => {
    updateFormField('showPassword', !formData.showPassword);
  };

  const handleSelectChange = (event) => {
    setSelectedCount(parseInt(event.target.value));
  };

  useEffect(() => {
    if (popups.game && countriesButtonRef.current) {
      countriesButtonRef.current.focus();
    }
  }, [popups.game]);

  useEffect(() => {
    if (popups.help && helpPopupFirstElementRef.current) {
      helpPopupFirstElementRef.current.focus();
    }
  }, [popups.help]);

  return (
    <div className="navbar">
      <Link to="/principal" className="icono" aria-label="Home">
        <FaHome />
      </Link>

      <button 
        onClick={() => openPopup('ranking')} 
        className="tablas-button" 
        aria-label="Ranking"
      >
        Ranking
      </button>

      <h2 className="title">
        <Link to="/principal" className="icono" aria-label="Cartoguessr">
          CARTOGUESSR
        </Link>
      </h2>

      <button 
        onClick={() => openPopup('game')} 
        className="modos-button" 
        aria-label="Play"
      >
        Play
      </button>

      {popups.game && (
        <GameSelectionPopup 
          setShowGamePopup={(value) => updatePopup('game', value)} 
          openGameModePopup={() => openPopup('gameMode')} 
          countriesButtonRef={countriesButtonRef}
        />
      )}

      {popups.ranking && (
        <RankingPopup
          onClose={() => updatePopup('ranking', false)}
        />
      )}

      {popups.gameMode && (
        <GameModePopup 
          openGamePopup={() => openPopup('game')} 
          openNormalModePopup={() => openPopup('normalMode')} 
          selectedCount={selectedCount}
        />
      )}
      
      {popups.normalMode && (
        <NormalModePopup openGamePopup={() => openPopup('game')} />
      )}

      <div className="right-buttons">
        <button 
          onClick={toggleAccountPopup} 
          className={`icono ${popups.account || highlightToggleAccount ? 'activo' : ''}`} 
          aria-label="User Account"
        >
          <MdAccountCircle />
        </button>

        <button 
          onClick={toggleHelp} 
          className={`icono ${popups.help ? 'activo' : ''}`} 
          aria-label="Help"
        >
          <MdHelp />
        </button>

        {popups.help && (
          <HelpPopup 
            toggleHelp={toggleHelp} 
          />
        )}

        {popups.account && (
          <AccountPopup  
            toggleAccountPopup={toggleAccountPopup}
            openRegisterFormPopup={() => openPopup('register')}
            openLoginFormPopup={() => openPopup('login')}
          />
        )}

        {popups.loggedUser && (
          <LoggedUserPopup 
            user={user}
            handleLogOut={handleLogOut}
            toggleAccountPopup={toggleAccountPopup}
          />
        )}

        {popups.register && 
          <RegisterFormPopup 
            email={formData.email}
            setEmail={(value) => updateFormField('email', value)}
            usernameRegister={formData.usernameRegister}
            setUsernameRegister={(value) => updateFormField('usernameRegister', value)}
            passwordRegister={formData.passwordRegister}
            setPasswordRegister={(value) => updateFormField('passwordRegister', value)}
            showPassword={formData.showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            error={formData.error}
            handleRegister={handleRegister}
            openLoginFormPopup={() => openPopup('login')}
            closeRegisterPopup={() => {
              updatePopup('register', false);
              setHighlightToggleAccount(false);
            }}
          />
        }

        {popups.login && 
          <LoginFormPopup 
            showSuccessMessage={formData.successMessage}
            username={formData.username}
            setUsername={(value) => updateFormField('username', value)}
            password={formData.password}
            setPassword={(value) => updateFormField('password', value)}
            showPassword={formData.showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            error={formData.error}
            handleLogin={handleLogin}
            openPasswordRecoveryFirst={() => openPopup('recoverPasswordFirst')}
            openRegisterFormPopup={() => {
              openPopup('register')
              setFormData(formData.successMessage = false)
            }
            }
            closeLoginPopup={() => {
              updatePopup('login', false);
              setFormData(formData.successMessage = false);
              setHighlightToggleAccount(false);
            }}
          />
        }

        {popups.recoverPasswordFirst && 
          <RecoverPasswordFirstPopup
            openPasswordRecoveryMessage={() => openPopup('recoverPasswordMessage')}
          />
        }

        {popups.recoverPasswordMessage && 
          <PasswordRecoveryMessagePopup
            onClose={() => {
              updatePopup('recoverPasswordMessage', false);
              setHighlightToggleAccount(false);
            }} 
          />
        }
      </div>
    </div>
  );
}

export default Navbar;
