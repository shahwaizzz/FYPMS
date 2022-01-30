import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
<<<<<<< HEAD:custom-frontend/src/pages/ProtectedRoute.js
const ProtectedRoutesupervisor = ({ children }) => {
  const {supervisor } = useAppContext();
  if (!supervisor) {
    return <Navigate to='/auth/supervisor' />;
  }
  return children;
};
const ProtectedRoutespmo = ({ children }) => {
  const { adminpmo } = useAppContext();
  if (!adminpmo) {
=======
const PMORoutes = ({ children }) => {
  const { pmo } = useAppContext();
  if (!pmo) {
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956:custom-frontend/src/pages/PMORoutes.js
    return <Navigate to='/login' />;
  }
  return children;
};
const ProtectedRoutestudent = ({ children }) => {
  const { student } = useAppContext();
  if (!student) {
    return <Navigate to='/auth/student' />;
  }
  return children;
};

<<<<<<< HEAD:custom-frontend/src/pages/ProtectedRoute.js
export {ProtectedRoutesupervisor,ProtectedRoutespmo,ProtectedRoutestudent};
=======
export default PMORoutes;
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956:custom-frontend/src/pages/PMORoutes.js
