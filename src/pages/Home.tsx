import React, { ChangeEvent, useState } from "react";
import logo from "../images/logo.svg";
import Input from "../components/Input";
import Main from "./Main";
import FollowUps from "./FollowUps";
import open from "../images/open.svg";
import { useAppDispatch, useAppSelector } from "../state";
import { serviceCenterActions } from "../state/serviceCenter/serviceCenter.action";
import {
  getAssignedDetails,
  getAssignedFollowupDetailsLoadingState,
  getFollowUpDetailsData,
  getSCDetailsLoadingState,
} from "../state/serviceCenter/serviceCenter.selector";
import { scActions } from "../state/serviceCenter/serviceCenter.store";
import Loader from "./Loader";
import NewRegistration from "./NewRegistration";

function Home() {
  const dispatch = useAppDispatch();
  const [showMain, setShowMain] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showNewReg, setShowNewReg] = useState(false);
  const [showFollowUps, setShowFollowUps] = useState(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const { success } = useAppSelector(getSCDetailsLoadingState);
  const assignedDetails = useAppSelector(getAssignedDetails);
  const followUpDetails = useAppSelector(getFollowUpDetailsData);
  const { loading: getAssignedFollowUpLoading } = useAppSelector(
    getAssignedFollowupDetailsLoadingState
  );

  React.useEffect(() => {
    if (success) {
      setShowMain(true);
      dispatch(scActions.resetSCloadingStates());
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
      setShowError(true);
    }
  };

  const handleFollowUps = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    setShowFollowUps(true);
  };

  const handleAddNewSC = (e: React.MouseEvent<HTMLParagraphElement>) => {
    setShowNewReg(true);
  };

  return (
    <div>
      {showNewReg ? (
        <NewRegistration />
      ) : (
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
                    <div className="flex items-center gap-8">
                      <div className="flex flex-col gap-2">
                        <h1 className="text-[0.8rem] text-ipcol ">ASSIGNED</h1>
                        <h1 className="text-[1.2rem] text-blue">
                          {assignedDetails.length}
                        </h1>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h1 className="text-[0.8rem] text-ipcol ">FOLLOWUP</h1>
                        <h1 className="text-[1.2rem] text-blue">
                          {followUpDetails.length}
                        </h1>
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
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-ipcol h-[3.5rem] w-[100%] p-[1rem] border border-border rounded-[0.5rem] text-[1rem] leading-[1.5rem] font-normal">
                      <div className="flex gap-2 w-52">
                        <p className="text-ipcol text-[1rem] font-normal leading-[1.5rem]">
                          +91
                        </p>
                        <Input
                          type="text"
                          name="phone"
                          value={mobileNumber}
                          placeholder="Enter Phone Number"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (/^\d{0,10}$/.test(e.target.value))
                              setMobileNumber(e.target.value);
                          }}
                          className="focus:outline-none hover:no-spinner w-full overflow-hidden"
                          maxLength={10 as number}
                        />
                      </div>
                      <div
                        onClick={handleSubmit}
                        className="border rounded-[0.3rem] p-1 border-blue"
                      >
                        <img src={open} alt="" className="" />
                      </div>
                    </div>
                    <p
                      onClick={handleAddNewSC}
                      className="text-xs mt-2 font-medium leading-[1rem] text-right text-blue underline"
                    >
                      Add Service Center{" "}
                    </p>
                    <div>
                      {showError && (
                        <div className="text-[0.8rem] font-normal pl-2 leading-[1rem] text-red">
                          Invalid Mobile Number !
                        </div>
                      )}
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

export default Home;
