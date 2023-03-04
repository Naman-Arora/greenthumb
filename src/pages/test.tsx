// import { trpc } from "../utils/trpc";
import { api } from "~/utils/api";

export default function Test() {
  //   const postQuery = trpc.post.all.useQuery();
  const a = api.blog.all.useQuery();
  console.log(a.data);

  function allPosts() {
    return <></>;
  }

  return (
    <>
      <h1>Test Page</h1>
      {a.data && <p>name is: {a.data[0]?.name}</p>}
    </>
  );
}
