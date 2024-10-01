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

function Main() {
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

  const currDate = new Date();

  const formattedDate = currDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const Buttons = [
    "Registration",
    "Verification",
    "Photography",
    "Flex Installation",
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

  useEffect(() => {
    console.log(status);
    let resColor = "text-background";
    let resFont = "Not Started";

    if (
      inputs.status === "Registered" ||
      inputs.status === "Approved" ||
      inputs.status === "Photography Complete" ||
      inputs.status === "Flex Installation Complete" ||
      inputs.status === "Training & Onboarding Complete"
    ) {
      resColor = "text-green";
      resFont = "Completed";
    } else if (
      inputs.status === "Follow Up" ||
      inputs.status === "Training Pending" ||
      inputs.status === "Onboarding Pendning" ||
      inputs.status === "Flex Installation Pending" ||
      inputs.status === "Photography Pending" ||
      inputs.status === "Verification Pending"
    ) {
      resColor = "text-yellow";
      resFont = "Pending";
    }

    setResClass(resColor);
    setResText(resFont);
  }, [inputs.status, status]);

  console.log("resClass:", resClass);
  console.log("resText:", resText);

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
                  A1 Car Service Center
                </h1>
                <div className="flex flex-col gap-[0.25rem] mt-[0.3rem]">
                  <div className="flex gap-1 text-xs font-normal leading-[1rem] text-[1rem]">
                    <p className="text-background pl-[0.32rem] ">
                      Owner Name:{" "}
                    </p>
                    <span className="font-normal text-black leading-[1rem]  ">
                      {inputs.service_center_owner}
                    </span>
                  </div>
                  <div className=" flex items-center gap-2">
                    <div className="flex items-center">
                      <img src={phone} alt="" className="w-6 h-6" />
                      <a
                        href={`tel: ${inputs.phone}`}
                        className="hidden"
                        ref={phoneRef}
                      >
                        {inputs.phone}
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
                        {inputs.service_center_location}
                      </p>
                    </div>
                    {showMap && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <Maps cross={handleCloseMap} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 text-[0.8rem] mt-[0.45rem] text-ipcol">
                  <p className="font-normal">Date:</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>

                {Buttons.map((button, key) => (
                  <div
                    className="mt-[0.75rem] flex flex-col gap-[1rem]"
                    key={key}
                  >
                    <RegComp
                      className={resClass}
                      statusss={resText}
                      data-name={button}
                      name={button}
                      date="---"
                      onClick={handleButtons(button)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
