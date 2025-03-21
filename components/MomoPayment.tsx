"use client";

import { RequestToPayParams } from "@/lib/momoApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js/core";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const MomoPayment = ({
  price,
  planName,
}: {
  price: number;
  planName: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<E164Number | undefined>();
  const { toast } = useToast();
  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);
    const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneNumberRegex.test(phoneNumber as string)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    try {
      const requestData: RequestToPayParams = {
        amount: price.toString(),
        currency: "EUR",
        externalId: "123456789",
        payer: {
          partyIdType: "MSISDN",
          partyId: phoneNumber as string,
        },
        payerMessage: "Payment for product " + planName,
        payeeNote: "Payment from customer",
      };
      const response = await fetch("/api/momo-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      // Handle successful payment initiation
      if (response.status === 200) {
        console.log("try watching console for a callbak");
        // make a post request for callback for test purpose
        const callbackResponse = await fetch("/api/momo-callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.data),
        });

        if (callbackResponse.status === 200) {
          router.push("/payment/success");
        } else {
          console.error("Payment initiation failed");
        }
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <PhoneInput
        defaultCountry="LR"
        placeholder="Enter phone number"
        international
        withCountryCallingCode
        value={phoneNumber || undefined}
        onChange={(value) => setPhoneNumber(value)}
        className="mt-2 h-11 rounded-md px-3 text-sm border bg-white text-black placeholder:text-gray-800 border-gray-800"
      />
      <Button
        onClick={handlePayment}
        disabled={loading}
        variant={"secondary"}
        className="flex items-center justify-center gap-3"
      >
        {loading ? "Processing..." : "Pay with MoMo"}
        <Image src={"/mtn_logo.png"} alt="momo logo" width={22} height={22} />
      </Button>
    </div>
  );
};

export default MomoPayment;
