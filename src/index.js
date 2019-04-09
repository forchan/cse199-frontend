import React from 'react';
import ReactDOM from 'react-dom';

// CSS - all the css in styles directory could probably be combined to one file
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import './styles/css/paper-dashboard.css'
import './styles/css/demo.css'

// Router
import { HashRouter, Route, Switch } from 'react-router-dom';
import indexRoutes from './routes/indexRoutes.js';

// Redux Store
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore.js';

// Service Worker - not sure what it does, included in create-react-app
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={configureStore()}>
    <HashRouter>
      <Switch>
        {indexRoutes.map((route, key) => {
          return <Route to={route.path} component={route.component} key={key} />
        })}
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
