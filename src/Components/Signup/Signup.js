import React, { useState, useContext } from 'react';
import {FireBaseContext} from '../../store/Context';
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
  const { fireBaseConfig } = useContext(FireBaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    fireBaseConfig
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // Update user profile
        return result.user.updateProfile({
          displayName: username,
        });
      })
      .then(() => {
        // Add user to Firestore collection
        const userId = fireBaseConfig.auth().currentUser.uid; // Use currentUser to get the user object
        return fireBaseConfig.firestore().collection('users').add({
          id: userId,
          username: username,
          phone: phone,
        });
      })
      .then(() => {

        history.push('/Login');
      })
      .catch((error) => {
        console.error('Error creating user:', error.message);
      });
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
            onChange={(e) => setUserName(e.target.value)}
            name="username"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
