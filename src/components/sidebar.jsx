"use client";

import { useState } from "react";
import {
  FaBook,
  FaChalkboardTeacher,
  FaBrain,
  FaRobot,
  FaBolt,
  FaFileAlt,
  FaUserGraduate,
  FaBriefcase,
  FaMedal,
  FaLaptopCode,
  FaUsers,
  FaComments,
  FaVideo,
  FaCalendarAlt,
  FaTrophy,
  FaCog,
  FaChartBar,
  FaCoins,
  FaBuilding,
  FaPuzzlePiece,
  FaGamepad,
  FaAward,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Learning Hub",
    icon: <FaBook className="text-blue-400" />, 
    items: [
      { name: "Courses", icon: <FaChalkboardTeacher className="text-blue-500" /> },
      { name: "Roadmap Generator", icon: <FaBrain className="text-green-500" /> },
      { name: "AI Mock Test", icon: <FaRobot className="text-yellow-400" /> },
      { name: "Crash Course Generator", icon: <FaBolt className="text-orange-400" /> },
      { name: "Notes PDF Download", icon: <FaFileAlt className="text-purple-400" /> },
    ],
  },
  {
    title: "Career Development",
    icon: <FaUserGraduate className="text-green-400" />, 
    items: [
      { name: "Resume Builder", icon: <FaBriefcase className="text-blue-500" /> },
      { name: "Mock Interview", icon: <FaMedal className="text-yellow-500" /> },
      { name: "Code Editor", icon: <FaLaptopCode className="text-orange-500" /> },
    ],
  },
  {
    title: "Community Space",
    icon: <FaUsers className="text-blue-300" />,
    items: [
      { name: "Discussion", icon: <FaComments className="text-blue-400" /> },
      { name: "Video Chat", icon: <FaVideo className="text-green-400" /> },
      { name: "Text Chat", icon: <FaComments className="text-yellow-400" /> },
    ],
  },
  {
    title: "Events & Updates",
    icon: <FaCalendarAlt className="text-red-400" />,
    items: [
      { name: "Hackathons", icon: <FaTrophy className="text-yellow-400" /> },
      { name: "Events", icon: <FaCalendarAlt className="text-green-500" /> },
      { name: "Updates", icon: <FaBolt className="text-blue-500" /> },
    ],
  },
  {
    title: "Account Settings",
    icon: <FaCog className="text-gray-400" />,
    items: [
      { name: "Profile Settings", icon: <FaCog className="text-blue-500" /> },
      { name: "Leaderboard", icon: <FaChartBar className="text-green-500" /> },
      { name: "Points & Rewards", icon: <FaCoins className="text-yellow-500" /> },
      { name: "Certificates", icon: <FaAward className="text-orange-500" /> },
    ],
  },
  // {
  //   title: "Jobs",
  //   icon: <FaBriefcase className="text-purple-400" />,
  //   items: [
  //     { name: "Internships", icon: <FaMedal className="text-blue-500" /> },
  //     { name: "Jobs", icon: <FaBuilding className="text-green-500" /> },
  //     { name: "Company Details", icon: <FaChartBar className="text-yellow-500" /> },
  //   ],
  // },
  {
    title: "Gamification",
    icon: <FaTrophy className="text-yellow-400" />,
    items: [
      { name: "Interactive Quizzes", icon: <FaPuzzlePiece className="text-blue-500" /> },
      { name: "Puzzles", icon: <FaGamepad className="text-red-500" /> },
      { name: "Educational Games", icon: <FaGamepad className="text-green-500" /> },
    ],
  },
];

export default function Sidebar({ toggleSidebar }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <div className="w-72 min-h-screen bg-gray-900 text-white p-5 flex flex-col fixed top-0 left-0 z-50">
      <button
        className="absolute top-4 right-4 text-white"
        onClick={toggleSidebar}
      >
        X
      </button>
      <div className="flex items-center gap-3 mb-6">
        <img
          src="./"
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-gray-700"
        />
        <div>
          <h2 className="text-lg font-semibold">Ritik Ray</h2>
          <p className="text-sm text-gray-400">Student</p>
        </div>
      </div>
      <nav className="flex-1">
        {menuItems.map((menu, index) => (
          <div key={index} className="mb-4">
            <div
              className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-800"
              onClick={() => toggleMenu(index)}
            >
              {menu.icon}
              <span className="font-medium">{menu.title}</span>
            </div>
            {openMenu === index && (
              <ul className="ml-6 mt-2 space-y-2">
                {menu.items.map((item, subIndex) => (
                  <li
                    key={subIndex}
                    className="flex items-center gap-2 p-2 text-sm cursor-pointer hover:text-yellow-400"
                  >
                    {item.icon}
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
      {/* Premium Access Card */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-center shadow-lg">
        <h3 className="text-lg font-semibold">👑 Premium Access</h3>
        <p className="text-sm text-gray-200 mt-1">
          Unlock all features and get exclusive content
        </p>
        <button className="mt-3 bg-white text-blue-700 font-medium px-4 py-2 rounded-md"
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}>
          Upgrade Now
        </button>
        </div>
      <div className="flex items-center gap-2 p-2 mt-6 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700">
        <FaSignOutAlt />
        <span>Logout</span>
      </div>
    </div>
  );
}
