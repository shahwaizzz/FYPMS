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
        <Routes>
          <Route path="/" element={<Adm_login />}  />
          <Route path="/auth/supervisor" element={<Thr_login />}  />
          <Route path="/auth/student" element={<Std_login />}  />
        </Routes>
      </div>
    );
  }
  
}

export default App;
