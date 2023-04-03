import { Input } from "postcss";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const vangstRouter = createTRPCRouter({
  createVangst: publicProcedure
    .input(
      z.object({
        locatieId: z.string(),
        date: z.string(),
        description: z.string(),
        aas: z.string(),
        weight: z.string(),
        imageURL: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { locatieId, date, aas, description, weight, imageURL, userId } =
        input;

      const result = await ctx.prisma.vangst.create({
        data: {
          locatieId,
          date: new Date(date),
          description,
          weight: Number(weight),
          imageURL,
          userId,
          aas,
        },
      });

      return {
        status: 201,
        message: "Vangst created successfully",
        result: result.imageURL,
      };
    }),
  getAllVangst: publicProcedure.query(async ({ ctx }) => {
    const result = ctx.prisma.vangst.findMany();
    return result;
  }),
  getAllVangstByLocationId: publicProcedure
    .input(z.object({ locatieId: z.string() }))
    .query(({ ctx, input }) => {
      let result;
      if (input.locatieId === "All") {
        result = ctx.prisma.vangst.findMany();
      } else {
        result = ctx.prisma.vangst.findMany({
          where: {
            locatieId: input.locatieId,
          },
        });
      }
      return result;
    }),
  getVangstById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const result = ctx.prisma.vangst.findFirst({
        where: {
          id: input.id,
        },
      });
      return result;
    }),
  deleteVanstById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const result = await ctx.prisma.vangst.delete({
        where: {
          id,
        },
      });

      return {
        status: 201,
        message: "Vangst deleted successfully",
        result: result,
      };
    }),
});
