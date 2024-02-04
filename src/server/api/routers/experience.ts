import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const experienceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(2).max(48),
        location: z.string().min(2).max(48),
        company: z.string().min(2).max(48),
        description: z.string().min(2).max(200),
        fromYear: z.string().min(2).max(48),
        toYear: z.string().min(2).max(48),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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

  delete: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.experience.delete({
        where: {
          userId: input.userId,
          id: input.id,
        },
      });
    }),

  toggle: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        experiences: true,
      },
    });

    if (user) {
      if (user.experiences.length > 0) {
        const updatedValue = !user.experienceActive;

        return ctx.db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            experienceActive: updatedValue,
          },
        });
      } else {
        // Handle the case where the user has no experiences
        return "you can now see this secret message!";
      }
    } else {
      // Handle the case where the user is not found
      throw new Error("User not found");
    }
  }),
});
