import React from 'react'
import { useAppContext } from '../../../context/appContext'
import { useNavigate } from 'react-router-dom';
export function PmoLogout() {
  const navigate = useNavigate()
    const { removeUserFromLocalStorage } = useAppContext();
    function logout(){
        removeUserFromLocalStorage('pmoadmin','pmotoken','/login',navigate)
    }
    logout();
    return (
        <div>
            Logout
        </div>
    )
}
export function Supervisorlogout() {
  const navigate = useNavigate()
    const { removeUserFromLocalStorage } = useAppContext();
    function logout(){
        removeUserFromLocalStorage('supervisor','supervisortoken','/auth/supervisor',navigate)
    }
    logout();
    return (
        <div>
            Logout
        </div>
    )
}
export function Stdlogout() {
  const navigate = useNavigate()
    const { removeUserFromLocalStorage } = useAppContext();
    function logout(){
        removeUserFromLocalStorage('student','stdtoken','/auth/student',navigate)
    }
    logout();
    return (
        <div>
            Logout
        </div>
    )
}

