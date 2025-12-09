import * as React from "react";

import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white text-zinc-900 shadow-sm",
        props.className
      )}
      {...props}
    />
  );
}

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div className={cn("space-y-1.5 p-5", props.className)} {...props} />
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => {
  return (
    <h3
      className={cn("text-base font-semibold leading-none tracking-tight", props.className)}
      {...props}
    />
  );
}

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (props) => {
  return (
    <p className={cn("text-sm text-zinc-600", props.className)} {...props} />
  );
}

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div className={cn("p-5", props.className)} {...props} />;
}
