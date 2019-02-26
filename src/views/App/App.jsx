import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import logo from '../../styles/img/logo.svg';
import '../../styles/css/App.css';

import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import appRoutes from '../../routes/appRoutes.jsx';


class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={appRoutes}/>
      </div>
    );
  }
}

export default App;
