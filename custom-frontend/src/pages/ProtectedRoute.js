import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
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

export {ProtectedRoutesupervisor,ProtectedRoutespmo,ProtectedRoutestudent};
