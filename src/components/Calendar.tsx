import {
  DAY_NAMES,
  getDate,
  getMonthDays,
  getMonthStartDay,
} from "../constants/date";
import type { SelectedDate } from "../pages/Schedule";

type CalendarProps = {
  monthIndex: number;
  year: number;
  onClick: (d: number, m: number, y: number) => void;
  selectedDate?: SelectedDate;
};

export default function Calendar({
  monthIndex,
  year,
  selectedDate,
  onClick,
}: CalendarProps) {
  const { date, month, year: currentYear } = getDate();
  const daysInMonth = getMonthDays(year, monthIndex);
  const startDay = getMonthStartDay(year, monthIndex);

  return (
    <div className="grid grid-cols-7 gap-1 p-2">
      {DAY_NAMES.map((day) => (
        <div
          key={day}
          className="font-medium py-5 text-slate-600 text-center mb-2 border-b border-gray-100"
        >
          {day}
        </div>
      ))}
      {Array.from({ length: daysInMonth + startDay }, (_, idx) => {
        const displayDate = idx + 1 - startDay;
        const isToday =
          displayDate === date && month === monthIndex && year === currentYear;
        const isSelected =
          displayDate === selectedDate?.date &&
          monthIndex === selectedDate.month &&
          year === selectedDate.year;

        if (idx  < startDay) {
          return <span></span>;
        }

        return (
          <div
            key={idx}
            className={`${
              isToday
                ? "bg-blue-600 text-white"
                : isSelected
                ? "bg-slate-300"
                : "hover:bg-slate-100"
            } cursor-pointer text-xl p-3 text-center rounded-md`}
            onClick={() => onClick(displayDate, monthIndex, year)}
          >
            {displayDate}
          </div>
        );
      })}
    </div>
  );
}
