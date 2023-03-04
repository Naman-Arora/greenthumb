import { IconHeart, IconShare } from "@tabler/icons-react";

type Props = {
  title: string;
  profileID?: string;
  body: string;
};

const Post = (props: Props) => {
  return (
    <div className="w-[40.125rem] rounded-2xl border border-black bg-white pt-4 shadow-lg">
      <div className="px-4">
        <h2 className="mb-4 text-left font-bold">{props.title}</h2>
        <h6 className="text-left">{props.body}</h6>
        <br></br>
      </div>
      <button className="h-8 w-[20rem] rounded-bl-2xl border-t border-r border-black font-bold text-slate-600 hover:bg-slate-200">
        <div className="flex items-center">
          <p className="ml-[8rem] mr-3">Like</p>
          <IconHeart />
        </div>
      </button>
      <button className="h-8 w-[20rem] rounded-br-2xl border-t border-black font-bold text-slate-600 hover:bg-slate-200">
        <div className="flex items-center">
          <p className="ml-[8rem] mr-3">Share</p>
          <IconShare />
        </div>
      </button>
    </div>
  );
};

export default Post;
