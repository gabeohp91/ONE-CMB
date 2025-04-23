"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        success: "bg-green-100 text-green-800 hover:bg-green-200",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        danger: "bg-red-100 text-red-800 hover:bg-red-200",
        info: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        outline: "border border-input bg-background",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        pending: "bg-orange-100 text-orange-800 hover:bg-orange-200",
        complete: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
        onhold: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        canceled: "bg-slate-100 text-slate-800 hover:bg-slate-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {
  icon?: React.ReactNode;
}

export const StatusBadge = ({
  className,
  variant,
  icon,
  children,
  ...props
}: StatusBadgeProps) => {
  return (
    <div className={cn(statusVariants({ variant }), className)} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  );
};