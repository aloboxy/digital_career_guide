import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import * as https from "https";

export interface RequestToPayParams {
  amount: string;
  currency: string;
  externalId: string;
  payer: {
    partyIdType: string;
    partyId: string;
  };
  payerMessage: string;
  payeeNote: string;
}

const BASE_URL = "https://sandbox.momodeveloper.mtn.com";

const createApiUser = async () => {
  const url = `${BASE_URL}/v1_0/apiuser`;
  const referenceId = uuidv4();
  const data = {
    providerCallbackHost:
      "https://rat-charming-thoroughly.ngrok-free.app/api/momo-callback",
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "X-Reference-Id": referenceId,
        "Ocp-Apim-Subscription-Key": process.env.MOMO_PRIMARY_KEY,
      },
    });

    if (response.status === 201) {
      return { referenceId };
    }
    throw new Error("Error creating API user");
  } catch (error) {
    console.error("Error creating API user:", error);
    throw error;
  }
};

const createApiKey = async (refid: string) => {
  const url = `${BASE_URL}/v1_0/apiuser/${refid}/apikey`;
  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.MOMO_PRIMARY_KEY,
        },
      }
    );
    if (response.status === 201) {
      return response.data.apiKey;
    }
    throw new Error("Error creating API key");
  } catch (error) {
    console.error("Error creating API key:", error);
    throw error;
  }
};

const createAccessToken = async (refid: string, apiKey: string) => {
  const url = `${BASE_URL}/collection/token/`;
  const authorization = Buffer.from(`${refid}:${apiKey}`).toString("base64");

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Basic ${authorization}`,
          "Ocp-Apim-Subscription-Key": process.env.MOMO_PRIMARY_KEY,
          "Content-Type": "application/json",
          "Content-Length": "0",
        },
      }
    );

    if (response.status === 200) {
      return response.data.access_token;
    }
    throw new Error("Error creating access token");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createPaymentRequest = async (
  requestparams: RequestToPayParams,
  accessToken: string,
  refid: string
) => {
  const url = `${BASE_URL}/collection/v1_0/requesttopay`;

  try {
    const response = await axios.post(url, requestparams, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Reference-Id": refid,
        "X-Target-Environment": "sandbox",
        "Ocp-Apim-Subscription-Key": process.env.MOMO_PRIMARY_KEY,
        "Content-Type": "application/json",
        // "X-Callback-Url":
        //   "https://rat-charming-thoroughly.ngrok-free.app/api/momo-callback",
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    if (response.status === 202) {
      return {
        message: "Payment request created successfully",
        transactionId: refid,
      };
    }
    throw new Error("Error creating payment request");
  } catch (error) {
    console.error("Error creating payment request:", error);
    throw error;
  }
};

const getPaymentStatus = async (transactionId: string, accessToken: string) => {
  const url = `${BASE_URL}/collection/v1_0/requesttopay/${transactionId}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Target-Environment": "sandbox",
        "Ocp-Apim-Subscription-Key": process.env.MOMO_PRIMARY_KEY,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Error getting payment status");
  } catch (error) {
    console.error("Error getting payment status:");
    throw error;
  }
};

export {
  createApiUser,
  createApiKey,
  createAccessToken,
  createPaymentRequest,
  getPaymentStatus,
};
