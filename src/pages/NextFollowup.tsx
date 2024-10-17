import React, { useRef, useState } from "react";
import Input from "../components/Input";
import date from "../images/date.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { useAppDispatch, useAppSelector } from "../state";
import { scActions } from "../state/serviceCenter/serviceCenter.store";
import { BtnTypes } from "../state/serviceCenter/servicCenter.types";
import { getActiveScDetails } from "../state/serviceCenter/serviceCenter.selector";

interface NextFollowUpProps {
  tab?: BtnTypes;
}
function NextFollowup(props: NextFollowUpProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const activeScDetails = useAppSelector(getActiveScDetails);
  const followUpDateString = () => {
    if (props.tab === BtnTypes.REGISTRATION) {
      return activeScDetails?.registrationFollowup?.followUpDate as string;
    } else if (props.tab === BtnTypes.VERIFICATION) {
      if (activeScDetails?.verificationDetails !== null) {
        return activeScDetails?.verificationDetails?.followup
          ?.followUpDate as string;
      }
    } else if (props.tab === BtnTypes.FLEX_INSTALLATION) {
      if (activeScDetails?.flexDetails !== null) {
        return activeScDetails?.flexDetails?.followup?.followUpDate as string;
      }
    } else if (props.tab === BtnTypes.PHOTOGRAPHY) {
      if (activeScDetails?.photographyDetails !== null) {
        return activeScDetails?.photographyDetails?.followup
          ?.followUpDate as string;
      }
    } else if (props.tab === BtnTypes.TRAINING) {
      if (activeScDetails?.trainingDetails !== null) {
        return activeScDetails?.trainingDetails?.followup
          ?.followUpDate as string;
      }
    } else if (props.tab === BtnTypes.ONBOARDING) {
      if (activeScDetails?.onBoardingDetails !== null) {
        return activeScDetails?.onBoardingDetails?.followup
          ?.followUpDate as string;
      }
    } else {
      return "";
    }
  };

  const dateStr = followUpDateString();
  let formattedDate: Date | null = null;

  if (dateStr && dateStr.includes("-")) {
    const [day, month, year] = dateStr.split("-");
    formattedDate = new Date(`${year}-${month}-${day}`);
  }

  React.useEffect(() => {
    if (props.tab === BtnTypes.REGISTRATION) {
      if (activeScDetails?.registrationFollowup !== null) {
        setSelectedDate(formattedDate);
        setComments(activeScDetails?.registrationFollowup?.reason as string);
        dispatch(
          scActions.setPostFollowUpDate(
            activeScDetails?.registrationFollowup?.followUpDate as string
          )
        );
        dispatch(
          scActions.setPostFollowUpReason(
            activeScDetails?.registrationFollowup?.reason as string
          )
        );
      }
    } else if (props.tab === BtnTypes.VERIFICATION) {
      if (activeScDetails?.verificationDetails !== null) {
        setSelectedDate(formattedDate);
        setComments(
          activeScDetails?.verificationDetails?.followup?.reason as string
        );
        dispatch(
          scActions.setPostFollowUpDate(
            activeScDetails?.verificationDetails?.followup
              ?.followUpDate as string
          )
        );
        dispatch(
          scActions.setPostFollowUpReason(
            activeScDetails?.verificationDetails?.followup?.reason as string
          )
        );
      }
    } else if (props.tab === BtnTypes.FLEX_INSTALLATION) {
      if (activeScDetails?.flexDetails !== null) {
        setSelectedDate(formattedDate);
        setComments(activeScDetails?.flexDetails?.followup?.reason as string);
        dispatch(
          scActions.setPostFollowUpDate(
            activeScDetails?.flexDetails?.followup?.followUpDate as string
          )
        );
        dispatch(
          scActions.setPostFollowUpReason(
            activeScDetails?.flexDetails?.followup?.reason as string
          )
        );
      }
    } else if (props.tab === BtnTypes.PHOTOGRAPHY) {
      if (activeScDetails?.photographyDetails !== null) {
        setSelectedDate(formattedDate);
        setComments(
          activeScDetails?.photographyDetails?.followup?.reason as string
        );
        dispatch(
          scActions.setPostFollowUpDate(
            activeScDetails?.photographyDetails?.followup
              ?.followUpDate as string
          )
        );
        dispatch(
          scActions.setPostFollowUpReason(
            activeScDetails?.photographyDetails?.followup?.reason as string
          )
        );
      }
    } else if (props.tab === BtnTypes.TRAINING) {
      if (activeScDetails?.trainingDetails !== null) {
        setSelectedDate(formattedDate);
        setComments(
          activeScDetails?.trainingDetails?.followup?.reason as string
        );
        dispatch(
          scActions.setPostFollowUpDate(
            activeScDetails?.trainingDetails?.followup?.followUpDate as string
          )
        );
        dispatch(
          scActions.setPostFollowUpReason(
            activeScDetails?.trainingDetails?.followup?.reason as string
          )
        );
      }
    } else if (props.tab === BtnTypes.ONBOARDING) {
      if (activeScDetails?.onBoardingDetails !== null) {
        setSelectedDate(formattedDate);
        setComments(
          activeScDetails?.onBoardingDetails?.followup?.reason as string
        );
        dispatch(
          scActions.setPostFollowUpDate(
            activeScDetails?.onBoardingDetails?.followup?.followUpDate as string
          )
        );
        dispatch(
          scActions.setPostFollowUpReason(
            activeScDetails?.onBoardingDetails?.followup?.reason as string
          )
        );
      }
    }
  }, [props.tab, activeScDetails]);

  const [comments, setComments] = useState("");
  const dispatch = useAppDispatch();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComments(e.target.value);
    dispatch(scActions.setPostFollowUpReason(e.target.value));

    console.log("date===>>", e.target.value);
  };

  const datePickerRef = useRef<DatePicker>(null);
  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const datePickerInput = datePickerRef.current
      ?.input as HTMLInputElement | null;
    if (datePickerInput) {
      datePickerInput.focus();
    }
  };

  return (
    <div className="flex flex-col gap-4 h-max">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-ipcol">Next Follow - Up Date</p>
        <div
          onClick={handleImageClick}
          className="flex items-center justify-between h-12 w-full px-4 border border-border rounded-lg text-ipcol text-[0.8rem]"
        >
          <DatePicker
            ref={datePickerRef}
            selected={selectedDate}
            minDate={new Date()}
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
