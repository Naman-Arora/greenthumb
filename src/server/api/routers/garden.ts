import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const gardenRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.garden.findMany();
  }),
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.garden.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      // let a = ctx.auth.userId;
      return ctx.prisma.garden.create({
        data: {
          name: input.name,
          latitude: input.latitude,
          longitude: input.longitude,
        },
      });
    }),
});
