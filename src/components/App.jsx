import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// Components
import Header from './Header/Header.jsx'
import Sidebar from './Sidebar/Sidebar.jsx'
// Main Page Components
import Announcements from '../containers/AnnouncementsContainer.jsx';
import CreateReactApp from './CreateReactApp.jsx';
import Home from './Home.jsx';
import Schedule from '../containers/ScheduleContainer.jsx';
import Semester from './Semester.jsx';
import Team from '../containers/TeamContainer.jsx';
// Utils
import { getStuff } from '../utils/ApiUtils.js';
// Constants
import {
  GET_ANNOUNCEMENTS,
  GET_ACTIVITIES,
  GET_ASSIGNMENTS,
  GET_CALENDAR,
  GET_COURSE_AND_SECTIONS,
  GET_INSTRUCTOR_LIST,
  GET_MODULES,
  GET_OFFICE_HOURS,
  GET_LECTURE_NOTES,
  GET_SECTION_GROUPS
} from '../constants/ApiConstants.js';


class App extends Component {
  state = { // Main data/state used in entire application
    courseId: 99,
    courseSemester: 'Fall',
    courseYear: '2018',
    calendar: [],
    announcements: [],
    instructors: [],
    officeHours: [],
    modules: [],
    sections: [],
    sectionGroups: [],
    activities: [],
    assignments: [],
    lectureNotes: []
  }
  loadInstructors = async () => {
    let { data } = await getStuff({ action: GET_INSTRUCTOR_LIST });
    return (data) ? data.instructors : [];
  }
  loadOfficeHours = async () => {
    let { data } = await getStuff({ action: GET_OFFICE_HOURS, courseId: this.state.courseId });
    return (data) ? data.officehours : [];
  }
  loadAnnouncements = async () => {
    let { data } = await getStuff({ action: GET_ANNOUNCEMENTS,  courseId: this.state.courseId });
    return (data) ? data.announcements.reverse() : []; // most recent first
  }
  loadActivities = async () => {
    let { data } = await getStuff({ action: GET_ACTIVITIES, courseId: this.state.courseId });
    return (data) ? data.activities : [];
  }
  loadAssignments = async () => {
    let { data } = await getStuff({ action: GET_ASSIGNMENTS, courseId: this.state.courseId });
    return (data) ? data.assignments : [];
  }
  loadLectureNotes = async () => {
    let { data } = await getStuff({ action: GET_LECTURE_NOTES, courseId: this.state.courseId });
    return (data) ? data.lectureNotes : [];
  }
  loadModules = async () => {
    const { data } = await getStuff({ action: GET_MODULES, courseId: this.state.courseId });
    return (data) ? data.modules : [];
  }
  loadSections = async () => {
    const { data } = await getStuff({ action: GET_COURSE_AND_SECTIONS, courseId: this.state.courseId });
    return (data) ? data.sections : [];
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
  loadScheduleData = async () => {
    const activities = await this.loadActivities();
    const assignments = await this.loadAssignments();
    const lectureNotes = await this.loadLectureNotes();
    const sections = await this.loadSections();
    this.setState({
      activities: activities,
      assignments: assignments,
      lectureNotes: lectureNotes,
      sections: sections
    });
  }
  componentDidMount = async () => {
    const instructors = await this.loadInstructors();
    const announcements = await this.loadAnnouncements();
    const modules = await this.loadModules();
    const calendar = await this.loadCalendar();
    const sectionGroups = await this.loadSectionGroups();
    const officeHours = await this.loadOfficeHours();
    this.setState({ // this loads all the first layer data we need
      instructors: instructors,
      officeHours: officeHours,
      announcements: announcements,
      modules: modules,
      calendar: calendar,
      sectionGroups: sectionGroups
    });
    this.loadScheduleData(); // loading schedule data after speeds up app launch
    this.props.loadGeneralContent(this.props.course.courseId);
    this.props.loadScheduleContent(this.props.course.courseId);
  }

  render() {
    console.log(this.state);
    console.log(this.props.course);
    console.log(this.props.content);
    const appRoutes = [
      {
        path: "/home",
        name: "Home",
        icon: "nc-icon nc-world-2",
        component: props => (<Home />)
      },
      {
        path: "/schedule",
        name: "Schedule",
        icon: "nc-icon nc-calendar-60",
        component: props => (<Schedule />)
      },
      {
        path: "/team",
        name: "Team",
        icon: "nc-icon nc-user-run",
        component: props => (<Team />)
      },
      {
        path: "/announcements",
        name: "Announcements",
        icon: "nc-icon nc-send",
        component: props => (<Announcements />)
      },
      {
        path: "/semester",
        name: "Semester",
        icon: "nc-icon nc-tile-56",
        component: props => (<Semester />)
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
            currentSemester={this.state.courseSemester}
            currentYear={this.state.courseYear}
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
