import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Existing utility function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// New function to calculate average
export function calculate_average(scores: number[]): number {
  // Check if input list is empty
  if (scores.length === 0) {
    throw new Error("Input list is empty");
  }

  // Filter out non-negative scores
  const validScores = scores.filter(score => score >= 0);

  // Check if all scores are invalid (negative or zero)
  if (validScores.length === 0) {
    throw new Error("All scores are invalid (negative or zero)");
  }

  // Calculate average
  const sum = validScores.reduce((a, b) => a + b, 0);
  const average = sum / validScores.length;

  return average;
}