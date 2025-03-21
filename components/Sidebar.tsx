"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  LayoutDashboard,
  Library,
  MessageSquare,
  School,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import FreeCounter from "@/components/FreeCounter";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Reasearch",
    icon: Library,
    href: "/research",
    color: "text-violet-500",
  },
  {
    label: "School Tasks",
    icon: School,
    href: "/school-tasks",
    color: "text-pink-700",
  },
  {
    label: "Teacher Assistant",
    icon: GraduationCap,
    href: "/teacher",
    color: "text-orange-700",
  },
  {
    label: "My Conversations",
    icon: MessageSquare,
    href: "/conversations",
    color: "text-emerald-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href={"/"} className="flex items-center pl-3 mb-14">
          <div className="relative w-12 h-12 mr-4">
            <Image src="/logo.png" alt="logo" fill className="rounded-full" />
          </div>
          <h1 className="text-sm font-bold uppercase">Digital Career Guide</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname.startsWith(route.href) || pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter />
    </div>
  );
};

export default Sidebar;
