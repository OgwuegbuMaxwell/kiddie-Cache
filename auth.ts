import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
// import CredentialsProvider from 'next-auth/providers/credentials'
// import { compareSync } from 'bcrypt-ts-edge';

// import type { NextAuthConfig } from 'next-auth';
import authConfig from './auth.config';
import { getUserById } from './db/user';
import { getAccountByUserId } from './db/account';




export const {auth, handlers: {GET, POST}, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {strategy: 'jwt'},
    ...authConfig,
    callbacks: {

        // THis is going to be called, if the user is allowed to sign in or not
        // it is called when the user try to sign in
        async signIn({user, account}) {
                // console.log("user SignIn (user): ", user)
                // console.log("user SignIn (account): ", user)
                if (account?.provider !== 'credentials') {
                    // console.log("Account provider: ", account?.provider)
                    // result: Account provider:  google

                    return true;
                }

                if (!user.id) return false

                const existingUser = await getUserById(user.id)

                if(!existingUser?.emailVerified) {
                    return false;
                }

                return true;
        },

        async jwt({token}) {
            // console.log('JWT: ', token)
            // JWT:  {
            //     name: 'Ogwuegbu Maxwell',
            //     email: 'maxifreelancing@gmail.com',
            //     picture: 'https://lh3.googleusercontent.com/a/ACg8ocIF2jHohcXDH-QWw7TWC5hPzFGVSvDyWU3t0xam_p8su_Iy=s96-c',
            //     sub: 'd869fdb5-05bb-405e-8acc-ce7bf7c468ff',
            //     iat: 1741439914,
            //     exp: 1744031914,
            //     jti: 'c7bdb49a-2239-43a2-9737-12cee9d06164'
            //   }

            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub)

            if(!existingUser) return token;

            // console.log('User object: ', existingUser)
            // User object:  {
            //     id: 'd869fdb5-05bb-405e-8acc-ce7bf7c468ff',
            //     name: 'Ogwuegbu Maxwell',
            //     email: 'maxifreelancing@gmail.com',
            //     ....
            //   }


            // Check if they have existing account
            // which means they logged in with Google provider... or other provider
            const existingAccount = getAccountByUserId(existingUser.id)
            // if existingAccount, we set token.isOauth to true
            token.isOauth = !!existingAccount;
            // becuase if you update the name in the database, it will reflect in the token
            // although it is not advicible to allow user update there name if they sign in with google
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.image = existingUser.image;

            return token;

        },

        async session({token, session}) {
            // console.log("Session Token: ", token)
            // Session Token:  {
            //     name: 'Ogwuegbu Maxwell',
            //     email: 'maxifreelancing@gmail.com',
            //     picture: 'https://lh3.googleusercontent.com/a/ACg8ocIF2jHohcXDH-QWw7TWC5hPzFGVSvDyWU3t0xam_p8su_Iy=s96-c',
            //     sub: 'd869fdb5-05bb-405e-8acc-ce7bf7c468ff',
            //     iat: 1741439914,
            //     exp: 1744031914,
            //     jti: 'c7bdb49a-2239-43a2-9737-12cee9d06164',
            //     isOauth: true,
            //     image: 'https://lh3.googleusercontent.com/a/ACg8ocIF2jHohcXDH-QWw7TWC5hPzFGVSvDyWU3t0xam_p8su_Iy=s96-c'
            //   }

            // console.log("Session Object: ", session)
            // Session Object:  {
            //     user: {
            //       name: 'Ogwuegbu Maxwell',
            //       email: 'maxifreelancing@gmail.com',
            //       image: 'https://lh3.googleusercontent.com/a/ACg8ocIF2jHohcXDH-QWw7TWC5hPzFGVSvDyWU3t0xam_p8su_Iy=s96-c'
            //     },
            //     expires: '2025-04-07T14:27:05.955Z'
            //   }

            return {
                ...session,
                // update the user to add extra fields
                user: {
                    ...session.user,
                    id: token.sub,
                    isOauth: token.isOauth,

                }
            };
        }
    },

})


// The sub is the ID
// d869fdb5-05bb-405e-8acc-ce7bf7c468ff
// d869fdb5-05bb-405e-8acc-ce7bf7c468ff







/** 
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge';

import type { NextAuthConfig } from 'next-auth';

// Cookie




export const config = {
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days

    },

    pages: {
        signIn: '/sign-in',
        error: '/sign-in', 
        // signOut: '/sign-out',
        
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },

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
        // Session
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({session, user, trigger, token}: any) {
            // Set the user id from the token
            session.user.id = token.sub;
            // session.user.role = token.role;
            // session.user.name = token.name;


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

        // JWT
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
        },



    }


}satisfies NextAuthConfig;



export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth(config)


*/





