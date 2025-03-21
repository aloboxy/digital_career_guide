"use client";
import { getConversations } from "@/lib/conversations";
import { Conversation } from "@prisma/client";
import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DashboardConversationList = () => {
  const router = useRouter();
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const fetchConversations = async () => {
    const response = await getConversations();
    setConversations(response);
  };
  useEffect(() => {
    fetchConversations();
  });
  return (
    <div className="py-5">
      <h2 className="text-lg md:text-xl font-bold text-center">
        Your Conversations
      </h2>
      <div className="px-4 md:px-20 lg:px-32 space-y-4 py-5">
        {conversations.toReversed().map((conversation) => (
          <Card
            key={conversation.id}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            onClick={() =>
              router.push(
                `/${
                  conversation.type == "Research"
                    ? "research"
                    : conversation.type == "Teacher"
                    ? "teacher"
                    : "school-tasks"
                }/${conversation.id}`
              )
            }
          >
            <div className="flex gap-x-4 items-center">
              <div className="text-sm">
                {conversation.conversatintitle.substring(0, 20) + "..."}
              </div>
              <Badge variant="secondary" className="px-2">
                {conversation.type}
              </Badge>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardConversationList;
