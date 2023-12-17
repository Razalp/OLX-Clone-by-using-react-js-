import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FireBaseContext } from './store/FireBaseContext';
import fireBaseConfig from './store/fireBaseConfig';

// import firebase from './firebase/config'
ReactDOM.render(
    <FireBaseContext.Provider value={{fireBaseConfig}}>
<App />
</FireBaseContext.Provider>
 ,document.getElementById('root'));
