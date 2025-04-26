import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 flex justify-around
        ${scrolled ? "bg-white text-black shadow" : "bg-black text-white"}
      `}
    >
      <div className="flex justify-around items-center p-5 h-16">
        <span className="text-2xl font-semibold">UrbanNest</span>
      </div>

      <SignedOut>
        <div className="items-center">
          <Button className="cursor-pointer mt-3 hover:bg-white hover:text-black">
            <SignInButton className="cursor-pointer" />
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex justify-between items-center">
          <ul className="grid grid-cols-3 gap-5">
            <Link to="/">
              <li className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                Home
              </li>
            </Link>
            <Link to="/products">
              <li className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                Products
              </li>
            </Link>
          </ul>
          <UserButton />
        </div>
      </SignedIn>
    </nav>
  );
};

export default Navbar;
