import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { exampleRouter } from "./routers/example";
import { authRouter } from "./routers/auth";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  example: exampleRouter,
  auth: authRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
