"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  GraduationCap,
  Library,
  MessageSquare,
  School,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const tools = [
  {
    label: "Reasearch",
    icon: Library,
    href: "/research",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Career Tasks",
    icon: School,
    href: "/school-tasks",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "My Conversations",
    icon: MessageSquare,
    href: "/conversations",
    color: "text-emerald-500",
    bgColor: "text-emerald-500/10",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl text-center font-bold">
          Digital Career Guide
        </h2>
        <p className="text-muted-foreground text-sm md:text-lg text-center px-4 md:px-20 lg:px-32 font-bold">
          A Digital place where you can get all the information you need to make informed decisions about your career.
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            onClick={() => router.push(tool.href)}
          >
            <div className="flex gap-x-4 items-center">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
