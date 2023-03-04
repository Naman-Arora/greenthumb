import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { getGreenThumbAuthSession } from "~/server/get-server-session";
import { type GetServerSidePropsContext } from "next";
import { api } from "~/utils/api";
import { useState } from "react";
import Head from "next/head";
import { notifications } from "@mantine/notifications";
import { IconAlertTriangle, IconCheck } from "@tabler/icons-react";
// import { DatePickerInput } from "@mantine/dates";
import NavigationBar from "~/components/NavigationBar";

const content = '';

export default function CreateGarden() {
  const mutation = api.garden.create.useMutation();
  const [title, setTitle] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  // const [value, setValue] = useState<Date | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  return (
    <>
      <Head>
        <title>greenthumb | Create Garden</title>
      </Head>
      <div className="z-[-10] w-[100vw] h-[100vh] fixed bg-gradient-to-b from-yellow-200 to-yellow-400" />
      <NavigationBar page="Gardens" />
      <div className="h-[10vh]" />
      <div className="grid place-items-center py-10 px-20">
        <h1 className="mb-10 text-center text-6xl font-bold font-outfit">
          Create a New Garden
        </h1>
        <div className="my-6">
          <label className="mb-2 block text-base font-medium text-gray-900">
            Garden Name
          </label>
          <input
            type="text"
            className="block w-[40rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            required
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-base font-medium text-gray-900">
            Garden Latitude
          </label>
          <input
            type="number"
            className="block w-[40rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            required
            value={lat}
            onChange={(e) => setLat(e.currentTarget.value)}
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-base font-medium text-gray-900">
            Garden Longitude
          </label>
          <input
            type="number"
            className="block w-[40rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            required
            value={long}
            onChange={(e) => setLong(e.currentTarget.value)}
          />
        </div>
        <RichTextEditor editor={editor} className="mx-20">
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor>
        <button
          className="mt-10 rounded-lg border border-gray-300 bg-white px-6 py-3 text-xl font-bold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          onClick={() => {
            if (title !== "" && lat !== "" && long !== "" && editor?.getHTML() !== "") {
              notifications.show({
                id: "load-data",
                loading: true,
                message: "Creating Garden",
                autoClose: false,
                withCloseButton: false,
              });
              mutation.mutate({
                name: title,
                location: "Austin",
                latitude: parseFloat(lat),
                longitude: parseFloat(long),
                content: editor?.getHTML() as string,
              });
              if (mutation.isSuccess) {
                notifications.update({
                  id: "load-data",
                  color: "green",
                  message: "Garden was successfully created!",
                  icon: <IconCheck size="1rem" />,
                  autoClose: 2000,
                });
              } else if (mutation.isError) {
                notifications.update({
                  id: "load-data",
                  color: "red",
                  title: "Failed to create garden.",
                  message: "Please try again",
                  icon: <IconAlertTriangle size="1rem" />,
                  autoClose: 2000,
                });
              }
            } else {
              notifications.show({
                message: "The fields cannot be empty!",
                color: "red",
                autoClose: 2000,
                icon: <IconAlertTriangle size="1rem" />,
              });
            }
          }}
        >
          Create Event
        </button>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
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
