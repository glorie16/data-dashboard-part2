import { Outlet, Link } from "react-router-dom"
import Sidebar from "../components/Sidebar";
import "../components/components.css"

function Layout(){
  return (
 <div className="layout-wrapper">

        
      <div>
              <Sidebar/>
      </div>
      <main className="main-content">
      <Outlet />
      </main>
 
    </div>
  )
}

export default Layout