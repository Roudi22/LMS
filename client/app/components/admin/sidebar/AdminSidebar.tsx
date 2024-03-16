import React, { useState } from "react";
import { FaQuestion, FaUsers } from "react-icons/fa6";
import Link from "next/link";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { FaBookAtlas } from "react-icons/fa6";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { FiLayout } from "react-icons/fi";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import darkLogo from "../../../assets/white2.png";
import avatarDefault from "../../../assets/avatar-removebg-preview.png";
import "./AdminSidebar.css";
import { MdCategory, MdDashboard } from "react-icons/md";
import { GiTeamIdea } from "react-icons/gi";
import { GrAnalytics } from "react-icons/gr";
import { TbReportAnalytics } from "react-icons/tb";
import { SiSimpleanalytics } from "react-icons/si";
import { SlLogout } from "react-icons/sl";

interface Props {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item = ({ title, to, icon, selected, setSelected }: Props) => {
  return (
    <li onClick={() => setSelected(title)}>
      <Link className={`Link ${selected === title ? "active":""}`} href={to}>
        <i>{icon}</i>
        <span className="links_name">{title}</span>
      </Link>
      <span className="tooltip">{title}</span>
    </li>
  );
};
const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setlogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  return (
    <div className={`sidebar ${isCollapsed ? "" : "open"}`}>
      <div className="logo-details">
        <Image src={darkLogo} className="icon" width={60} alt="logo" />
        <div className="logo_name">Endless Dev</div>
        <ArrowForwardIosIcon id="btn" onClick={()=> setIsCollapsed(prev => !prev)}/>
      </div>
      <ul className="nav-list">
        <Item
          title="Dashboard"
          to="/admin"
          selected={selected}
          setSelected={setSelected}
          icon={<MdDashboard />}
        />
        <Item
          title="Users"
          to="/admin/users"
          selected={selected}
          setSelected={setSelected}
          icon={<FaUsers />}
        />
        <Item
          title="Invoices"
          to="/admin/invoices"
          selected={selected}
          setSelected={setSelected}
          icon={<FaFileInvoiceDollar />}
        />
        <Item
          title="Create Course"
          to="/admin/courses"
          selected={selected}
          setSelected={setSelected}
          icon={<FaBookAtlas />}
        />
        <Item
          title="Hero"
          to="/admin/hero"
          selected={selected}
          setSelected={setSelected}
          icon={<FiLayout />}
        />
        <Item
          title="FAQ"
          to="/admin/faq"
          selected={selected}
          setSelected={setSelected}
          icon={<FaQuestion />}
        />
        <Item
          title="Categories"
          to="/admin/categories"
          selected={selected}
          setSelected={setSelected}
          icon={<MdCategory />}
        />
        <Item
          title="Manage Team"
          to="/admin/team"
          selected={selected}
          setSelected={setSelected}
          icon={<GiTeamIdea />}
        />
        <Item
          title="Courses Analytics"
          to="/admin/courses-analytics"
          selected={selected}
          setSelected={setSelected}
          icon={<GrAnalytics />}
        />
        <Item
          title="Order Analytics"
          to="/admin/order-analytics"
          selected={selected}
          setSelected={setSelected}
          icon={<TbReportAnalytics />}
        />

        <Item
          title="Users Analytics"
          to="/admin/users-analytics"
          selected={selected}
          setSelected={setSelected}
          icon={<SiSimpleanalytics />}
        />

<Item
        title="Logout"
        to="/"
        selected={selected}
        setSelected={setSelected}
        icon={<SlLogout/>}
        />
      </ul>
    </div>
  );
};

export default AdminSidebar;
