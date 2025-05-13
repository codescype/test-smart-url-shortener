
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Link as LinkIcon } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeProvider";

const Navbar = () => {

  const NavLinks = () => (
    <div className="backdrop-blur-sm bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/80 rounded-lg p-1 flex shadow-sm">
      <Link
        href="/"
        className={cn(
          "px-4 py-2 rounded-md transition-all duration-200",
          "hover:bg-gray-100/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300"
        )}
      >
        Home
      </Link>
      <Link
        href="/list"
        className={cn(
          "px-4 py-2 rounded-md transition-all duration-200",
          "hover:bg-gray-100/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300"
        )}
      >
        Links
      </Link>
    </div>
  );

  return (
    <>
      {/* Fixed top header */}
      <header className="w-full py-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-sm fixed bottom-6 left-1/2 transform -translate-x-1/2 md:relative md:top-0 md:translate-x-0 z-50 md:w-full md:left-0 border border-gray-200/80 dark:border-gray-700/80 rounded-lg transition-all duration-200 m-x-6 md:m-x-0">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
              <LinkIcon className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800 dark:text-gray-100">
              ShortLink
            </span>
          </Link>

          <NavLinks />

          <ThemeToggle />
        </div>
      </header>
    </>
  );
};

export default Navbar;
