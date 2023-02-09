import { Locatie } from "@prisma/client";
import { MaybePromise } from "@trpc/server";
import { Input } from "postcss";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const favoriteRouter = createTRPCRouter({
  createFavorite: publicProcedure
            .input(z.object({userId: z.string(), vangstId: z.string()}))
            .mutation(async ({ input, ctx }) => {
                const { userId, vangstId } = input;

                const result = await ctx.prisma.favorite.create({
                  data: {userId,vangstId},
                });
          
                return {
                  status: 201,
                  message: "Favorite created successfully",
                  result: result,
                };
              }),
              getAllFavoriteVangstenByUserId: publicProcedure.input(z.object({userId: z.string()})).query(({ctx,input}) => {
                const result = ctx.prisma.favorite.findMany({
                    where: {
                      userId: input.userId
                    },
                    include: {
                        vangst: true,
                    }
                })
                return result;
              }),
    getAllFavorites: publicProcedure.query(({ ctx }) => {
      const result = ctx.prisma.favorite.findMany();
      return result;
    }),
});