import Link from "next/link";

type Props = {
  title: string;
  date: Date;
  description: string | null;
  route: string;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Event = (props: Props) => {
  const formatDate = (date: Date) => {
    const now = new Date(Date.now());
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    let formattedDate = months[date.getMonth()] + " " + date.getDate();
    formattedDate += `, ${date.getFullYear()}`;
    if (now.getMonth() === date.getMonth()) {
      if (now.getDate() === date.getDate()) {
        formattedDate = "Today";
      } else if (now.getDate() === date.getDate() - 1) {
        formattedDate = "Tomorrow";
      }
    }
    return formattedDate;
  };

  return (
    <Link href={`/events/${props.route}`}>
      <div className="w-[40.125rem] rounded-2xl border border-black bg-white pt-4 shadow-lg transition-all duration-300 hover:bg-slate-100">
        <div className="inline-flex px-4">
          <h2 className="mb-4 text-left font-outfit font-bold">
            {props.title}&nbsp;
          </h2>
          <h3 className="text-left">{"| " + formatDate(props.date)}</h3>
          <br></br>
        </div>
        {props.description && <p className="px-4">{props.description}</p>}
        <br></br>
      </div>
    </Link>
  );
};

export default Event;
