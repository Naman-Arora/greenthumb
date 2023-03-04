import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { gardenRouter } from "./routers/garden";
import { eventRouter } from "./routers/event";
import { blogRouter } from "./routers/blog";
import {profileRouter} from "./routers/profile";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  garden: gardenRouter,
  event: eventRouter,
  blog: blogRouter,
  profile: profileRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
