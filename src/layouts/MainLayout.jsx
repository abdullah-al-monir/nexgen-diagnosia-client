import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div style={{minHeight : "calc(100vh - 176.5px)"}}>
      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
