import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge';

import type { NextAuthConfig } from 'next-auth';


export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in', 
        // signOut: '/sign-out',
        
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days

    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: {type: 'email'},
                password: {type: 'password'}
            },
            async authorize(credentials) {
                if(credentials == null) return null;

                // Find user in database
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email as string
                    }
                });

                // Check if user exist and password matches
                if(user && user.password) {
                    const isMatch = compareSync(credentials.password as string, user.password)

                    // If password is correct, return the user
                    if (isMatch) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                    }
                }

                // If user does not exist or the password does not match, return null
                return null;
            }
        }),
    ],

    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({session, user, trigger, token}: any) {
            // Set the user id from the token
            session.user.id = token.sub;
            session.user.role = token.role;
            session.user.name = token.name;


            console.log('User token',token)
            // User token {
            //     name: 'Chioma',
            //     email: 'chioma@gmail.com',
            //     sub: 'd5a7dd63-9d02-4bd0-85b3-12585194e4d5',
            //     role: 'user',
            //     iat: 1741255604,
            //     exp: 1743847604,
            //     jti: '9862e97c-cdc2-4721-94dc-c240528e6c15'
            //   }

            // If there is an update, set the user name
            if (trigger === 'update') {
                session.user.name = user.name
            }
            return session
        },

        // 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({token, user}: any) {
            // Assign user fields to the token
            if (user) {
                token.role = user.role;

                // If user has no name, then use the email
                if(user.name === 'NO_NAME') {
                    token.name = user.email!.split('@')[0]
                }

                // Update the database to reflect the token name
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {name: token.name}
                })
            }
            return token
        }
    }


}satisfies NextAuthConfig;



export const { handlers, auth, signIn, signOut } = NextAuth(config)








