import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const Header =  async () => {
  await checkUser();

  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-2 py-1.3 flex justify-between items-center">
        <Link href="/">
          <Image src="/ET_logo.jpeg" alt="Logo" width={60} height={100} className="h-12 w-auto object-contain" />
        </Link>
        <div>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <div className="flex items-center gap-4">
                <SignInButton fallbackRedirectUrl="/dashboard" mode="redirect">
                  <Button variant="outline">Login</Button>
                </SignInButton>
                <SignUpButton mode="redirect">
                   <button className="bg-[#aa98ef] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                   </button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard" className="text-gray-800 hover:text-blue-600 flex items-center gap-2">
                <Button variant="outline">
                  <LayoutDashboard size={18} />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>

              <Link href="/transaction/create">
                <Button className="flex items-center gap-2">
                  <PenBox size={18} />
                  <span className="hidden md:inline">Add Transaction</span>
                </Button>
              </Link>
              <UserButton appearance={{ elements: { userButton: { avatarBox: "w-10 h-10" } } }} />
            </SignedIn>
          </header>
        </div>
      </nav>
    </div>
  );
};

export default Header;
