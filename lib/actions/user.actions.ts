'use server'

import { signInFormSchema, signUpFormSchema } from "../validators"
import { signIn, signOut } from '@/auth'
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { hashSync } from "bcrypt-ts-edge"
import { prisma } from "@/db/prisma"
import { formatError } from "../utils"

// Sign in user with credentials
export async function signInWithCredentials(prevState: unknown, formData: FormData) {
    try {
        const user = signInFormSchema.parse({
            email: formData.get('email'),
            password: formData.get('password')
        });

        await signIn('credentials', user);
        return {
            success: true,
            message: 'Signed in successfully'
        }
    } catch (error) {
        if(isRedirectError(error)) {
            throw error;
        }

        return {
            success: false,
            message: 'Invalid email or password'
        }
    }
}



// Sign user out
export async function signOutUser() {
    await signOut();
}



// Sign up user
export async function signUpUser_Old_One(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        })

        const plainPassword= user.password;

        user.password = hashSync(user.password, 10);

        const res = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        })

        console.log("Sign Up Response: ", res)

        // sign the user in after successful sign up
        await signIn('credentials', {
            email: user.email,
            password: plainPassword,
        });

        return {
            success: true,
            message: 'User registered successfully'
        }


    } catch (error) {
        if(isRedirectError(error)) {
            console.log("Sign Up Redirect Error: ", error)
            throw error;
        }

        return {
            success: false,
            message: 'User was not registered'
        }
    }
    
}


// Sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        });

        const plainPassword = user.password;
        user.password = hashSync(user.password, 10);

        const res = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });

        console.log("Sign Up Response: ", res);

        // Sign in the user but prevent automatic redirect
        const signInResult = await signIn("credentials", {
            email: user.email,
            password: plainPassword,
            redirect: false, // Prevents NextAuth from automatically redirecting
        });
        

        if (signInResult?.error) {
            return { 
                success: false, 
                message: "Login failed after signup" 
            };
        }

        // Return a redirect path so the client can handle redirection
        return {
            success: true,
            message: "User registered successfully",
            redirectTo: "/", // Now client-side useEffect can redirect
        };

    } catch (error) {

        // Not needed again though, we have solve the problem in the 
        // try block and and sign up form componenet
        if(isRedirectError(error)) {
            console.log("Sign Up Redirect Error: ", error)
            throw error;
        }



        //  Some possible errors to catch
        // console.log("Name Error: ", error.name)
        // console.log("Code Error: ", error.code)
        // console.log("Error Error: ", error.error)
        // console.log("Meta target Error: ", error.meta?.target)
        // console.log(error)
        // console.log(error.errors)
        
        
        return { 
            success: false, 
            // message: "User was not registered" 
            message: formatError(error),
        };
    }
}


