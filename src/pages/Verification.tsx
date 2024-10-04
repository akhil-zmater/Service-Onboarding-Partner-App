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
import { setInputs } from "../redux/inputSlice";
import Submit from "../components/Submit";

function Verification() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
    payment_status: null,
    photographer_name: "",
    technician_name: "",
    installation_comments: "",
    subscription_type: null,
  });
  const dispatch = useDispatch();
  const [showMain, setShowMain] = useState(false);
  const [onboarding, setOnbarding] = useState<string | null>(
    "Verification Pending"
  );
  const [payment, setPayment] = useState<string | null>(null);

  const [file, setFile] = useState<string | null>(null);
  const datePickerRef = useRef<DatePicker>(null);

  const handleVerFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputsss({ ...inputs, [name]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onboarding !== null) {
      dispatch(
        setInputs({
          verifier_name: inputs.verifier_name,
          transaction_id: inputs.transaction_id,
          verifier_comments: inputs.verifier_comments,
          status: inputs.status,
          payment_status: inputs.payment_status,
        })
      );
      setShowMain(true);
    } else {
      alert("Please Fill All Input Fields");
    }
  };
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleDelFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile.name);
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
  const statusButtons = ["Verification Pending", "Approved", "Rejected"];

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

  const payButtons = ["Payment Pending", "Payment Completed"];

  const payComp = payButtons.map((p, key) => (
    <div key={key} className="flex flex-col">
      <div className="text-sm text-black">
        <div
          data-namess={p}
          onClick={handlePaymentStatus}
          className={`${
            key === payButtons.length - 1
              ? "flex justify-between items-center pb-2 pt-2"
              : "flex justify-between items-center pb-3 pt-2 border-b border-border"
          }`}
        >
          <p className="text-black text-[0.8rem] leading-[1rem] font-normal">
            {p}
          </p>
          <div
            className={`${
              payment === p
                ? "bg-white rounded-full w-5 h-5 flex justify-center items-center border-2 border-blue"
                : "bg-white rounded-full w-5 h-5 flex justify-center items-center border-2 border-border"
            }`}
          >
            <button
              type="button"
              name={p}
              data-namess={p}
              onClick={handlePaymentStatus}
              className={`${
                payment === p
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
                      className="h-12 w-full pl-4 border border-border leading-[1.25rem] font-normal text-[1rem] rounded-lg "
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                      Onboarding Status
                    </p>
                    <div className="border border-border leading-[1.25rem] font-normal py-2 px-4 rounded-lg">
                      {statusComp}
                    </div>
                  </div>
                  {onboarding === "Approved" && (
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                          Payment Status
                        </p>
                        <div className="border border-border leading-[1.25rem] font-normal text-[0.75rem] py-2 px-4 rounded-lg">
                          {payComp}
                        </div>
                      </div>
                      {payment === "Payment Completed" && (
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
                      )}
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
                          name=""
                          value=""
                          placeholder=""
                          onChange={handleVerFields}
                          className="h-24 w-full pl-4 border border-border leading-[1.25rem] font-normal text-[1rem] rounded-lg "
                        />
                      </div>
                      <div className="flex flex-col gap-1">
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
                      </div>
                    </div>
                  )}
                  {onboarding === "Verification Pending" ? (
                    <NextFollowup />
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

export default Verification;
