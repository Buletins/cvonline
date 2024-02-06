import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const languageRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(2).max(50),
        value: z.number().min(25).max(100),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.language.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
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
      return ctx.db.contact.delete({
        where: {
          userId: input.userId,
          id: input.id,
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
      return ctx.db.contact.findMany({
        where: {
          userId: input.userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
});
