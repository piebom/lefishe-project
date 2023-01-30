import { Input } from "postcss";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const locatieRouter = createTRPCRouter({
  createLocatie: publicProcedure
            .input(z.object({Locatie: z.string()}))
            .mutation(async ({ input, ctx }) => {
                const { Locatie} = input;

                const result = await ctx.prisma.locatie.create({
                  data: {Locatie},
                });
          
                return {
                  status: 201,
                  message: "Locatie created successfully",
                  result: result,
                };
              }),
    getAllLocations: publicProcedure.query(({ ctx }) => {
      const result = ctx.prisma.locatie.findMany();
      return result;
    }),
});