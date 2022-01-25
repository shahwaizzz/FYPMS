import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./pages/login.css";
import { ProtectedRoute, Login } from "./pages";
import SharedLayout from "./assets/SharedLayout";
// function handleValidation(params) {}
function App() {
  // Commit Test
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<div>HOme element</div>} />
          <Route path='all-jobs' element={<div>all Jobs</div>} />
          <Route path='add-job' element={<div>add Jobs</div>} />
          <Route path='profile' element={<div>profile</div>} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/landing' element={<div>landing page</div>} />
        <Route path='*' element={<div>Error</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
