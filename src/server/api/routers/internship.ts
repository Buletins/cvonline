import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const internshipRouter = createTRPCRouter({
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
      return ctx.db.internship.create({
        data: {
          userId: ctx.session?.user.id,
          ...input,
        },
      });
    }),

  get: protectedProcedure
    .query(({ ctx }) => {
      return ctx.db.internship.findMany({
        where: { id: ctx.session.user.id },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.internship.delete({
        where: {
          userId: ctx.session.user.id,
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
        internships: true,
      },
    });

    if (user) {
      if (user.internships.length > 0) {
        const updatedValue = !user.internshipActive;

        return ctx.db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            internshipActive: updatedValue,
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
