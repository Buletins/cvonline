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
        title: z.string().min(2).max(48),
        location: z.string().min(2).max(48),
        company: z.string().min(2).max(48),
        description: z.string().min(2).max(48),
        fromYear: z.string().min(2).max(48),
        toYear: z.string().min(2).max(48),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.experience.create({
        data: {
          userId: ctx.session?.user.id,
          ...input,
        },
      });
    }),

  get: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.experience.findMany({
        where: { id: ctx.session.user.id },
      });
    }),
});
