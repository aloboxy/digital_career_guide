"use client";
import Heading from "@/components/Heading";
import axios, { AxiosError } from "axios";
import {
  Paperclip,
  FileText,
  SendHorizonal,
  Trash2,
  GraduationCap,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import Useravatar from "@/components/User-avatar";
import BotAvatar from "@/components/Bot-Avatar";
import ReactMarkDown from "react-markdown";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import { Textarea } from "@/components/ui/textarea";
import { Conversation } from "@prisma/client";
import { useParams } from "next/navigation";
import { getConversationByid } from "@/lib/conversations";
import { useProModal } from "@/context/ProModalProvider";
import { mutate } from "swr";
import MessageOutput from "@/components/MessageOutput";
import CustomTextArea from "@/components/Custom-TextArea";

const TeacherConversation = () => {
  const { id } = useParams();
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { setShowModal } = useProModal();
  const [loading, setLoading] = useState<boolean>(true);
  const [conversationtitle, setConversationtitle] = useState<string | null>(
    null
  );
  const [conversationId, setConversationId] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      file: undefined,
    },
  });

  const fetchConversation = async () => {
    try {
      const reponse = await getConversationByid(id as string);
      if (reponse) {
        setConversationId(reponse.id);
        // @ts-ignore
        setMessages(reponse.messages);
        setConversationtitle(reponse.conversatintitle);
        setLoading(false);
      } else {
        router.push("/404");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      if (values.file) {
        formData.append("file", values.file);
      }

      if (conversationId !== "") {
        formData.append("conversationId", conversationId);
      }

      if (!conversationtitle) {
        formData.append("title", values.prompt.substring(0, 30) + "...");
      }

      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      formData.append("prompt", JSON.stringify(newMessages));
      const response = await axios.post("/api/teacher", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data: Conversation = response.data;
      setConversationId(data.id);
      // @ts-ignore
      setMessages(data.messages);
      setConversationtitle(data.conversatintitle);
      form.reset();
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      setSelectedFile(null);
    } catch (error: AxiosError | any) {
      if (error?.response?.status === 429) {
        setShowModal(true);
      }
    } finally {
      mutate("get/apiLimitCount");
    }
  };

  useEffect(() => {
    fetchConversation();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading conversation
      </div>
    );

  return (
    <div className="h-[calc(100vh-164px)] overflow-hidden">
      <Heading
        title={"Teacher Assistant"}
        description="Teacher tasks AI Assistant"
        icon={GraduationCap}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
        convTitle={conversationtitle}
        convid={conversationId}
        setConvTitle={setConversationtitle}
        type="Teacher"
      />
      <div className="px-4 lg:px-8 py-5 flex flex-col-reverse overflow-y-scroll h-[calc(100vh-164px)]">
        <div className="pl-4 lg:pl-[320px] px-[15px] lg:px-10 w-full bottom-0 left-0 pb-5 z-50 absolute">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-white rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-10 lg:col-span-11">
                    <FormControl className="m-0 p-0">
                      <CustomTextArea
                        form={form}
                        field={field}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                      />
                      {/* <Textarea
                        className=" resize-none p-2 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-[95%] lg:w-full"
                        disabled={isLoading}
                        placeholder="Find me the the student who got the best mark from the pdf. [PDF required]"
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
                      /> */}
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="col-span-2 lg:col-span-1 w-full flex gap-2 justify-end">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="px-2"
                  onClick={() => {
                    fileRef.current?.click();
                  }}
                  type="button"
                  disabled={isLoading}
                >
                  <Paperclip />
                </Button>
                <Button
                  className=""
                  size={"icon"}
                  disabled={isLoading}
                  type="submit"
                  variant={"ghost"}
                >
                  <SendHorizonal />
                </Button>
              </div>
              {selectedFile && (
                <div className="flex flex-col col-span-12">
                  <span className="text-sm font-bold py-2">Attachment</span>
                  <div className="flex w-fit gap-x-2">
                    <Link
                      target="_blank"
                      href={URL.createObjectURL(selectedFile)}
                      className="flex gap-2 items-center w-full"
                    >
                      <FileText />
                      <span className="text-xs underline">
                        {selectedFile.name}
                      </span>
                    </Link>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => setSelectedFile(null)}
                      className="p-3 text-red-800"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              )}

              <FormField
                name="file"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        ref={fileRef}
                        type="file"
                        accept="application/pdf"
                        disabled={isLoading}
                        className="p-2 hidden"
                        onChange={(e) => {
                          setSelectedFile(e.target.files && e.target.files[0]);
                          const file = e.target.files && e.target.files[0];
                          field.onChange(file);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div
          className={cn(
            "space-y-4 ",
            selectedFile ? "my-[278px] lg:my-[198px]" : "lg:my-28 my-48"
          )}
        >
          <div className="flex flex-col-reverse gap-y-4 py-5">
            {isLoading && (
              <Loader
                message={{
                  role: "user",
                  content: form.getValues("prompt"),
                }}
              />
            )}
            <MessageOutput messages={messages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherConversation;
