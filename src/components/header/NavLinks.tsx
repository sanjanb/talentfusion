
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  isMobile?: boolean;
}

const NavLinks = ({ isMobile = false }: NavLinkProps) => {
  const location = useLocation();
  
  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/skills", label: "Skills" },
    { to: "/jobs", label: "Jobs" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link 
          key={link.to}
          to={link.to} 
          className={cn(
            "transition-colors",
            location.pathname === link.to 
              ? "text-blue-600 dark:text-blue-400 font-medium" 
              : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
            isMobile && "py-2"
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
