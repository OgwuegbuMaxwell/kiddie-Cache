import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
// import CredentialsProvider from 'next-auth/providers/credentials'
// import { compareSync } from 'bcrypt-ts-edge';

// import type { NextAuthConfig } from 'next-auth';
import authConfig from './auth.config';
import { getUserById } from './db/user';
import { getAccountByUserId } from './db/account';
import { cookies } from 'next/headers';
import { getSessionCart, mergeSessionCartToUser } from './lib/actions/cart.actions';





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

        async jwt({token, trigger}) {
            // avalaible after signed in only

            // console.log('JWT: ', token)
            // JWT:  {
            //     name: 'MY NAME',
            //     email: 'max*******@gmail.com',
            //     picture: 'https://lh3.googleusercontent.com/a/ACg8ocI*********3t0xam_p8su_Iy=s96-c',
            //     sub: 'd869fdb5-******c468ff',
            //     iat: 1741439914,
            //     exp: 1744031914,
            //     jti: 'c7bdb49a-2******d06164'
            //   }

            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub)

            if(!existingUser) return token;

            // console.log('User object: ', existingUser)
            // User object:  {
            //     id: 'd869fdb5-05***e-8acc-c*****8ff',
            //     name: 'MY NAME',
            //     email: 'ma****n@gmail.com',
            //     ....
            //   }


            // Check if they have existing account
            // which means they logged in with Google provider... or other provider
            const existingAccount = getAccountByUserId(existingUser.id)
            // if existingAccount, we set token.isOauth to true
            token.isOauth = !!existingAccount;



            if (trigger === 'signIn' || trigger === 'signUp') {
                const cookiesObject = await cookies();
                const sessionCartId = cookiesObject.get('sessionCartId')
                // console.log('I was triggered: ', sessionCartId)
                if(sessionCartId) {
                    const sessionCart = await getSessionCart(sessionCartId.value)

                    // Override any existing user cart with the session cart
                    if (sessionCart) {
                        await mergeSessionCartToUser(sessionCartId.value, existingUser.id);
                    }
                }
            }

            // YOU CAN ALSO HANDLE update TRIGGER
            // if (trigger === 'update') {
                // ....
            // }

            // becuase if you update the name in the database, it will reflect in the token
            // although it is not advisible to allow user update there name if they sign in with google
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.image = existingUser.image;
            token.role = existingUser.role // Add role

            return token;

        },

        async session({token, session}) {
            // console.log("Session Token: ", token)
            // Session Token:  {
            //     name: 'MY NAME',
            //     email: 'ma****@gmail.com',
            //     picture: 'https://lh3.googleusercontent.com/a/ACg8ocIF2jHohcXDH-Q*****SvDyWU3t0xam_p8su_Iy=s96-c',
            //     sub: 'd869fdb5-05bb-405e-8acc-ce7bf....',
            //     iat: 1741439914,
            //     exp: 1744031914,
            //     jti: 'c7bdb49a-2239-43a2-9737-12cee9d06...',
            //     isOauth: true,
            //     image: 'https://lh3.googleusercontent.com/a/ACg8ocIF2jH*******vDyWU3t0xam_p8su_Iy=s96-c'
            //   }

            // console.log("Session Object: ", session)
            // Session Object:  {
            //     user: {
            //       name: 'MY NAME',
            //       email: 'ma****@gmail.com',
            //       image: 'https://lh3.googleusercontent.com/a/ACg8ocI***ohcXDH-QWw7*****zFGVSvDyWU3t0xam_p8su_Iy=s96-c'
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
                    role: token.role,

                }
            };
        }
    },

})














