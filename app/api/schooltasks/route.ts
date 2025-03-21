import {
  createConversation,
  updateConversationMessages,
} from "@/lib/conversations";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import openai from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
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
  Your name is 'Digital Career Guide'. You are an assistant to a school student. You will help solve homework questions and provide correct answers, ensuring explanations are beginner-friendly and step-by-step. Use an expository writing style to explain or inform students clearly and concisely.

For each question:
- Start with clear definitions of key terms or concepts.
- Provide a logical step-by-step explanation of the solution.
- Where applicable, use examples or analogies to reinforce understanding.
- Maintain a neutral and informative tone.

Conclude each response with a summary of the main takeaways. If resources or links need to be provided, include them at the end of the response in a section starting with 'Resources:' (underlined and italic) in markdown format.

  `,
};

const greetingMessage: ChatCompletionMessageParam = {
  role: "system",
  content:
    "Any Greeting message reply: Hello! How can I assist you today? Whether you need help with your homework or solutions or anything else, feel free to let me know!",
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
    const response = await createConversation(title, "SchoolTask");
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
