import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  );
};

export default SharedLayout;
