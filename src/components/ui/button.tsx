import * as React from "react";

import { cn } from "../../lib/utils";

type Variant = "default" | "outline" | "text";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  default:
    "bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 active:translate-y-px",
  outline:
    "border border-zinc-300 bg-white text-zinc-900 shadow-sm hover:bg-zinc-50 active:translate-y-px",
  text: "text-zinc-700 hover:bg-zinc-100",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-9 px-3 text-sm",
  lg: "h-10 px-4 text-base",
};

export const Button: React.FC<ButtonProps> =
  ({ variant = "default", size = "md", ...props }) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
          variantStyles[variant],
          sizeStyles[size],
          props.className
        )}
        {...props}
      />
    );
  }

Button.displayName = "Button";
