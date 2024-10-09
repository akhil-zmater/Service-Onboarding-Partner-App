import React, { useEffect, useRef, useState } from "react";
import RegComp from "../components/RegComp";
import Navbar from "./Navbar";
import RegistrationTab from "./RegistrationTab";
import Verification from "./Verification";
import Photography from "./Photography";
import FlexInstallation from "./FlexInstallation";
import TrainAndOnboard from "./Training";
import phone from "../images/phoneicon.svg";
import mapii from "../images/mapsiconn.svg";
// import Maps from "./Maps";
import Home from "./Home";
import { useAppSelector } from "../state";
import {
  getActiveScDetails,
  getSCDetailsLoadingState,
} from "../state/serviceCenter/serviceCenter.selector";
import {
  BtnTypes,
  FlexInstallationEnum,
  PTOStatusEnum,
  RegistrationStatusEnum,
  StatusTypeEnum,
  VerificationStatusEnum,
} from "../state/serviceCenter/servicCenter.types";
import Onboarding from "./Onboarding";
import Maps from "./Maps";
import ErrorBox from "./ErrorBox";
import FollowUDetails from "../components/FollowUDetails";
import FollowUps from "./FollowUps";
import Loader from "./Loader";
interface MainProps {
  isHome?: boolean;
}

function Main(props: MainProps) {
  const activeScDetails = useAppSelector(getActiveScDetails);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showFlexInstall, setShowFlexInstall] = useState(false);
  const [showPhotography, setShowPhotography] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showBack, setShowBack] = useState({
    home: false,
    followUp: false,
  });

  const { loading } = useAppSelector(getSCDetailsLoadingState);
  const phoneRef = useRef<HTMLAnchorElement>(null);
  const [status, setStatus] = useState({
    newStatus: "",
    btnName: "",
  });

  const [inputs, setInputsss] = useState({
    additional_comments: "",
    followUpDate: "",
    subscription_type: "",
  });

  const handleRegFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputsss({ ...inputs, [name]: value });
  };

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
          if (
            activeScDetails?.registrationStatus ===
            RegistrationStatusEnum.REGISTERED
          ) {
            setShowVerification(true);
          } else {
            alert("Please complete Registration field");
          }
          break;
        case "Flex Installation":
          if (
            activeScDetails?.registrationStatus &&
            activeScDetails.verificationDetails
          ) {
            if (
              activeScDetails?.registrationStatus ===
                RegistrationStatusEnum.REGISTERED &&
              activeScDetails.verificationDetails.verificationStatus ===
                VerificationStatusEnum.VERIFIED
            ) {
              setShowFlexInstall(true);
            } else {
              alert("Please complete Verification field");
            }
          } else {
            alert("Please complete Verification field");
          }
          break;
        case "Photography":
          if (
            activeScDetails?.verificationDetails &&
            activeScDetails.registrationStatus &&
            activeScDetails.flexDetails
          ) {
            if (
              activeScDetails?.registrationStatus ===
                RegistrationStatusEnum.REGISTERED &&
              activeScDetails.verificationDetails.verificationStatus ===
                VerificationStatusEnum.VERIFIED &&
              activeScDetails.flexDetails.status ===
                FlexInstallationEnum.FLEX_INSTALLATION_COMPLETE
            ) {
              setShowPhotography(true);
            } else {
              alert("Please complete Flex Installation field");
            }
          } else {
            alert("Please complete Flex Installation field");
          }
          break;
        case "Training":
          if (
            activeScDetails?.registrationStatus ===
              RegistrationStatusEnum.REGISTERED &&
            activeScDetails.verificationDetails &&
            activeScDetails.flexDetails &&
            activeScDetails.photographyDetails
          ) {
            if (
              activeScDetails?.registrationStatus ===
                RegistrationStatusEnum.REGISTERED &&
              activeScDetails.verificationDetails.verificationStatus ===
                VerificationStatusEnum.VERIFIED &&
              activeScDetails.flexDetails.status ===
                FlexInstallationEnum.FLEX_INSTALLATION_COMPLETE &&
              activeScDetails.photographyDetails?.status ===
                PTOStatusEnum.COMPLETE
            ) {
              setShowTraining(true);
            } else {
              alert("Please complete Photography field");
            }
          } else {
            alert("Please complete Photography field");
          }
          break;
        case "Onboarding":
          if (
            activeScDetails?.registrationStatus &&
            activeScDetails.verificationDetails &&
            activeScDetails.flexDetails &&
            activeScDetails.photographyDetails &&
            activeScDetails.trainingDetails
          ) {
            if (
              activeScDetails?.registrationStatus ===
                RegistrationStatusEnum.REGISTERED &&
              activeScDetails.verificationDetails.verificationStatus ===
                VerificationStatusEnum.VERIFIED &&
              activeScDetails.flexDetails.status ===
                FlexInstallationEnum.FLEX_INSTALLATION_COMPLETE &&
              activeScDetails.photographyDetails?.status ===
                PTOStatusEnum.COMPLETE &&
              activeScDetails.trainingDetails?.status === PTOStatusEnum.COMPLETE
            ) {
              setShowOnboarding(true);
            } else {
              alert("Please complete Training field");
            }
          } else {
            alert("Please complete Training field");
          }
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
    "Training",
    "Onboarding",
  ];

  const handleMaps = (e: React.MouseEvent<HTMLParagraphElement>) => {
    setShowMap(true);
  };

  const handleCloseMap = (e: React.MouseEvent<HTMLParagraphElement>) => {
    setShowMap(false);
  };

  const handleHome = (e: React.MouseEvent<HTMLImageElement>) => {
    if (props.isHome) {
      setShowBack((prev) => ({ ...prev, home: true, followUp: false }));
    } else {
      setShowBack((prev) => ({ ...prev, home: false, followUp: true }));
    }
  };

  const handleCallClick = () => {
    if (phoneRef.current) {
      phoneRef.current.click();
    }
  };

  const dateStatus = (btnName: string) => {
    if (btnName === BtnTypes.REGISTRATION) {
      if (
        activeScDetails?.registrationStatus ===
        RegistrationStatusEnum.REGISTERED
      ) {
        return activeScDetails.registeredDate;
      } else if (
        activeScDetails?.registrationStatus === RegistrationStatusEnum.FOLLOWUP
      ) {
        return activeScDetails.registrationFollowup?.followUpDate;
      } else if (
        activeScDetails?.registrationStatus === RegistrationStatusEnum.REJECT
      ) {
        return StatusTypeEnum.REJECTED;
      } else {
        return "---";
      }
    } else if (btnName === BtnTypes.VERIFICATION) {
      if (activeScDetails?.verificationDetails !== null) {
        if (
          activeScDetails?.verificationDetails.verificationStatus ===
          VerificationStatusEnum.VERIFIED
        ) {
          return "VERIFIED_DATE";
        } else if (
          activeScDetails?.verificationDetails.verificationStatus ===
          VerificationStatusEnum.VERIFICATION_PENDING
        ) {
          return activeScDetails.verificationDetails.followup.followUpDate;
        } else {
          return StatusTypeEnum.NOT_STARTED;
        }
      } else {
        return "---";
      }
    } else if (btnName === BtnTypes.FLEX_INSTALLATION) {
      if (activeScDetails?.flexDetails !== null) {
        if (
          activeScDetails?.flexDetails.status ===
          FlexInstallationEnum.FLEX_INSTALLATION_COMPLETE
        ) {
          return "FLEX_INSTALLED_DATE";
        } else if (
          activeScDetails?.flexDetails.status ===
          FlexInstallationEnum.FLEX_INSTALLATION_PENDING
        ) {
          return activeScDetails.flexDetails.followup.followUpDate;
        } else {
          return StatusTypeEnum.NOT_STARTED;
        }
      } else {
        return "---";
      }
    } else if (btnName === BtnTypes.PHOTOGRAPHY) {
      if (activeScDetails?.photographyDetails !== null) {
        if (
          activeScDetails?.photographyDetails?.status === PTOStatusEnum.COMPLETE
        ) {
          return "PHOTOGRAPHY_DATE";
        } else if (
          activeScDetails?.photographyDetails?.status === PTOStatusEnum.PENDING
        ) {
          return activeScDetails.photographyDetails.followup.followUpDate;
        } else {
          return StatusTypeEnum.NOT_STARTED;
        }
      } else {
        return "---";
      }
    } else if (btnName === BtnTypes.TRAINING) {
      if (activeScDetails?.trainingDetails !== null) {
        if (
          activeScDetails?.trainingDetails?.status === PTOStatusEnum.COMPLETE
        ) {
          return "TRAINING_DATE";
        } else if (
          activeScDetails?.trainingDetails?.status === PTOStatusEnum.PENDING
        ) {
          return activeScDetails.trainingDetails.followup.followUpDate;
        } else {
          return StatusTypeEnum.NOT_STARTED;
        }
      } else {
        return "---";
      }
    } else if (btnName === BtnTypes.ONBOARDING) {
      if (activeScDetails?.onBoardingDetails !== null) {
        if (
          activeScDetails?.onBoardingDetails?.status === PTOStatusEnum.COMPLETE
        ) {
          return "ONBOARDING_DATE";
        } else if (
          activeScDetails?.onBoardingDetails?.status === PTOStatusEnum.PENDING
        ) {
          return activeScDetails.onBoardingDetails.followup.followUpDate;
        } else {
          return StatusTypeEnum.NOT_STARTED;
        }
      } else {
        return "---";
      }
    } else {
      return StatusTypeEnum.NOT_STARTED;
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
          VerificationStatusEnum.REJECTED
        ) {
          return StatusTypeEnum.REJECTED;
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
      if (activeScDetails?.trainingDetails !== null) {
        if (
          activeScDetails?.trainingDetails?.status === PTOStatusEnum.COMPLETE
        ) {
          return StatusTypeEnum.COMPLETED;
        } else if (
          activeScDetails?.trainingDetails?.status === PTOStatusEnum.PENDING
        ) {
          return StatusTypeEnum.PENDING;
        } else {
          return StatusTypeEnum.NOT_STARTED;
        }
      } else {
        return StatusTypeEnum.NOT_STARTED;
      }
    } else if (btnName === BtnTypes.ONBOARDING) {
      if (activeScDetails?.onBoardingDetails !== null) {
        if (
          activeScDetails?.onBoardingDetails?.status === PTOStatusEnum.COMPLETE
        ) {
          return StatusTypeEnum.COMPLETED;
        } else if (
          activeScDetails?.onBoardingDetails?.status === PTOStatusEnum.PENDING
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

  return (
    <div className="h-screen w-screen">
      {loading ? (
        <div>
          <Loader />{" "}
        </div>
      ) : (
        <div>
          {showBack.home ? (
            <Home />
          ) : showBack.followUp ? (
            <FollowUps />
          ) : (
            <div>
              {showRegistration ? (
                <RegistrationTab
                  isEditing={
                    activeScDetails?.registrationStatus ===
                    RegistrationStatusEnum.REGISTERED
                  }
                />
              ) : showVerification ? (
                <Verification
                  isEditing={
                    activeScDetails?.verificationDetails !== null
                      ? activeScDetails?.verificationDetails
                          .verificationStatus ===
                        VerificationStatusEnum.VERIFIED
                      : false
                  }
                />
              ) : showPhotography ? (
                <Photography
                  isEditing={
                    activeScDetails?.photographyDetails !== null
                      ? activeScDetails?.photographyDetails?.status ===
                        PTOStatusEnum.COMPLETE
                      : false
                  }
                />
              ) : showFlexInstall ? (
                <FlexInstallation
                  isEditing={
                    activeScDetails?.flexDetails !== null
                      ? activeScDetails?.flexDetails.status ===
                        FlexInstallationEnum.FLEX_INSTALLATION_COMPLETE
                      : false
                  }
                />
              ) : showTraining ? (
                <TrainAndOnboard
                  isEditing={
                    activeScDetails?.trainingDetails !== null
                      ? activeScDetails?.trainingDetails?.status ===
                        PTOStatusEnum.COMPLETE
                      : false
                  }
                />
              ) : showOnboarding ? (
                <Onboarding
                  isEditing={
                    activeScDetails?.onBoardingDetails !== null
                      ? activeScDetails?.onBoardingDetails?.status ===
                        PTOStatusEnum.COMPLETE
                      : false
                  }
                />
              ) : (
                <div>
                  <Navbar onClick={handleHome} />
                  <div className="ml-[0.7rem] mt-[1.2rem] mr-[0.5rem]">
                    <h1 className="text-black text-[1.1rem] font-medium leading-[1.7rem]">
                      {activeScDetails?.serviceCenterName}
                    </h1>
                    <div className="flex flex-col gap-[0.25rem] mt-[0.3rem]">
                      <div className="flex gap-1 text-xs font-normal leading-[1rem] text-[1rem]">
                        <p className="text-background pl-[0.32rem] ">
                          Owner Name:
                        </p>
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
                        <div className="flex items-center w-max">
                          <img src={mapii} alt="" className="w-6 h-6" />
                          <p
                            onClick={handleMaps}
                            className="underline text-blue text-[0.8rem] leading-[1rem] font-normal pb-[0.2rem]"
                          >
                            {activeScDetails?.serviceCenterAddress}
                          </p>
                        </div>
                        {showMap && (
                          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <Maps
                              cross={handleCloseMap}
                              latitude={activeScDetails?.latitude as number}
                              longitude={activeScDetails?.longitude as number}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 text-[0.8rem] mt-[0.45rem] text-ipcol">
                      <p className="font-normal">Date:</p>
                      <p className="font-medium">{formattedDate}</p>
                    </div>

                    {Buttons.map((button, key) => {
                      const status = cardStatus(button);
                      const date = dateStatus(button);
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
                            date={date as string}
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
      )}
    </div>
  );
}

export default Main;
