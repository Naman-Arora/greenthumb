import Link from "next/link";

type Props = {
  name: string;
  route: string;
  currentPage: boolean;
};

const NavigationItem = (props: Props) => {
  return (
    <li>
      <Link
        href={props.route}
        className={
          props.currentPage
            ? "mx-4 block rounded bg-white font-outfit text-xl font-bold text-black md:bg-transparent md:p-0"
            : "mx-4 block rounded font-outfit text-xl font-bold text-gray-400 hover:text-green-600 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-white"
        }
        aria-current={props.currentPage ? "page" : "false"}
      >
        {props.name}
      </Link>
    </li>
  );
};

export default NavigationItem;
