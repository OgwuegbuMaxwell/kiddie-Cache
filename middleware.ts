import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { privateRoutes } from "./routes";
import { NextResponse } from "next/server";

// Initialize Auth
const { auth } = NextAuth(authConfig);



// Define authentication and API route rules
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

    // 🚀 Fix 2: If the user is NOT logged in and tries to visit a protected route, redirect to sign-in
    if (!isLoggedIn && isPrivateRoute) {
        return NextResponse.redirect(`${url}/sign-in`);
    }

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



/** 
import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { privateRoutes } from "./routes";
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)

// Middleware function
export default auth(async (req) => {

    // console log request url
    // console.log("Middleware called: ", req.nextUrl.pathname) // Middleware called:  /product/brooks-brothers-long-sleeved-shirt
    
    // Console log auth
    // console.log("Request auth :", req.auth)
    // Request auth : {
    //     user: {
    //     name: 'Ogwuegbu Maxwell',
    //     email: 'maxifreelancing@gmail.com',
    //     image: 'https://lh3.googleusercontent.com/a/ACg8ocIF2jHohcXDH-QWw7TWC5hPzFGVSvDyWU3t0xam_p8su_Iy=s96-c'
    //   },
    //     expires: '2025-04-07T20:01:35.656Z'
    //   }

    // if there is an object, req.auth will return true
    const { nextUrl } = req;
    const url = process.env.NODE_ENV === "production"
        ? "https://kiddie-cache.vercel.app"
        : "http://localhost:3000"; // Change when in production

    const authRoutes = [ "/login", "/register", "/sign-in", "/sign-up"];
    const isLoggedIn = !! req.auth;
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname)

    const isAuthRoute = authRoutes.some(route => nextUrl.pathname.includes(route));
    const isApiRoute = nextUrl.pathname.includes("/api")

    if (isApiRoute) {
        return;
    }

    // If the user is logged in and it is login or register page, you should return the user to home page
    if(isLoggedIn && isAuthRoute) {
        return Response.redirect(`${url}/account`);
    }

    if(isAuthRoute && !isLoggedIn) {
        return;
    }

    if(!isLoggedIn && isPrivateRoute) {
        return Response.redirect(`${url}/sign-in`);
    }
  
})



// Optionally, don't invoke Middleware on some paths
// Copied from clerk
export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  }


  */