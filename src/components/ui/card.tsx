import * as React from "react";

import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({className, ...props}) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white text-zinc-900 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({className, ...props}) => {
  return (
    <div className={cn("space-y-1.5 p-5", className)} {...props} />
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({className, ...props}) => {
  return (
    <h3
      className={cn("text-base font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({className, ...props}) => {
  return (
    <p className={cn("text-sm text-zinc-600", className)} {...props} />
  );
}

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({className, ...props}) => {
  return <div className={cn("p-2", className)} {...props} />;
}
