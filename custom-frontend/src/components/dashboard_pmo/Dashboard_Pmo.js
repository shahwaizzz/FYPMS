import { Routes, Route } from "react-router-dom";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import Home from "./home";
import Events from "./events";
import Projects from "./projects";
import Student from "./student";
import Supervisor from "./supervisor";
import UserProfile from "./user-profile";
import UploadDocs from "./Documents";
const Dashoard_Pmo = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/pmo' element={<Sidebar name='Home' abc={<Home />} />} />
        <Route
          path='/pmo/events'
          element={<Sidebar name='Events' abc={<Events />} />}
        />
        <Route
          path='/pmo/projects'
          element={<Sidebar name='Projects' abc={<Projects />} />}
        />
        <Route
          path='/pmo/students'
          element={<Sidebar name='Students' abc={<Student />} />}
        />
        <Route
          path='/pmo/supervisors'
          element={<Sidebar name='Supervisors' abc={<Supervisor />} />}
        />
        <Route
          path='/pmo/change-password'
          element={<Sidebar name='Change Password' abc={<UserProfile />} />}
        />
        <Route
          path='/pmo/upload-templates'
          element={<Sidebar name='Change Password' abc={<UploadDocs />} />}
        />
      </Routes>
    </>
  );
};
export default Dashoard_Pmo;
