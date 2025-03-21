import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { PACKAGE_PLAN } from "@/constants";
import Link from "next/link";
import { Check } from "lucide-react";

const ProModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (open: boolean) => void;
}) => {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pricing Package</DialogTitle>
          <DialogDescription>
            Choose our packeges to get more tokens
          </DialogDescription>
          <div className="py-6 flex flex-col gap-5 h-[500px] overflow-y-auto items-center">
            {PACKAGE_PLAN.map((plan) => (
              <div
                className={cn(
                  "p-10 flex flex-col gap-2 items-center justify-center rounded-xl w-[300px] border-4",
                  plan.color
                )}
                key={plan.planid}
              >
                <h1 className="text-2xl font-semibold">{plan.name}</h1>
                <h3 className="text-lg text-muted-foreground">
                  US${plan.price.toFixed(2)} {plan.time_limitation}
                </h3>
                {plan.isSub && (
                  <Link
                    href={"/payment?planid=" + plan.planid}
                    className="w-full"
                  >
                    <Button className="w-full">Subscribe</Button>
                  </Link>
                )}

                <div className="self-start space-y-2 text-sm mt-3">
                  <div className="flex gap-2 font-semibold">
                    <Check /> {plan.token} Tokens
                  </div>
                  {plan.features.map((feature) => (
                    <div className="flex gap-2" key={feature.name}>
                      <Check /> {feature.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {/* <Accordion
              type="single"
              collapsible
              defaultValue={PACKAGE_PLAN[0].name}
              className="flex flex-col gap-3"
            >
              {PACKAGE_PLAN.map((plan) => (
                <AccordionItem
                  key={plan.planid}
                  value={plan.name}
                  className="border-0"
                >
                  <AccordionTrigger
                    className={cn(
                      "hover:no-underline p-2 rounded-t-lg data-[state=open]:rounded-b-none rounded-b-lg text-white",
                      plan.color
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <h2 className="self-start">
                        {plan.name} - ${plan.price.toFixed(2)}
                      </h2>
                      <span className="text-xs self-start">
                        {plan.token} Tokens {plan.time_limitation}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent
                    className={cn("p-3 rounded-b-lg", plan.contentColor)}
                  >
                    <div className="flex flex-col gap-2 items-start ">
                      <h2 className="font-semibold text-base mb-2">Features</h2>
                      <ul className="list-disc list-inside space-y-1 flex flex-col items-start">
                        <li className="text-sm">
                          Message Type - {plan.message_result_type}
                        </li>
                        {plan.features.map((feature) => {
                          if (feature.available) {
                            return (
                              <li key={feature.id} className="text-sm">
                                {feature.name}
                              </li>
                            );
                          }
                        })}
                      </ul>
                      <Link href={"/payment?planid=" + plan.planid}>
                        <Button
                          className={cn("mt-4 w-full", plan.color)}
                          size={"sm"}
                        >
                          Subscribe
                        </Button>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion> */}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
