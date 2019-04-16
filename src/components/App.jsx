import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import Header from './Header/Header.jsx'
import Sidebar from './Sidebar/Sidebar.jsx'
import appRoutes from '../routes/appRoutes.js';

const propTypes = {
  courseId: PropTypes.string.isRequired,
  courseSemester: PropTypes.string.isRequired,
  courseYear: PropTypes.string.isRequired,
  loadGeneralContent: PropTypes.func.isRequired,
  loadScheduleContent: PropTypes.func.isRequired
};

class App extends Component {
  componentDidMount = async () => {
    const { courseId, loadGeneralContent, loadScheduleContent } = this.props;
    loadGeneralContent(courseId);
    loadScheduleContent(courseId);
  };

  render() {
    const { courseSemester, courseYear} = this.props;

    return (
      <div className="wrapper">
        <NotificationContainer />
        <Sidebar {...this.props} routes={appRoutes} />
        <div className="main-panel" ref="mainPanel">
          <Header
            {...this.props}
            routes={appRoutes}
            currentSemester={courseSemester}
            currentYear={courseYear}
          />
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
};

App.propTypes = propTypes;

export default App;
