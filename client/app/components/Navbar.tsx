"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logolight from "../assets/logoLight.png";
import logodark from "../assets/white2.png";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { useTheme } from "next-themes";
import { HiOutlineMenu, HiUserCircle } from "react-icons/hi";
import CustomModel from "../utils/CustomModel";
import avatar from "../assets/avatar-removebg-preview.png";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Login from "./Auth/Login";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
}

const Navbar = ({ route, setRoute, open, setOpen, activeItem }: Props) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const {user} = useSelector((state: any) => state.auth)
  const {data} = useSession();
  const [socialAuth, {isSuccess,error}] = useSocialAuthMutation(); // using the useSocialAuthMutation hook to login the user from authApi
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    if(!user) {
      if(data) {
        socialAuth({email: data?.user?.email, name: data?.user?.name, avatar: data?.user?.image})
      }
    }
    if(isSuccess){
      toast.success("Login successful");
    }
  }, [data,user])
  
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      {setOpenSidebar(false);}
    }
  };

  
  return (
    <>
      <div className="w-full relative ">
        <div
          className={`${
            active
              ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
              : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
          }`}
        >
          <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
            <div className="w-full h-[80px] flex items-center justify-between p-3">
              <div>
                <Link
                  href={`/`}
                  className={`flex items-center cursor-pointer gap-3 text-[25px] font-Poppins font-[500] text-black dark:text-white `}
                >
                  <Image
                    src={theme === "light" ? logolight : logodark}
                    alt="logo"
                    width={80}
                  />
                  Endless Dev
                </Link>
              </div>

              <div className="flex items-center">
                <NavItems activeItem={activeItem} isMobile={false} />

                {/* theme switcher here */}
                <ThemeSwitcher />
                {/* only for mobile */}
                <div className="flex items-center 800px:hidden">
                  <HiOutlineMenu
                    size={25}
                    className="cursor-pointer text-black dark:text-white"
                    onClick={() => setOpenSidebar(true)}
                  />
                </div>
                {
                  user ? (
                    <Link
                    href={`/profile`}
                    >
                      <Image
                      src={user?.avatar ? user.avatar : avatar}
                      alt="user"
                      width={40}
                      height={40}
                      />
                    </Link>
                    ) : (
                      
                      
                  <HiUserCircle
                  size={25}
                  className="cursor-pointer 800px:block hidden text-black dark:text-white"
                  onClick={() => setOpen(true)}
                />
                      
                  )
                }
              </div>
            </div>
          </div>

          {/* Mobile sidebar */}
          {openSidebar && (
            <div
              className="800px:hidden fixed w-full h-screen top-0 left-0 z-[9999] dark:bg-[unset] bg-[#00000024]"
              onClick={handleClose}
              id="screen"
            >
              <div className="w-[70%] fixed z-[99999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                <Link
                  href={`/`}
                  className={`flex mt-4 items-center justify-center cursor-pointer gap-3 text-[25px] font-Poppins font-[500] text-black dark:text-white `}
                >
                  <Image
                    src={active || theme === "light" ? logolight : logodark}
                    alt="logo"
                    width={80}
                  />
                  Endless Dev
                </Link>
                <NavItems activeItem={activeItem} isMobile={true} />
                <HiUserCircle
                  size={25}
                  className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                  onClick={() => setOpen(true)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}

      {route === "Sign-up" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </>
  );
};

export default Navbar;
