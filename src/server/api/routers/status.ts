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
        status: z.string().max(50),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.status.create({
        data: {
          userId: ctx.session.user.id,
          status: input.status,
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
