import { cn } from "@/lib/utils";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import React, { useState } from "react";
import Useravatar from "@/components/User-avatar";
import BotAvatar from "@/components/Bot-Avatar";
import ReactMarkDown from "react-markdown";
import CodeBlock from "@/components/CodeBlock";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Copy, TextCursorInput } from "lucide-react";
import SelectText from "@/components/SelectText";

const MessageOutput = ({
  messages,
}: {
  messages: ChatCompletionMessageParam[];
}) => {
  const [showSelectDialog, setShowSelectDialog] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  return (
    <>
      <SelectText
        showSelectDialog={showSelectDialog}
        setShowSelectDialog={setShowSelectDialog}
        text={selectedText}
      />
      {messages.toReversed().map((message) => {
        if (message.role === "system") {
          return null;
        }
        return (
          <div
            className={cn(
              "p-5 lg:p-8 w-full flex flex-col justify-center gap-y-5 rounded-lg select-none",
              message.role === "user"
                ? "bg-white border border-black/10 "
                : "bg-muted"
            )}
            key={message.content as string}
          >
            {message.role === "user" ? <Useravatar /> : <BotAvatar />}
            <ContextMenu>
              <ContextMenuTrigger>
                <div
                  className={cn(
                    "p-3 rounded-lg",
                    message.role === "user" ? "bg-gray-100" : "bg-slate-200"
                  )}
                >
                  <ReactMarkDown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return (
                          <CodeBlock
                            language={(match && match[1]) || ""}
                            value={String(children).replace(/\n$/, "")}
                            {...props}
                          />
                        );
                      },
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          className="hover:underline text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc list-inside pl-4 my-2"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="my-1" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="my-2" {...props} />
                      ),
                      h1: ({ node, ...props }) => (
                        <h1 className="text-2xl font-bold my-4" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-xl font-bold my-3" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-lg font-bold my-2" {...props} />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="border-l-4 border-gray-300 pl-4 py-2 my-2 italic"
                          {...props}
                        />
                      ),
                      hr: ({ node, ...props }) => (
                        <hr className="my-4 border-gray-300" {...props} />
                      ),
                      table: ({ node, ...props }) => (
                        <div className="overflow-auto my-4">
                          <table
                            className="border-collapse border border-gray-300"
                            {...props}
                          />
                        </div>
                      ),
                      th: ({ node, ...props }) => (
                        <th
                          className="border border-gray-300 px-4 py-2 bg-gray-100"
                          {...props}
                        />
                      ),
                      td: ({ node, ...props }) => (
                        <td
                          className="border border-gray-300 px-4 py-2"
                          {...props}
                        />
                      ),
                    }}
                    className="text-base overflow-hidden leading-loose font-light"
                  >
                    {message.content as string}
                  </ReactMarkDown>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  className="flex gap-2"
                  onClick={() => {
                    setShowSelectDialog(true);
                    setSelectedText(message.content as string);
                  }}
                >
                  {" "}
                  <TextCursorInput size={20} color="gray" /> Select Text
                </ContextMenuItem>
                <ContextMenuItem
                  className="flex gap-2"
                  onClick={() =>
                    navigator.clipboard.writeText(message.content as string)
                  }
                >
                  <Copy size={20} color="gray" /> Copy Text
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        );
      })}
    </>
  );
};

export default MessageOutput;
