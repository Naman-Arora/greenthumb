import { type GetServerSidePropsContext} from "next";
import {getServerSession} from "next-auth";
import {authOptions as nextAuthOptions} from "~/server/auth";


export const getGreenThumbAuthSession = async (ctx : {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
}) => {
    return await getServerSession(ctx.req, ctx.res, nextAuthOptions);
}