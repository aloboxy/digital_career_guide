import React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import Useravatar from "@/components/User-avatar";
import { cn } from "@/lib/utils";

const Loader = ({ message }: { message: ChatCompletionMessageParam }) => {
  return (
    <div className="w-full space-y-4 mt-4">
      <div className="flex flex-col-reverse gap-y-4">
        <div
          className={
            "p-5 lg:p-8 w-full flex flex-col justify-center gap-y-5 rounded-lg bg-muted"
          }
        >
          <div className="flex items-center gap-x-3">
            <Avatar className="w-11 h-11 place-self-start border-2 border-blue-500">
              <AvatarImage src="/logo.png" alt="logo" className="" />
            </Avatar>
            {/* <Skeleton className="w-11 h-11 rounded-full place-self-start bg-gray-400 border-blue-500 border" /> */}
            {/* <Skeleton className="w-[160px] h-5 bg-gray-400" /> */}
            <p className="text-sm font-medium">digitalcareerguidely Lab</p>
          </div>
          <div className="p-5 rounded-lg bg-slate-200 flex flex-col gap-y-3">
            <Skeleton className="w-2/3 lg:w-1/6 h-5 bg-gray-400" />
            <Skeleton className="w-1/3 lg:w-1/3 h-5 bg-gray-400" />
            <Skeleton className="w-3/5 lg:1/4 h-5 bg-gray-400" />
            <Skeleton className="w-3/4 h-5 bg-gray-400" />
            <Skeleton className="w-full h-5 bg-gray-400" />
          </div>
        </div>
        <div
          className={cn(
            "p-5 lg:p-8 w-full flex flex-col justify-center gap-y-5 rounded-lg",
            message.role === "user"
              ? "bg-white border border-black/10 "
              : "bg-muted"
          )}
          key={message.content as string}
        >
          <Useravatar />
          <div
            className={cn(
              "p-3 rounded-lg",
              message.role === "user" ? "bg-gray-100" : "bg-slate-200"
            )}
          >
            <div className="text-sm overflow-hidden leading-7">
              {message.content as string}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
