import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Components/Login/Login';

function App() {
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
