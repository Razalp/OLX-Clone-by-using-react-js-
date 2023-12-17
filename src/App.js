import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Components/Login/Login';
import { AuthContext, FireBaseContext } from './store/Context';
import fireBaseConfig from './store/fireBaseConfig';

function App() {
  const {user,setUser}=useContext(AuthContext)
  const {fireBaseConfig} = useContext(FireBaseContext)
  useEffect(() => {
    fireBaseConfig.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  
  return (
    <div className='App'>
      {/* <Routes>
        <Route path='/' element={<Home/>} /> 
        <Route path='/signUp' element={<Signup/>}/>
        </Routes> */}
      <Router>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signUp" exact>
          <Signup />
        </Route>
        <Route path="/Login" exact>
          <Login />
        </Route>
      </Router>
    </div>
  );
}

export default App;
