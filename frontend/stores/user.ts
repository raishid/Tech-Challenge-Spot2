import { Store } from "@tanstack/react-store";
import { getCookie, hasCookie } from "cookies-next";
import { generateUserCookie } from "@/lib/utils";

export function useUserStore() {
  let uid = getCookie("u_id");
  if (hasCookie("u_id") === false) {
    uid = generateUserCookie();
  }

  return new Store({
    u_id: uid,
  });
}
