"use client"; // client component

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react"; // Import signOut from next-auth
import { UserIcon } from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserButtonClient({ session }: { session: any }) {
  // const router = useRouter(); // Use router in a client component

  if (!session) {
    return (
      <Button asChild>
        <Link href="/sign-in">
          <UserIcon /> Sign in
        </Link>
      </Button>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "U";

  const handleSignOut = async () => {
    // await signOut({ redirect: false }); // Prevents full-page reload
    // router.replace("/sign-in"); // Ensure URL updates properly
    await signOut();
  };

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        {/* menu trigger */}
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>

        {/* content */}
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">{session.user?.name}</div>
              <div className="text-sm text-muted-foreground leading-none">{session.user?.email}</div>
            </div>
          </DropdownMenuLabel>

          {/* User profile */}
          <DropdownMenuItem>
            <Link href='/user/profile' className='w-full'>
                    User Profile
            </Link>
         </DropdownMenuItem>

          {/* Order History */}
          <DropdownMenuItem>
            <Link href='/user/orders' className='w-full'>
                    Order History
            </Link>
          </DropdownMenuItem>

          {
            session?.user?.role === 'admin' && (
          //  Admin
          <DropdownMenuItem>
            <Link href='/admin/overview' className='w-full'>
                    Admin
            </Link>
          </DropdownMenuItem>
            )
          }



          {/* Sign out button */}
          <DropdownMenuItem className="p-0 mb-1">
            <Button className="w-full py-0 px-2 justify-start" variant="ghost" onClick={handleSignOut}>
              Sign Out
            </Button>
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}



// import { auth } from '@/auth'
// import { Button } from '@/components/ui/button';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { signOutUser } from '@/lib/actions/user.actions';
// import { UserIcon } from 'lucide-react';
// import Link from 'next/link';
// import React from 'react'


// export default async function UserButton() {


//     const session = await auth();

//     if(!session) {
//         return (
//             <Button asChild >
//                 <Link href='/sign-in'>
//                     <UserIcon/> Sign in
//                 </Link>
//             </Button>
//         )
//     }

//     const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'User';



//     return (
//         <div className='flex gap-2 items-center'>
//             <DropdownMenu>
//                 {/* menu trigger */}
//                 <DropdownMenuTrigger asChild>
//                     <div className="flex items-center">
//                         <Button variant='ghost'
//                             className='relative h-8 rounded-full ml-2 flex items-center 
//                             justify-center bg-gray-200 '
//                         >
//                             {firstInitial}
//                         </Button>
//                     </div>
//                 </DropdownMenuTrigger>

//                 {/* content */}
//                 <DropdownMenuContent className='w-56 ' align='end' forceMount>
//                     <DropdownMenuLabel className='font-normal'>
//                         <div className="flex flex-col space-y-1">
//                             <div className="text-sm font-medium leading-none">
//                                 {
//                                     session.user?.name
//                                 }
//                             </div>
//                             <div className="text-sm text-muted-foreground leading-none">
//                                 {
//                                     session.user?.email
//                                 }
//                             </div>
//                         </div>
//                     </DropdownMenuLabel>

//                     <DropdownMenuItem>
//                         <Link href='/user/profile' className='w-full'>
//                                 User Profile
//                         </Link>
//                     </DropdownMenuItem>

//                     <DropdownMenuItem>
//                         <Link href='/user/orders' className='w-full'>
//                                 Order History
//                         </Link>
//                     </DropdownMenuItem>

//                     <DropdownMenuItem className='p-0 mb-1'>
//                         <form action={signOutUser} className='w-full '>
//                                 <Button className='w-full py-2 px-2 justify-start' variant='ghost'>
//                                 Sign Out
//                                 </Button>
//                         </form>
//                     </DropdownMenuItem>

//                 </DropdownMenuContent>

//             </DropdownMenu>
//         </div>
//     )
// }

