"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logolight from "../assets/logoLight.png";
import logodark from "../assets/white2.png";
import NavItems from "../utils/NavItems";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [active, setActive] = useState(false)
  const [openSidebar, setOpenSidebar] = useState(false)

  if (typeof window !== "undefined") {
    window.onscroll = () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
  }
  return (
    <>
      <div className="w-full relative ">
        <div
          className={`${
            active
              ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
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
                  <Image src={active ? logolight : logodark} alt="logo" width={80}/>
                  Endless Dev
                  </Link>
                </div>

                <div className="flex items-center">
                  <NavItems activeItem={activeItem} isMobile={false}/>
                </div>

                {/* theme switcher here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
