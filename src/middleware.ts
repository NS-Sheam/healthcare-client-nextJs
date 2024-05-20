import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { USER_ROLE } from "./constants/role";

const commonPrivateRoutes = ["/dashboard", "/dashboard/change-password"];
const authRoutes = ["/login", "/register"];
const roleBasedPrivateRoutes = {
  PATIENT: [/^\/dashboard\/patient/],
  DOCTOR: [/^\/dashboard\/doctor/],
  ADMIN: [/^\/dashboard\/admin/],
  SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};

type IRole = keyof typeof USER_ROLE;
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (accessToken && commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  let decodedData = null;

  if (accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }

  const role = decodedData?.role;

  //   if (role === USER_ROLE.ADMIN && pathname.startsWith("/dashboard/admin")) {
  //     return NextResponse.next();
  //   }

  if (role && roleBasedPrivateRoutes[role as IRole]) {
    const routes = roleBasedPrivateRoutes[role as IRole];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:page*"],
};
