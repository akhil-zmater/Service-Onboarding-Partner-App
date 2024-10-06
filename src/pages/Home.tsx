import React, { ChangeEvent, useEffect, useState } from "react";
import logo from "../images/logo.svg";
import Input from "../components/Input";
import Main from "./Main";
import { setInputs } from "../redux/inputSlice";

import FollowUps from "./FollowUps";
import open from "../images/open.svg";
import { useAppDispatch, useAppSelector } from "../state";
import { serviceCenterActions } from "../state/serviceCenter/serviceCenter.action";
import { getSCDetailsLoadingState } from "../state/serviceCenter/serviceCenter.selector";

function Home() {
  const dispatch = useAppDispatch();
  const [showMain, setShowMain] = useState(false);
  const [showFollowUps, setShowFollowUps] = useState(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  // const [inputs, setInputsss] = useState({
  //   phone: "",
  //   sales_rep_id: "",
  //   service_center_name: "",
  //   service_center_owner: "",
  //   service_center_phone: "",
  //   service_center_location: "",
  //   status: "",
  //   additional_comments: "",
  //   verifier_name: "",
  //   transaction_id: "",
  //   verifier_comments: "",
  //   photographer_name: "",
  //   technician_name: "",
  //   installation_comments: "",
  //   subscription_type: null,
  // });

  // const handleSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
  //   console.log("mobileNumber====>>", mobileNumber);
  //   // if (inputs.phone.length === 10) {
  //   //   console.log("inputss===>>", inputs.phone);
  //   //   // dispatch(setInputs({ phone: inputs.phone }));
  //   //   setShowMain(true);
  //   // } else {
  //   //   alert("Please Enter Valid Phone Number");
  //   // }
  // };
  const { success } = useAppSelector(getSCDetailsLoadingState);

  React.useEffect(() => {
    if (success) {
      setShowMain(true);
    }
  }, [success]);

  const handleSubmit = () => {
    if (mobileNumber.length === 10) {
      console.log("mobileNumber===>>", mobileNumber);
      dispatch(
        serviceCenterActions.getScDetailsByMobileNum({
          mobileNumber: mobileNumber,
        })
      );
    } else {
      alert("Please Enter Valid Phone Number");
    }
  };

  // useEffect(() => {
  //   const url = "http://localhost:3000/service_center";
  //   axios
  //     .post(url, {
  //       phone: inputs.phone,
  //       sales_rep_id: inputs.sales_rep_id,
  //       service_center_phone: inputs.service_center_phone,
  //       service_center_name: inputs.service_center_name,
  //       service_center_owner: inputs.service_center_owner,
  //       service_center_location: inputs.service_center_location,
  //       additional_comments: inputs.additional_comments,
  //       service_center_photo: "",
  //       status: "",
  //       verifier_appointment_date: "",
  //       next_follow_up_date: "",
  //       customer_comments: "",
  //       verifier_name: inputs.verifier_name,
  //       transaction_id: inputs.transaction_id,
  //       verifier_comments: inputs.verifier_comments,
  //       verification_date: "",
  //       verifier_selfie: "",
  //       photography_date: "",
  //       flex_dimensions: "",
  //       photographer_name: inputs.photographer_name,
  //       flex_installation_appointment_date: "",
  //       technician_name: inputs.technician_name,
  //       installation_date: "",
  //       installation_comments: inputs.installation_comments,
  //       installation_pics: "",
  //       training_status: "",
  //     })
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err));
  // }, [inputs]);

  // const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log("details===>>>", e.target.value);
  //   setMobileNumber(e.target.value);
  // if (inputs.phone.length <= 9) {
  //   const { name, value } = e.target;
  //   setInputsss({ ...inputs, [name]: value });
  // }
  // };

  const handleFollowUps = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    setShowFollowUps(true);
  };

  return (
    <div>
      {showMain ? (
        <Main />
      ) : showFollowUps ? (
        <FollowUps />
      ) : (
        <div className="bg-white h-screen w-screen flex flex-col justify-between items-center py-[1.5rem] px-[1rem]">
          {/* LOGO, TITLE, PHONE INPUT  */}
          <div className="">
            <img src={logo} alt="logo" className="" />
            <h1 className="mt-[1.5rem] tracking-tight text-[2rem] leading-[2.5rem] bg-gradient-to-r from-[rgba(21,79,187,1)] to-[rgba(28,73,151,1)] bg-bluegrad bg-clip-text text-transparent font-medium">
              Service Partner Onboarding
            </h1>
            <div className="mt-[1rem] flex flex-col gap-2">
              <div className="flex justify-between  items-center text-[0.9rem] leading-[1rem] font-medium border border-border p-[1rem] font-poppins rounded-lg">
                <div className="flex items-center justify-center gap-16">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-[0.8rem] text-ipcol ">ASSIGNED</h1>
                    <h1 className="text-[1.2rem] text-blue">3</h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-[0.8rem] text-ipcol ">FOLLOWUP</h1>
                    <h1 className="text-[1.2rem] text-blue">2</h1>
                  </div>
                </div>
                <div
                  onClick={handleFollowUps}
                  className="border rounded-[0.3rem] p-1 border-blue"
                >
                  <img src={open} alt="" className="" />
                </div>
              </div>
              <h1 className="text-sm leading-[1rem] mt-3 font-normal text-ipcol">
                Service Center Phone Number
              </h1>
              <div className="flex justify-between items-center text-ipcol h-[3.5rem] w-max p-[1rem] border border-border rounded-[0.5rem] text-[1rem] leading-[1.5rem] font-normal">
                <div className="flex gap-2">
                  <p className="text-ipcol text-[1rem] font-normal leading-[1.5rem]">
                    +91
                  </p>
                  <Input
                    type="number"
                    name="phone"
                    value={mobileNumber}
                    placeholder="Enter Phone Number"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setMobileNumber(e.target.value);
                    }}
                    className="focus:outline-none"
                    maxLength={10}
                  />
                </div>
                <div
                  onClick={handleSubmit}
                  className="border rounded-[0.3rem] p-1 border-blue"
                >
                  <img src={open} alt="" className="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
