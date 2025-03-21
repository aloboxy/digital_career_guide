import { getConversations } from "@/lib/conversations";
import { cn } from "@/lib/utils";
import { Conversation } from "@prisma/client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowBigRight, ArrowRight } from "lucide-react";

const ConversationList = ({
  type,
}: {
  type: "Research" | "Teacher" | "SchoolTask" | undefined;
}) => {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);

  const fetchConversations = async () => {
    const conversations = await getConversations(type);
    setConversations(conversations);
    return conversations;
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  if (!conversations || conversations.length === 0) {
    return null;
  }

  if (type === undefined) {
    return (
      <div className="px-4 lg:px-8">
        <div className="border w-full rounded-lg bg-white">
          {conversations.length === 0 && (
            <div className="text-center p-4">No conversations found</div>
          )}
          {conversations.toReversed().map((conversation, index) => (
            <Link
              href={`/${
                conversation.type == "Research"
                  ? "research"
                  : conversation.type == "Teacher"
                  ? "teacher"
                  : "school-tasks"
              }/${conversation.id}`}
              key={conversation.id}
            >
              <div
                className={cn(
                  "flex-1 p-2 lg:p-3 flex items-center justify-between text-xs lg:text-sm w-full h-14 lg:h-16",
                  index === conversations.length - 1 ? "" : "border-b"
                )}
              >
                <div className="flex gap-2 items-center">
                  <ArrowRight size={20} />
                  {conversation.conversatintitle.substring(0, 25) + "..."}
                </div>
                <Badge variant="secondary" className="px-2">
                  {conversation.type}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-8 bg-[#F1EBE4]">
      <h3 className="text-sm font-bold">Previous conversations</h3>
      <div className="flex py-3 lg:py-4 gap-3 lg:gap-5 absolute w-full border-b overflow-x-auto z-50 bg-[#F1EBE4] pr-6">
        {conversations.toReversed().map((conversation) => (
          <Link
            href={`/${
              conversation.type == "Research"
                ? "research"
                : conversation.type == "Teacher"
                ? "teacher"
                : "school-tasks"
            }/${conversation.id}`}
            key={conversation.id}
          >
            <div className="bg-white flex-1 p-2 lg:p-3 rounded-lg text-xs lg:text-sm w-44 h-12 lg:h-16 overflow-hidden">
              {conversation.conversatintitle.substring(0, 30)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
