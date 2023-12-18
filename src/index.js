import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FireBaseContext } from './store/Context';
import fireBaseConfig from './store/fireBaseConfig';
import Context from './store/Context';
import { postContext } from './store/postContext';
ReactDOM.render(
    <postContext>
    <FireBaseContext.Provider value={{fireBaseConfig}}>
<Context>
      <App />
     
    </Context>
</FireBaseContext.Provider>
</postContext>
 ,document.getElementById('root'));
