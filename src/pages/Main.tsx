import React, { useEffect, useRef, useState } from "react";
import RegComp from "../components/RegComp";
import Navbar from "./Navbar";
import RegistrationTab from "./RegistrationTab";
import Verification from "./Verification";
import Photography from "./Photography";
import FlexInstallation from "./FlexInstallation";
import TrainAndOnboard from "./TrainAndOnboard";
import phone from "../images/phoneicon.svg";
import mapii from "../images/mapsiconn.svg";
import Maps from "./Maps";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Home from "./Home";
import { useAppSelector } from "../state";
import { getActiveScDetails } from "../state/serviceCenter/serviceCenter.selector";
import {
  BtnTypes,
  FlexInstallationEnum,
  PTOStatusEnum,
  RegistrationStatusEnum,
  StatusTypeEnum,
  VerificationStatusEnum,
} from "../state/serviceCenter/servicCenter.types";

function Main() {
  const activeScDetails = useAppSelector(getActiveScDetails);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showFlexInstall, setShowFlexInstall] = useState(false);
  const [showPhotography, setShowPhotography] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const inputs = useSelector((state: RootState) => state.input);
  const phoneRef = useRef<HTMLAnchorElement>(null);
  const [status, setStatus] = useState({
    newStatus: "",
    btnName: "",
  });

  const [resClass, setResClass] = useState("text-background");
  const [resText, setResText] = useState("Not Started");

  const handleStatus = (newStatus: string, btnName: string) => {
    setStatus((prev) => ({ ...prev, newStatus: newStatus, btnName: btnName }));
  };

  const handleButtons =
    (button: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      const comp = e.currentTarget.getAttribute("data-name");
      switch (comp) {
        case "Registration":
          setShowRegistration(true);
          break;
        case "Verification":
          setShowVerification(true);
          break;
        case "Flex Installation":
          setShowFlexInstall(true);
          break;
        case "Photography":
          setShowPhotography(true);
          break;
        case "Training & Onboarding":
          setShowTraining(true);
          break;
        default:
          break;
      }
    };

  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const Buttons = [
    "Registration",
    "Verification",
    "Flex Installation",
    "Photography",
    "Training & Onboarding",
  ];

  const handleMaps = (e: React.MouseEvent<HTMLParagraphElement>) => {
    setShowMap(true);
  };

  const handleCloseMap = (e: React.MouseEvent<HTMLParagraphElement>) => {
    setShowMap(false);
  };

  const handleHome = (e: React.MouseEvent<HTMLImageElement>) => {
    setShowHome(true);
  };

  const handleCallClick = () => {
    if (phoneRef.current) {
      phoneRef.current.click();
    }
  };
  const cardStatus = (btnName: string) => {
    if (btnName === BtnTypes.REGISTRATION) {
      if (
        activeScDetails?.registrationStatus ===
        RegistrationStatusEnum.REGISTERED
      ) {
        return StatusTypeEnum.COMPLETED;
      } else if (
        activeScDetails?.registrationStatus === RegistrationStatusEnum.FOLLOWUP
      ) {
        return StatusTypeEnum.PENDING;
      } else if (
        activeScDetails?.registrationStatus === RegistrationStatusEnum.REJECT
      ) {
        return StatusTypeEnum.REJECTED;
      } else {
        return StatusTypeEnum.NOT_STARTED;
      }
    } else if (btnName === BtnTypes.VERIFICATION) {
      if (activeScDetails?.verificationDetails !== null) {
        if (
          activeScDetails?.verificationDetails.verificationStatus ===
          VerificationStatusEnum.VERIFIED
        ) {
          return StatusTypeEnum.COMPLETED;
        } else if (
          activeScDetails?.verificationDetails.verificationStatus ===
          VerificationStatusEnum.VERIFICATION_PENDING
        ) {
          return StatusTypeEnum.PENDING;
        } else {
          return StatusTypeEnum.NOT_STARTED;
        }
      } else {
        return StatusTypeEnum.NOT_STARTED;
      }
    } else if (btnName === BtnTypes.FLEX_INSTALLATION) {
      if (activeScDetails?.flexDetails !== null) {
        if (
          activeScDetails?.flexDetails.status ===
          FlexInstallationEnum.FLEX_INSTALLATION_COMPLETE
        ) {
          return StatusTypeEnum.COMPLETED;
        } else if (
          activeScDetails?.flexDetails.status ===
          FlexInstallationEnum.FLEX_INSTALLATION_PENDING
        ) {
          return StatusTypeEnum.PENDING;
        } else {
          return StatusTypeEnum.NOT_STARTED;
        }
      } else {
        return StatusTypeEnum.NOT_STARTED;
      }
    } else if (btnName === BtnTypes.PHOTOGRAPHY) {
      if (activeScDetails?.photographyDetails !== null) {
        if (
          activeScDetails?.photographyDetails?.status === PTOStatusEnum.COMPLETE
        ) {
          return StatusTypeEnum.COMPLETED;
        } else if (
          activeScDetails?.photographyDetails?.status === PTOStatusEnum.PENDING
        ) {
          return StatusTypeEnum.PENDING;
        } else {
          return StatusTypeEnum.NOT_STARTED;
        }
      } else {
        return StatusTypeEnum.NOT_STARTED;
      }
    } else if (btnName === BtnTypes.TRAINING) {
      if (
        activeScDetails?.trainingDetails !== null &&
        activeScDetails?.onBoardingDetails !== null
      ) {
        if (
          activeScDetails?.trainingDetails?.status === PTOStatusEnum.COMPLETE &&
          activeScDetails.onBoardingDetails?.status === PTOStatusEnum.COMPLETE
        ) {
          return StatusTypeEnum.COMPLETED;
        } else if (
          activeScDetails?.trainingDetails?.status === PTOStatusEnum.PENDING &&
          activeScDetails.onBoardingDetails?.status === PTOStatusEnum.PENDING
        ) {
          return StatusTypeEnum.PENDING;
        } else {
          return StatusTypeEnum.NOT_STARTED;
        }
      } else {
        return StatusTypeEnum.NOT_STARTED;
      }
    } else {
      return StatusTypeEnum.NOT_STARTED;
    }
  };

  const statusColor = (status: string) => {
    if (status === StatusTypeEnum.COMPLETED) {
      return "#0B9E0F";
    } else if (status === StatusTypeEnum.PENDING) {
      return "#D4820E";
    } else if (status === StatusTypeEnum.REJECTED) {
      return "red";
    } else {
      return "#737373";
    }
  };

  // useEffect(() => {
  //   console.log(status);
  //   let resColor = "text-background";
  //   let resFont = "Not Started";

  //   if (
  //     inputs.status === "Registered" ||
  //     inputs.status === "Approved" ||
  //     inputs.status === "Photography Complete" ||
  //     inputs.status === "Flex Installation Complete" ||
  //     inputs.status === "Training & Onboarding Complete"
  //   ) {
  //     resColor = "text-green";
  //     resFont = "Completed";
  //   } else if (
  //     inputs.status === "Follow Up" ||
  //     inputs.status === "Training Pending" ||
  //     inputs.status === "Onboarding Pendning" ||
  //     inputs.status === "Flex Installation Pending" ||
  //     inputs.status === "Photography Pending" ||
  //     inputs.status === "Verification Pending"
  //   ) {
  //     resColor = "text-yellow";
  //     resFont = "Pending";
  //   }

  //   setResClass(resColor);
  //   setResText(resFont);
  // }, [inputs.status, status]);

  // console.log("resClass:", resClass);
  // console.log("resText:", resText);

  return (
    <div className="h-screen w-screen">
      {showHome ? (
        <Home />
      ) : (
        <div>
          {showRegistration ? (
            <RegistrationTab status={handleStatus} />
          ) : showVerification ? (
            <Verification />
          ) : showPhotography ? (
            <Photography />
          ) : showFlexInstall ? (
            <FlexInstallation />
          ) : showTraining ? (
            <TrainAndOnboard />
          ) : (
            <div>
              <Navbar onClick={handleHome} />
              <div className="ml-[0.7rem] mt-[1.2rem] mr-[0.5rem]">
                <h1 className="text-black text-[1.1rem] font-medium leading-[1.7rem]">
                  {activeScDetails?.serviceCenterName}
                </h1>
                <div className="flex flex-col gap-[0.25rem] mt-[0.3rem]">
                  <div className="flex gap-1 text-xs font-normal leading-[1rem] text-[1rem]">
                    <p className="text-background pl-[0.32rem] ">Owner Name:</p>
                    <span className="font-normal text-black leading-[1rem]  ">
                      {activeScDetails?.serviceCenterOwnerName}
                    </span>
                  </div>
                  <div className=" flex items-center gap-2">
                    <div className="flex items-center">
                      <img src={phone} alt="" className="w-6 h-6" />
                      <a
                        href={`tel: ${activeScDetails?.phoneNumber}`}
                        className="hidden"
                        ref={phoneRef}
                      >
                        {activeScDetails?.phoneNumber}
                      </a>
                      <p
                        onClick={handleCallClick}
                        className="text-blue text-[0.8rem] pb-[0.2rem] leading-[1rem] font-medium "
                      >
                        Call
                      </p>
                    </div>
                    {/* <div className="flex items-center w-max">
                      <img src={mapii} alt="" className="w-6 h-6" />
                      <p
                        onClick={handleMaps}
                        className="underline text-blue text-[0.8rem] leading-[1rem] font-normal pb-[0.2rem]"
                      >
                        {scDetails.}
                      </p>
                    </div> */}
                    {/* {showMap && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <Maps cross={handleCloseMap} />
                      </div>
                    )} */}
                  </div>
                </div>
                <div className="flex gap-1 text-[0.8rem] mt-[0.45rem] text-ipcol">
                  <p className="font-normal">Date:</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>

                {Buttons.map((button, key) => {
                  const status = cardStatus(button);
                  return (
                    <div
                      className="mt-[0.75rem] flex flex-col gap-[1rem]"
                      key={key}
                    >
                      <RegComp
                        className={resClass}
                        statusss={status as string}
                        data-name={button}
                        name={button}
                        date={formattedDate}
                        statusColor={statusColor(status) as string}
                        onClick={handleButtons(button)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
