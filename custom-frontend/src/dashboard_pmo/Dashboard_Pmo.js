import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Home from '../dashboard_pmo/home'

const Dashoard_Pmo = () => {
    return(
        <BrowserRouter>
            <Navbar />
            <Sidebar />
            <Routes>
                <Route path="/admin" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Dashoard_Pmo;