import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * This utility allows us to merge Tailwind classes without conflicts.
 * Example: cn("px-2 py-1", "px-4") results in "py-1 px-4" (no duplicate padding)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}