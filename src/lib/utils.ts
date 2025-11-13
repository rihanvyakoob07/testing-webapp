import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Existing utility function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// New utility function to handle division by zero
export function safeDivide(a: number, b: number): number | string {
  // Check if denominator is zero
  if (b === 0) {
    return "Error: Cannot divide by zero";
  }
  // Perform division if denominator is non-zero
  return a / b;
}