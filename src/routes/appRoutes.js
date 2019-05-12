// Container Components
import Announcements from '../containers/AnnouncementsContainer.jsx';
import Schedule from '../containers/ScheduleContainer.jsx';
import Semester from '../containers/SemesterContainer.jsx';
import Team from '../containers/TeamContainer.jsx';
// Regular Components
import CreateReactApp from '../components/CreateReactApp.jsx';
import Home from '../components/Home.jsx';

const appRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-world-2",
    component: Home
  },
  {
    path: "/schedule",
    name: "Schedule",
    icon: "nc-icon nc-calendar-60",
    component: Schedule
  },
  {
    path: "/team",
    name: "Team",
    icon: "nc-icon nc-user-run",
    component: Team
  },
  {
    path: "/announcements",
    name: "Announcements",
    icon: "nc-icon nc-send",
    component: Announcements
  },
  {
    path: "/semester",
    name: "Semester",
    icon: "nc-icon nc-tile-56",
    component: Semester
  },
  {
    path: "/create-react-app",
    name: "Create React App",
    icon: "nc-icon nc-atom",
    component: CreateReactApp
  },
  { redirect: true, path: "/", to: "/home", name: "Home" }
];

export default appRoutes;
