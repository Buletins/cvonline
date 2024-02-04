import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getByUsernam: protectedProcedure
    .input(z.object({ username: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: {
          username: {
            equals: input.username,
            mode: "insensitive",
          },
        },
        include: {
          experiences: {
            orderBy: {
              createdAt: "desc",
            },
          },
          status: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
          contacts: true,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(2).max(50).optional(),
        username: z.string().min(2).max(50).optional(),
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

  changeUsername: protectedProcedure
    .input(
      z.object({
        username: z.string().min(2).max(50).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: {
          username: input.username,
        },
      });

      if (existingUser) {
        throw new Error(
          "Username already exists. Please choose a different username.",
        );
      }

      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          username: input.username,
        },
      });
    }),
});
