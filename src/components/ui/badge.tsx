import * as React from "react";

import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({ variant = "default", className, ...props }) => {
  const base = "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs";
  const styles =
    variant === "outline"
      ? "border border-zinc-300 bg-white text-zinc-700"
      : "bg-zinc-900 text-white";

  return <span className={cn(base, styles, className)} {...props} />;
}

