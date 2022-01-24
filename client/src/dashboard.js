import React from 'react'
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Footer from './components/footer';
export default function Dashboard() {
    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <Footer/>
        </div>
    )
}
