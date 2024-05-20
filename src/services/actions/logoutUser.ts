import { authKey } from "@/constants/authkey";
import deleteCookies from "./deleteCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const logoutUser = (router: AppRouterInstance) => {
  // removeUserInfo();
  localStorage.removeItem(authKey);
  deleteCookies([authKey, "refreshToken"]);
  router.push("/");
  router.refresh();
};

export default logoutUser;
