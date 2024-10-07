import { useRef, useState } from "react";
import Calendar from "../components/Calendar";
import InputField from "../components/Input";
import { formatDateNumber, getDate } from "../constants/date";
import useClickOutside from "../hooks/useClickOutside";
import Header from "../components/Header";

export type SelectedDate = {
  date?: number;
  month?: number;
  year?: number;
};

export default function Schedule() {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    date: undefined,
    month: undefined,
    year: undefined,
  });

  const { month: month_, year: year_ } = getDate(
    selectedDate.year,
    selectedDate.month
  );
  const [month, setMonth] = useState(month_);
  const [year, setYear] = useState(year_);
  const inputRef = useRef(null);

  useClickOutside(inputRef, () => setVisible(false));

  const handleInputClick = () => {
    setVisible(true);
  };

  const handleSelect = (date: number, month: number, year: number) => {
    setSelectedDate({
      date,
      month,
      year,
    });
    setVisible(false);
  };

  console.log(selectedDate)
  const handleButtonClick = ({
    type,
    month
  }: {
    type: string;
    month: number;
    year: number;
  }) => {
    if (type === "prevMonth") {
      setMonth((prev) => (prev === 0 ? 11 : prev - 1));
      if(month === 0 ){
        setYear( prev => prev - 1);
      }
    } else if (type === "nextMonth") {
      setMonth((prev) => (prev === 11 ? 0 : prev + 1));
      if(month === 11 ){
        setYear( prev => prev + 1);
      }
    }
  };

  const inputValue = selectedDate.date
    ? `${formatDateNumber(selectedDate.date!)}/${formatDateNumber(
        selectedDate.month! + 1
      )}/${formatDateNumber(selectedDate.year!)}`
    : "";

  return (
    <>
      <h1 className="font-medium text-2xl text-center mb-5">Calendar</h1>
      <div className="width-30-rem mx-auto relative" ref={inputRef}>
        <InputField
          className="text-xl"
          defaultValue={inputValue}
          onClick={handleInputClick}
          placeholder="dd/mm/yyyy"
        />
        {visible && (
          <>
            <div className="width-30-rem absolute z-10 w-full  shadow-md rounded-md border-t  mt-1">
              <Header month={month} year={year} onClick={handleButtonClick} />
              <Calendar monthIndex={month} year={year} onClick={handleSelect} selectedDate={selectedDate} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
