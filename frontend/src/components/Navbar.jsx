import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div className="justify-items-center p-4 fixed top-0 right-0 left-0 ">
      <div className="bg-zinc-800 shadow-lg p-3 w-3/4 md:rounded-full justify-items-center  z-50 ">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-white font-normal text-xl font-sans">
              Samajik Gallery
            </Link>
          </div>

          {/* Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link
              to="/"
              className="text-white bg-slate-700 hover:bg-gray-500 px-3 py-2 rounded-full text-sm"
            >
              Home
            </Link>
            <Link
              to="/"
              className="text-white bg-slate-700 hover:bg-gray-500 px-3 py-2 rounded-full text-sm"
            >
              About
            </Link>
            <Link
              to="/"
              className="text-white bg-slate-700 hover:bg-gray-500 px-3 py-2 rounded-full text-sm"
            >
              Contributors
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />)}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-700 w-full rounded-lg bg-transparent ">
          <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
         
            <Link to="/" className="text-white block px-3 py-2 rounded-full text-base font-medium hover:bg-gray-500">
              Home
            </Link>
            <Link to="/about" className="text-white block px-3 py-2 rounded-full text-base font-medium hover:bg-gray-500">
              About
            </Link>
            <Link to="/services" className="text-white block px-3 py-2 rounded-full text-base font-medium hover:bg-gray-500">
              Services
            </Link>
            <button  
            className="text-white block px-3 py-2 rounded-full text-center font-bold bg-blue-500 hover:bg-blue-700">
              Create
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Navbar;
