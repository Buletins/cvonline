import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const experienceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(2).max(48),
        location: z.string().min(2).max(48),
        company: z.string().min(2).max(48),
        description: z.string().min(2).max(2000),
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

  get: protectedProcedure.query(({ ctx }) => {
    return ctx.db.experience.findMany({
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
      return ctx.db.experience.delete({
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

  toggleSingle: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {

         const currentExperience = await ctx.db.experience.findUnique({
        where: {
          userId: ctx.session.user.id,
          id: input.id,
        },
      });

        if (!currentExperience || currentExperience.isDraft === undefined) {
        return null; // or handle the case accordingly
      }


        const updatedIsDraft = !currentExperience.isDraft;
       return ctx.db.experience.update({
        where: {
          userId: ctx.session.user.id,
          id: input.id,
        },
        data: {
          isDraft: updatedIsDraft,
        },
      });
    }),
});
 