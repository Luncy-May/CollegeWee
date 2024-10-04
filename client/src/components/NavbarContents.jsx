import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
const NavbarContents = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "About",
    path: "/about",
    icon: <FaIcons.FaInfoCircle />,
    cName: "nav-text",
  },
  {
    title: "Calendar",
    path: "/calendar",
    icon: <FaIcons.FaCalendar />,
    cName: "nav-text",
  },
  {
    title: "My Plans",
    path: "/myPlans",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaIcons.FaChartBar />,
    cName: "nav-text",
  },
  {
    title: "Community",
    path: "/community",
    icon: <FaIcons.FaPeopleArrows />,
    cName: "nav-text",
  },
  {
    title: "Team",
    path: "/team",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <FaIcons.FaUser />,
    cName: "nav-text",
  },
  {
    title: "Setting",
    path: "/setting",
    icon: <FaIcons.FaCogs />,
    cName: "nav-text",
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];

export default NavbarContents