'use server'

import { paymentMethodSchema, shippingAddressSchema, signInFormSchema, signUpFormSchema } from "../validators"
import { auth, signIn, signOut } from '@/auth'
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { hashSync } from "bcrypt-ts-edge"
import { prisma } from "@/db/prisma"
import { formatError } from "../utils"
import { AuthError } from "next-auth"
import { ShippingAddressType } from "@/types"
import { z } from "zod"

// Sign in user with credentials
export async function signInWithCredentials_Old_One(prevState: unknown, formData: FormData) {
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
export async function signOutUser_Old_One() {
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







// Sign in user with credentials
export async function signInWithCredentials(prevState: unknown, formData: FormData) {
    
    const validateData = signInFormSchema.parse({
        email: formData.get('email'),
        password: formData.get('password')
    });


    if(!validateData) {
        return {
            success: false,
            message: 'Invalid email or password'
        }
    }


    const { email, password } = validateData;

    // Check if user exist based on the email provided
    const userExist = await prisma.user.findFirst({
        where: {
            email: email,
        }
    })

    // !userExist.password: if user sign in with google provider, they are not
    // going to have password on the user model.
    // So we want that only way to login through credential is by having a password also
    if(!userExist || !userExist.password || !userExist.email) {
        return {
            success: false,
            message: 'Invalid email or password',
            
        }
    }


    try {
        await signIn('credentials', {
            email: userExist.email,
            password: password,
            // redirect: true,  // Disable automatic redirect
        });

    } catch (error) {
        if (error instanceof AuthError) {
            console.log('Credential error: ', error)
            switch (error.type) {
                case "CredentialsSignin":
                    return {success: false, message: 'Invalid credentials'};
                default :
                return {success: false, message: 'Please confirm your email address'};
            }
        }
    }

    return {
        success: true,
        message: 'Signed in successfully',
    }



}



// Sign user out
export async function signOutUser() {
    await signOut();
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

        // format user data
        user.password = hashSync(user.password, 10);
        user.email = user.email.toLowerCase();

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



//  Sign in user with Google
export async function googleAuthenticate() {
    try {
        await signIn('google')
    } catch (error) {
        if (error instanceof AuthError)  {
            return 'google log in failed'
        }

        throw error
        
    }
}



// Get user by the ID
export async function getUserById(userId: string) {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (!user) throw new Error('User not found');
    return user;
  }



// Update the user's address
export async function updateUserAddress(data: ShippingAddressType) {
    try {
      const session = await auth();
  
      const currentUser = await prisma.user.findFirst({
        where: { id: session?.user?.id },
      });
  
      if (!currentUser) throw new Error('User not found');
  
      const address = shippingAddressSchema.parse(data);
  
      await prisma.user.update({
        where: { id: currentUser.id },
        data: { address },
      });
  
      return {
        success: true,
        message: 'User updated successfully',
      };
    } catch (error) {
      return { success: false, message: formatError(error) };
    }
  }


// Update user's payment method
export async function updateUserPaymentMethod(
    data: z.infer<typeof paymentMethodSchema>
  ) {
    try {
      const session = await auth();
      const currentUser = await prisma.user.findFirst({
        where: { id: session?.user?.id },
      });
  
      if (!currentUser) throw new Error('User not found');
  
      const paymentMethod = paymentMethodSchema.parse(data);
  
      await prisma.user.update({
        where: { id: currentUser.id },
        data: { paymentMethod: paymentMethod.type },
      });
  
      return {
        success: true,
        message: 'User updated successfully',
      };
    } catch (error) {
      return { success: false, message: formatError(error) };
    }
  }
















