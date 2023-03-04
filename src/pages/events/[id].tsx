import Link from "next/link";
import { useRouter } from "next/router";
// import { trpc } from "../../utils/trpc";
import { api } from "~/utils/api";
import NavigationBar from "~/components/NavigationBar";

export default function Blog() {
  const router = useRouter();
  const { id } = router.query;
  const idString = id as string;
  const post = api.event.findOne.useQuery({ id: idString });
  console.log(post.data);

  // const garden = api.garden.findOne.useQuery({id: post.data?.gardenId as string});
  // const url = "../gardens/" + (garden.data?.id as string) ;
  return (
    <>
      <div className="fixed z-[-10] h-[100vh] w-[100vw] bg-gradient-to-b from-yellow-200 to-yellow-400" />
      <NavigationBar page="Events" />
      <div className="h-[10vh]" />
      <div className="grid place-items-center py-10">
        <h1 className="font-bold font-outfit"> {post.data?.name}</h1>
        {post.data ? (
          <div className="prose prose-lg">
            {post.data?.content && (
              <div
              dangerouslySetInnerHTML={{
                __html: post.data.content as string,
              }}
              />
              )}
          </div>
        ) : (
          <div>
            {post.isStale ? (
              <div className="grid place-items-center">
                <p className="text-center text-xl">Post Not Found</p>
                <Link
                  href={"/events"}
                  className="text-center text-xl text-blue-400 hover:text-blue-600"
                >
                  Return to Events Home
                </Link>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
