import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import Input from "../components/Input";
import cam from "../images/camera.svg";
import del from "../images/deleteicon.svg";
import down from "../images/download.svg";
import date from "../images/date.svg";
import Main from "./Main";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { useDispatch } from "react-redux";
import { setInputs } from "../redux/inputSlice";
import NextFollowup from "./NextFollowup";
import Submit from "../components/Submit";

function FlexInstallation() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const dispatch = useDispatch();
  const [showMain, setShowMain] = useState(false);
  const [onboarding, setOnbarding] = useState<string | null>(
    "Flex Installation Pending"
  );
  const [inputs, setInputsss] = useState({
    phone: "",
    sales_rep_id: "",
    service_center_name: "",
    service_center_owner: "",
    service_center_phone: "",
    service_center_location: "",
    status: "",
    additional_comments: "",
    verifier_name: "",
    transaction_id: "",
    verifier_comments: "",
    photographer_name: "",
    technician_name: "",
    installation_comments: "",
    subscription_type: null,
  });
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputsss({ ...inputs, [name]: value });
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const allInputFields = Object.values(inputs).every((value) => {
      return value !== null && typeof value === "string" && value.trim() !== "";
    });
    if (
      allInputFields !== null &&
      (onboarding !== "Flex Installation Pending" || null) &&
      files.length !== 0
    ) {
      dispatch(setInputs(inputs));
      setShowMain(true);
    } else {
      alert("Please Fill All Input Fields");
    }
  };
  const [files, setFiles] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleDelFile = (fileToDelete: string) => {
    setFiles((prev) => prev.filter((file) => file !== fileToDelete));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).map((file) => file.name);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleToggle = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    const statuss = e.currentTarget.getAttribute("data-name");
    if (statuss) {
      setInputsss((prev) => ({
        ...prev,
        status: statuss,
      }));
      setOnbarding(statuss);
    }
  };

  const statusButtons = [
    "Flex Installation Pending",
    "Flex Installation Complete",
  ];

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
              onboarding === status
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
                onboarding === status
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
    <div>
      {showMain ? (
        <Main />
      ) : (
        <div>
          {showMain ? (
            <Main />
          ) : (
            <div>
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
                <div className="mt-[0.75rem] flex flex-col gap-[1.25rem] ">
                  <div className="flex flex-col gap-1">
                    <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                      Technician Name
                    </p>
                    <Input
                      type="text"
                      name="technician_name"
                      value={inputs.technician_name}
                      placeholder=""
                      onChange={handleInput}
                      className="h-12 w-full pl-4 border border-border rounded-lg text-[1rem] font-normal leading-[1.25rem] text-ipcol"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
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
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                      Phtography Appointment Date
                    </p>
                    <div className="flex items-center justify-between h-12 w-full px-4 border border-border rounded-lg text-[1rem] font-normal leading-[1.25rem] text-ipcol">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date: Date | null) => setSelectedDate(date)}
                        className="w-full outline-none"
                        dateFormat="yyyy-MM-d"
                      />
                      <img src={date} alt="" className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                      Installation Status
                    </p>
                    <div className="border border-border p-2 rounded-lg">
                      {statusComp}
                    </div>
                  </div>
                  {onboarding === "Flex Installation Pending" ? (
                    <NextFollowup />
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
                        className="h-24 w-full pl-4 border border-border rounded-lg text-[1rem] font-normal leading-[1.25rem] text-ipcol"
                      />
                    </div>
                  )}
                  <Submit onClick={handleSubmit} />
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
