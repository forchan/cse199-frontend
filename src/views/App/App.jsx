import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../components/Header/Header.jsx'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import appRoutes from '../../routes/appRoutes.js';


class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={appRoutes} />
        <div className="main-panel" ref="mainPanel">
          <Header {...this.props} routes={appRoutes} />
          <Switch>
            {appRoutes.map((route, key) => {
              if (route.redirect) {
                return <Redirect from={route.path} to={route.to} key={key} />;
              }
              return (
                <Route path={route.path} component={route.component} key={key} />
              );
            })}
          </Switch>
          <footer className={"footer"}></footer>
        </div>
      </div>
    );
  }
}

export default App;
