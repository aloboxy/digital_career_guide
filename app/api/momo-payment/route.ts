import { NextRequest, NextResponse } from "next/server";
import {
  createAccessToken,
  createApiKey,
  createApiUser,
  createPaymentRequest,
  getPaymentStatus,
} from "@/lib/momoApi";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const apiUser = await createApiUser();
    if (!apiUser.referenceId) {
      throw new Error("Failed to create API user");
    }

    const apiKey = await createApiKey(apiUser.referenceId);
    if (!apiKey) {
      throw new Error("Failed to create API key");
    }

    const accessToken = await createAccessToken(apiUser.referenceId, apiKey);
    if (!accessToken) {
      throw new Error("Failed to create access token");
    }

    const requestToPay = await createPaymentRequest(
      payload,
      accessToken,
      apiUser.referenceId
    );
    if (!requestToPay) {
      throw new Error("Failed to create payment request");
    }

    //check payment status
    const paymentStatus = await getPaymentStatus(
      requestToPay.transactionId,
      accessToken
    );
    if (!paymentStatus) {
      throw new Error("Failed to get payment status");
    }

    return NextResponse.json(
      {
        message: "Payment initiated",
        data: { ...paymentStatus, transactionId: requestToPay.transactionId },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to initiate payment:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment" },
      { status: 500 }
    );
  }
}
