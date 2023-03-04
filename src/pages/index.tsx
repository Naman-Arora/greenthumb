import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import NavigationBar from "../components/NavigationBar";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>greenthumb</title>
        <meta name="description" content="Find Gardens Near You" />
        <link rel="shortcut icon" href="/leafs.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-yellow-200 to-yellow-400">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="font-outfit text-5xl font-extrabold tracking-normal text-green-600 sm:text-[5rem]">
            greenthumb
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined },
  // );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {sessionData && <NavigationBar page="Home" />}
      <button
        className="rounded-2xl bg-green-600 px-10 py-3 font-semibold text-yellow-300 no-underline transition hover:bg-green-800"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>

      {/* <Link
          href="#About-Me"
          className="inline-flex items-center rounded-lg border-1 border-black bg-white/70 p-2 text-center text-sm font-medium text-black backdrop-blur hover:bg-green-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          <IconPlus stroke={8} />
      </Link>
      <div>
        <h2 id="About-Me">About Me</h2>
      </div> */}
    </div>
  );
};
