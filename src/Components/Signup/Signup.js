import React, { useState, useContext } from 'react';
import { FireBaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Signup.css';
import fireBaseConfig from '../../store/fireBaseConfig';
import { useHistory } from 'react-router-dom';

export default function Signup() {
  const history = useHistory();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { fireBaseConfig } = useContext(FireBaseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim input values
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedPassword = password.trim();

    // Basic validation
    if (!trimmedUsername || !trimmedEmail || !trimmedPhone || !trimmedPassword) {
      handleError('All fields are required');
      return;
    }

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      handleError('Invalid email address');
      return;
    }

    // Phone validation: Check if it's a valid number
    if (isNaN(trimmedPhone) || trimmedPhone.length !== 10) {
      handleError('Invalid phone number');
      return;
    }

    // Password validation: Check if it's strong enough
    if (trimmedPassword.length < 6) {
      handleError('Password should be at least 6 characters long');
      return;
    }

    try {
      const result = await fireBaseConfig
        .auth()
        .createUserWithEmailAndPassword(trimmedEmail, trimmedPassword);

      await result.user.updateProfile({
        displayName: trimmedUsername,
      });

      const userId = result.user.uid;
      await fireBaseConfig.firestore().collection('users').add({
        id: userId,
        username: trimmedUsername,
        phone: trimmedPhone,
      });

      history.push('/Login');
    } catch (error) {
      handleError(`Error creating user: ${error.message}`);
    }
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    window.alert(errorMessage);
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value.trim())}
            name="username"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value.trim())}
            id="phone"
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            name="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        {/* No need to render error message here */}
        <a>Login</a>
      </div>
    </div>
  );
}
