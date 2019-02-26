import App from '../views/App/App.jsx';

const appRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-world-2",
    component: App
  },
  { redirect: true, path: "/", to: "/home", name: "Home" }
];

export default appRoutes;
