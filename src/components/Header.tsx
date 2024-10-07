import { getMonthName } from "../constants/date";
import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";

type HeaderProps = {
  month: number;
  year: number;
  onClick: (_: { type: string; month: number; year: number }) => void;
};

export default function Header({ month, year, onClick }: HeaderProps) {
   const monthName =  getMonthName(year, month)
  return (
    <div className="flex items-center justify-between border-b py-2 px-4">
      <button
        className="p-2 hover:bg-slate-200 rounded-full"
        name={"prevMonth"}
        onClick={() =>
          onClick({
            type: "prevMonth",
            month,
            year,
          })
        }
      >
        <ChevronLeft />
      </button>
      <span className="text-xl font-medium">
        {monthName} {year}
      </span>
      <button
        className="p-2 hover:bg-slate-200 rounded-full"
        name={"nextMonth"}
        onClick={() =>
          onClick({
            type: "nextMonth",
            month,
            year,
          })
        }
      >
        <ChevronRight />
      </button>
    </div>
  );
}
