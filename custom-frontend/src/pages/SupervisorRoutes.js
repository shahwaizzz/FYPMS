import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
const SupervisorRoutes = ({ children }) => {
  const { supervisor } = useAppContext();
  if (!supervisor) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default SupervisorRoutes;
