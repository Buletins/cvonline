import { z } from "zod";
import Replicate from "replicate";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const replicateRouter = createTRPCRouter({
  generateDescription: protectedProcedure
    .input(z.object({ prompt: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const output = await replicate.run(
        "replicate-internal/staging-llama-2-70b-chat-hf-mlc:a0a2781978454e825c3b81e87d6cff5928c43ad81bdc23b5cf11300d40b92916",
        {
          input: {
            debug: false,
            top_p: 0.95,
            prompt: input.prompt,
            temperature: 0.7,
            system_prompt:
              "You are a helpful, respectful and honest assistant.",
            max_new_tokens: 128,
            min_new_tokens: -1,
            prompt_template:
              "[INST] <<SYS>>\n{system_prompt}\n<</SYS>>\n\n{prompt} [/INST]",
            repetition_penalty: 1.15,
          },
        },
      );
      console.log(output);

      //   return ctx.db.image.update({
      //     where: {
      //       id: input.id,
      //     },
      //     data: {
      //       alt: output,
      //     },
      //   });
    }),

  questionImage: protectedProcedure
    .input(
      z.object({
        url: z.string().min(1),
        question: z.string().min(1),
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const output = await replicate.run(
        "salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
        {
          input: {
            task: "visual_question_answering",
            image: input.url,
            question: input.question,
          },
        },
      );

      console.log(output);
      // return ctx.db.image.update({
      //   where: {
      //     id: input.id,
      //   },
      //   data: {
      //     alt: output,
      //   },
      // });
    }),
});
