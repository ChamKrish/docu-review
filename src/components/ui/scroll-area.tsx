import * as React from "react";

import { cn } from "../../lib/utils";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-auto [scrollbar-width:thin] [scrollbar-color:#d4d4d4_transparent]",
          className
        )}
        {...props}
      />
    );
  }
);

ScrollArea.displayName = "ScrollArea";
