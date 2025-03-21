"use client";
import React from "react";
import Link from "next/link";

const PaymentSuccess = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-gray-800 text-white p-8 sm:p-10 rounded-lg shadow-lg container max-w-md mx-2 sm:mx-0">
        <h1 className="text-lg font-semibold">Payment Success!</h1>
        <h3 className="mt-1 text-base">Your payment was successful</h3>
        <Link href="/dashboard">
          <div className="flex items-center justify-center w-full mt-6 bg-primary bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            Go To Dashboard
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
