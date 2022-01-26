import React from 'react'
import { useAppContext } from '../../../context/appContext'
export default function Logout() {
    const { removeUserFromLocalStorage } = useAppContext();
    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // alert('Logout Successfully');
        window.location.href="/login";
    }
    logout();
    return (
        <div>
            Logout
        </div>
    )
}
