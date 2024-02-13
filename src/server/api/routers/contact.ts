import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const contactRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        contactType: z.string().max(50),
        contactValue: z.string().max(50),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.contact.create({
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
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.contact.delete({
        where: {
          userId: ctx.session?.user.id,
          id: input.id,
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        contactValue: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.contact.update({
        where: {
          userId: ctx.session?.user.id,
          id: input.id,
        },
        data: {
          contactValue: input.contactValue,
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
