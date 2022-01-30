import React, { useContext, useState } from "react";
import axios from "axios";
import { supervisorloginapi,studentloginapi,pmologinapi } from "../apis";
import {useNavigate} from 'react-router-dom'
import {erroralert} from '../components/alert'
import Swal from 'sweetalert2'

const token = localStorage.getItem("token");
const adminpmo = localStorage.getItem("pmoadmin");
const supervisor = localStorage.getItem("supervisor");
const student = localStorage.getItem("student");
console.log(adminpmo,supervisor,student)
const initialState = {
  isPMO: false,
  isStudent: false,
  isSupervisor: false,
  adminpmo: adminpmo ? JSON.parse(adminpmo) : null,
  supervisor: supervisor ? JSON.parse(supervisor) : null,
  student: student ? JSON.parse(student) : null,
  token: token,
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(null);
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = (userinfo,tokenname,route,navigate) => {
    localStorage.removeItem(userinfo);
    localStorage.removeItem(tokenname);
    navigate(route)
  };

  const pmoLogin = async ({ email, password },navigate) => {
    try {
      const { data } = await axios.post(pmologinapi, {
        email,
        password,
      });

      const { pmo, token } = data;
      console.log(data);
      console.log(pmo);

      localStorage.setItem("pmoadmin", JSON.stringify(pmo));
      localStorage.setItem("pmotoken", token);
      window.location.href = "/pmo";

    } catch (error) {
      console.log(error.response.data);
      // return error.response.data;
      erroralert('Error',error.response.data.msg);
      // alert(error);
    }
  };
  const supervisorLogin = async ({ email, password },navigate) => {
    console.log(email, password);
    try {
      const { data } = await axios.post(supervisorloginapi, {
        email,
        password,
      });


      const { supervisor, token } = data;
      console.log(data);
      console.log(supervisor);

      localStorage.setItem("supervisor", JSON.stringify(supervisor));
      localStorage.setItem("supervisortoken", token);
      window.location.href = "/supervisor/home";
      
    } catch (error) {
      console.log("msg",error.response.data.msg);
      console.warn("error:",error);
      erroralert('Error',error.response.data.msg);

      setError(error.response.data.msg);
      // alert(error)
      // return error.response.data.msg;
    }
  };

  const studentLogin = async ({ email, password }) => {
    try {
      const { data } = await axios.post(studentloginapi, {
        email,
        password,
      });

      const { student, token } = data;
      console.log(data);
      console.log(student);

      localStorage.setItem("student", JSON.stringify(student));
      localStorage.setItem("stdtoken", token);
      window.location.href = "/student/home"
    } catch (error) {
      console.log("msg",error.response.data.msg);
      setError(error.response.data.msg);
      
      erroralert('Error',error.response.data.msg);

      console.warn("error:",error);
      // return error.response.data.msg;
    }
  };

  // const logoutUser = (userinfo) => {
  //   removeUserFromLocalStorage(userinfo);
  // };

  return (
    <AppContext.Provider
      value={{
        ...state,
        error,
        pmoLogin,
        // logoutUser,
        supervisorLogin,
        studentLogin,
        setError,
        removeUserFromLocalStorage
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
