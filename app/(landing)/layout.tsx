"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import moment from "moment";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useAuth();
  return (
    <>
      <div className="w-full">
        <header className="flex justify-between items-center container py-5">
          <div className="">
            <Link
              href={"/"}
              className="flex gap-2 items-center relative justify-center"
            >
              <Image
                src="/logo.png"
                alt="logo"
                width={50}
                height={50}
                className="rounded-full w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] z-50"
              />
              <div className="absolute w-[53px] h-[53px] sm:w-[63px] sm:h-[63px] rounded-full bg-gradient-to-r from-orange-700 via-violet-500 to-pink-700"></div>
            </Link>
          </div>
          <div className="">
            <div className="block lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"ghost"} size={"icon"}>
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side={"right"} className="p-0">
                  <nav className="">
                    <ul className="flex flex-col gap-5 items-start p-8">
                      {/* <li>
                        <Link href={"/"}>Home</Link>
                      </li>
                      <li>
                        <Link href={"/about"}>About</Link>
                      </li>
                      <li>
                        <Link href={"/contact"}>Contact</Link>
                      </li>
                      <li>
                        <Link href={"/faq"}>FAQ</Link>
                      </li> */}
                      <li>
                        {isSignedIn ? (
                          <Link href={"/dashboard"}>
                            <Button>Dashboard</Button>
                          </Link>
                        ) : (
                          <div className="flex flex-col gap-5 items-start">
                            <Link href={"/sign-in"}>Login</Link>
                            <Link href={"/sign-up"}>
                              <Button size={"sm"}>Get Started</Button>
                            </Link>
                          </div>
                        )}
                      </li>
                    </ul>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <nav className="hidden lg:block">
            <ul className="flex gap-5 items-center">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/about"}>About</Link>
              </li>
              <li>
                <Link href={"/contact"}>Contact</Link>
              </li>
              <li>
                <Link href={"/faq"}>FAQ</Link>
              </li>
              <li>
                {isSignedIn ? (
                  <Link href={"/dashboard"}>
                    <Button>Dashboard</Button>
                  </Link>
                ) : (
                  <div className="flex gap-5 items-center">
                    <Link href={"/sign-in"}>Login</Link>
                    <Link href={"/sign-up"}>
                      <Button>Get Started</Button>
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </header>
      </div>
      {children}
      <footer className="w-full bg-gray-800 p-5 rounded-t-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-4 ">
          <div className="sm:w-full w-fit">
            <Link href={"/"} className="flex items-center flex-col gap-2">
              <Image
                src="/logo.png"
                alt="logo"
                width={50}
                height={50}
                className="rounded-full w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]"
              />
              <h1 className="text-white text-sm text-center">
                Digital Career Guide
              </h1>
            </Link>
          </div>
          <div className="flex flex-col items-start sm:items-center text-white mt-5 sm:mt-0">
            <ul className="flex flex-col gap-2">
              <li className="font-bold text-lg">Pages</li>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/about"}>About Us</Link>
              </li>
              <li>
                <Link href={"/contact"}>Contact Us</Link>
              </li>
              <li>
                <Link href={"/sign-up"}>Sign Up</Link>
              </li>
              <li>
                <Link href={"/sign-in"}>Sign In</Link>
              </li>
              <li>
                <Link href={"/faq"}>FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start sm:items-center text-white sm:mt-0 mt-5">
            <ul className="flex flex-col gap-2">
              <li className="font-bold text-lg">Legal Pages</li>
              <li>
                <Link href={"/termsandconditions"}>Terms & Conditions</Link>
              </li>
              <li>
                <Link href={"/privacypolicy"}>Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-white text-center pt-8">
          <span>© {moment().year()} Digital Career Guide</span>
        </div>
      </footer>
    </>
  );
};

export default Layout;
