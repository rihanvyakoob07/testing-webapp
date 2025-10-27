import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// No changes needed in this file as the bug is in demo_bug.py which is not provided.
// However, based on the provided information, it seems like the bug fix is related to a python file.
// Assuming the bug fix is for a hypothetical calculate_average function in a hypothetical demo_bug.py file,
// here is a sample fix:

/*
# demo_bug.py
def calculate_average(scores):
    valid_scores = [score for score in scores if isinstance(score, (int, float)) and score >= 0]
    if not valid_scores:
        raise ValueError("Input list is empty or all scores are invalid.")
    return sum(valid_scores) / len(valid_scores)
*/

// Since the actual bug fix is for demo_bug.py which is not provided, 
// the src/components/ui/badge.tsx remains the same.

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };