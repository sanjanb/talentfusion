
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type ButtonProps } from "@/components/ui/button";

interface AnimatedButtonProps extends Omit<ButtonProps, 'variant'> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "link" | "primary" | "secondary" | "destructive";
  animation?: "pulse" | "float" | "scale" | "none";
  className?: string;
}

const AnimatedButton = ({
  children,
  variant = "default",
  animation = "none",
  className,
  ...props
}: AnimatedButtonProps) => {
  const getAnimationClass = () => {
    switch (animation) {
      case "pulse":
        return "hover:animate-skill-pulse";
      case "float":
        return "hover:animate-float";
      case "scale":
        return "transition-transform hover:scale-105";
      case "none":
      default:
        return "";
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300";
      case "secondary":
        return "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow transition-all duration-300";
      default:
        return "";
    }
  };

  // Only pass standard button variants to the Button component
  const buttonVariant = (variant !== "primary" && variant !== "secondary") ? variant : "default";

  return (
    <Button
      variant={buttonVariant}
      className={cn(
        "relative overflow-hidden",
        getAnimationClass(),
        variant === "primary" || variant === "secondary" ? getVariantClass() : "",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AnimatedButton;
