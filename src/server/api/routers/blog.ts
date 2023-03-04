import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const blogRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.blog.findMany();
  }),
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.blog.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        desc: z.string(),
        content: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      // let a = ctx.auth.userId;
      return ctx.prisma.blog.create({
        data: {
          name: input.name,
          desc: input.desc,
          userId: ctx.session.user.id,
          content: input.content
        },
      });
    }),
});
