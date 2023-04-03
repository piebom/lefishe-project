import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { authRouter } from "./routers/auth";
import { vangstRouter } from "./routers/vangst";
import { locatieRouter } from "./routers/Locatie";
import { favoriteRouter } from "./routers/favorite";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  vangst: vangstRouter,
  locatie: locatieRouter,
  favorite: favoriteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
