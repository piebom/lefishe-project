import { Input } from "postcss";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const vangstRouter = createTRPCRouter({
  createVangst: publicProcedure
            .input(z.object({name: z.string(), date: z.string(), description: z.string(), weight: z.string(), imageURL: z.string(), userId: z.string()}))
            .mutation(async ({ input, ctx }) => {
                const { name, date,description,weight,imageURL,userId} = input;

                const result = await ctx.prisma.vangst.create({
                  data: {name, date: new Date(date),description,
                    weight:Number(weight),imageURL,userId},
                });
          
                return {
                  status: 201,
                  message: "Vangst created successfully",
                  result: result.imageURL,
                };
              }),
      getAllVangst: publicProcedure.query(({ ctx }) => {
        const result = ctx.prisma.vangst.findMany();
        return result;
      }),
});