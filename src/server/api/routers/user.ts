import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const usernamePattern = /^[a-zA-Z0-9]+$/;

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
          educations: {
            orderBy: {
              createdAt: "desc",
            },
          },
          internships: {
            orderBy: {
              createdAt: "desc",
            },
          },
          skills: {
            orderBy: {
              createdAt: "desc",
            },
          },
          languages: {
            orderBy: {
              createdAt: "desc",
            },
          },
          status: true,
          contacts: {
            orderBy: {
              createdAt: "desc"
            }
          }
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(2).max(50).optional(),
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
        username: z.string().min(7).max(50).regex(usernamePattern).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newUsername = input.username
        ? input.username.replace(/\s+/g, "-")
        : undefined;

      const existingUser = await ctx.db.user.findFirst({
        where: {
          username: {
            equals: newUsername,
            mode: "insensitive",
          },
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
          username: newUsername,
          isCreated: true,
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

  getUsersCount: publicProcedure.query(({ ctx, input }) => {
    return ctx.db.user.count();
  }),
});
