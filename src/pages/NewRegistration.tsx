import React, { useState } from "react";
import Input from "../components/Input";
import Submit from "../components/Submit";
import { useAppDispatch, useAppSelector } from "../state";
import { BtnTypes } from "../state/serviceCenter/servicCenter.types";
import {
  getAddRegistrationDetailsLoadingState,
  getEmployeeId,
  getFollowUpDetails,
} from "../state/serviceCenter/serviceCenter.selector";
import Navbar from "./Navbar";
import NextFollowup from "./NextFollowup";
import Home from "./Home";
import loc from "../images/loc.svg";
import useGetCurrentLocation from "../hooks/useGetCurrentLocation";
import useFetchPinAddress from "../hooks/useFetchPinAddress";
import { serviceCenterActions } from "../state/serviceCenter/serviceCenter.action";
import { scActions } from "../state/serviceCenter/serviceCenter.store";
import CurrentLocMap from "./CurrentLocMap";

export default function NewRegistration() {
  const { location } = useGetCurrentLocation();
  const { success } = useAppSelector(getAddRegistrationDetailsLoadingState);

  const [locationDetails, setLocationDetails] = React.useState<{
    lat: number;
    lng: number;
  }>({ lat: location?.lat as number, lng: location?.lng as number });
  const { address, loading } = useFetchPinAddress({
    latitude: locationDetails.lat as number,
    longitude: locationDetails.lng as number,
  });
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (location !== undefined) {
      setLocationDetails({
        lat: location?.lat as number,
        lng: location?.lng as number,
      });
    }
  }, [location]);

  const [subscription, setSubscription] = useState<string | null>("");
  const [showMap, setShowMap] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [showError, setShowError] = useState(false);
  const [inputs, setInputsss] = useState({
    additional_comments: "",
    phoneNumber: "",
    ownerName: "",
    scName: "",
    subscription_type: "",
  });
  const currDate = new Date();
  const employeeId = useAppSelector(getEmployeeId);
  const formattedDate = currDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  React.useEffect(() => {
    if (success) {
      setShowMain(true);
      dispatch(scActions.resetSCloadingStates());
    }
  }, [success]);

  const handleSubscription = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    const sub = e.currentTarget.getAttribute("data-name");
    if (sub) {
      setInputsss((prev) => ({
        ...prev,
        subscription_type: sub,
      }));
    }
    setSubscription(sub);
  };

  const handleRegFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputsss({ ...inputs, [name]: value });
  };
  const [state, setState] = React.useState<string>("");
  const followUpdetails = useAppSelector(getFollowUpDetails);

  const statusButtons = ["Registered", "Follow Up", "Reject"];
  const handleToggle = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    const statuss = e.currentTarget.getAttribute("data-name");
    setState(statuss as string);
    console.log("toggle===>>", statuss);
  };

  const handleSubmit = () => {
    if (
      inputs.phoneNumber === "" ||
      inputs.ownerName === "" ||
      inputs.scName === "" ||
      state === "" ||
      loading
    ) {
      setShowError(true);
    } else {
      if (state === statusButtons[1] && followUpdetails?.reason === "") {
        setShowError(true);
        return;
      }
      if (
        state === statusButtons[0] &&
        (inputs?.additional_comments === "" || inputs?.subscription_type === "")
      ) {
        setShowError(true);
        return;
      }
      setShowError(false);
      dispatch(
        serviceCenterActions.addNewRegistrationDetails({
          comments: inputs.additional_comments,
          isFollowUpClicked: state === "Follow Up",
          phoneNumber: inputs.phoneNumber,
          latitude: locationDetails.lat.toString(),
          longitude: locationDetails.lng.toString(),
          registrationStatus:
            state === "Follow Up" ? "Followup" : (state as string),
          salesRepId: employeeId as string,
          serviceCenterAddress: address,
          serviceCenterName: inputs.scName,
          serviceCenterOwnerName: inputs.ownerName,
          subscriptionType: inputs.subscription_type,
          registeredDate: formattedDate,
        })
      );
      // setShowMain(true);
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

  const handleMain = (e: React.MouseEvent<HTMLImageElement>) => {
    setShowMain(true);
  };

  const handleMaps = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!loading) {
      setShowMap(true);
    }
  };

  const handleCloseMap = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowMap(false);
  };

  const dragHandler = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat !== undefined && lng !== undefined) {
      setLocationDetails({ lat, lng });
      console.log(`Updated Latitude: ${lat}, Updated Longitude: ${lng}`);
    }
  };
  return (
    <div className="w-screen">
      {showMain ? (
        <Home />
      ) : (
        <div className="w-screen">
          <Navbar onClick={handleMain} />
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
            <div className="flex flex-col">
              <div className="mt-[0.75rem] flex flex-col gap-[1.25rem] w-full">
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
                    maxLength={10}
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
                  <div
                    onClick={handleMaps} //Maps integration
                    className="flex items-center gap-2 h-12 w-full px-[0.75rem] border border-border  rounded-lg text-[1rem] text-ipcol "
                  >
                    <img src={loc} alt="" className="h-6 w-6" />
                    <Input
                      type="text"
                      name="service_center_location"
                      value={loading ? "Loading...." : address}
                      placeholder=""
                      onChange={handleRegFields}
                      className="outline-none w-full overflow-hidden"
                      isReadOnly={true}
                    />
                  </div>
                  {showMap && (
                    <div className="fixed inset-0 bg-black opacity-95 flex items-center justify-center z-50">
                      <CurrentLocMap
                        cross={handleCloseMap}
                        latitude={locationDetails?.lat as number}
                        longitude={locationDetails?.lng as number}
                        dragHandler={dragHandler}
                      />
                    </div>
                  )}
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
                  <NextFollowup tab={BtnTypes.NEWREGISTRATION} />
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
                <div className="self-center">
                  <Submit onClick={handleSubmit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
