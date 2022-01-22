import React, { useState } from "react";
import "./components/login/index.css";
import { useSelector } from "react-redux";
import Dashoard_Pmo from "./components/dashboard_pmo/Dashboard_Pmo";
import Dashoard_std from "./components/dashboard_student/Dashboard_std";
import Dashoard_supervisor from "./components/dashboard_supervisor/Dashboard_supervisor";
import Adm_login from "./components/login/Adm_login";
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
        <Dashoard_Pmo />
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
        <Adm_login />
      </div>
    );
  }
}

export default App;
