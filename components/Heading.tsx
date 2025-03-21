import { cn } from "@/lib/utils";
import { CircleCheck, Loader, LucideIcon, Trash } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { titleScema } from "@/lib/conversationConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  deleteConversation,
  updateConversationTitle,
} from "@/lib/conversations";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ConversationList from "@/components/ConversationList";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
  convTitle?: string | null;
  convid?: string | null;
  setConvTitle?: React.Dispatch<React.SetStateAction<string | null>>;
  type?: "Research" | "Teacher" | "SchoolTask" | undefined;
}

const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
  convTitle,
  convid,
  setConvTitle,
  type,
}: HeadingProps) => {
  const form = useForm<z.infer<typeof titleScema>>({
    values: {
      title: convTitle || "",
    },
    resolver: zodResolver(titleScema),
  });

  const onSubmit = async (values: z.infer<typeof titleScema>) => {
    try {
      if (convid) {
        const response = await updateConversationTitle(convid, values.title);
        if (response && setConvTitle) {
          setConvTitle(values.title);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteConversation = async () => {
    const response = await deleteConversation(convid || "");

    if (response) {
      if (type === "Research") {
        window.location.href = "/research";
      }

      if (type === "Teacher") {
        window.location.href = "/teacher";
      }

      if (type === "SchoolTask") {
        window.location.href = "/school-tasks";
      }
    }
  };

  return (
    <div className="relative">
      <div className="px-4 lg:px-8 flex items-center gap-x-3 h-[100px] overflow-hidden">
        <div className={cn("p-2 w-fit rounded-md", bgColor)}>
          <Icon className={cn("w-10 h-10", iconColor)} />
        </div>
        <div className="">
          <h2 className="text-3xl font-bold">{title}</h2>
          {convTitle ? (
            <Form {...form}>
              <form
                className="flex items-center gap-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="border-none bg-[#F1EBE4] text-sm p-1 h-6 w-52 lg:w-56 focus-visible:ring-0 text-muted-foreground focus-visible:text-black hover:bg-gray-100"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="h-fit w-fit"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <Loader className="w-5 h-5" />
                  ) : (
                    <CircleCheck className="w-5 h-5" />
                  )}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      className="h-fit w-fit"
                      type="button"
                      disabled={form.formState.isSubmitting}
                    >
                      <Trash className="w-5 h-5 text-red-600" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the conversation and remove it from our server.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteConversation}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </form>
            </Form>
          ) : (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {!convid && <ConversationList type={type} />}
    </div>
  );
};

export default Heading;
