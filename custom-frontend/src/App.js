import React, { useState } from "react";
import "./login/index.css";
import { useSelector } from "react-redux";
import Dashoard_Pmo from "./dashboard_pmo/Dashboard_Pmo";
import Dashoard_std from "./dashboard_student/Dashboard_std";
import Dashoard_supervisor from "./dashboard_supervisor/Dashboard_supervisor";
import Adm_login from "./login/Adm_login";
// function handleValidation(params) {}
function App() {
  // Commit Test
  const { pmo, student, supervisor } = useSelector(
    (state) => state.AuthReducer
  );
  if (supervisor) {
    <div className='App'>
      <Dashoard_supervisor />
    </div>;
  }
  if (pmo) {
    return (
      <div className='App'>
        <Dashoard_Pmo />
      </div>
    );
  }
  if (student) {
    return (
      <div className='App'>
        <Dashoard_std />
      </div>
    );
  } else {
    return (
      <div className='App'>
        <Adm_login />
      </div>
    );
  }
}

export default App;
