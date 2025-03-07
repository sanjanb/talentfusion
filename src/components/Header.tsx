
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import AnimatedButton from "./ui/AnimatedButton";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-10 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-subtle" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
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
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Dashboard
          </Link>
          <Link to="/portfolio" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Portfolio
          </Link>
          <Link to="/skills" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Skills
          </Link>
          <Link to="/jobs" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Jobs
          </Link>
        </nav>
        
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <AnimatedButton 
            variant="ghost" 
            size="sm"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <LogIn className="mr-1.5 h-4 w-4" />
            <span>Log in</span>
          </AnimatedButton>
          
          <AnimatedButton 
            variant="primary" 
            size="sm"
            animation="scale"
          >
            <UserPlus className="mr-1.5 h-4 w-4" />
            <span>Sign up</span>
          </AnimatedButton>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md py-4 px-6 animate-slide-down">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/dashboard" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/portfolio" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              to="/skills" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Skills
            </Link>
            <Link 
              to="/jobs" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Jobs
            </Link>
            <div className="pt-2 flex flex-col space-y-3">
              <AnimatedButton 
                variant="ghost" 
                className="justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="mr-1.5 h-4 w-4" />
                <span>Log in</span>
              </AnimatedButton>
              
              <AnimatedButton 
                variant="primary" 
                className="justify-center"
                animation="scale"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserPlus className="mr-1.5 h-4 w-4" />
                <span>Sign up</span>
              </AnimatedButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
