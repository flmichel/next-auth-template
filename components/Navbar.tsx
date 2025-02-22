import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { UserHandler } from "./user/User";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md absolute top-0 left-0 right-0">
      {/* Logo */}
      <div className="text-xl font-bold">BunpoAI</div>

      {/* Burger Menu for Mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-gray-700 focus:outline-none">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <SheetContent side="right" className="p-6 flex flex-col space-y-2">
            <a href="#features" className="text-gray-700 hover:text-gray-900">
              Features
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900">
              Pricing
            </a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </a>
            <UserHandler />
          </SheetContent>
        </Sheet>
      </div>

      {/* Navigation Links for Desktop */}
      <div className="hidden md:flex space-x-6">
        <a href="#features" className="text-gray-700 hover:text-gray-900">
          Features
        </a>
        <a href="#pricing" className="text-gray-700 hover:text-gray-900">
          Pricing
        </a>
        <a href="#contact" className="text-gray-700 hover:text-gray-900">
          Contact
        </a>
      </div>

      {/* Auth Buttons for Desktop */}
      <div className="hidden md:flex">
        <UserHandler />
      </div>
    </nav>
  );
}
