import React, { useState } from "react";
import Input from "../components/Input";
import Submit from "../components/Submit";
import { useAppSelector } from "../state";
import { BtnTypes } from "../state/serviceCenter/servicCenter.types";
import { getEmployeeId } from "../state/serviceCenter/serviceCenter.selector";
import Navbar from "./Navbar";
import NextFollowup from "./NextFollowup";
import Maps from "./Maps";
import Main from "./Main";
import Home from "./Home";

export default function NewRegistration() {
  const [subscription, setSubscription] = useState<string | null>("");
  const [showMap, setShowMap] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [showError, setShowError] = useState(false);
  const [inputs, setInputsss] = useState({
    additional_comments: "",
    phoneNumber: "",
    ownerName: "",
    scName: "",
  });
  const currDate = new Date();
  const employeeId = useAppSelector(getEmployeeId);
  const formattedDate = currDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleSubscription = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    const sub = e.currentTarget.getAttribute("data-name");
    setSubscription(sub);
  };

  const handleRegFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputsss({ ...inputs, [name]: value });
  };
  const [state, setState] = React.useState<string>("");

  const statusButtons = ["Registered", "Follow Up", "Reject"];
  const handleToggle = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    const statuss = e.currentTarget.getAttribute("data-name");
    setState(statuss as string);
    console.log("toggle===>>", statuss);
  };

  const handleSubmit = () => {
    const isEmptyField = Object.values(inputs).some(
      (input) => input.trim() === ""
    );
    console.log("empty===>.>", isEmptyField);
    if (isEmptyField || state === "") {
      setShowError(true);
    } else {
      setShowError(false);
      setShowMain(true);
      console.log("inputs===>>.", inputs, subscription, state);
    }
  };

  const statusComp = statusButtons.map((status, key) => (
    <div key={key} className="flex flex-col">
      <div className="text-sm text-black">
        <div
          onClick={handleToggle}
          data-name={status}
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
              state === status
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
                state === status
                  ? "bg-blue rounded-full w-3 h-3"
                  : "rounded-full w-3 h-3"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  ));
  return (
    <div>
      {showMain ? (
        <Home />
      ) : (
        <div>
          <Navbar onClick={() => {}} />
          <div className="ml-[0.7rem] mt-[1.2rem] mr-[0.5rem]">
            <h1 className="tracking-tight text-[1rem] leading-[1.5rem] bg-gradient-to-r from-[rgba(21,79,187,1)] to-[rgba(28,73,151,1)] bg-bluegrad bg-clip-text text-transparent font-medium">
              New Registration
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
                  Sales Rep ID
                </p>
                <Input
                  type="text"
                  name="sales_rep_id"
                  value={(employeeId as string) ?? ""}
                  placeholder=""
                  onChange={() => {}}
                  className="h-12 w-full pl-[0.75rem] border border-border  rounded-lg text-[1rem] text-ipcol "
                  isReadOnly={true}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                  Service Center Phone Number
                </p>
                <Input
                  type="text"
                  name="phoneNumber"
                  value={inputs.phoneNumber as string}
                  placeholder=""
                  onChange={handleRegFields}
                  className="h-12 w-full pl-[0.75rem] border border-border  rounded-lg text-[1rem] text-ipcol "
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                  Service Center Name
                </p>
                <Input
                  type="text"
                  name="scName"
                  value={inputs.scName as string}
                  placeholder=""
                  onChange={handleRegFields}
                  className="h-12 w-full pl-[0.75rem] border border-border  rounded-lg text-[1rem] text-ipcol "
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                  Service Center Owner Name
                </p>
                <Input
                  type="text"
                  name="ownerName"
                  value={inputs.ownerName as string}
                  placeholder=""
                  onChange={handleRegFields}
                  className="h-12 w-full pl-[0.75rem] border border-border  rounded-lg text-[1rem] text-ipcol "
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                  Service Center Location
                </p>
                {/* <div
              onClick={handleMaps} //Maps integration
              className="flex items-center gap-2 h-12 w-full pl-[0.75rem] border border-border  rounded-lg text-[1rem] text-ipcol "
            >
              <img src={loc} alt="" className="h-6 w-6" />
              <Input
                type="text"
                name="service_center_location"
                value={activeSCDetails?.serviceCenterAddress as string}
                placeholder=""
                onChange={handleRegFields}
                className="outline-none w-full"
                isReadOnly={true}
              />
            </div> */}
                {/* {showMap && (
              <div className="fixed inset-0 bg-black opacity-95 flex items-center justify-center z-50">
                <Maps
                  cross={handleCloseMap}
                  latitude={activeSCDetails?.latitude as number}
                  longitude={activeSCDetails?.longitude as number}
                />
              </div>
            )} */}
              </div>

              {/* <div className="flex flex-col gap-1"> // Service centerPhoto
                    <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                      Service Center Photo
                    </p>
                    <div className="flex gap-3 items-center h-12 w-full pl-[0.75rem] border border-border  rounded-lg text-[1rem] text-ipcol ">
                      <input
                        type="file"
                        ref={inputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                      />
                      {file ? (
                        <div className="flex items-center gap-2 justify-between">
                          <img src={down} alt="" className="h-5 w-5" />
                          <p className="w-52 text-blue text-[0.8rem] underline underline-offset-2">
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
                          <p className="text-blue text-lg">Upload Image</p>
                        </div>
                      )}
                    </div>
                  </div> */}

              <div className="flex flex-col gap-1">
                <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                  Onboarding Status
                </p>
                <div className="border border-border p-2 rounded-lg">
                  {statusComp}
                </div>
              </div>
              {state === "Registered" && (
                <div className="flex flex-col gap-1">
                  <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                    Subscription Type
                  </p>
                  <div className="border border-border p-2 rounded-lg">
                    <div className="flex flex-col">
                      <div className="text-sm text-black">
                        <div
                          onClick={handleSubscription}
                          data-name="Paid"
                          className="flex justify-between items-center pb-3 pt-2 border-b border-border text-black leading-[1rem] text-[0.75rem]"
                        >
                          <p>Paid</p>
                          <div
                            className={`${
                              subscription === "Paid"
                                ? "bg-white rounded-full w-5 h-5 flex justify-center items-center border-2 border-blue"
                                : "bg-white rounded-full w-5 h-5 flex justify-center items-center border-2 border-border"
                            }`}
                          >
                            <button
                              type="button"
                              name="Paid"
                              data-name="Paid"
                              onClick={handleSubscription}
                              className={`${
                                subscription === "Paid"
                                  ? "bg-blue rounded-full w-3 h-3"
                                  : "bg-gray-300 rounded-full w-3 h-3"
                              }`}
                            />
                          </div>
                        </div>
                        <div
                          data-name="Unpaid"
                          onClick={handleSubscription}
                          className="flex justify-between items-center pb-2 pt-2 text-black leading-[1rem] text-[0.75rem]"
                        >
                          <p>Unpaid</p>
                          <div
                            className={`${
                              subscription === "Unpaid"
                                ? "bg-white rounded-full w-5 h-5 flex justify-center items-center border-2 border-blue"
                                : "bg-white rounded-full w-5 h-5 flex justify-center items-center border-2 border-border"
                            }`}
                          >
                            <button
                              type="button"
                              name="Unpaid"
                              data-name="Unpaid"
                              onClick={handleSubscription}
                              className={`${
                                subscription === "Unpaid"
                                  ? "bg-blue rounded-full w-3 h-3"
                                  : "bg-gray-300 rounded-full w-3 h-3"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {state === "Follow Up" ? (
                <NextFollowup tab={BtnTypes.REGISTRATION} />
              ) : (
                <div className="flex flex-col gap-1">
                  <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                    Comments
                  </p>
                  <Input
                    type="text"
                    name="additional_comments"
                    value={inputs.additional_comments}
                    placeholder=""
                    onChange={handleRegFields}
                    className="h-24 w-full pl-4 border border-border leading-[1rem] text-ipcol font-normal rounded-lg text-[1rem]"
                  />
                </div>
              )}
              <div>
                {showError && (
                  <p className="text-[0.8rem] font-normal pl-2 leading-[1rem] text-red">
                    Please Fill All Fields !
                  </p>
                )}
              </div>
              <Submit onClick={handleSubmit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
