import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { privateRoutes } from "./routes";
import { NextResponse } from "next/server";

// Initialize Auth
const { auth } = NextAuth(authConfig);



// Define authentication and API route rules
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authRoutes = ["/login", "/register", "/sign-in", "/sign-up"];

export default auth(async (req) => {

    const { nextUrl, cookies } = req;
    const url = process.env.NODE_ENV === "production"
        ? "https://kiddie-cache.vercel.app"
        : "http://localhost:3000"; // Change when in production

    
    // ✅ **Handle sessionCartId for guest users**
    // eslint-disable-next-line prefer-const
    let sessionCartCookie = cookies.get("sessionCartId");
    let sessionCartId = sessionCartCookie?.value; // Extract the actual cookie value

    if (!sessionCartId) {
        sessionCartId = crypto.randomUUID(); // Generate new ID
        // console.log('Session Cart Cookie Id: ', sessionCartId)

        const response = NextResponse.next();

        response.cookies.set("sessionCartId", sessionCartId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        return response;
    }


    const isLoggedIn = !!req.auth;

    if(!isLoggedIn && privateRoutes.some((p) => p.test(nextUrl.pathname))) {
        const signInUrl = new URL("/sign-in", url); // Change based on your sign-in route
        signInUrl.searchParams.set("callbackUrl", nextUrl.toString()); // Add callback parameter
        return NextResponse.redirect(signInUrl);
    }





    /** 
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
    const isApiRoute = nextUrl.pathname.startsWith("/api");

    // Bypass middleware for API routes
    if (isApiRoute) return NextResponse.next();

    // 🚀 Fix 1: Prevent infinite redirect loops by properly detecting auth state
    if (isLoggedIn && isAuthRoute) {
        // Only redirect if user is logged in AND visiting an authentication page
        if (nextUrl.pathname !== "/account") {
            return NextResponse.redirect(`${url}/account`);
        }
    }

    // console.log('Next Rout', nextUrl.pathname)

    // 🚀 Fix 2: If the user is NOT logged in and tries to visit a protected route, redirect to sign-in
    if (!isLoggedIn && isPrivateRoute) {
        return NextResponse.redirect(`${url}/sign-in`);
    }
    */

    return NextResponse.next();
});

// **Middleware Configuration**
export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  }



