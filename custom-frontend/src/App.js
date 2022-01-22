import React, { useState } from "react";
import "./components/login/index.css";
import { useSelector } from "react-redux";
import Dashoard_Pmo from "./components/dashboard_pmo/Dashboard_Pmo";
import Dashoard_std from "./components/dashboard_student/Dashboard_std";
import Dashoard_supervisor from "./components/dashboard_supervisor/Dashboard_supervisor";
import Adm_login from "./components/login/Adm_login";
import Thr_login from "./components/login/Thr_login";
import Std_login from "./components/login/Std_login";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Home from "./components/dashboard_pmo/home";
import Events from "./components/dashboard_pmo/events";
import Projects from "./components/dashboard_pmo/projects";
import Student from "./components/dashboard_pmo/student";
import Supervisor from "./components/dashboard_pmo/supervisor";
import UserProfile from "./components/dashboard_pmo/user-profile";
import UploadDocs from "./components/dashboard_pmo/Documents";
import SSidebar from "./components/dashboard_supervisor/sidebar";
import Groups from "./components/dashboard_supervisor/Projects";
import ManageProjects from "./components/dashboard_supervisor/ManageProjects";
import ProjetProgress from "./components/dashboard_supervisor/ProjectProgress";

// function handleValidation(params) {}
function App() {
  // Commit Test
  const { pmo, student, supervisor } = useSelector(
    (state) => state.AuthReducer
  );
  if (student) {
    <div className='App'>
      <Dashoard_supervisor />
    </div>;
  }
  if (pmo) {
    return (
      <div className='App'>
        {/* <Dashoard_Pmo /> */}
        <Navbar />
        <Routes>
          <Route path='/' element={<Sidebar name='Home' abc={<Home />} />} />
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
            path='/pmo/documents'
            element={<Sidebar name='Change Password' abc={<UploadDocs />} />}
          />
        </Routes>
      </div>
    );
  }
  if (supervisor) {
    return (
      <div className='App'>
        <Dashoard_std />
      </div>
    );
  } else {
    return (
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Adm_login />} />
          <Route path='/auth/supervisor' element={<Thr_login />} />
          <Route path='/auth/student' element={<Std_login />} />
          <Route path='/auth/pmo' element={<Adm_login />} />
          <Route path='/' element={<Sidebar name='Home' abc={<Home />} />} />
          <Route
            path='/home'
            element={<SSidebar name='Home' abc={<Home />} />}
          />
          <Route
            path='/supervisor/createproject'
            element={<SSidebar name='Project' abc={<Groups />} />}
          />
          <Route
            path='/supervisor/manageprojects'
            element={
              <SSidebar name='Manage Projects' abc={<ManageProjects />} />
            }
          />
          <Route
            path='/supervisor/progress/:id'
            element={<SSidebar name='Supervisors' abc={<ProjetProgress />} />}
          />
          <Route
            path='/pmo/change-password'
            element={<Sidebar name='Change Password' abc={<UserProfile />} />}
          />
          <Route
            path='/pmo/documents'
            element={<Sidebar name='Change Password' abc={<UploadDocs />} />}
          />
        </Routes>
      </div>
    );
  }
}

export default App;
