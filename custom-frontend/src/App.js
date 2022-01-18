import React, { useState } from "react";
import Home from "./components/main-components/home";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Dashboard from "./dashboard";
import "./index.css";
import Login from "./login";
import { Routes, Route } from "react-router-dom";
import Projects from "./components/main-components/projects";
import Events from "./components/main-components/events";
import { students } from "./apis";
import Student from "./components/main-components/student";
import Supervisor from "./components/main-components/supervisor";
import UserProfile from "./components/main-components/user-profile";

function handleValidation(params) {}
function App() {
  // Commit Test
  const [validation, setValidation] = useState(true);
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
            path='/admin/profile'
            element={<Sidebar name='User Profile' abc={<UserProfile />} />}
          />
        </Routes>

        {/* <Dashboard /> */}
        {/* <Navbar />
        <Sidebar abc={<Home />} /> */}
        {/* <Home /> */}
      </div>
    );
  } else {
    return (
      <div className='App'>
        <Login />
      </div>
    );
  }
}

export default App;
