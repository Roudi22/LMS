import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import profileImg from "../../assets/avatar-removebg-preview.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

type Props = {
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: any;
};

const SideBarProfile = ({
  active,
  avatar,
  setActive,
  logoutHandler,
}: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
        src={user?.avatar || avatar ? user?.avatar.url || avatar : profileImg}
        alt="profile-image"
        width={30}
        height={40}
        className="cursor-pointer rounded-full"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black" >
            My Account
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black"  />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black"  />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Enrolled Courses
        </h5>
      </div>
      {
        user.role === "admin" && (
          <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <MdOutlineAdminPanelSettings size={20} className="dark:text-white text-black"  />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Admin Dashboard
        </h5>
      </div>
        )
      }

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={()=>logoutHandler()}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black"  />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
