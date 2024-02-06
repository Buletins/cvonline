import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { experienceRouter } from "./routers/experience";
import { contactRouter } from "./routers/contact";
import { statusRouter } from "./routers/status";
import { educationRouter } from "./routers/education";
import { replicateRouter } from "./routers/replicate";
import { internshipRouter } from "./routers/internship";
import { skillRouter } from "./routers/skill";
import { languageRouter } from "./routers/language";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  experience: experienceRouter,
  contact: contactRouter,
  status: statusRouter,
  education: educationRouter,
  replicate: replicateRouter,
  internship: internshipRouter,
  skill: skillRouter,
  language: languageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
