import { useRouter } from "next/router";
// import { trpc } from "../../utils/trpc";
import { api } from "~/utils/api";

export default function Blog() {
  const router = useRouter();
  const { id } = router.query;
  const idString = id as string;
  const getData = api.blog.findOne.useQuery({ id: idString });

  const createGarder = api.garden.create.useMutation({});
  return (
    <>
      <h1>Blog Based on ID</h1>
      <h2>Id is: {id}</h2>
    </>
  );
}
