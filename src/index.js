import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FireBaseContext } from './store/Context';
import fireBaseConfig from './store/fireBaseConfig';
import Context from './store/Context';

ReactDOM.render(
    <FireBaseContext.Provider value={{fireBaseConfig}}>
<Context>
      <App />
     
    </Context>
</FireBaseContext.Provider>
 ,document.getElementById('root'));
