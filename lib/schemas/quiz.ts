import { z } from "zod";

export const questionSchema = z.object({
  question: z.string(),
  options: z
    .array(z.string())
    .length(4)
    .describe(
      "Four possible answers to the question. Only one should be correct. They should all be of equal lengths.",
    ),
  answer: z
    .number()
    .describe(
      "The correct answer, where 0 is the first option, 1 is the second, and so on.",
    ),
});

export type Question = z.infer<typeof questionSchema>;

export const questionsSchema = z.array(questionSchema);