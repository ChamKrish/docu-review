import * as React from "react";

import { cn } from "../../lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const Separator: React.FC<SeparatorProps> = ({ orientation = "horizontal", ...props }) => {
  const isVertical = orientation === "vertical";

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "bg-zinc-200",
        isVertical ? "h-full w-px" : "h-px w-full",
        props.className
      )}
      {...props}
    />
  );
}

