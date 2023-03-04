import Head from "next/head";
import { api } from "~/utils/api";

import NavigationBar from "~/components/NavigationBar";
import Event from "~/components/Event";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
const Events = () => {
  const allPosts = api.event.all.useQuery();
  console.log(allPosts.data);
  return (
    <>
      <Head>
        <title>greenthumb | Events</title>
      </Head>
      <div className="fixed z-[-10] h-[100vh] w-[100vw] bg-gradient-to-b from-yellow-200 to-yellow-400" />
      <NavigationBar page="Events" />
      <div className="h-[10vh]" />
      <div className="grid place-items-center py-10 px-20">
        <h1 className="mb-10 text-center font-outfit text-6xl font-black">
          Events
        </h1>
        {allPosts.data &&
          allPosts.data.map((item, index) => {
            return (
              <div key={index} className="my-4 content-center">
                <Event
                  route={item.id}
                  title={item.name}
                  date={item.time}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  description={item.desc}
                />
              </div>
            );
          })}
      </div>
      <div className="fixed bottom-6 left-4 z-40">
        <Link
          href="/events/create"
          className="inline-flex items-center rounded-lg border-2 border-black bg-white/70 p-2 text-center text-sm font-medium text-black backdrop-blur hover:bg-green-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          <IconPlus stroke={3} />
        </Link>
      </div>
    </>
  );
};

export default Events;
