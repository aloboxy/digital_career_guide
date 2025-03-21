"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismadb";

export async function getConversations(
  type?: "Research" | "Teacher" | "SchoolTask" | null
) {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }

  if (type) {
    const conversations = await prisma.conversation.findMany({
      where: {
        userid: userId,
        type: type,
      },
    });
    return conversations;
  }

  const conversations = await prisma.conversation.findMany({
    where: {
      userid: userId,
    },
  });
  return conversations;
}

export async function getConversationByid(conversationId: string) {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
    },
  });
  return conversation;
}

export async function getMessages(conversationId: string) {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }

  const messages = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
    },
    select: {
      messages: true,
    },
  });
  return messages;
}

export async function createConversation(
  title: string,
  type: "Research" | "Teacher" | "SchoolTask"
) {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  const conversation = await prisma.conversation.create({
    data: {
      userid: userId,
      conversatintitle: title,
      type: type,
      messages: [],
    },
  });
  return conversation;
}

export async function updateConversationMessages(
  conversationId: string,
  messages: {}
) {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  const conversation = await prisma.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      messages: messages,
    },
  });
  return conversation;
}

export async function updateConversationTitle(
  conversationId: string,
  title: string
) {
  const { userId } = await auth();
  if (!userId) {
    return;
  }
  const conversation = await prisma.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      conversatintitle: title,
    },
  });
  return conversation;
}

export async function deleteConversation(conversationId: string) {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  const response = await prisma.conversation.deleteMany({
    where: {
      id: conversationId,
    },
  });
  return response;
}
