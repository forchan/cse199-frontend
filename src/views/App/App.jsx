import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// Components
import Header from '../../components/Header/Header.jsx'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
// View Components
import Announcements from '../Announcements/Announcements.jsx';
import CreateReactApp from '../CreateReactApp/CreateReactApp.jsx';
import Home from '../Home/Home.jsx';
import Schedule from '../Schedule/Schedule.jsx';
import Semester from '../Semester/Semester.jsx';
import Team from '../Team/Team.jsx';
// Utils
import { getStuff } from '../../utils/ApiUtils.js';
// Constants
import {
  GET_ANNOUNCEMENTS,
  GET_CALENDAR,
  GET_INSTRUCTOR_LIST,
  GET_MODULES,
  GET_SECTION_GROUPS
} from '../../constants/ApiConstants.js';


class App extends Component {
  state = { // Main data related state in entire application
    courseId: 99,
    calendar: [],
    announcements: [],
    instructors: [],
    modules: [],
    sectionGroups: []
  }
  loadInstructors = async () => {
    let { data } = await getStuff({ action: GET_INSTRUCTOR_LIST });
    return (data) ? data.instructors : [];
  }
  loadAnnouncements = async () => {
    let { data } = await getStuff({ action: GET_ANNOUNCEMENTS,  courseId: this.state.courseId });
    return (data) ? data.announcements : [];
  }
  loadModules = async () => {
    const { data } = await getStuff({ action: GET_MODULES, courseId: this.state.courseId });
    return (data) ? data.modules : [];
  }
  loadSectionGroups = async () => {
    const { data } = await getStuff({ action: GET_SECTION_GROUPS, courseId: this.state.courseId });
    return (data) ? data.section_groups : [];
  }
  loadCalendar = async () => {
    const { data } = await getStuff({ action: GET_CALENDAR, courseId: this.state.courseId });
    let calendar = [];
    if (data) {
      for (let num = 1; num <= 7; num++) { // need to extract block values from json
        let targetBlock = "block_" + num;
        calendar.push(data[targetBlock][0]);
      }
    }
    return calendar;
  }
  componentDidMount = async () => {
    const instructors = await this.loadInstructors();
    const announcements = await this.loadAnnouncements();
    const modules = await this.loadModules();
    const calendar = await this.loadCalendar();
    const sectionGroups = await this.loadSectionGroups();
    this.setState({
      instructors: instructors,
      announcements: announcements,
      modules: modules,
      calendar: calendar,
      sectionGroups: sectionGroups
    });
  }

  render() {
    console.log(this.state);
    const appRoutes = [
      {
        path: "/home",
        name: "Home",
        icon: "nc-icon nc-world-2",
        component: props => (<Home state={this.state}/>)
      },
      {
        path: "/schedule",
        name: "Schedule",
        icon: "nc-icon nc-calendar-60",
        component: props => (<Schedule state={this.state} />)
      },
      {
        path: "/team",
        name: "Team",
        icon: "nc-icon nc-user-run",
        component: props => (<Team state={this.state} />)
      },
      {
        path: "/announcements",
        name: "Announcements",
        icon: "nc-icon nc-send",
        component: props => (<Announcements state={this.state}/>)
      },
      {
        path: "/semester",
        name: "Semester",
        icon: "nc-icon nc-tile-56",
        component: props => (<Semester state={this.state}/>)
      },
      {
        path: "/create-react-app",
        name: "Create React App",
        icon: "nc-icon nc-atom",
        component: props => (<CreateReactApp />)
      },
      { redirect: true, path: "/", to: "/home", name: "Home" }
    ];

    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={appRoutes} />
        <div className="main-panel" ref="mainPanel">
          <Header
            {...this.props}
            routes={appRoutes}
            currentCourseId={this.state.courseId}
          />
          <Switch>
            {appRoutes.map((route, key) => {
              if (route.redirect) {
                return <Redirect from={route.path} to={route.to} key={key} />;
              }
              return (
                <Route path={route.path} render={route.component} key={key} />
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
