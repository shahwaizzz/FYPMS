import React, { useContext, useState } from "react";
import axios from "axios";
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isPMO: false,
  isStudent: false,
  isSupervisor: false,
  user: user ? JSON.parse(user) : null,
  token: token,
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const pmoLogin = async ({ email, password }) => {
    try {
      const { data } = await axios.post(`/api/v1/auth/pmo/login`, {
        email,
        password,
      });

      const { pmo, token } = data;
      console.log(data);
      console.log(pmo);

      addUserToLocalStorage({ user: pmo, token });
      window.location.href = "/pmo";
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const supervisorLogin = async ({ email, password }) => {
    try {
      const { data } = await axios.post(`/api/v1/auth/supervisor/login`, {
        email,
        password,
      });

      const { supervisor, token } = data;
      console.log(data);
      console.log(supervisor);

      addUserToLocalStorage({ user: supervisor, token });
      window.location.href = "/supervisor/meetings";
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const logoutUser = () => {
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        pmoLogin,
        logoutUser,
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
