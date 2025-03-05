import { auth } from '@/auth'
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { signOutUser } from '@/lib/actions/user.actions';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default async function UserButton() {

    const session = await auth();

    if(!session) {
        return (
            <Button asChild >
                <Link href='/sign-in'>
                    <UserIcon/> Sign in
                </Link>
            </Button>
        )
    }

    const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'User';

    return (
        <div className='flex gap-2 items-center'>
            <DropdownMenu>
                {/* menu trigger */}
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center">
                        <Button variant='ghost'
                            className='relative h-8 rounded-full ml-2 flex items-center 
                            justify-center bg-gray-200 '
                        >
                            {firstInitial}
                        </Button>
                    </div>
                </DropdownMenuTrigger>

                {/* content */}
                <DropdownMenuContent className='w-56 ' align='end' forceMount>
                    <DropdownMenuLabel className='font-normal'>
                        <div className="flex flex-col space-y-1">
                            <div className="text-sm font-medium leading-none">
                                {
                                    session.user?.name
                                }
                            </div>
                            <div className="text-sm text-muted-foreground leading-none">
                                {
                                    session.user?.email
                                }
                            </div>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuItem className='P-0 mb-1'>
                        <form action={signOutUser} className='w-full'>
                                <Button className='w-full py-4 justify-start ' variant='ghost'>
                                    Sign Out
                                </Button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>

            </DropdownMenu>
        </div>
    )
}
