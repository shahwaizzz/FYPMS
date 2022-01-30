import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Studentsidebar from "../pages/dashboard/dashboard_student/StudentSidebar";
const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  );
};

const StudentSharedlayout = () => {
  return (
    <>
      <Navbar />
      <Studentsidebar />
      <Outlet />
    </>
  );
}

export {SharedLayout,StudentSharedlayout};

