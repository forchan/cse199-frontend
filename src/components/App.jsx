import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import Header from './Header/Header.jsx'
import Sidebar from './Sidebar/Sidebar.jsx'
import appRoutes from '../routes/appRoutes.js';
import { isNullOrEmpty } from '../utils/StringUtils.js';
import { loadCourseList } from '../utils/ApiHelperUtils.js';
import {
  COURSE_ID,
  COURSE_YEAR,
  COURSE_SEMESTER
} from '../constants/CookieConstants.js';

const propTypes = {
  courseSemester: PropTypes.string.isRequired,
  courseYear: PropTypes.string.isRequired,
  loadAllContent: PropTypes.func.isRequired,
  setCourseDetails: PropTypes.func.isRequired,
  cookies: instanceOf(Cookies).isRequired
};

class App extends Component {
  componentDidMount = async () => {
    const { cookies, loadAllContent, setCourseDetails } = this.props;

    const targetCourseId = cookies.get(COURSE_ID);

    // if there are no cookies set yet, the app will load the most recent semester
    if (isNullOrEmpty(targetCourseId)) {
      const semesters = await loadCourseList();
      const targetSemester = semesters[semesters.length - 1];
      const { course_id, course_year, course_semester } = targetSemester;
      loadAllContent(course_id);
      setCourseDetails(course_id, course_year, course_semester);
    } else {
      // otherwise, if cookies are already set, app will load that semester
      // cookies are set in Semester.jsx component when user switches semesters
      loadAllContent(targetCourseId);
      setCourseDetails(targetCourseId, cookies.get(COURSE_YEAR), cookies.get(COURSE_SEMESTER));
    }
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

export default withCookies(App);
