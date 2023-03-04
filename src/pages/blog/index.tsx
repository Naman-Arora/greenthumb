import Head from "next/head";
import Post from "~/components/Post";
import { api } from "~/utils/api";

import NavigationBar from "~/components/NavigationBar";

export default function Blog() {
  const allPosts = api.blog.all.useQuery();
  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>
      <NavigationBar page="Blog" />
      <div className="h-[10vh]" />
      <div className="grid place-items-center py-10 px-20">
        <h1 className="mb-10 text-center text-6xl font-bold">
          Blog Posts
        </h1>
        {allPosts.data &&
          allPosts.data.map((item, index) => {
            return (
              <div key={index} className="my-4">
                <Post title={item.name} body={item.desc} />
              </div>
            );
          })}
      </div>
    </>
  );
}
