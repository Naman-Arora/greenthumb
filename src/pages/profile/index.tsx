import Head from "next/head";

import { useSession } from "next-auth/react";
import { type GetServerSidePropsContext } from "next";
import { getGreenThumbAuthSession } from "~/server/get-server-session";
import NavigationBar from "~/components/NavigationBar";
import {
  IconAddressBook,
  IconAdjustments,
  IconUserCircle,
} from "@tabler/icons-react";

const Profile = () => {
  const session = useSession();
  const user = session.data?.user;
  return (
    <>
      <Head>
        <title>greenthumb | Profile</title>
      </Head>
      <div className="fixed z-[-10] h-[100vh] w-[100vw] bg-gradient-to-b from-yellow-200 to-yellow-500" />
      <NavigationBar page="Profile" />
      <div className="h-[10vh]" />
      <div className="grid-cols-3 place-items-center">
        <div className="grid place-items-center">
          <div className="my-[10vh] w-[70vw]">
            <div className="block max-w-[70vw] rounded-3xl border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  <li className="mr-2">
                    <a
                      href="#"
                      className="active group inline-flex rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    >
                      <IconUserCircle size={20} className="mr-2" />
                      Profile
                    </a>
                  </li>
                  <li className="mr-2">
                    <a
                      href="#"
                      className="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <IconAdjustments size={20} className="mr-2" />
                      Settings
                    </a>
                  </li>
                  <li className="mr-2">
                    <a
                      href="#"
                      className="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <IconAddressBook size={20} className="mr-2" />
                      Contacts
                    </a>
                  </li>
                </ul>
              </div>
              <div className="grid py-10 px-20">
                <h1 className="mb-4 text-center font-outfit text-6xl font-black tracking-normal">
                  Profile
                </h1>
                {user && user.image && (
                  <div className="flex justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="m-4 rounded-2xl font-bold"
                      src={user.image}
                      alt="Avatar"
                      width={120}
                    />
                  </div>
                )}
                <div className="inline-flex content-start justify-start">
                  <div className="m-4 w-36 rounded-xl bg-green-600 p-4 text-center font-bold text-white">
                    Username
                  </div>
                  <p className="m-4 p-4">{user && user.name}</p>
                </div>
                <div className="inline-flex content-start justify-start">
                  <p className="m-4 w-36 rounded-xl bg-green-600 p-4 text-center font-bold text-white">
                    Email
                  </p>
                  <p className="m-4 p-4">{user && user.email}</p>
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const session = await getGreenThumbAuthSession(ctx);
  
    if (!session) {
      return {
        redirect: { destination: "/", permanent: false },
        props: {},
      };
    }
  
    return {
      props: {
        session,
      },
    };
  };