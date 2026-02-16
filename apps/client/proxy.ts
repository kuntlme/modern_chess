import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";

import { auth } from "@/lib/auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  landingPageRoute,
  publicRoutes,
} from "@/routes";

import authConfig from "./lib/auth.config";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isProfileComplete = req.auth?.user.profileComplete;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isLandingRoute = nextUrl.pathname == landingPageRoute;

  const isOnboardingRoute = nextUrl.pathname == "/onboarding";

  if (isLandingRoute) return null;

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn && !isProfileComplete && !isOnboardingRoute) {
    return Response.redirect(new URL("/onboarding", nextUrl));
  }

  if (isLoggedIn && isProfileComplete && isOnboardingRoute) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  return null;
});

export const config = {
  // copied from clerk
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
