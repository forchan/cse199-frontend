import CreateReactApp from '../views/CreateReactApp/CreateReactApp.jsx';
import Home from '../views/Home/Home.jsx';

const appRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-world-2",
    component: Home
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
