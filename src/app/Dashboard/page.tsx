"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard: React.FC = () => {
    const router =useRouter();
    
    useEffect(()=>{
        const isAuthenticated=localStorage.isAuthenticated;
        if(!isAuthenticated){
            router.push('/Login')
        }
    },[router])
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return (
        <>
        {isAuthenticated?(
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>):(<h1>Unauthorized access</h1>)
        }
        </>
    );
  };
  
  export default Dashboard;
  