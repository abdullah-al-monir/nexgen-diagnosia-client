import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import AllTests from "../pages/AllTests/AllTests";
import About from "../pages/About/About";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Contact from "../pages/Contact/Contact";
import Blog from "../pages/Blog/Blog";
import Dashboard from "../layouts/Dashboard";
import UserProfile from "../pages/Dashboard/DashBoard/userDashBoard/userProfile";
import UserAppointments from "../pages/Dashboard/DashBoard/UserDashBoard/UserAppointments";
import AddBanner from "../pages/Dashboard/DashBoard/AdminDashboard/AddBanner";
import AddTest from "../pages/Dashboard/DashBoard/AdminDashboard/AddTest";
import AllBanners from "../pages/Dashboard/DashBoard/AdminDashboard/AllBanners";
import AllTestsAdmin from "../pages/Dashboard/DashBoard/AdminDashboard/AllTestsAdmin";
import Reports from "../pages/Dashboard/DashBoard/UserDashBoard/Reports";
import AllUsers from "../pages/Dashboard/DashBoard/AdminDashboard/AllUsers";
import Reservation from "../pages/Dashboard/DashBoard/AdminDashboard/Reservation";
import AdminHome from "../pages/Dashboard/DashBoard/AdminDashboard/AdminHome";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allTests",
        element: <AllTests />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "appointments",
        element: <UserAppointments />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "addBanner",
        element: <AddBanner />,
      },
      {
        path: "addTest",
        element: <AddTest />,
      },
      {
        path: "allBanner",
        element: <AllBanners />,
      },
      {
        path: "allTests",
        element: <AllTestsAdmin />,
      },
      {
        path: "allUsers",
        element: <AllUsers />,
      },
      {
        path: "reservation",
        element: <Reservation />,
      },
      {
        path: "dashboard",
        element: <AdminHome />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default Routes;
