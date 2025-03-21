import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const BotAvatar = () => {
  return (
    <div className="flex items-center gap-x-3">
      <Avatar className="w-11 h-11 place-self-start border-2 border-blue-500">
        <AvatarImage src="/logo.png" alt="logo" className="" />
      </Avatar>
      <p className="text-sm font-medium">Digital Career Guide</p>
    </div>
  );
};

export default BotAvatar;
