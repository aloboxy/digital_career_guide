import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismadb";
import { MAX_FREE_COUNTS, SET_FREE_RESET_TIME } from "@/constants";

export const increateApiLimit = async () => {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userid: userId,
    },
  });

  if (userApiLimit) {
    await prisma.userApiLimit.update({
      where: {
        userid: userId,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    });
  } else {
    await prisma.userApiLimit.create({
      data: {
        userid: userId,
        count: 1,
        resetTime: SET_FREE_RESET_TIME(),
      },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } = await auth();
  if (!userId) {
    return;
  }
  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userid: userId,
    },
  });
  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimit = async () => {
  const { userId } = await auth();
  if (!userId) {
    return;
  }
  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userid: userId,
    },
  });
  if (!userApiLimit) {
    return;
  }
  return userApiLimit;
};

export const getResetTime = async () => {
  const { userId } = await auth();
  if (!userId) {
    return;
  }
  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userid: userId,
    },
  });
  if (!userApiLimit) {
    return;
  }
  return userApiLimit.resetTime;
};

export const resetApiLimit = async () => {
  const { userId } = await auth();
  if (!userId) {
    return;
  }
  const newUserApiLimit = await prisma.userApiLimit.update({
    where: {
      userid: userId,
    },
    data: {
      count: 0,
      resetTime: SET_FREE_RESET_TIME(),
    },
  });

  return newUserApiLimit;
};
