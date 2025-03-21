import MomoPayment from "@/components/MomoPayment";
import React from "react";
import { PACKAGE_PLAN } from "@/constants";

const Payment = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const plan = PACKAGE_PLAN.find(
    (item) => item.planid === Number(searchParams?.planid)
  );

  if (!plan)
    return (
      <div className="h-screen flex justify-center items-center">
        No Payment available
      </div>
    );

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-gray-800 text-white p-8 sm:p-10 rounded-lg shadow-lg container max-w-md mx-2 sm:mx-0">
        <h1 className="text-lg font-semibold">Package Name: {plan?.name}</h1>
        <h3 className="mt-1 text-base">Price: ${plan?.price.toFixed(2)}</h3>
        <MomoPayment planName={plan?.name} price={plan?.price} />
      </div>
    </div>
  );
};

export default Payment;
