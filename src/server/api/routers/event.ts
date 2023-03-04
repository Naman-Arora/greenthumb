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
        desc: z.string(),
        gardenId: z.string(),
        content: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.events.create({
        data: {
          name: input.name,
          time: input.time,
          desc: input.desc,
          gardenId: input.gardenId,
          content: input.content,
          userId: ctx.session.user.id,
        },
      });
    }),
});
