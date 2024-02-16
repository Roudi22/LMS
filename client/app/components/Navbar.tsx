"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logolight from "../assets/logoLight.png";
import logodark from "../assets/white2.png";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { useTheme } from "next-themes";
import { HiOutlineMenu, HiUserCircle } from "react-icons/hi";
import CustomModel from "../utils/CustomModel";
import login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
interface Props {
  route: string;
  setRoute: (route: string) => void;
}

const Navbar = ({ route, setRoute }: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { theme, setTheme } = useTheme();
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
      setOpenSidebar(false);
    }
    setOpenSidebar(false);
  };
  return (
    <>
      <div className="w-full relative ">
        <div
          className={`${"dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"}`}
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
                <HiUserCircle
                  size={25}
                  className="cursor-pointer 800px:block hidden text-black dark:text-white"
                  onClick={() => setOpen(true)}
                />
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
              component={login}
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
