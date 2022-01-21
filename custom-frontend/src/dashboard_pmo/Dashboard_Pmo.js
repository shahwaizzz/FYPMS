import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Home from '../dashboard_pmo/home'
import Events from "./events";

const Dashoard_Pmo = () => {
    return(
        // <BrowserRouter>
        <div>
            <Navbar />
            <Sidebar />
            <Events/>
            </div>
        //      <Routes>
        //         <Route path="/admin" element={<Home />} />
        //     </Routes> 
        // </BrowserRouter>
    )
}
export default Dashoard_Pmo;