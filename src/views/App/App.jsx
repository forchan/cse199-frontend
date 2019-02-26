import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../components/Header/Header.jsx'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import appRoutes from '../../routes/appRoutes.jsx';


class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={appRoutes} />
        <div className="main-panel" ref="mainPanel">
          <Header {...this.props} routes={appRoutes} />
          <Switch>
            {appRoutes.map((prop, key) => {
              if (prop.redirect) {
                return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
              }
              return (
                <Route path={prop.path} component={prop.component} key={key} />
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
