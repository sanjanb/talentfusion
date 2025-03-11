
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 text-blue-600 dark:text-blue-400"
    >
      <div className="relative">
        <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center transform -rotate-6 transition-transform duration-300 hover:rotate-0">
          <span className="text-white font-bold text-lg">T</span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-md bg-blue-400 dark:bg-blue-300 transform rotate-12 transition-transform duration-300 hover:rotate-0" />
      </div>
      <span className="font-bold text-xl tracking-tight">TalentFusion</span>
    </Link>
  );
};

export default Logo;
