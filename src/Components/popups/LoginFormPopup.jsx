import React from 'react';
import { FaEye, FaEyeSlash, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const LoginFormPopup = ({
  showSuccessMessage,
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  togglePasswordVisibility,
  error,
  handleLogin,
  openPasswordRecoveryFirst,
  openRegisterFormPopup,
  closeLoginPopup
}) => {
  return (
    <div className="main-container">
        <div className="blur-background"></div>
        <div className="login-form-popup" aria-label="Login form">
        <h2>Login</h2>
        {showSuccessMessage && (
            <div className="success-message">
            <FaCheckCircle className='success-icon' /> 
            Registration successful. Please login.
            </div>
        )}
        <form onSubmit={handleLogin}>
            <label className='label-usuario'>
            Username:
            <input 
                type="text" 
                className='usuario-input' 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                aria-label="Username" 
            />
            </label>
            <label className='label-password'>
            Password:
            <input 
                type={showPassword ? 'text' : 'password'} 
                className='password-input' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
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
            
            <p 
            className="recuperar-contraseña" 
            onClick={openPasswordRecoveryFirst} 
            aria-label="Forgot your password"
            >
            Forgot your password?
            </p>
            
            {error && (
            <div className="error-message">
                <FaExclamationCircle style={{ marginRight: '5px', color: '#d9534f' }} />
                {error}
            </div>
            )}
            
            <button type="submit" aria-label="Log In">Log In</button>
        </form>
        
        <div className='login-form-registrarse'>
            <p>Don't have an account yet?</p> 
            <div 
            className="subrayado-registrate" 
            onClick={openRegisterFormPopup} 
            aria-label="Register"
            >
            Register
            </div>
        </div>
        
        <button 
            className="login-close-button" 
            onClick={closeLoginPopup} 
            aria-label="Close login"
        >
            Close
        </button>
        </div>
    </div>
  );
};

export default LoginFormPopup;