import React from 'react'
import ModeToggle from './mode-toggler'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { EllipsisVertical, ShoppingCart, UserIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export default function Menu() {
  return (
    <div  className='flex justify-end gap-3'>
        <nav className="hidden md:flex w-full max-w-xs gap-1">
            <ModeToggle/>
            {/* Added asChild because we want to add link inside it */}
            <Button asChild variant='ghost'>
                <Link href='/cart'>
                    <ShoppingCart/> Cart
                </Link>
            </Button>
            <Button asChild >
                <Link href='/sign-in'>
                    <UserIcon/> Sign in
                </Link>
            </Button>
        </nav>

        {/* Small screen only */}
        <nav className='md:hidden'>
            <Sheet>
                {/* sheet trigger */}
                <SheetTrigger>
                    <EllipsisVertical/>
                </SheetTrigger>

                {/* sheet content */}
                <SheetContent className='flex flex-col items-start'>
                    <SheetTitle>Menu</SheetTitle>
                        <ModeToggle/>
                        <Button asChild variant='ghost'>
                            <Link
                                href='/cart'
                            >
                                <ShoppingCart/> Cart
                            </Link>
                        </Button>
                        <Button asChild >
                            <Link href='/sign-in'>
                                <UserIcon/> Sign in
                            </Link>
                        </Button>
                    <SheetDescription></SheetDescription>
                </SheetContent>

            </Sheet>
        </nav>

    </div>
  )
}
