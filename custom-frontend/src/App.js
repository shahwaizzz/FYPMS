import React from "react";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import "./pages/login.css";
<<<<<<< HEAD
import {Login } from "./pages";
import {SharedLayout,StudentSharedlayout} from "./assets/SharedLayout";
=======
import { PMORoutes, SupervisorRoutes, StudentRoutes, Login } from "./pages";
import SharedLayout from "./assets/SharedLayout";
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956
import Sidebar from "./components/sidebar";
import {ProtectedRoutespmo,ProtectedRoutestudent,ProtectedRoutesupervisor} from './pages/ProtectedRoute'
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
<<<<<<< HEAD
=======
  SupervisorMeetings,
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956
  ProjectProgress,
  SupervisorProjects,
  Meetings,
  SupervisorSidebar,
} from "./pages/dashboard/dashboard_supervisor";
import {PmoLogout,Stdlogout,Supervisorlogout} from "./pages/dashboard/dashboard_pmo/logout";
import SupervisorLogin from "./pages/SupervisorLogin";
import StudentLogin from "./pages/StudentLogin";
import Studentsidebar from "./pages/dashboard/dashboard_student/StudentSidebar";
import Dashoard_std from "./pages/dashboard/dashboard_student/Dashboard_std";
import { SupervisorViewEvents } from "./pages/dashboard/dashboard_supervisor/supervisorevents";
import Marks from "./pages/dashboard/dashboard_student/Marks";
// function handleValidation(params) {}
function App() {
  // Commit Test
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/pmo'
          element={
<<<<<<< HEAD
            <ProtectedRoutespmo>
              <SharedLayout />
             </ProtectedRoutespmo>
=======
            <PMORoutes>
              <SharedLayout />
            </PMORoutes>
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956
          }
        >
          <Route path='/pmo' element={<Sidebar name='Home' abc={<Home admin={true}/>} />} />
          <Route
            path='/pmo/events'
            element={<Sidebar name='Events' abc={<Events admin={true}/>} />}
          />
          <Route
            path='/pmo/projects'
            element={<Sidebar name='Projects' abc={<Projects />} />}
          />
          <Route
            path='/pmo/students'
            element={<Sidebar name='Students' abc={<Student admin={true}/>} />}
          />
          <Route
            path='/pmo/supervisors'
            element={<Sidebar name='Supervisors' abc={<Supervisor admin={true}/>} />}
          />
          <Route
            path='/pmo/change-password'
            element={<Sidebar name='Change Password' abc={<UserProfile />} />}
          />
          <Route
            path='/pmo/documents'
            element={<Sidebar name='Change Password' abc={<UploadDocs />} />}
          />
         
          {/* <Route index element={<div>HOme element</div>} />
          <Route path='all-jobs' element={<div>all Jobs</div>} />
          <Route path='add-job' element={<div>add Jobs</div>} />
          <Route path='profile' element={<div>profile</div>} /> */}
        </Route>
        <Route
          path='/supervisor'
          element={
<<<<<<< HEAD
            <ProtectedRoutesupervisor>
              <SharedLayout />
              </ProtectedRoutesupervisor>
=======
            <SupervisorRoutes>
              <SharedLayout />
            </SupervisorRoutes>
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956
          }
        >
          
          <Route path='/supervisor/home' element={<SupervisorSidebar name='Home' abc={<Home supervisor={true} />} />} />

          <Route
            path='/supervisor/createproject'
            element={
              <SupervisorSidebar
                name='Create Projects'
                abc={<SupervisorProjects />}
              />
            }
          />
          {/* <Route
            path='/supervisor/manageprojects'
            element={
              <SupervisorSidebar
                name='Manage Projects'
                abc={<ManageProjects />}
              />
            }
          /> */}
          <Route
            path='/supervisor/events'
<<<<<<< HEAD
            element={<SupervisorSidebar name='Events' abc={<Events admin={false} />} />}
          />
          <Route
            path='/supervisor/students'
            element={<SupervisorSidebar name='Events' abc={<Student admin={false}/>} />}
          />
          <Route
            path='/supervisor/meetings'
            element={<SupervisorSidebar name='Meetings' abc={<Meetings supervisor={true}/>} />}
          />
          <Route
            path='/supervisor/total'
            element={<SupervisorSidebar name='Supervisors' abc={<Supervisor admin={false}/>} />}
=======
            element={
              <SupervisorSidebar name='Events' abc={<ManageProjects />} />
            }
          />
          <Route
            path='/supervisor/meetings'
            element={
              <SupervisorSidebar name='Meetings' abc={<SupervisorMeetings />} />
            }
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956
          />
          <Route
            path='/supervisor/updatepassword'
            element={
              <SupervisorSidebar name='Update Password' abc={<UserProfile />} />
            }
          />
         
        </Route>
        <Route exact path="/" element={<Navigate replace to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/auth/supervisor' element={<SupervisorLogin />} />
        <Route path='/auth/student' element={<StudentLogin />} />
<<<<<<< HEAD

        <Route
        path="/student"
        element={
          <ProtectedRoutestudent>
            <StudentSharedlayout />
            </ProtectedRoutestudent>
        }
        >
        <Route path="/student/home" element={<Studentsidebar name='Home' abc={<Home student={true}/>}/>} />
        <Route path="/student/events" element={<Studentsidebar name='Events' abc={<Events admin={false} />}/>} />
        <Route path="/student/projects" element={<Studentsidebar name='Events' abc={<Projects student={true} />}/>} />
        <Route path="/student/meetings" element={<Studentsidebar name='Meetings' abc={<Meetings supervisor={false} />}/>} />
        <Route path="/student/marks" element={<Studentsidebar name='Meetings' abc={<Marks supervisor={false} />}/>} />


        </Route>





=======
        <Route path='/landing' element={<div>landing page</div>} />
        <Route path='*' element={<div>Not Found</div>} />
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956
      </Routes>
    </BrowserRouter>
  );
}

export default App;
