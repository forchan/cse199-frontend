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
        </div>
      </div>
    );
  }
}

export default App;
