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
    <nav className="fixed top-0 left-0 z-20 h-[10vh] w-full border-b border-gray-200 bg-white px-2 py-2.5 dark:border-gray-600 dark:bg-gray-800 sm:px-4 ">
      <div className= "w-[98vw] flex flex-wrap justify-between align-middle border border-white">
        <Link href="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-4xl font-semibold text-green-600  border border-white">
            greenthumb
          </span>
        </Link>
        <div
          className="hidden w-full items-center justify-between align-middle md:order-1 md:flex md:w-auto border border-white"
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-800">
            {/* <li>
              <a
                href="#"
                className="block rounded mx-4 bg-white text-white dark:text-white md:bg-transparent md:p-0 md:text-white"
                aria-current="page"
              >
                Home
              </a>
            </li> */}
            <NavigationItem name="Home" route="/" currentPage={props.page === "Home" ? true : false} />
            {/* <li>
              <Link
                href="/map"
                className="block rounded mx-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                Map
              </Link>
            </li> */}
            <NavigationItem name="Map" route="/map" currentPage={props.page === "Map" ? true : false} />
            {/* <li>
              <Link
                href="/blog"
                className="block rounded mx-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                Blog
              </Link>
            </li> */}
            <NavigationItem name="Blog" route="/blog" currentPage={props.page === "Blog" ? true : false} />
            {/* <li>
              <Link
                href="#"
                className="block rounded mx-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                Events
              </Link>
            </li> */}
            <NavigationItem name="Events" route="/events" currentPage={props.page === "Events" ? true : false} />
          </ul>
        </div>
        <div className="flex md:order-2  border border-white">
          <div className="flex items-center justify-center">
            {sessionData?.user.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt="profile-pic"
                src={sessionData.user.image}
                width="36"
                height="36"
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
