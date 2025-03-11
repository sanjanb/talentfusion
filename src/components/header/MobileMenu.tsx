
import React from "react";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md py-4 px-6 animate-slide-down">
      <nav className="flex flex-col space-y-4">
        <NavLinks isMobile />
        <div className="pt-2 flex flex-col space-y-3">
          <AuthButtons isMobile />
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
