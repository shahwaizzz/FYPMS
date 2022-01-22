import React, { useState } from "react";
import "./login/index.css";
import { useSelector } from "react-redux";
import Dashoard_Pmo from "./dashboard_pmo/Dashboard_Pmo";
import Dashoard_std from "./dashboard_student/Dashboard_std";
import Dashoard_supervisor from "./dashboard_supervisor/Dashboard_supervisor";
import Adm_login from "./login/Adm_login";
<<<<<<< HEAD
import Thr_login from "./login/Thr_login";
import Std_login from "./login/Std_login";
import Modal from "./components/modal";
import Document from "./components/main-components/Documents";
import SSidebar from "./supervisor/sidebar";
import { MdGroup } from "react-icons/md";
import Groups from './supervisor/group';
import ManageProjects from './supervisor/ManageProjects';
import ProjectProgress from "./supervisor/ProjectProgress";
// function handleValidation(params) {}
function App() {
  // Commit Test
  const [validation, setValidation] = useState(true);
  const [showModal, setShowModal] = useState(false);
  if (validation) {
    return (
      <div className='App'>
        <Navbar />
        <button onClick={setShowModal}>Click Me</button>
        {showModal && <Modal />}
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
          <Route path="/admin/documents" element={<Sidebar name="Document Templates" abc={<Document />} /> } />
          <Route
            path='/admin/profile'
            element={<Sidebar name='User Profile' abc={<UserProfile />} />}
          />
          <Route path="/supervisor" element={<SSidebar name="Home" abc={<Home />} />} />
          <Route path="/supervisor/updatepassword" element={<SSidebar name="Update Password" abc={<UserProfile />} />} />
          <Route path="/supervisor/createproject" element={<SSidebar name="Crreate Project" abc={<Groups />} />} />
          <Route path="/supervisor/manageprojects" element={<SSidebar name="Manage Projects" abc={<ManageProjects />} />} />
          <Route path="/supervisor/progress/:id" element={<SSidebar name="Progress" abc={<ProjectProgress />} />} />
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
=======
// function handleValidation(params) {}
function App() {
  // Commit Test
  // const { pmo, student, supervisor } = useSelector((state) => state.AuthReducer)
  // if (student) {
  //   <div className="App">
  //       <Dashoard_supervisor />
  //     </div>
  // }
  // if (pmo) {
  return (
    <div className='App'>
      <Dashoard_Pmo />
    </div>
  );
  // } if (supervisor) {
  //   return (
  //     <div className="App">
  //       <Dashoard_std />
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div className="App">
  //       <Adm_login />
  //     </div>
  //   )
  // }
>>>>>>> d63005ffd9cb9c9879e56346f467083d89e14e78
}

export default App;
