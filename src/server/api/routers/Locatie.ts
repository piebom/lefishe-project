import { Locatie } from "@prisma/client";
import { MaybePromise } from "@trpc/server";
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
    getLocatieById: publicProcedure.input(z.object({id: z.string()})).query(({ctx,input}) => {
      const result = ctx.prisma.locatie.findFirst({
        where: {
          id: input.id,
        }
      })
      return result
    }),
    getOptions: publicProcedure.query(async ({ctx})=> {
      const createOption = (l : Locatie) => ({
        label: l.Locatie,
        value: l.id,
      });
      var options: any[] = []
      const result = ctx.prisma.locatie.findMany();
      const data = await result.then((res) => {
        return res
      })
      data.map((loc)=>{
        options.push(createOption(loc))
    })
      return options
    })
});