import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import indexRoutes from './routes/indexRoutes.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/paper-dashboard.css'
import './styles/css/demo.css'
// import './styles/css/App.css';
// import './assets/css/index.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <HashRouter>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route to={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
