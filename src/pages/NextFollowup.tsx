import React, { useState } from "react";
import Input from "../components/Input";
import date from "../images/date.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";

function NextFollowup() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [comments, setComments] = useState("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComments(e.target.value);
  };
  return (
    <div className="flex flex-col gap-4 h-max">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-ipcol">Next Follow - Up Date</p>
        <div className="flex items-center justify-between h-12 w-full px-4 border border-border rounded-lg text-ipcol text-[0.8rem]">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            className="w-full outline-none text-[0.9rem]"
            dateFormat="yyyy-MM-d"
          />
          <img src={date} alt="" className="w-5 h-5" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-ipcol">Comments</p>
        <Input
          type="text"
          name="comments"
          value={comments}
          placeholder=""
          onChange={handleInput}
          className="h-24 w-full pl-4 border border-border rounded-lg text text-[0.9rem] text-ipcol"
        />
      </div>
    </div>
  );
}

export default NextFollowup;
