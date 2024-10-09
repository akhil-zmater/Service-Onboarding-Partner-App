import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import Input from "../components/Input";
import cam from "../images/camera.svg";
import date from "../images/date.svg";
import del from "../images/deleteicon.svg";
import down from "../images/download.svg";
import Main from "./Main";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { useDispatch } from "react-redux";
import NextFollowup from "./NextFollowup";
import Submit from "../components/Submit";
import { serviceCenterActions } from "../state/serviceCenter/serviceCenter.action";
import {
  BtnTypes,
  VerificationStatusEnum,
} from "../state/serviceCenter/servicCenter.types";
import { useAppSelector } from "../state";
import {
  AddVerificationDetailsLoadingState,
  getEmployeeId,
} from "../state/serviceCenter/serviceCenter.selector";
import { getActiveScDetails } from "../state/serviceCenter/serviceCenter.selector";
import { scActions } from "../state/serviceCenter/serviceCenter.store";

interface VerificationProps {
  isEditing: boolean;
}

function Verification(props: VerificationProps) {
  const activeScDetails = useAppSelector(getActiveScDetails);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const statusButtons = ["Pending", "Approved", "Rejected"];
  const { success } = useAppSelector(AddVerificationDetailsLoadingState);
  React.useEffect(() => {
    if (success) {
      setShowMain(true);
      dispatch(scActions.resetSCloadingStates());
    }
  }, [success]);

  const dateStr =
    activeScDetails?.verificationDetails &&
    activeScDetails?.verificationDetails.flexInstallationDate;
  let flexInstallationDate: Date | null = null;

  if (dateStr && dateStr.includes("-")) {
    const [day, month, year] = dateStr.split("-");
    flexInstallationDate = new Date(`${year}-${month}-${day}`);
  }
  const [inputs, setInputsss] = useState({
    status: "",
    verifier_name: "",
    flexDimensions: "",
    verifier_comments: "",
  });
  const dispatch = useDispatch();
  const [showMain, setShowMain] = useState(false);
  React.useEffect(() => {
    if (activeScDetails?.verificationDetails !== null) {
      if (
        activeScDetails?.verificationDetails.verificationStatus ===
        VerificationStatusEnum.VERIFIED
      ) {
        const verificationDetails = activeScDetails.verificationDetails;
        setInputsss((prev) => ({
          ...prev,
          status: "Approved",
          flexDimensions: verificationDetails.flexDimensions,
          verifier_comments: verificationDetails.comments,
          verifier_name: verificationDetails.verifierName,
        }));
        setSelectedDate(flexInstallationDate);
      } else if (
        activeScDetails?.verificationDetails.verificationStatus ===
        VerificationStatusEnum.VERIFICATION_PENDING
      ) {
        setInputsss((prev) => ({
          ...prev,
          verifier_name: activeScDetails?.verificationDetails.verifierName,
          status: "Pending",
        }));
      } else {
        setInputsss((prev) => ({ ...prev, status: "Rejected" }));
      }
    }
  }, [activeScDetails]);

  const [payment, setPayment] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  // const [file, setFile] = useState<string | null>(null);
  const datePickerRef = useRef<DatePicker>(null);

  const handleVerFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputsss({ ...inputs, [name]: value });
  };
  const empId = useAppSelector(getEmployeeId);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (inputs.status !== "") {
      const day =
        selectedDate && String(selectedDate?.getDate()).padStart(2, "0"); // Get day and pad with leading zero
      const month =
        selectedDate && String(selectedDate?.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed, so +1) and pad with leading zero
      const year = selectedDate?.getFullYear(); // Get year
      const formattedDate = `${day}-${month}-${year}`;
      console.log("verificationDetails===>>>", inputs, formattedDate);

      dispatch(
        serviceCenterActions.addVerificationDetails({
          comments: inputs.verifier_comments,
          flexDimensions: inputs.flexDimensions,
          flexInstallationDate: formattedDate,
          verificationStatus:
            inputs.status === "Approved"
              ? VerificationStatusEnum.VERIFIED
              : inputs.status === "Pending"
              ? VerificationStatusEnum.VERIFICATION_PENDING
              : VerificationStatusEnum.REJECTED,
          verifierName: inputs.verifier_name,
          verifierRepId: empId as string,
          isFollowUpClicked: inputs.status === "Pending",
        })
      );
    } else {
      setShowError(true);
    }
  };
  const inputRef = useRef<HTMLInputElement | null>(null);

  // const handleUpload = () => {
  //   if (inputRef.current) inputRef.current.click();
  // };

  // const handleDelFile = () => {
  //   setFile(null);
  //   if (inputRef.current) {
  //     inputRef.current.value = "";
  //   }
  // };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   if (selectedFile) {
  //     setFile(selectedFile.name);
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
        // setOnbarding(statuss);
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
              ? "flex justify-between items-center pb-2 pt-2"
              : "flex justify-between items-center pb-3 pt-2 border-b border-border"
          }`}
        >
          <p className="text-black text-[0.8rem] leading-[1rem] font-normal">
            {status}
          </p>
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

  const handlePaymentStatus = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    const pp = e.currentTarget.getAttribute("data-namess");
    setPayment(pp);
  };

  // const payButtons = ["Payment Pending", "Payment Completed"];

  // const payComp = payButtons.map((p, key) => (
  //   <div key={key} className="flex flex-col">
  //     <div className="text-sm text-black">
  //       <div
  //         data-namess={p}
  //         onClick={handlePaymentStatus}
  //         className={`${
  //           key === payButtons.length - 1
  //             ? "flex justify-between items-center pb-2 pt-2"
  //             : "flex justify-between items-center pb-3 pt-2 border-b border-border"
  //         }`}
  //       >
  //         <p className="text-black text-[0.8rem] leading-[1rem] font-normal">
  //           {p}
  //         </p>
  //         <div
  //           className={`${
  //             payment === p
  //               ? "bg-white rounded-full w-5 h-5 flex justify-center items-center border-2 border-blue"
  //               : "bg-white rounded-full w-5 h-5 flex justify-center items-center border-2 border-border"
  //           }`}
  //         >
  //           <button
  //             type="button"
  //             name={p}
  //             data-namess={p}
  //             onClick={handlePaymentStatus}
  //             className={`${
  //               payment === p
  //                 ? "bg-blue rounded-full w-3 h-3"
  //                 : "bg-gray-300 rounded-full w-3 h-3"
  //             }`}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // ));

  const currDate = new Date();

  const formattedDate = currDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const datePickerInput = datePickerRef.current
      ?.input as HTMLInputElement | null;
    if (datePickerInput) {
      datePickerInput.focus();
    }
  };

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
              {" "}
              <Navbar onClick={handleMain} />
              <div className="ml-[0.7rem] mt-[1.2rem] mr-[0.5rem]">
                <h1 className="tracking-tight text-[1rem] leading-[1.5rem] bg-gradient-to-r from-[rgba(21,79,187,1)] to-[rgba(28,73,151,1)] bg-bluegrad bg-clip-text text-transparent font-medium">
                  Verification
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
                <div className="mt-4 flex flex-col gap-[1.25rem]">
                  <div className="flex flex-col gap-1">
                    <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                      Verifier Name
                    </p>
                    <Input
                      type="text"
                      name="verifier_name"
                      value={inputs.verifier_name}
                      placeholder=""
                      onChange={handleVerFields}
                      isReadOnly={props.isEditing}
                      className="h-12 w-full pl-4 border border-border leading-[1.25rem] font-normal text-[1rem] rounded-lg "
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                      Verification Status
                    </p>
                    <div className="border border-border leading-[1.25rem] font-normal py-2 px-4 rounded-lg">
                      {statusComp}
                    </div>
                  </div>
                  {inputs.status === "Approved" && (
                    <div className="flex flex-col gap-2">
                      {/* <div className="flex flex-col gap-1">
                         <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                           Payment Status
                         </p>
                         <div className="border border-border leading-[1.25rem] font-normal text-[0.75rem] py-2 px-4 rounded-lg">
                           {payComp}
                         </div>
                       </div> */}
                      {/* {payment === "Payment Completed" && (
                        <div className="flex flex-col gap-1">
                          <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                            Transaction ID
                          </p>
                          <Input
                            type="number"
                            name="transaction_id"
                            value={inputs.transaction_id}
                            placeholder=""
                            onChange={handleVerFields}
                            className="h-12 w-full pl-4 border border-border leading-[1.25rem] font-normal text-[1rem] rounded-lg "
                          />
                        </div>
                      )} */}
                      <div className="flex flex-col gap-1">
                        <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                          Flex Installation Date
                        </p>
                        <div className="flex items-center justify-between h-12 w-full px-4 border border-border leading-[1.25rem] font-normal text-[1rem] rounded-lg ">
                          <DatePicker
                            ref={datePickerRef}
                            selected={selectedDate}
                            onChange={(date: Date | null) =>
                              setSelectedDate(date)
                            }
                            className="w-full outline-none text-base"
                            dateFormat="yyyy-MM-d"
                            disabled={props.isEditing}
                          />
                          <img
                            src={date}
                            alt=""
                            className="w-5 h-5"
                            onClick={handleImageClick}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                          Flex Dimensions
                        </p>
                        <Input
                          type="text"
                          name="flexDimensions"
                          value={inputs.flexDimensions}
                          placeholder="Enter Flex Dimensions"
                          onChange={handleVerFields}
                          isReadOnly={props.isEditing}
                          className="h-24 w-full pl-4 border border-border leading-[1.25rem] font-normal text-[1rem] rounded-lg "
                        />
                      </div>
                      {/* <div className="flex flex-col gap-1"> // TODO: future
                        <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                          Verifier Selfie
                        </p>
                        <div className="flex gap-3 items-center h-12 w-full pl-4 border border-border leading-[1.25rem] font-normal text-[0.75rem] rounded-lg ">
                          <input
                            type="file"
                            ref={inputRef}
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          {file ? (
                            <div className="flex gap-2 items-center justify-between">
                              <img src={down} alt="" />
                              <p className="w-52 text-blue text-sm underline underline-offset-2">
                                {file}
                              </p>
                              <img
                                src={del}
                                alt=""
                                className="h-5 w-5"
                                onClick={handleDelFile}
                              />
                            </div>
                          ) : (
                            <div
                              onClick={handleUpload}
                              className="flex gap-2 items-center"
                            >
                              <img src={cam} alt="" className="w-5 h-5" />
                              <p className="text-blue text-[1rem] font-normal leading-[1rem] ">
                                Upload Image
                              </p>
                            </div>
                          )}
                        </div>
                      </div> */}
                    </div>
                  )}
                  {inputs.status === "Pending" ? (
                    <NextFollowup tab={BtnTypes.VERIFICATION} />
                  ) : (
                    <div className="flex flex-col gap-1">
                      <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                        Comments
                      </p>
                      <Input
                        type="text"
                        name="verifier_comments"
                        value={inputs.verifier_comments}
                        placeholder=""
                        onChange={handleVerFields}
                        className="h-24 w-full pl-4 border border-border leading-[1.25rem] font-normal text-[1rem] rounded-lg "
                        isReadOnly={props.isEditing}
                      />
                    </div>
                  )}
                  {showError && (
                    <p className="text-[0.8rem] font-normal pl-2 leading-[1rem] text-red">
                      Please Fill All Fields !
                    </p>
                  )}

                  <Submit
                    onClick={handleSubmit}
                    isDisabled={
                      activeScDetails?.verificationDetails !== null
                        ? activeScDetails?.verificationDetails
                            .verificationStatus ===
                          VerificationStatusEnum.VERIFIED
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

export default Verification;
