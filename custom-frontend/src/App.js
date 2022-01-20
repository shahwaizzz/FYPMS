import React, { useState } from "react";
import Home from "./components/main-components/home";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import "./login/index.css";
// import Login from "./login";
import { Routes, Route } from "react-router-dom";
import Projects from "./components/main-components/projects";
import Events from "./components/main-components/events";
import Student from "./components/main-components/student";
import Supervisor from "./components/main-components/supervisor";
import UserProfile from "./components/main-components/user-profile";
import Adm_login from "./login/Adm_login";
import Thr_login from "./login/Thr_login";
import Std_login from "./login/Std_login";
import Document from "./components/main-components/Documents";
// function handleValidation(params) {}
function App() {
  // Commit Test
  const [validation, setValidation] = useState(true);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [showModal, setShowModal] = useState(false);
  if (validation) {
    return (
      <div className='App'>
        <Navbar />
        <Routes>
          <Route
            path='/admin'
            element={<Sidebar abc={<Home />} name='Home' />}
          />
          <Route
            path='/admin/projects'
            element={<Sidebar name='Projects' abc={<Projects />} />}
          />
          <Route
            path='/admin/events'
            element={<Sidebar name='Events' abc={<Events />} />}
          />
          <Route
            path='/admin/students'
            element={<Sidebar name='Students' abc={<Student />} />}
          />
          <Route
            path='/admin/supervisors'
            element={<Sidebar name='Supervisors' abc={<Supervisor />} />}
          />
          <Route
            path='/admin/documents'
            element={<Sidebar name='Document Templates' abc={<Document />} />}
          />
          <Route
            path='/admin/profile'
            element={<Sidebar name='User Profile' abc={<UserProfile />} />}
          />
          <Route path='*' element={<div>Not Found</div>} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className='App'>
        {/* <Login /> */}
        <Routes>
          <Route path='/auth/pmo' element={<Adm_login />} />
          <Route path='/auth/supervisor' element={<Thr_login />} />
          <Route path='/auth/student' element={<Std_login />} />
          <Route
            path='/admin'
            element={
              <>
                <Navbar />
                <Sidebar name='Home' abc={<Home />} />
              </>
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
