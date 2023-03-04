// import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import NavigationItem from "../components/NavigationItem";

type Props = {
  page: string;
};

const NavigationBar = (props: Props) => {
  const { data: sessionData } = useSession();

  return (
    <nav className="fixed top-0 left-0 z-20 flex h-[10vh] w-full border-b border-gray-200 bg-white/60 px-[2vw] py-2.5 backdrop-blur-lg rounded-b">
      <div className="flex w-[96vw] flex-wrap justify-between align-middle">
        <Link href="/" className="flex items-center">
          <span className="w-[250px] self-center whitespace-nowrap align-middle font-outfit text-4xl font-semibold text-green-600">
            greenthumb
          </span>
        </Link>
        <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg border md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium">
            <NavigationItem
              name="Home"
              route="/"
              currentPage={props.page === "Home" ? true : false}
            />
            <NavigationItem
              name="Gardens"
              route="/gardens"
              currentPage={props.page === "Gardens" ? true : false}
            />
            <NavigationItem
              name="Blog"
              route="/blog"
              currentPage={props.page === "Blog" ? true : false}
            />
            <NavigationItem
              name="Events"
              route="/events"
              currentPage={props.page === "Events" ? true : false}
            />
          </ul>
        </div>
        <div className="flex w-[250px] justify-end md:order-2">
          <div className="flex items-center justify-center">
            <Link href={"/profile"}>
              {sessionData?.user.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt="profile-pic"
                  src={sessionData.user.image}
                  width="50"
                  height="50"
                  className="rounded-md"
                />
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
