import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomAvatarUrl(): string {
  const randomSeed = Math.floor(Math.random() * 1000);
  return `https://api.dicebear.com/6.x/lorelei/svg?seed=${randomSeed}`;
}

