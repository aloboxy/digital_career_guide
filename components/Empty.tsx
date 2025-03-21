import React from "react";
import Image from "next/image";
import { Research_Prompts } from "@/constants";
import { useToast } from "@/components/ui/use-toast";

interface EmptyProps {
  label: string;
  setPromptHanlder: (prompt: string) => void;
  suggestions: typeof Research_Prompts;
}

const Empty = ({ label, setPromptHanlder, suggestions }: EmptyProps) => {
  const { toast } = useToast();
  return (
    <div className="h-full flex flex-col items-start justify-start">
      <div className="flex py-3 lg:py-4 gap-3 lg:gap-5 overflow-x-auto z-40 bg-[#F1EBE4] pr-6">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            onClick={() => {
              setPromptHanlder(suggestion.content);
              toast({
                title: "Suggestion Selected",
                description: "Check your input prompt!, and change accordingly",
                duration: 2000,
              });
            }}
            className="bg-white p-3 rounded-lg cursor-pointer hover:bg-gray-100 h-[110px] w-[250px] overflow-hidden"
          >
            <h2 className="text-base font-semibold">{suggestion.name}</h2>
            <h3 className="text-xs text-muted-foreground">
              {suggestion.content.substring(0, 120)} ...
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Empty;
