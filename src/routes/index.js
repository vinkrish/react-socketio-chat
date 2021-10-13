import Dashboard from 'containers/Dashboard';

const commonRoutes = [
  {
    path: "/",
    component: Dashboard,
    isExact: true,
    name: "Dashboard"
  }
];

export default {
  commonRoutes
};