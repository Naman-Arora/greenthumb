import { type GetServerSidePropsContext } from "next";
import { getGreenThumbAuthSession } from "~/server/get-server-session";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { api } from "~/utils/api";
import NavigationBar from "~/components/NavigationBar";

const containerStyle = {
  width: "100vw",
  height: "90vh",
};

const center = {
  lat: 30.288,
  lng: -97.73,
};

function MyComponent() {
  const gardens = api.garden.all.useQuery();

  return (
    <div>
      <NavigationBar page="Maps" />
      <div className="h-[10vh]" />
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_KEY as string}
      >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {/* Child components, such as markers, info windows, etc. */}
          {gardens.data &&
            gardens.data.map((item, index) => {
              return (
                <MarkerF
                  key={index}
                  label={item.name}
                  position={{ lat: item.latitude, lng: item.longitude }}
                />
              );
            })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MyComponent;

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
