import { IconHeart, IconShare } from "@tabler/icons-react";
import Link from "next/link";

type Props = {
  title: string;
  profileID?: string;
  body: string;
  route: string;
};

const Post = (props: Props) => {
  return (
    <Link href={`/blog/${props.route}`}>
      <div className="w-[40.125rem] rounded-2xl border border-black bg-white pt-4 shadow-lg hover:bg-slate-100 transition-all duration-300">
        <div className="px-4">
          <h2 className="mb-4 text-left font-bold font-outfit">{props.title}</h2>
          <h6 className="text-left">{props.body}</h6>
          <br></br>
        </div>
        <button className="h-8 w-[20rem] rounded-bl-2xl border-t border-r border-black font-bold text-slate-600 hover:bg-slate-200 transition-all duration-300">
          <div className="flex items-center">
            <p className="ml-[8rem] mr-2">Like</p>
            <IconHeart />
          </div>
        </button>
        <button className="h-8 w-[20rem] rounded-br-2xl border-t border-black font-bold text-slate-600 hover:bg-slate-200 transition-all duration-300">
          <div className="flex items-center">
            <p className="ml-[8rem] mr-2">Share</p>
            <IconShare />
          </div>
        </button>
      </div>
    </Link>
  );
};

export default Post;
