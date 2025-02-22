"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client"; // Adjust the import path as needed
import { CreditCard, LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserHandler() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  if (isPending) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Failed to load user</div>;
  }

  async function logout() {
    console.log("why??");
    await authClient.signOut();
    refetch();
  }

  return (
    <div className="mt-auto flex flex-col space-y-4">
      {session ? (
        // Show user avatar if logged in
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link href="/profile">
                <Avatar className="cursor-pointer w-12 h-12">
                  <AvatarImage src={session.user.image!} alt="User Avatar" />
                  <AvatarFallback>
                    {session.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2"
                  role="menuitem"
                  aria-label="Log out"
                >
                  <LogOut />
                  <span>Log out</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        // Show login/sign-up buttons if not logged in
        <div className="space-x-4">
          <Link href="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link href="/register">
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
