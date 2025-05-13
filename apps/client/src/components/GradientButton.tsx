
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-[0px]",
          variant === "primary" && 
            "bg-gradient-to-r from-purple-600 to-blue-500 text-white",
          variant === "secondary" && 
            "bg-gradient-to-r from-pink-500 to-purple-600 text-white",
          variant === "outline" && 
            "gradient-border bg-background text-foreground dark:text-white",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GradientButton.displayName = "GradientButton";

export default GradientButton;
