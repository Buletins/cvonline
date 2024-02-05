import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { experienceRouter } from "./routers/experience";
import { contactRouter } from "./routers/contact";
import { statusRouter } from "./routers/status";
import { educationRouter } from "./routers/education";
import { replicateRouter } from "./routers/replicate";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
  experience: experienceRouter,
  contact: contactRouter,
  status: statusRouter,
  education: educationRouter,
  replicate: replicateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
