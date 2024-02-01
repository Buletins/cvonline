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
        userId: z.string().min(1),
        sub: z.string().max(50),
        title: z.string().max(50),
        timeline: z.string().max(50),
        description: z.string().max(50),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.experience.create({
        data: {
          userId: input.userId,
          isDraft: true,
          sub: input.sub,
          title: input.title,
          timeline: input.title,
          description: input.description,
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

  getById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: { id: input.id },
        include: {
          experiences: true,
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(2).max(50).optional(),
        name: z.string().min(2).max(50),
        title: z.string().min(2).max(50),
        location: z.string().min(2).max(50),
        email: z.string().min(2).max(50),
        website: z.string().min(2).max(50),
        description: z.string().min(2).max(500),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
