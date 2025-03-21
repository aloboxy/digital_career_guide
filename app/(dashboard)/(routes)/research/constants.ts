import * as z from "zod";

const pdfFile = z.custom<File>(
  (file) => {
    if (file === undefined) return true;
    return file instanceof File && file.type === "application/pdf";
  },
  {
    message: "Only PDF files are accepted",
  }
);

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
  file: pdfFile,
});
