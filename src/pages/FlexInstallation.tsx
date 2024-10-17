import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import Input from "../components/Input";
// import cam from "../images/camera.svg";
// import del from "../images/deleteicon.svg";
// import down from "../images/download.svg";
import date from "../images/date.svg";
import Main from "./Main";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { useDispatch } from "react-redux";
import NextFollowup from "./NextFollowup";
import Submit from "../components/Submit";
import { serviceCenterActions } from "../state/serviceCenter/serviceCenter.action";
import {
  BtnTypes,
  FlexInstallationEnum,
} from "../state/serviceCenter/servicCenter.types";
import { useAppSelector } from "../state";
import {
  AddFlexDetailsLoadingState,
  getEmployeeId,
  getFollowUpDetails,
} from "../state/serviceCenter/serviceCenter.selector";
import { scActions } from "../state/serviceCenter/serviceCenter.store";
import { getActiveScDetails } from "../state/serviceCenter/serviceCenter.selector";

interface FlexInstallationProps {
  isEditing: boolean;
}

function FlexInstallation(props: FlexInstallationProps) {
  const activeSCDetails = useAppSelector(getActiveScDetails);
  const followUpDetails = useAppSelector(getFollowUpDetails);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const dispatch = useDispatch();
  const [showMain, setShowMain] = useState(false);
  const employeeId = useAppSelector(getEmployeeId);
  const { success } = useAppSelector(AddFlexDetailsLoadingState);
  const [showError, setShowError] = useState(false);
  const statusButtons = [
    "Flex Installation Pending",
    "Flex Installation Complete",
  ];
  // const [onboarding, setOnbarding] = useState<string | null>(
  //   "Flex Installation Pending"
  // );
  React.useEffect(() => {
    if (success) {
      setShowMain(true);
      dispatch(scActions.resetSCloadingStates());
    }
  }, [success]);

  const [inputs, setInputsss] = useState({
    status: "",
    installation_comments: "",
    technician_name: "",
    photoDate: "",
  });

  const dateStr =
    activeSCDetails?.flexDetails && activeSCDetails?.flexDetails.phDate;
  let photoDate: Date | null = null;

  if (dateStr && dateStr.includes("-")) {
    const [day, month, year] = dateStr.split("-");
    photoDate = new Date(`${year}-${month}-${day}`);
  }

  React.useEffect(() => {
    if (activeSCDetails?.flexDetails !== null) {
      if (
        activeSCDetails?.flexDetails.status ===
        FlexInstallationEnum.FLEX_INSTALLATION_COMPLETE
      ) {
        setInputsss((prev) => ({
          ...prev,
          status: "Flex Installation Complete",
          installation_comments: activeSCDetails.flexDetails.comments,
        }));
        setSelectedDate(photoDate);
      }
      if (
        activeSCDetails?.flexDetails.status ===
        FlexInstallationEnum.FLEX_INSTALLATION_PENDING
      ) {
        setInputsss((prev) => ({
          ...prev,
          status: "Flex Installation Pending",
        }));
      }
    }
  }, [activeSCDetails]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputsss({ ...inputs, [name]: value });
  };

  const empId = useAppSelector(getEmployeeId);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputs?.status !== "") {
      if (
        inputs?.status === statusButtons[1] &&
        (selectedDate === null || inputs?.installation_comments === "")
      ) {
        setShowError(true);
        return;
      }
      if (
        inputs?.status === statusButtons[0] &&
        followUpDetails?.reason === ""
      ) {
        setShowError(true);
        return;
      }
      const day =
        selectedDate && String(selectedDate?.getDate()).padStart(2, "0"); // Get day and pad with leading zero
      const month =
        selectedDate && String(selectedDate?.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed, so +1) and pad with leading zero
      const year = selectedDate?.getFullYear(); // Get year
      const formattedDate = `${day}-${month}-${year}`;
      dispatch(
        serviceCenterActions.addFlexDetails({
          comments: inputs.installation_comments,
          repId: empId as string,
          status:
            inputs.status.replace(/\s+/g, "").toLowerCase() ===
            "flexinstallationpending"
              ? FlexInstallationEnum.FLEX_INSTALLATION_PENDING
              : FlexInstallationEnum.FLEX_INSTALLATION_COMPLETE,
          isFollowUpClicked:
            inputs.status.replace(/\s+/g, "").toLowerCase() ===
            "flexinstallationpending",
          phDate: formattedDate,
        })
      );
    } else {
      setShowError(true);
    }
  };
  // const [files, setFiles] = useState<string[]>([]);
  // const inputRef = useRef<HTMLInputElement | null>(null);

  // const handleUpload = () => {
  //   if (inputRef.current) inputRef.current.click();
  // };

  // const handleDelFile = (fileToDelete: string) => {
  //   setFiles((prev) => prev.filter((file) => file !== fileToDelete));
  // };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFiles = e.target.files;
  //   if (selectedFiles) {
  //     const newFiles = Array.from(selectedFiles).map((file) => file.name);
  //     setFiles((prev) => [...prev, ...newFiles]);
  //   }
  // };

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
              ? "flex justify-between items-center pb-2 pt-2 text-black font-normal text-[0.8rem] leading-[1rem]"
              : "flex justify-between items-center pb-3 pt-2 border-b border-border  text-black font-normal text-[0.8rem] leading-[1rem]"
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

  const currDate = new Date();

  const formattedDate = currDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleMain = (e: React.MouseEvent<HTMLImageElement>) => {
    setShowMain(true);
  };

  return (
    <div className="w-screen">
      {showMain ? (
        <Main />
      ) : (
        <div className="w-screen">
          {showMain ? (
            <Main />
          ) : (
            <div className="w-screen">
              <Navbar onClick={handleMain} />
              <div className="ml-[0.7rem] mt-[1.2rem] mr-[0.5rem]">
                <h1 className="tracking-tight text-[1rem] leading-[1.5rem] bg-gradient-to-r from-[rgba(21,79,187,1)] to-[rgba(28,73,151,1)] bg-bluegrad bg-clip-text text-transparent font-medium">
                  Flex Installation
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
                <div className="flex flex-col w-full">
                  <div className="mt-[0.75rem] flex flex-col gap-[1.25rem] ">
                    <div className="flex flex-col gap-1">
                      <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                        Technician Id
                      </p>
                      <Input
                        type="text"
                        name="technician_name"
                        value={(employeeId as string) ?? ""}
                        placeholder=""
                        onChange={handleInput}
                        className="h-12 w-full pl-4 border border-border rounded-lg text-[1rem] font-normal leading-[1.25rem] text-ipcol"
                        isReadOnly={true}
                      />
                    </div>

                    {/* <div className="flex flex-col gap-1"> //TODO: in future
                    <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                      Installation Pics
                    </p>
                    <div className="flex flex-col gap-3 h-max py-2 w-full pl-4 pr-2 border border-border rounded-lg text-lg">
                      <input
                        type="file"
                        ref={inputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                      />
                      {files.length > 0 && (
                        <div className="flex flex-col gap-2">
                          {files.map((file, key) => (
                            <div
                              key={key}
                              className="flex items-center justify-between py-2 border-b border-border"
                            >
                              <img src={down} alt="" className="h-5 w-5" />
                              <p className="w-52 text-blue text-sm underline underline-offset-2">
                                {file}
                              </p>
                              <img
                                src={del}
                                alt=""
                                className="h-5 w-5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelFile(file);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div
                        onClick={handleUpload}
                        className="flex items-center gap-2"
                      >
                        <img src={cam} alt="" className="w-5 h-5" />
                        <p className="text-blue">Upload Image</p>
                      </div>
                    </div>
                  </div> */}
                    <div className="flex flex-col gap-1">
                      <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                        Installation Status
                      </p>
                      <div className="border border-border p-2 rounded-lg">
                        {statusComp}
                      </div>
                    </div>
                    {inputs.status === "Flex Installation Complete" && (
                      <div className="flex flex-col gap-1">
                        <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                          Phtography Appointment Date
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

                    {inputs.status === "Flex Installation Pending" ? (
                      <NextFollowup tab={BtnTypes.FLEX_INSTALLATION} />
                    ) : (
                      <div className="flex flex-col gap-1">
                        <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                          Comments
                        </p>
                        <Input
                          type="text"
                          name="installation_comments"
                          value={inputs.installation_comments}
                          placeholder=""
                          onChange={handleInput}
                          isReadOnly={props.isEditing}
                          className="h-24 w-full pl-4 border border-border rounded-lg text-[1rem] font-normal leading-[1.25rem] text-ipcol"
                        />
                      </div>
                    )}
                    {showError && (
                      <p className="text-[0.8rem] font-normal pl-2 leading-[1rem] text-red">
                        Please Fill All Fields !
                      </p>
                    )}
                    <div className="self-center">
                      <Submit
                        onClick={handleSubmit}
                        isDisabled={
                          activeSCDetails?.flexDetails !== null
                            ? activeSCDetails?.flexDetails.status ===
                              FlexInstallationEnum.FLEX_INSTALLATION_COMPLETE
                              ? true
                              : false
                            : false
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FlexInstallation;
