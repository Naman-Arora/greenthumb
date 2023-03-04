import { type GetServerSidePropsContext } from "next";
import { getGreenThumbAuthSession } from "~/server/get-server-session";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  // useGoogleMap,
} from "@react-google-maps/api";
import { api } from "~/utils/api";
import NavigationBar from "~/components/NavigationBar";
import Head from "next/head";
import { createContext, useContext, useState } from "react";
import type { Garden } from "@prisma/client";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

const containerStyle = {
  width: "100vw",
  height: "90vh",
};

const center = {
  lat: 30.288,
  lng: -97.73,
};

function MapComponent() {
  // if (!map) {
  //   console.log("NO MAP")
  // }
  // const mapRef = useRef<GoogleMap>();
  const MapContext = createContext<google.maps.Map | null>(null);
  const map = useContext(MapContext);
  // const map2 = useGoogleMap();

  const gardens = api.garden.all.useQuery();
  const [garden, setGarden] = useState<Garden | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Head>
        <title>greenthumb | Gardens</title>
      </Head>
      <Drawer
        shadow="xl"
        opened={opened}
        onClose={close}
        // title="About Garden"
        withCloseButton={true}
        overlayProps={{ opacity: 0.1, blur: 0 }}
        scrollAreaComponent={Drawer.NativeScrollArea}
        position="right"
        size={400}
      >
        <h1 className="text-center font-outfit text-2xl font-bold">
          {garden?.name}
        </h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {garden?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="m-2 rounded object-cover"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={garden?.image}
            alt={garden?.name}
            width={350}
            height={250}
          />
        )}
        <p className="text-center font-outfit font-bold">
          {garden?.location}, TX
        </p>
        <br />
        {garden?.content && (
          <div className="prose prose-sm font-outfit">
            <div
              dangerouslySetInnerHTML={{ __html: garden.content as string }}
            />
          </div>
        )}
        {garden?.userId && (
          <div className="mt-10 text-blue-600 hover:underline">
            <Link href={`/profile/${garden?.userId}`}>
              <p className="text-center">Garden Owner</p>
            </Link>
          </div>
        )}
      </Drawer>
      <div className="fixed bottom-6 left-4 z-40">
        <Link
          href="/gardens/create"
          className="inline-flex items-center rounded-lg border-2 border-black bg-white/70 p-2 text-center text-sm font-medium text-black backdrop-blur hover:bg-green-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          <IconPlus stroke={3} />
        </Link>
      </div>
      <div>
        <NavigationBar page="Gardens" />
        <div className="h-[10vh]" />
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_KEY as string}
        >
          <GoogleMap
            // id={map}

            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            // ref={mapRef}
          >
            {gardens.data &&
              gardens.data.map((item, index) => {
                return (
                  <MarkerF
                    key={index}
                    // label={item.name}
                    position={{ lat: item.latitude, lng: item.longitude }}
                    onClick={() => {
                      console.log("map zoom is", map?.getZoom());
                      map?.panTo({ lat: item.latitude, lng: item.longitude });
                      setGarden(item);
                      open();
                    }}
                  />
                );
              })}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}

export default MapComponent;

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   const session = await getGreenThumbAuthSession(ctx);

//   if (!session) {
//     return {
//       redirect: { destination: "/", permanent: false },
//       props: {},
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// };
