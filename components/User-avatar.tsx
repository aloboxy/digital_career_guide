import React from "react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Useravatar = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center gap-x-3">
      <Avatar className="w-11 h-11 place-self-start border-2 border-green-500">
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <p className="text-sm font-medium">
        {user?.firstName} {user?.lastName}
      </p>
    </div>
  );
};

export default Useravatar;
