import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
const PMORoutes = ({ children }) => {
  const { pmo } = useAppContext();
  if (!pmo) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default PMORoutes;
