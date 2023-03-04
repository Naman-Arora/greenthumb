import Link from "next/link";
import { useRouter } from "next/router";
// import { trpc } from "../../utils/trpc";
import { api } from "~/utils/api";

export default function Blog() {
  const router = useRouter();
  const { id } = router.query;
  const idString = id as string;
  const post = api.blog.findOne.useQuery({ id: idString });

  return (
    <>
      <div className="grid place-items-center py-10">
        {post.data ? (
          <div className="prose prose-lg">
            <div dangerouslySetInnerHTML={{ __html: post.data?.content }} />
          </div>
        ) : (
          <div>
            {post.isStale ? (
              <div className="grid place-items-center">
                <p className="text-xl text-center">Post Not Found</p>
                <Link href={"/blog"} className="text-blue-400 hover:text-blue-600 text-xl text-center">Return to Blog Home</Link>
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
