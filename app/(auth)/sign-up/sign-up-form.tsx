'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUpUser } from '@/lib/actions/user.actions'
import { signUpDefaultValues } from '@/lib/constants'
import Link from 'next/link'
import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import GoogleLogin from '@/components/shared/auth/google-button'

export default function SignUpForm() {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: '',
        
    })

    const SignUpButton = () => {
        const { pending } = useFormStatus();
        return (
            <Button className='w-full' variant='default'>
                {
                    pending ? 'Submitting..': 'Sign Up'
                }
            </Button>
        )
    }




  return (
    <>
        <form action={action}>
            <div className="space-y-6">
                <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input 
                        id='name' 
                        name='name' 
                        type='text' 
                        required 
                        autoComplete='name'
                        defaultValue={signUpDefaultValues.name}
                    />
                </div>

                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input 
                        id='email' 
                        name='email' 
                        type='email' 
                        required 
                        autoComplete='email'
                        defaultValue={signUpDefaultValues.email}
                    />
                </div>

                <div>
                    <Label htmlFor='password'>Password</Label>
                    <Input 
                        id='password' 
                        name='password' 
                        type='password' 
                        required 
                        autoComplete='password'
                        defaultValue={signUpDefaultValues.password}
                    />
                </div>

                <div>
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <Input 
                        id='confirmPassword' 
                        name='confirmPassword' 
                        type='password' 
                        required 
                        autoComplete='confirmPassword'
                        defaultValue={signUpDefaultValues.conformPassword}
                    />
                </div>

                <div>
                    <SignUpButton/>
                </div>

                {
                    
                    data && !data.success && (
                        <div className="text-center text-destructive">
                            {
                                data.message
                            }
                        </div>
                    )
                    

                }

                
                {
                    
                    data && data.success && (
                        <div className="text-center text-green-400">
                            {
                                data.message
                            }
                        </div>
                    )
                    

                }


                <div className="text-sm text-center text-muted-foreground">
                        Already have an account?{' '}
                        <Link href='/sign-in' target='_self' className='link'>
                            Sign In
                        </Link>
                </div>
            </div>
        </form>
        
        <GoogleLogin/>
    </>
  )
}


