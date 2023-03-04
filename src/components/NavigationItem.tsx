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
            ? "mx-4 block rounded bg-white font-bold text-black dark:text-white md:bg-transparent md:p-0 text-xl"
            : "mx-4 block rounded font-bold text-gray-400 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white text-xl"
        }
        aria-current={props.currentPage ? "page" : "false"}
      >
        {props.name}
      </Link>
    </li>
  );
};

export default NavigationItem;
