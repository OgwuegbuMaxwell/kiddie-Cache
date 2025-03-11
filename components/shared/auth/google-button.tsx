"use client"

import { Button } from "@/components/ui/button"
import { googleAuthenticate } from "@/lib/actions/user.actions"
import { useActionState } from "react"
import { BsGoogle } from "react-icons/bs"


export default function GoogleLogin() {
    const [errorMsgGoogle, dispatchGoogle] = useActionState(googleAuthenticate, undefined)

  return (
    <form className="flex mt-4" action={dispatchGoogle}>
        <Button 
            variant={'outline'}
            className="flex flex-row items-center gap-3 w-full"
        >
            <BsGoogle/>
            Google Sin In
        </Button>
        <p>{errorMsgGoogle}</p>
    </form>
  )
}
