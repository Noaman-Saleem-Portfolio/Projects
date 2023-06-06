/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Login from "views/Login.js";
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Create from "views/Create.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import UpdateBookForm from "views/UpdateBookForm.js";

const dashboardRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-chart-pie-35",
    component: Login,
    showInSideBar: false,
    layout: "/unauth",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    showInSideBar: true,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    showInSideBar: true,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Show All Books",
    icon: "nc-icon nc-zoom-split",
    component: TableList,
    showInSideBar: true,
    layout: "/admin",
  },
  {
    path: "/book/:id",
    name: "update book",
    icon: "nc-icon nc-notes",
    component: UpdateBookForm,
    showInSideBar: false,
    layout: "/admin",
  },
  {
    path: "/create",
    name: "Add New Book",
    icon: "nc-icon nc-layers-3",
    component: Create,
    showInSideBar: true,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    showInSideBar: false,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    showInSideBar: false,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    showInSideBar: false,
    component: Notifications,
    layout: "/admin",
  },
];

export default dashboardRoutes;
