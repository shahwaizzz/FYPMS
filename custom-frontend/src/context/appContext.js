import React, { useContext, useState } from "react";
import axios from "axios";
// token
const token = localStorage.getItem("token");
const pmo = localStorage.getItem("pmo");
const supervisor = localStorage.getItem("supervisor");
const student = localStorage.getItem("student");
const initialState = {
  pmo: pmo ? JSON.parse(pmo) : null,
  supervisor: supervisor ? JSON.parse(supervisor) : null,
  student: student ? JSON.parse(student) : null,
  token: token,
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(null);
  const addUserToLocalStorage = ({ userType, user, token }) => {
    localStorage.setItem(`${userType}`, JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const pmoLogin = async ({ email, password }) => {
    try {
      const { data } = await axios.post(`/api/v1/auth/pmo/login`, {
        email,
        password,
      });
      const { pmo, token } = data;
      addUserToLocalStorage({ userType: "pmo", user: pmo, token });
      window.location.href = "/pmo";
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.msg);
      // alert(error);
    }
  };
  const supervisorLogin = async ({ email, password }) => {
    try {
      const { data } = await axios.post(`/api/v1/auth/supervisor/login`, {
        email,
        password,
      });

      const { supervisor, token } = data;

      addUserToLocalStorage({
        userType: "supervisor",
        user: supervisor,
        token,
      });
      window.location.href = "/supervisor/meetings";
    } catch (error) {
      console.log("msg", error.response.data.msg);
      console.warn("error:", error);
      setError(error.response.data.msg);
      // alert(error)
      // return error.response.data.msg;
    }
  };

  const studentLogin = async ({ email, password }) => {
    try {
      const { data } = await axios.post(`/api/v1/auth/student/login`, {
        email,
        password,
      });

      const { student, token } = data;
      console.log(data);
      console.log(student);

      addUserToLocalStorage({ userType: "student", user: student, token });
      window.location.href = "/student";
    } catch (error) {
      console.log("msg", error.response.data.msg);
      setError(error.response.data.msg);
      // alert(error)
      console.warn("error:", error);
      // return error.response.data.msg;
    }
  };

  const logoutUser = () => {
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        error,
        pmoLogin,
        logoutUser,
        supervisorLogin,
        studentLogin,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
