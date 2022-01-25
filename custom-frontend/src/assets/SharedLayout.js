import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
const SharedLayout = () => {
  return (
    <>
      <nav>
        <Link to='all-jobs'>all jobs</Link>
        <Link to='add-job'>all jobs</Link>
      </nav>
      <Outlet />
    </>
  );
};

export default SharedLayout;
