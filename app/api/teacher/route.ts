import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import openai from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import {
  createConversation,
  updateConversationMessages,
} from "@/lib/conversations";
import { increateApiLimit, checkApiLimit } from "@/lib/api-limit";

interface Article {
  title: string;
  authors: { name: string }[];
  url: string;
}

const openaiClient = new openai({
  apiKey: process.env.GEMINI_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content: `
  Your name is 'Digital Career Guide'. You are an assistant to a school teacher. You will assist with tasks such as analyzing student performance data, evaluating answers from PDFs, and detecting AI-generated responses. Your responses should be well-organized, clear, and concise.

- Start by explaining your method for evaluating data or analyzing the information.
- Break down complex ideas into logical steps to provide clarity.
- Use headings, bullet points, or numbered lists for steps and key points to enhance readability.
- Where applicable, provide examples, comparisons, or case studies to illustrate your analysis.

Always ensure your response has a logical flow, and each point leads naturally to the next. If any external resources or links are necessary, include them in a section starting with 'Resources:' (underlined and italic) in markdown format.

  `,
};

const greetingMessage: ChatCompletionMessageParam = {
  role: "system",
  content:
    "Any Greeting message reply: Hello! How can I assist you today? Whether you need help with your school tasks or solutions or anything else, feel free to let me know!",
};

async function getPdfFileText(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      "https://dataforge.digitalcareerguide.com/extract_text_from_pdf",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    const text = data.text;
    return text;
  } catch (error) {
    console.log(error);
  }
}

async function getConversationId(conversationId: string, title: string) {
  if (!conversationId) {
    const response = await createConversation(title, "Teacher");
    return response?.id || "";
  }
  return conversationId;
}

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const contentType = request.headers.get("Content-Type") || "";

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (!openaiClient.apiKey) {
      return new Response("Open AI API KEY Not Found", { status: 500 });
    }

    if (!contentType.includes("multipart/form-data")) {
      return new Response("Invalid Content-Type", { status: 400 });
    }

    const formData = await request.formData();
    const prompt = JSON.parse(formData.get("prompt") as string);

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 });
    }

    const freeToken = await checkApiLimit();
    if (!freeToken) {
      return new Response("API limit exceeded", { status: 429 });
    }

    const file = formData.get("file") as File | undefined;

    const conversationId = await getConversationId(
      formData.get("conversationId") as string,
      (formData.get("title") as string) || ""
    );

    if (!conversationId) {
      return new Response("Conversation Id Not Found", { status: 400 });
    }

    let pdfText: string | undefined = "";
    if (file) {
      pdfText = await getPdfFileText(file);
    }

    if (pdfText) {
      prompt.push({
        role: "system",
        content: `pdf file text: ${pdfText}`,
      });
    }

    const response = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, greetingMessage, ...prompt],
    });

    await increateApiLimit();

    const finalMessage = [...prompt, response.choices[0].message];

    const conversation = await updateConversationMessages(
      conversationId,
      finalMessage
    );

    if (!conversation) {
      return new Response("Internal Server Error", { status: 500 });
    }

    return NextResponse.json(conversation);
  } catch (error) {
    console.log("Research Error", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
