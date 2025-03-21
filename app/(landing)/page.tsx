"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";

const LandingPage = () => {
  const { isSignedIn } = useAuth();
  const words = ["Job-Opportunities", "Passion", "Innovation"];

  return (
    <div className="">
      <div className="">
        <div className="h-[30rem] sm:h-[40rem] flex flex-col justify-center items-center px-4">
          <div className="flex gap-4 items-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={50}
              height={50}
              className="rounded-full w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] z-50"
            />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold pb-6 pt-2 text-center">
            Digital Career Guide
          </h1>
          <div className="text-center text-xl sm:text-3xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
            <span className="leading-snug">
              Aiding in career guidance for <FlipWords words={words} /> <br />
              Across the Academic Spectrum.
            </span>
          </div>
          <div className="mt-5 flex gap-5">
            {isSignedIn ? (
              <Link href={"/dashboard"}>
                <Button size={"default"}>Go To Dashboard</Button>
              </Link>
            ) : (
              <Link href={"/sign-up"}>
                <Button size={"default"}>Get Started For Free</Button>
              </Link>
            )}
            <Link href={"/contact"}>
              <Button size={"default"} variant={"outline"}>
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
