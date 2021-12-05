import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Students from "views/Students";
import Supervisors from "views/Supervisors";
import UserPage from "views/User.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/students",
    name: "Students",
    icon: "nc-icon nc-single-02",
    component: Students,
    layout: "/admin",
  },
  {
    path: "/supervisors",
    name: "Supervisors",
    icon: "nc-icon nc-single-02",
    component: Supervisors,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
];
export default routes;
