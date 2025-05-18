import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../assets/icons/profile-user.png';

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-10 py-5 bg-black bg-opacity-70 text-white">
      <Link to="/home" className="text-2xl font-bold text-orange-500">
        Fit<span className="text-white">Me</span>
      </Link>

      <ul className="flex space-x-8 text-lg font-semibold">
        <li><Link to="/" className="hover:text-orange-400">Attendance Log</Link></li>
        <li><Link to="/" className="hover:text-orange-400">Customer Assistance</Link></li>
        <li><Link to="/" className="hover:text-orange-400">Monitor Progress</Link></li>
      </ul>

      <img
        src={ProfileIcon}
        alt="User"
        className="w-7 h-7 rounded-full object-cover cursor-pointer"
      />
    </nav>
  );
};

export default Navbar;