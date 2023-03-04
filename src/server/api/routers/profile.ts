import {
    createTRPCRouter,
    publicProcedure,
  } from "~/server/api/trpc";
  import { z } from "zod";


  export const profileRouter = createTRPCRouter({
    findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.user.findFirst({
            where: {
              id: input.id,
            },
        });
      }),
    });