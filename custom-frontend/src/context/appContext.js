import React, { useContext, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
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
=======
// token
const token = localStorage.getItem("token");
const pmo = localStorage.getItem("pmo");
const supervisor = localStorage.getItem("supervisor");
const student = localStorage.getItem("student");
const initialState = {
  pmo: pmo ? JSON.parse(pmo) : null,
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956
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

<<<<<<< HEAD
  const removeUserFromLocalStorage = (userinfo,tokenname,route,navigate) => {
    localStorage.removeItem(userinfo);
    localStorage.removeItem(tokenname);
    navigate(route)
=======
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956
  };

  const pmoLogin = async ({ email, password },navigate) => {
    try {
      const { data } = await axios.post(pmologinapi, {
        email,
        password,
      });
      const { pmo, token } = data;
<<<<<<< HEAD
      console.log(data);
      console.log(pmo);

      localStorage.setItem("pmoadmin", JSON.stringify(pmo));
      localStorage.setItem("pmotoken", token);
=======
      addUserToLocalStorage({ userType: "pmo", user: pmo, token });
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956
      window.location.href = "/pmo";

    } catch (error) {
      console.log(error.response.data);
<<<<<<< HEAD
      // return error.response.data;
      erroralert('Error',error.response.data.msg);
=======
      setError(error.response.data.msg);
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956
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

<<<<<<< HEAD
      localStorage.setItem("supervisor", JSON.stringify(supervisor));
      localStorage.setItem("supervisortoken", token);
      window.location.href = "/supervisor/home";
      
    } catch (error) {
      console.log("msg",error.response.data.msg);
      console.warn("error:",error);
      erroralert('Error',error.response.data.msg);

=======
      addUserToLocalStorage({
        userType: "supervisor",
        user: supervisor,
        token,
      });
      window.location.href = "/supervisor/meetings";
    } catch (error) {
      console.log("msg", error.response.data.msg);
      console.warn("error:", error);
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956
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

<<<<<<< HEAD
      localStorage.setItem("student", JSON.stringify(student));
      localStorage.setItem("stdtoken", token);
      window.location.href = "/student/home"
=======
      addUserToLocalStorage({ userType: "student", user: student, token });
      window.location.href = "/student";
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956
    } catch (error) {
      console.log("msg", error.response.data.msg);
      setError(error.response.data.msg);
<<<<<<< HEAD
      
      erroralert('Error',error.response.data.msg);

      console.warn("error:",error);
=======
      // alert(error)
      console.warn("error:", error);
>>>>>>> a21aca909bbc90776c7e2a45f025ae6ac054a956
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
