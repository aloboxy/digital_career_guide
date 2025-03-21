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
  Your name is 'Digital Career Guide'. You are an assistant to a researcher. When handling research tasks, you must always employ an analytical writing style. This involves:

- Breaking down complex ideas and arguments into their core components.
- Evaluating evidence and providing critical analysis.
- Drawing logical conclusions based on the analysis.
- Ensuring clarity by structuring the response in a step-by-step manner.

Your main goal is to analyze complex topics and provide in-depth insights. Always structure your analysis into sections such as background, methodologies, key findings, and critical interpretations. Where relevant, compare different perspectives, theories, and include a synthesis of information from multiple sources.

Use precise, technical language relevant to the field of study, ensuring accuracy and academic rigor. Include case studies or real-world examples where applicable to support the analysis.

At the end of your response, provide a summary of key points. If there are resources to reference (such as books, articles, PDFs), provide them in a section starting with 'Resources:' (underlined and italic) in markdown format.
  `,
};

const greetingMessage: ChatCompletionMessageParam = {
  role: "system",
  content:
    "Any Greeting message reply: Hello! How can I assist you today? Whether you need help with a specific topic, research guidance, or anything else, feel free to let me know!",
};

async function extractKeywords(message: string) {
  const response = await fetch(
    "https://dataforge.digitalcareerguide.com/extract_keywords",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: message,
      }),
    }
  );

  const keywords: string[] = (await response.json()).keywords;

  return keywords.join(" ");
}

async function fetchRealTimeResearchData(query: string) {
  try {
    const response = await fetch(
      `https://api.semanticdigitalcareerguide.org/graph/v1/paper/search?query=${encodeURIComponent(
        query
      )}&limit=3&fields=title,authors,url`,
      {
        headers: {
          "x-api-key": process.env.Semantic_digitalcareerguide_API_KEY || "",
        },
      }
    );
    const data: any = await response.json();

    return data.data.map((article: Article) => ({
      title: article.title,
      authors: article.authors.map((author) => author.name).join(", "),
      url: article.url,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

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
    const response = await createConversation(title, "Research");
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

    const keywordsPromise = extractKeywords(prompt[prompt.length - 1].content);
    const keywords = await keywordsPromise;

    if (pdfText) {
      prompt.push({
        role: "system",
        content: `pdf file text: ${pdfText}`,
      });
    }

    const researchDataPromise = fetchRealTimeResearchData(keywords);
    const researchData: Article[] = await researchDataPromise;
    const researchMessage = {
      role: "system",
      content:
        "[Do not give these if the prompt is not about research or irrelevant] Research Data:" +
        JSON.stringify(researchData),
    };

    const response = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        instructionMessage,
        greetingMessage,
        researchMessage,
        ...prompt,
      ],
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
