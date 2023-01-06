import { Input } from "postcss";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    me: protectedProcedure.query(async ({ ctx }) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
        });
        return user;
      }),

  signin: publicProcedure
            .input(z.object({email: z.string(), password: z.string()}))
            .query(({ ctx,input }) => {
        return ctx.prisma.user.findFirst({
            where: {
                email: input.email
            }
        })
  }),
});
