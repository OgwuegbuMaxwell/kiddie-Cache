"use client"; // Make this a client component

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react"; // Import signOut from next-auth
import { UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserButtonClient({ session }: { session: any }) {
  const router = useRouter(); // Use router in a client component

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
    await signOut({ redirect: false }); // Prevents full-page reload
    router.replace("/sign-in"); // Ensure URL updates properly
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

          {/* Sign out button */}
          <DropdownMenuItem className="P-0 mb-1">
            <Button className="w-full py-4 justify-start" variant="ghost" onClick={handleSignOut}>
              Sign Out
            </Button>
          </DropdownMenuItem>

          {/* My Account Link */}
          <DropdownMenuItem className="P-0 mb-1">
            <Button variant={"ghost"} className="flex-1">
              <Link href={"/account"}>My Account</Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
