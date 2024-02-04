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
      const status = await ctx.db.status.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (status) {
        return ctx.db.status.update({
          where: {
            userId: ctx.session.user.id,
          },
          data: {
            emoji: input.emoji,
            title: input.title,
            createdAt: new Date(),
          },
        });
      } else {
        return ctx.db.status.create({
          data: {
            emoji: input.emoji,
            title: input.title,
            userId: ctx.session.user.id,
          },
        });
      }
    }),

  delete: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.status.delete({
      where: {
        userId: ctx.session.user.id,
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
