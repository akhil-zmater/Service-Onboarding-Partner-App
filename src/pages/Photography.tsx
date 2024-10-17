import React, { useState } from "react";
import Navbar from "./Navbar";
import Input from "../components/Input";
import Main from "./Main";
import date from "../images/date.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { useDispatch } from "react-redux";
import NextFollowup from "./NextFollowup";
import Submit from "../components/Submit";
import { serviceCenterActions } from "../state/serviceCenter/serviceCenter.action";
import {
  BtnTypes,
  PTOStatusEnum,
} from "../state/serviceCenter/servicCenter.types";
import { useAppSelector } from "../state";
import {
  AddPhotoGraphyDetailsLoadingState,
  getEmployeeId,
  getFollowUpDetails,
} from "../state/serviceCenter/serviceCenter.selector";
import { scActions } from "../state/serviceCenter/serviceCenter.store";
import { getActiveScDetails } from "../state/serviceCenter/serviceCenter.selector";

interface PhotographyProps {
  isEditing: boolean;
}

function Photography(props: PhotographyProps) {
  const currDate = new Date();
  const activeSCDetails = useAppSelector(getActiveScDetails);
  const followUpDetails = useAppSelector(getFollowUpDetails);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const dispatch = useDispatch();
  const [showMain, setShowMain] = useState(false);
  const employeeId = useAppSelector(getEmployeeId);
  const { success } = useAppSelector(AddPhotoGraphyDetailsLoadingState);

  React.useEffect(() => {
    if (success) {
      setShowMain(true);
      dispatch(scActions.resetSCloadingStates());
    }
  }, [success]);
  const [inputs, setInputsss] = useState({
    status: "",
    photographer_name: "",
    comments: "",
  });

  React.useEffect(() => {
    if (activeSCDetails?.photographyDetails !== null) {
      if (
        activeSCDetails?.photographyDetails?.status === PTOStatusEnum.COMPLETE
      ) {
        setInputsss((prev) => ({
          ...prev,
          status: "Photography Complete",
          comments: activeSCDetails.photographyDetails?.comments as string,
        }));
        setSelectedDate(phDate);
      }
      if (
        activeSCDetails?.photographyDetails?.status === PTOStatusEnum.PENDING
      ) {
        setInputsss((prev) => ({
          ...prev,
          status: "Photography Pending",
        }));
      }
    }
  }, [activeSCDetails]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputsss({ ...inputs, [name]: value });
  };
  const empId = useAppSelector(getEmployeeId);

  const statusButtons = ["Photography Pending", "Photography Complete"];
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (inputs.status !== "") {
      if (
        inputs?.status === statusButtons[0] &&
        followUpDetails.reason === ""
      ) {
        alert("Please Fill All Input Fields");
        return;
      }
      if (
        inputs?.status === statusButtons[1] &&
        (selectedDate === null || inputs?.comments === "")
      ) {
        alert("Please Fill All Input Fields");
        return;
      }
      const day =
        selectedDate && String(selectedDate?.getDate()).padStart(2, "0"); // Get day and pad with leading zero
      const month =
        selectedDate && String(selectedDate?.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed, so +1) and pad with leading zero
      const year = selectedDate?.getFullYear(); // Get year
      const formattedDate = `${day}-${month}-${year}`;
      dispatch(
        serviceCenterActions.addPhotoGraphyDetails({
          comments: inputs?.comments,
          repId: empId as string,
          status:
            inputs?.status === "Photography Complete"
              ? PTOStatusEnum.COMPLETE
              : PTOStatusEnum.PENDING,
          isFollowUpClicked: inputs?.status === "Photography Pending",
          phDate: formattedDate,
        })
      );
    } else {
      alert("Please Fill All Input Fields");
    }
  };

  const handleToggle = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    if (!props.isEditing) {
      const statuss = e.currentTarget.getAttribute("data-name");
      if (statuss) {
        setInputsss((prev) => ({
          ...prev,
          status: statuss,
        }));
      }
    }
  };

  const statusComp = statusButtons.map((status, key) => (
    <div key={key} className="flex flex-col">
      <div className="text-sm text-black">
        <div
          data-name={status}
          onClick={handleToggle}
          className={`${
            key === statusButtons.length - 1
              ? "flex justify-between items-center pb-2 pt-2 text-black font-normal text-[0.75rem] leading-[1rem]"
              : "flex justify-between items-center pb-3 pt-2 border-b border-border text-black font-normal text-[0.75rem] leading-[1rem]"
          }`}
        >
          <p>{status}</p>
          <div
            className={`${
              inputs.status === status
                ? "bg-white rounded-full w-5 h-5 flex justify-center items-center border-2 border-blue"
                : "bg-white rounded-full w-5 h-5 flex justify-center items-center border-2 border-border"
            }`}
          >
            <button
              type="button"
              name={status}
              data-name={status}
              onClick={handleToggle}
              className={`${
                inputs.status === status
                  ? "bg-blue rounded-full w-3 h-3"
                  : "bg-gray-300 rounded-full w-3 h-3"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  ));

  const formattedDate = currDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleMain = (e: React.MouseEvent<HTMLImageElement>) => {
    setShowMain(true);
  };
  const dateStr =
    activeSCDetails?.photographyDetails &&
    activeSCDetails?.photographyDetails.phDate;
  let phDate: Date | null = null;

  if (dateStr && dateStr.includes("-")) {
    const [day, month, year] = dateStr.split("-");
    phDate = new Date(`${year}-${month}-${day}`);
  }

  return (
    <div>
      {showMain ? (
        <Main />
      ) : (
        <div>
          {showMain ? (
            <Main />
          ) : (
            <div>
              {" "}
              <Navbar onClick={handleMain} />
              <div className="ml-[0.7rem] mt-[1.2rem] mr-[0.5rem]">
                <h1 className="tracking-tight text-[1rem] leading-[1.5rem] bg-gradient-to-r from-[rgba(21,79,187,1)] to-[rgba(28,73,151,1)] bg-bluegrad bg-clip-text text-transparent font-medium">
                  Photography
                </h1>
                <div className="flex gap-1 mt-[0.75rem] text-xs text-ipcol w-max">
                  <p className="text-[0.75rem] leading-[1rem] font-normal text-ipcol ">
                    Date:
                  </p>
                  <p className="font-medium text-[0.75rem] leading-[1rem] text-ipcol">
                    {formattedDate}
                  </p>
                </div>
                {/* INPUT FIELDS */}
                <div className="mt-[0.75rem] flex flex-col gap-[1.25rem]">
                  <div className="flex flex-col gap-1">
                    <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                      Photographer Id
                    </p>
                    <Input
                      type="text"
                      name="photographer_name"
                      value={(employeeId as string) ?? ""}
                      placeholder=""
                      onChange={handleInput}
                      isReadOnly={true}
                      className="h-12 w-full pl-[0.75rem] border border-border  rounded-lg text-[1rem] text-ipcol"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                      Photography Status
                    </p>
                    <div className="border border-border p-2 rounded-lg">
                      {statusComp}
                    </div>
                  </div>
                  {inputs.status === "Photography Complete" && (
                    <div className="flex flex-col gap-1">
                      <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                        Photography Date
                      </p>
                      <div className="flex items-center justify-between h-12 w-full px-4 border border-border rounded-lg text-[1rem] font-normal leading-[1.25rem] text-ipcol">
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date: Date | null) =>
                            setSelectedDate(date)
                          }
                          className="w-full outline-none"
                          dateFormat="yyyy-MM-d"
                          disabled={props.isEditing}
                        />
                        <img src={date} alt="" className="w-5 h-5" />
                      </div>
                    </div>
                  )}
                  {inputs.status === "Photography Pending" ? (
                    <NextFollowup tab={BtnTypes.PHOTOGRAPHY} />
                  ) : (
                    <div className="flex flex-col gap-1">
                      <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                        Comments
                      </p>
                      <Input
                        type="text"
                        name="comments"
                        value={inputs.comments}
                        placeholder=""
                        onChange={handleInput}
                        isReadOnly={props.isEditing}
                        className="h-24 w-full pl-4 border border-border rounded-lg text-[1rem] leading-[1.25rem] text-ipcol font-normal "
                      />
                    </div>
                  )}
                  <Submit
                    onClick={handleSubmit}
                    isDisabled={
                      activeSCDetails?.photographyDetails?.status === "complete"
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Photography;
