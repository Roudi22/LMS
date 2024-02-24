"use client"
import React, { useEffect, useState } from 'react'
import SideBarProfile from './SideBarProfile';
import { useLogOutQuery } from '@/redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

type Props = {}

const Profile = (props: Props) => {
    const [scroll, setScroll] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [active, setActive] = useState(1);
    const [logout, setLogout] = useState(false)
    const {} = useLogOutQuery(undefined, {
      skip: !logout ? true : false, 
    });
    const logoutHandler = async () => {
      setLogout(true);
      await signOut();
      
    }
    
    useEffect(() => {
      const handleScroll = () => {
          setScroll(window.scrollY > 100);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      // Cleanup function to remove the event listener
      return () => {
          window.removeEventListener("scroll", handleScroll);
      };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount
  return (
    <div className='w-[85%] flex mx-auto'>
        <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}>
          <SideBarProfile 
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
          />
        </div>
    </div>
  )
}

export default Profile