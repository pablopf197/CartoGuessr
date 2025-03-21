import React from 'react';
import { FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';

const RegisterFormPopup = ({
  email,
  setEmail,
  usernameRegister,
  setUsernameRegister,
  passwordRegister,
  setPasswordRegister,
  showPassword,
  togglePasswordVisibility,
  error,
  handleRegister,
  openLoginFormPopup,
  closeRegisterPopup
}) => {
  return (
    <div className="main-container">
        <div className="blur-background"></div>
        <div className="login-form-popup" aria-label="Registration form">
        <h2>Join CartoGuessr today</h2>
        <form onSubmit={handleRegister}>
            <label className='label-usuario'>
            Email:
            <input 
                type="email" 
                className='usuario-input' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                aria-label="Email" 
            />
            </label>
            <label className='label-usuario'>
            Username:
            <input 
                type="text" 
                className='usuario-input' 
                value={usernameRegister} 
                onChange={(e) => setUsernameRegister(e.target.value)} 
                aria-label="Username" 
            />
            </label>
            <label className='label-password'>
            Password:
            <input 
                type={showPassword ? 'text' : 'password'} 
                className='password-input' 
                value={passwordRegister} 
                onChange={(e) => setPasswordRegister(e.target.value)} 
                aria-label="Password" 
            />
            {showPassword ? (
                <FaEyeSlash 
                className="password-toggle-icon" 
                onClick={togglePasswordVisibility} 
                aria-label="Hide Password" 
                />
            ) : (
                <FaEye 
                className="password-toggle-icon" 
                onClick={togglePasswordVisibility} 
                aria-label="Show Password" 
                />
            )}
            </label>
            {error && (
            <div className="error-message" id="error-registro">
                <FaExclamationCircle style={{ marginRight: '5px', color: '#d9534f' }} />
                {error}
            </div>
            )}
            <button type="submit" aria-label="Register">Register</button>
        </form>
        <div className='login-form-registrarse'>
            <p>Already have an account?</p> 
            <p 
            className="subrayado-registrate" 
            onClick={openLoginFormPopup} 
            aria-label="Log In"
            >
            Log In
            </p>
        </div>
        <button 
            className="login-close-button" 
            onClick={closeRegisterPopup} 
            aria-label="Close registration"
        >
            Close
        </button>
        </div>
    </div>
  );
};

export default RegisterFormPopup;