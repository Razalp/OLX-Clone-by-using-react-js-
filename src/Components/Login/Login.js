import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import fireBaseConfig from '../../store/fireBaseConfig'; // Replace with your Firebase configuration
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await fireBaseConfig.auth().signInWithEmailAndPassword(email, password);
      history.push('/'); 
    } catch (error) {
      console.error('Error logging in:', error.message);
   
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <a href="/Signup">Signup</a>
      </div>
    </div>
  );
}

export default Login;
