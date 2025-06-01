import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileIcon from '../assets/icons/profile-user.svg';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleClickOutside = (e) => {
      if (
        isMobile &&
        showDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !profileRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isMobile, showDropdown]);

  const isActive = (path) =>
    location.pathname === path ? 'text-orange-400' : 'hover:text-orange-400';

  return (
    <nav className="w-full bg-black bg-opacity-70 text-white px-6 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Left - Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-6 h-6 text-orange-400" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Center - Logo */}
        <Link
          to="/home"
          className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-orange-500 md:static md:transform-none"
        >
          Fit<span className="text-white">Me</span>
        </Link>

        {/* Center - Nav Links (Desktop Only) */}
        <ul className="hidden md:flex gap-10 text-lg font-semibold mx-auto">
          <li>
            <Link to="/attendance" className={isActive('/attendance')}>
              Attendance Log
            </Link>
          </li>
          <li>
            <Link to="/assistance" className={isActive('/assistance')}>
              Customer Assistance
            </Link>
          </li>
          <li>
            <Link to="/monitor" className={isActive('/monitor')}>
              Monitor Progress
            </Link>
          </li>
        </ul>

        {/* Right - Profile Icon with Dropdown */}
        <div
          ref={profileRef}
          className="relative flex items-center cursor-pointer"
          onMouseEnter={() => !isMobile && setShowDropdown(true)}
          onMouseLeave={() => !isMobile && setShowDropdown(false)}
          onClick={() => isMobile && setShowDropdown((prev) => !prev)}
        >
          <img
            src={ProfileIcon}
            alt="User"
            className="w-7 h-7 rounded-full object-cover"
          />
          {showDropdown ? (
            <ChevronUp className="w-4 h-4 ml-1 text-orange-400" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-1 text-orange-400" />
          )}

          <div
            ref={dropdownRef}
            onMouseEnter={() => !isMobile && setShowDropdown(true)}
            onMouseLeave={() => !isMobile && setShowDropdown(false)}
            className={`absolute right-0 top-10 mt-1 bg-[#1f2937] text-white text-sm rounded-md shadow-lg py-2 w-40 transition-all duration-500 ${
              showDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            <Link to="/account" className="block px-4 py-2 hover:bg-[#374151]">
              Account
            </Link>
            <Link to="/logout" className="block px-4 py-2 hover:bg-[#374151]">
              Sign Out
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4 px-4 text-lg font-semibold">
          <li>
            <Link
              to="/attendance"
              className={isActive('/attendance')}
              onClick={() => setIsOpen(false)}
            >
              Attendance Log
            </Link>
          </li>
          <li>
            <Link
              to="/assistance"
              className={isActive('/assistance')}
              onClick={() => setIsOpen(false)}
            >
              Customer Assistance
            </Link>
          </li>
          <li>
            <Link
              to="/monitor"
              className={isActive('/monitor')}
              onClick={() => setIsOpen(false)}
            >
              Monitor Progress
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
