import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const eventRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.events.findMany();
  }),
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.events.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        time: z.date(),
        gardenId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.events.create({
        data: {
          name: input.name,
          time: input.time,
          gardenId: input.gardenId,
          userId: ctx.session.user.id,
        },
      });
    }),
});
