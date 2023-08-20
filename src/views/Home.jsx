import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'


const Home = () => {
  return (
    <div>
    {/* START PAGE CONTAINER */}
        <div className="page-container">
            {/* START PAGE SIDEBAR */}
            <SideBar/>
            {/* END PAGE SIDEBAR */}
            {/* PAGE CONTENT */}
            <div className="page-content">
            {/* START X-NAVIGATION VERTICAL */}
            <Header/>
            {/* END X-NAVIGATION VERTICAL */}  
            <Outlet/>                   
            </div> 
        </div>
    </div>

  )
}

export default Home