import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
const StudentRoutes = ({ children }) => {
  const { student } = useAppContext();
  if (!student) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default StudentRoutes;
