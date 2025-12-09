import * as React from "react";

import { cn } from "../../lib/utils";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ScrollArea: React.FC<ScrollAreaProps> = (props) => {
  return (
    <div
      className={cn(
        "relative overflow-auto [scrollbar-width:thin] [scrollbar-color:#d4d4d4_transparent]",
        props.className
      )}
      {...props}
    />
  );
}

