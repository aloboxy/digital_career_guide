"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { Expand, Minimize } from "lucide-react";
import { cn } from "@/lib/utils";

const CustomTextArea = ({
  form,
  isLoading,
  field,
  onSubmit,
}: {
  form: any;
  isLoading: boolean;
  field: any;
  onSubmit: any;
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
  };
  const handleCollapse = () => {
    setIsExpanded(false);
  };
  return (
    <div
      className={cn(
        "relative",
        isExpanded &&
          "w-screen md:pl-72 h-screen fixed top-0 left-0 z-[1000] bg-white lg:w-full"
      )}
    >
      <Textarea
        className={cn(
          "resize-none p-2 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-[95%] lg:w-full pr-10",
          isExpanded && "w-full h-full text-lg"
        )}
        disabled={isLoading}
        placeholder="How do different neuromarketing techniques compare in predicting consumer behavior?"
        onKeyDown={(e) => {
          const isMobile =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            );

          if (!isMobile && e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }
        }}
        {...field}
      />
      <Button
        variant={"ghost"}
        size={"icon"}
        className="px-2 absolute right-3 top-0 text-gray-600"
        type="button"
        onClick={isExpanded ? handleCollapse : handleExpand}
      >
        {isExpanded ? <Minimize /> : <Expand />}
      </Button>
    </div>
  );
};

export default CustomTextArea;
