import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./pages/login.css";
import { Login } from "./pages";
import { SharedLayout, StudentSharedlayout } from "./assets/SharedLayout";
// import { PMORoutes, SupervisorRoutes, StudentRoutes, Login } from "./pages";
// import SharedLayout from "./assets/SharedLayout";
import Sidebar from "./components/sidebar";
import {
  ProtectedRoutespmo,
  ProtectedRoutestudent,
  ProtectedRoutesupervisor,
} from "./pages/ProtectedRoutes";
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
  ProjectProgress,
  SupervisorProjects,
  Meetings,
  SupervisorSidebar,
} from "./pages/dashboard/dashboard_supervisor";
import Certificates from "./pages/dashboard/dashboard_supervisor/Certificates";
import {
  PmoLogout,
  Stdlogout,
  Supervisorlogout,
} from "./pages/dashboard/dashboard_pmo/logout";
import SupervisorLogin from "./pages/SupervisorLogin";
import StudentLogin from "./pages/StudentLogin";
import Studentsidebar from "./pages/dashboard/dashboard_student/StudentSidebar";
import Dashoard_std from "./pages/dashboard/dashboard_student/Dashboard_std";
import { SupervisorViewEvents } from "./pages/dashboard/dashboard_supervisor/supervisorevents";
import Marks from "./pages/dashboard/dashboard_student/Marks";
import { Showdocments } from "./pages/dashboard/dashboard_supervisor/docs";
import DownloadPerform from "./pages/dashboard/dashboard_pmo/DownloadPerform";
// function handleValidation(params) {}
function App() {
  // Commit Test
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/pmo' element={<SharedLayout />}>
          <Route
            path='/pmo'
            element={<Sidebar name='Home' abc={<Home admin={true} />} />}
          />
          <Route
            path='/pmo/events'
            element={<Sidebar name='Events' abc={<Events admin={true} />} />}
          />
          <Route
            path='/pmo/projects'
            element={<Sidebar name='Projects' abc={<Projects />} />}
          />
          <Route
            path='/pmo/students'
            element={<Sidebar name='Students' abc={<Student admin={true} />} />}
          />
          <Route
            path='/pmo/supervisors'
            element={
              <Sidebar name='Supervisors' abc={<Supervisor admin={true} />} />
            }
          />
          <Route
            path='/pmo/downloadperforma'
            element={
              <Sidebar name='Download Performa' abc={<DownloadPerform admin={true} />} />
            }
          />
          <Route
            path='/pmo/change-password'
            element={<Sidebar name='Change Password' abc={<UserProfile />} />}
          />
          <Route
            path='/pmo/documents'
            element={<Sidebar name='Uploda Docs' abc={<UploadDocs />} />}
          />
        </Route>
        <Route
          path='/supervisor'
          element={
            <ProtectedRoutesupervisor>
              <SharedLayout />
            </ProtectedRoutesupervisor>
          }
        >
          <Route
            path='/supervisor/home'
            element={
              <SupervisorSidebar name='Home' abc={<Home supervisor={true} />} />
            }
          />

          <Route
            path='/supervisor/createproject'
            element={
              <SupervisorSidebar name='Create Projects' abc={<Projects />} />
            }
          />
          <Route
            path='/supervisor/events'
            element={
              <SupervisorSidebar name='Events' abc={<Events admin={false} />} />
            }
          />
          <Route
            path='/supervisor/students'
            element={
              <SupervisorSidebar
                name='Events'
                abc={<Student admin={false} />}
              />
            }
          />
          <Route 
            path="/supervisor/certificates"
            element={<SupervisorSidebar name="Certificates" abc={<Certificates />} />}
          />
          
          <Route
            path='/supervisor/meetings'
            element={
              <SupervisorSidebar
                name='Meetings'
                abc={<Meetings supervisor={true} />}
              />
            }
          />
          <Route
            path='/supervisor/total'
            element={
              <SupervisorSidebar
                name='Supervisors'
                abc={<Supervisor admin={false} />}
              />
            }
          />
          <Route
            path='/supervisor/globaltemplates'
            element={
              <SupervisorSidebar
                name='Global Templates'
                abc={<Showdocments />}
              />
            }
          />
          <Route
            path='/supervisor/updatepassword'
            element={
              <SupervisorSidebar name='Update Password' abc={<UserProfile />} />
            }
          />
        </Route>
        <Route exact path='/' element={<Navigate replace to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/auth/supervisor' element={<SupervisorLogin />} />
        <Route path='/auth/student' element={<StudentLogin />} />

        <Route
          path='/student'
          element={
            <ProtectedRoutestudent>
              <StudentSharedlayout />
            </ProtectedRoutestudent>
          }
        >
          <Route
            path='/student/home'
            element={
              <Studentsidebar name='Home' abc={<Home student={true} />} />
            }
          />
          <Route
            path='/student/events'
            element={
              <Studentsidebar name='Events' abc={<Events admin={false} />} />
            }
          />
          <Route
            path='/student/projects'
            element={
              <Studentsidebar
                name='Manage Projects'
                abc={<Projects student={true} />}
              />
            }
          />
          <Route
            path='/student/meetings'
            element={
              <Studentsidebar
                name='Meetings'
                abc={<Meetings supervisor={false} />}
              />
            }
          />
          <Route
            path='/student/marks'
            element={
              <Studentsidebar name='Marks' abc={<Marks supervisor={false} />} />
            }
          />
          <Route
            path='/student/globaltemplates'
            element={<Studentsidebar name='Marks' abc={<Showdocments />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
