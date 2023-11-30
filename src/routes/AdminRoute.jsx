import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import BeatLoader from "react-spinners/BeatLoader";
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [admin, isLoading] = useAdmin();
  const location = useLocation();
  if (loading || isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BeatLoader style={{ color: "#082f63" }} />
      </div>
    );
  }
  if (user && admin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
