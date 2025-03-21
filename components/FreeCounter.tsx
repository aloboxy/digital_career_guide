"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Timer, Zap } from "lucide-react";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";
import { mutate } from "swr";
import { cn } from "@/lib/utils";
import { useProModal } from "@/context/ProModalProvider";

interface ApiLimitType {
  id: string;
  userid: string;
  count: number;
  resetTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const fetchApiLimit = async () => {
  const apiLimitCount = await fetch("/api/freetoken");
  const data = await apiLimitCount.json();
  return data;
};

const FreeCounter = () => {
  const { setShowModal } = useProModal();
  const {
    data: apiLimit = {} as ApiLimitType,
    isLoading,
    isValidating,
    error,
  } = useSWR("get/apiLimitCount", fetchApiLimit, {
    revalidateOnMount: true,
  });

  if (error) return null;

  if (isLoading) {
    return <Skeleton className=" h-40 m-3 bg-white/10"></Skeleton>;
  }

  return (
    <div className="px-3">
      {apiLimit.count >= MAX_FREE_COUNTS && (
        <div className="rounded-lg px-6 py-4 bg-white/10 my-3 flex gap-2">
          <Timer className="w-6 h-6" />
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold">Out of Free Tokens!</h1>
            <p className="text-xs py-1">
              New free tokens after:{" "}
              {moment(apiLimit.resetTime).format("hh:mm A")}
            </p>
          </div>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="h-5 w-5"
            onClick={() => mutate("get/apiLimitCount")}
            disabled={isValidating}
          >
            <RefreshCcw
              className={cn("w-4 h-4", isValidating && "animate-spin")}
            />
          </Button>
        </div>
      )}
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-4">
            <p>
              {apiLimit.count} / {MAX_FREE_COUNTS} Free Tokens
            </p>

            <Progress
              className="h-3"
              value={(apiLimit.count / MAX_FREE_COUNTS) * 100}
            />

            <Button className="w-full" onClick={() => setShowModal(true)}>
              Upgrade Plan <Zap className="w-4 h-4 ml-2 fill-white" />{" "}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
