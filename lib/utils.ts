import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { SKILLS_BASE_PATH } from "@/constants";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSkillImagePath = (src: string) => {
  return SKILLS_BASE_PATH + src;
};