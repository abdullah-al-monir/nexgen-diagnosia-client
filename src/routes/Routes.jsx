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
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import TestCardDetails from "../components/DashboardList/TestCardDetails";
import UpdateTest from "../pages/UpdateTest/UpdateTest";

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
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <TestCardDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://nexgen-diagnosia-server.vercel.app/details/${params.id}`),
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "appointments",
        element: (
          <PrivateRoute>
            <UserAppointments />
          </PrivateRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        ),
      },
      {
        path: "addBanner",
        element: (
          <AdminRoute>
            <AddBanner />
          </AdminRoute>
        ),
      },
      {
        path: "addTest",
        element: (
          <AdminRoute>
            <AddTest />
          </AdminRoute>
        ),
      },
      {
        path: "allBanner",
        element: (
          <AdminRoute>
            <AllBanners />
          </AdminRoute>
        ),
      },
      {
        path: "testManagement",
        element: (
          <AdminRoute>
            <AllTestsAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "reservation",
        element: (
          <AdminRoute>
            <Reservation />
          </AdminRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <AdminRoute>
            <UpdateTest />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://nexgen-diagnosia-server.vercel.app/details/${params.id}`),
      },
    ],
  },
]);

export default Routes;
