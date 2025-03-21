import React from "react";
import MobileSideBar from "@/components/MobileSideBar";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="flex items-center p-4 h-[64px]">
      <MobileSideBar />
      <div className="flex justify-end w-full">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-10 h-10",
              userButtonOuterIdentifier: "text-base",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
