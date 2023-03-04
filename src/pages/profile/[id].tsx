import Head from "next/head";
import { api } from "~/utils/api";

// import { useSession } from "next-auth/react";

import NavigationBar from "~/components/NavigationBar";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const idString = id as string;
  const user = api.profile.findOne.useQuery({ id: idString });
  console.log(user);
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="fixed z-[-10] h-[100vh] w-[100vw] bg-gradient-to-b from-yellow-200 to-yellow-500" />
      <NavigationBar page="Profile" />
      <div className="h-[10vh]" />
      <div className="grid-cols-3 place-items-center">
        <div className="grid place-items-center">
          <div className="my-[10vh] h-[70vh] w-[70vw]">
            <div className="block h-[70vh] max-w-[70vw] rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  <li className="mr-2">
                    <a
                      href="#"
                      className="active group inline-flex rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    >
                      <svg
                        aria-hidden="true"
                        className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Profile
                    </a>
                  </li>
                  <li className="mr-2">
                    <a
                      href="#"
                      className="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <svg
                        aria-hidden="true"
                        className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
                      </svg>
                      Settings
                    </a>
                  </li>
                  <li className="mr-2">
                    <a
                      href="#"
                      className="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <svg
                        aria-hidden="true"
                        className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Contacts
                    </a>
                  </li>
                </ul>
              </div>
              <div className="grid py-10 px-20">
                <h1 className="mb-4 text-center font-outfit text-6xl font-black tracking-normal">
                  Profile
                </h1>
                {user.data?.image && (
                  <div className="flex justify-center">
                    <img
                      className="m-4 rounded-2xl font-bold"
                      src={user.data?.image}
                      alt="Avatar"
                      width={120}
                    />
                  </div>
                )}
                <div className="inline-flex content-start justify-start">
                  <div className="m-4 w-36 rounded-xl bg-green-600 p-4 text-center font-bold text-white">
                    Username
                  </div>
                  <p className="m-4 p-4">{user && user.data?.name}</p>
                </div>
                <div className="inline-flex content-start justify-start">
                  <div className="m-4 w-36 rounded-xl bg-green-600 p-4 text-center font-bold text-white">
                    Email
                  </div>
                  <p className="m-4 p-4">{user && user.data?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
