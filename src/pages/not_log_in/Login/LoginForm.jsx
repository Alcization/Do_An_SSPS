import React from 'react';
import './Login.css';
import InputField from './InputField';
import email from '../../../assets/email.png'
import key from '../../../assets/key.png'

const LoginForm = () => {
  return (
    <form className="loginForm">
      <InputField
        type="email"
        placeholder="Email"
        icon={email}
        alt="Email icon"
      />
      <InputField
        type="password"
        placeholder="Password"
        icon={key}
        alt="Password icon"
        showPasswordToggle
      />
      <button type="submit" className="loginButton">
        Login
      </button>
    </form>
  );
};

export default LoginForm;