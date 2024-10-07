import { getMonthName } from "../constants/date";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";


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
        <ChevronLeftIcon />
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
        <ChevronRightIcon />
      </button>
    </div>
  );
}
