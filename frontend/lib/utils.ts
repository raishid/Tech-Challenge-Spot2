import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";
import { setCookie } from "cookies-next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUserCookie() {
  const u_id = v4();
  setCookie("u_id", u_id);
  return u_id;
}

export function isValidUrl(url: string) {
  const reg = /^(http|https):\/\/[^ "]+$/.test(url);
  if (reg === false) {
    return false;
  }

  const urlObj = new URL(url);
  if (urlObj) {
    return true;
  }

  return false;
}
