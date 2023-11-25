import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";

const MainLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh"
      }}
    >
      <Navbar />
      <div >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
