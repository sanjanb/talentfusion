
import React from "react";
import { LogIn, UserPlus } from "lucide-react";
import AnimatedButton from "../ui/AnimatedButton";

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons = ({ isMobile = false }: AuthButtonsProps) => {
  return (
    <>
      <AnimatedButton 
        variant="ghost" 
        size={isMobile ? "default" : "sm"}
        className={cn(
          "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
          isMobile && "justify-center"
        )}
      >
        <LogIn className="mr-1.5 h-4 w-4" />
        <span>Log in</span>
      </AnimatedButton>
      
      <AnimatedButton 
        variant="primary" 
        size={isMobile ? "default" : "sm"}
        animation="scale"
        className={isMobile ? "justify-center" : ""}
      >
        <UserPlus className="mr-1.5 h-4 w-4" />
        <span>Sign up</span>
      </AnimatedButton>
    </>
  );
};

// Adding missing import
import { cn } from "@/lib/utils";

export default AuthButtons;
