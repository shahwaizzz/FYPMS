import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./pages/login.css";
import { ProtectedRoute, Login } from "./pages";
import SharedLayout from "./assets/SharedLayout";
import Sidebar from "./components/sidebar";
import {
  Home,
  Events,
  Projects,
  Student,
  Supervisor,
  UserProfile,
  UploadDocs,
} from "./pages/dashboard/dashboard_pmo";
import {
  ManageProjects,
  Meetings,
  ProjectProgress,
  SupervisorProjects,
  SupervisorSidebar,
} from "./pages/dashboard/dashboard_supervisor";
import Logout from "./pages/dashboard/dashboard_pmo/logout";
import SupervisorLogin from "./pages/SupervisorLogin";
import StudentLogin from "./pages/StudentLogin";
// function handleValidation(params) {}
function App() {
  // Commit Test
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/pmo'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
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
            path='/pmo/documents'
            element={<Sidebar name='Change Password' abc={<UploadDocs />} />}
          />
          <Route
            path='/pmo/logout'
            element={<Sidebar name='Change Password' abc={<Logout />} />}
          />
          {/* <Route index element={<div>HOme element</div>} />
          <Route path='all-jobs' element={<div>all Jobs</div>} />
          <Route path='add-job' element={<div>add Jobs</div>} />
          <Route path='profile' element={<div>profile</div>} /> */}
        </Route>
        <Route
          path='/supervisor'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path='/supervisor/createproject'
            element={
              <SupervisorSidebar name='Create Projects' abc={<Projects />} />
            }
          />
          <Route
            path='/supervisor/manageprojects'
            element={
              <SupervisorSidebar
                name='Manage Projects'
                abc={<ManageProjects />}
              />
            }
          />
          <Route
            path='/supervisor/events'
            element={<SupervisorSidebar name='Events' abc={<Events />} />}
          />
          <Route
            path='/supervisor/meetings'
            element={<SupervisorSidebar name='Meetings' abc={<Meetings />} />}
          />
          <Route
            path='/supervisor/updatepassword'
            element={<SupervisorSidebar name='Update Password' abc={<UserProfile />} />}
          />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/auth/supervisor' element={<SupervisorLogin />} />
        <Route path='/auth/student' element={<StudentLogin />} />
        <Route path='/landing' element={<div>landing page</div>} />
        <Route path='*' element={<div>Error</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
