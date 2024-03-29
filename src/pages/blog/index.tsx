import Head from "next/head";
import Post from "~/components/Post";
import { api } from "~/utils/api";

import NavigationBar from "~/components/NavigationBar";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";

export default function Blog() {
  const allPosts = api.blog.all.useQuery();
  return (
    <>
      <Head>
        <title>greenthumb | Blog</title>
      </Head>
      <div className="z-[-10] w-[100vw] h-[100vh] fixed bg-gradient-to-b from-yellow-200 to-yellow-400"/>
      <NavigationBar page="Blog" />
      <div className="h-[10vh]" />
      <div className="grid place-items-center py-10 px-20">
        <h1 className="mb-10 text-center text-6xl font-black font-outfit">
          Blog
        </h1>
        {allPosts.data &&
          allPosts.data.map((item, index) => {
            return (
              <div key={index} className="my-4 content-center">
                <Post route={item.id} title={item.name} body={item.desc} />
              </div>
            );
          })}
      </div>
      <div className="z-40 fixed bottom-6 left-4">
        <Link
          href="/blog/create"
          className="inline-flex items-center rounded-lg border-2 border-black bg-white/70 backdrop-blur p-2 text-center text-sm font-medium text-black hover:bg-green-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          <IconPlus stroke={3}/>
        </Link>
      </div>
    </>
  );
}
