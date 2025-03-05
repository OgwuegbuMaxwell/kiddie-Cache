import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { APP_NAME } from "@/lib/constants"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import CredentialsSigninForm from "./credentials-signin-form"
import { auth } from "@/auth"
import { redirect } from "next/navigation"


export const metadata: Metadata = {
    title: 'Sign In'
}


export default async function SignInPage(props: {searchParams: Promise<{callbackUrl: string}>}) {

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
                <CardTitle className="text-center">Sign In</CardTitle>
                <CardDescription className="text-center">
                    Sign in to your account
                </CardDescription>
            </CardHeader>

            {/* card content */}
            <CardContent>
                {/* form */}
                <CredentialsSigninForm/>
            </CardContent>
        </Card>
    </div>
  )
}
