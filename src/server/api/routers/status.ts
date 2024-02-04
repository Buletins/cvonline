import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const statusRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        emoji: z.string().max(50),
        title: z.string().max(200),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.status.create({
        data: {
          userId: ctx.session.user.id,
          emoji: input.emoji,
          title: input.title,
        },
      });
    }),

  get: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.status.findFirst({
        where: {
          userId: input.userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
});
