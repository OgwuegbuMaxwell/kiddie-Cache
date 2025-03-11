import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { signInFormSchema } from "./lib/validators";
import { compareSync } from 'bcrypt-ts-edge';


export default {
    providers: [
        GoogleProvider({
           clientId: process.env.GOOGLE_CLIENT_ID,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),

        GitHubProvider({
        
        }),

        
        Credentials({
            credentials: {
                email: {type: 'email'},
                password: {type: 'password'}
            },

            async authorize(credentials) {
                const validateData = signInFormSchema.safeParse(credentials);
                if(!validateData.success) {
                    console.log("Unable to validate user data")
                    return null;
                }

                const {email, password} = validateData.data;

                // moved prisma import here to avoid edge compactibility issues
                const { prisma } = await import("./db/prisma");

                const user = await prisma.user.findFirst({
                    where: {
                        email: email,
                    }
                });


                // if(user) {
                //     console.log("User", user)
                // }

                // Check ifuser exist, and whether user has email and password
                if(!user || !user.password || !user.email) {
                    return null;
                }

                const passwordsMatch = compareSync(password as string, user.password)

                if (passwordsMatch) {
                    return user;
                }

                return null;
            }

        })



    ]
} as NextAuthConfig;


// Updated auth