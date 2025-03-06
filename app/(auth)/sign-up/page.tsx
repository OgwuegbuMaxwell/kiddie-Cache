import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { APP_NAME } from "@/lib/constants"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import SignUpForm from "./sign-up-form"


export const metadata: Metadata = {
    title: 'Sign Up'
}


export default async function SignUpPage(props: {searchParams: Promise<{callbackUrl: string}>}) {

    const { callbackUrl  } = await  props.searchParams;

    const session = await auth();
    if (session) {
        return redirect(callbackUrl || '/');
    }


    // Console logs
    // console.log("Session Data:", session); // Debugging session


  return (
    <div className="w-full max-w-md mx-auto">
        <Card>
            {/* card header */}
            <CardHeader className="space-y-4">
                <Link href='/' className="flex-center">
                    <Image
                        src='/images/kid1.png'
                        alt={`${APP_NAME}`}
                        width={100}
                        height={100}
                        priority={true}
                    />
                </Link>
                <CardTitle className="text-center">Create Acount</CardTitle>
                <CardDescription className="text-center">
                    Enter your information below to sign up
                </CardDescription>
            </CardHeader>

            {/* card content */}
            <CardContent className="space-y-4">
                {/* form */}
                <SignUpForm/>
            </CardContent>
        </Card>
    </div>
  )
}
