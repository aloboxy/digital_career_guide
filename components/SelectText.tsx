import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const SelectText = ({
  showSelectDialog,
  setShowSelectDialog,
  text,
}: {
  showSelectDialog: boolean;
  setShowSelectDialog: (open: boolean) => void;
  text: string;
}) => {
  return (
    <Dialog open={showSelectDialog} onOpenChange={setShowSelectDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Text</DialogTitle>
          <div className="">
            <Textarea value={text} className="mt-5" />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SelectText;
