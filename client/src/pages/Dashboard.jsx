import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import { useState } from "react"
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPost from "../components/DashPost";
import DashUsers from "../components/DashUser";
import DashComments from "../components/DashComment";
import DashboardComp from "../components/DashboardComp"
export default function Dashboard() {
  const location = useLocation();
  const [tab , setTab ]  = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const  tabFromUrl = urlParams.get('tab');
    // console.log(tabFromUrl); //Profile
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
    <div  className="md:w-56">

    {/* Sidebar */}
    <DashSidebar />

    </div>
    {/* Profile */}
  {tab === 'profile' && <DashProfile/>}

  {/* Posts    */}
  {tab === 'posts' && <DashPost/>}

  {/* User */}
  {tab === 'users' && <DashUsers/>}

  {/* Comments */}
  {tab === 'comments' && <DashComments/>}

  {tab === 'dash' && <DashboardComp/>}

    </div>
  )
}
