import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const experienceRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        contactType: z.string().max(50),
        contactValue: z.string().max(50),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.contacts.create({
        data: {
          ...input,
        },
      });
    }),

  delete: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.experience.delete({
        where: {
          userId: input.userId,
          id: input.id,
        },
      });
    }),
});
