import React, { useState } from "react";
import Input from "../components/Input";
import date from "../images/date.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { useAppDispatch } from "../state";
import { scActions } from "../state/serviceCenter/serviceCenter.store";

function NextFollowup() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [comments, setComments] = useState("");
  const dispatch = useAppDispatch();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComments(e.target.value);
    dispatch(scActions.setPostFollowUpReason(e.target.value));

    console.log("date===>>", e.target.value);
  };
  return (
    <div className="flex flex-col gap-4 h-max">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-ipcol">Next Follow - Up Date</p>
        <div className="flex items-center justify-between h-12 w-full px-4 border border-border rounded-lg text-ipcol text-[0.8rem]">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => {
              setSelectedDate(date);
              if (date) {
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                const formattedDate = `${day}-${month}-${year}`;
                dispatch(
                  scActions.setPostFollowUpDate(formattedDate as string)
                );
              }
            }}
            className="w-full outline-none text-[0.9rem]"
            dateFormat="yyyy-MM-d"
          />
          <img src={date} alt="" className="w-5 h-5" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-ipcol">Reason</p>
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
