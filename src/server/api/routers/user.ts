import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getByUsernam: publicProcedure
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
          status: true,
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
        website: z.string().min(0).optional(),
        email: z.string().min(2).max(50),
        description: z.string().min(2).max(500),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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

  publishProfile: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!user?.isPusblished) {
      const updatedValue = !user?.isPusblished;

      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          isPusblished: updatedValue,
        },
      });
    } else {
      return "you can now see this secret message!";
    }
  }),
});
