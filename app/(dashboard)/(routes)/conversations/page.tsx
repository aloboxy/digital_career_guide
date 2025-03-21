"use client";
import Heading from "@/components/Heading";
import axios from "axios";
import { GraduationCap, MessageSquare } from "lucide-react";
import React from "react";

const Conversations = () => {
  return (
    <div className="h-[calc(100vh-164px)] overflow-hidden">
      <Heading
        title={"My Conversations"}
        description="Your Previous Conversations"
        icon={MessageSquare}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
    </div>
  );
};

export default Conversations;
