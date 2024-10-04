import React, { useState } from "react";
import Navbar from "./Navbar";
import FollowUDetails from "../components/FollowUDetails";
import Home from "./Home";
import Maps from "./Maps";

function FollowUps() {
  const [showHome, setShowHome] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [button, setButton] = useState<string | null>("Assigned");

  const handleHome = (e: React.MouseEvent<HTMLImageElement>) => {
    setShowHome(true);
  };

  const handleMap = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  const handleAssigned = (e: React.MouseEvent<HTMLDivElement>) => {
    const comp = e.currentTarget.getAttribute("data-name");
    setButton(comp);
  };

  return (
    <div>
      {showHome ? (
        <Home />
      ) : (
        <div>
          {showMap && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Maps cross={handleCloseMap} />
            </div>
          )}
          <Navbar onClick={handleHome} />
          <div className="m-[1rem]">
            <div className="flex justify-center items-center border-b border-border ">
              <div
                data-name="Assigned"
                onClick={handleAssigned}
                className={
                  button === "Assigned"
                    ? "basis-1/2 text-center font-semibold text-blue text-[0.8rem] bg-lb rounded-lg p-[0.5rem]"
                    : "basis-1/2 text-center font-semibold text-ipcol  text-[0.8rem] rounded-lg p-[0.5rem]"
                }
              >
                ASSIGNED (3)
              </div>
              <div
                data-name="FollowUp"
                onClick={handleAssigned}
                className={
                  button === "FollowUp"
                    ? "basis-1/2 text-center font-semibold text-blue text-[0.8rem] bg-lb rounded-lg p-[0.5rem]"
                    : "basis-1/2 text-center font-semibold text-ipcol  text-[0.8rem] rounded-lg p-[0.5rem]"
                }
              >
                FOLLOWUP (2)
              </div>
            </div>
          </div>
          {button === "Assigned" ? (
            <div className="px-[1rem]">
              <p className="bg-whh text-sm mt-[1rem] py-[0.25rem] px-[0.35rem] rounded">
                09 Sep (Today)
              </p>
              <div className="pl-1">
                <FollowUDetails
                  status="PHOTOGRAPHY PENDING"
                  onClick={handleMap}
                  name="A1 Car Service Center"
                  owner="John Doe"
                  address="jyothi nagar, karmanghat"
                  phone={9866957717}
                />
                <FollowUDetails
                  status="STATUS FROM STORE"
                  onClick={handleMap}
                  name="A1 Car Service Center"
                  owner="John Doe"
                  address="jyothi nagar, karmanghat"
                  phone={9866957717}
                />
                <FollowUDetails
                  status="STATUS FROM STORE"
                  onClick={handleMap}
                  name="A1 Car Service Center"
                  owner="John Doe"
                  address="jyothi nagar, karmanghat"
                  phone={9866957717}
                />
              </div>
              <p className="bg-whh text-sm py-[0.25rem] px-[0.35rem] rounded">
                10 Sep (Tomorrow)
              </p>
              <div className="pl-1">
                <FollowUDetails
                  status="STATUS FROM STORE"
                  onClick={handleMap}
                  name="A1 Car Service Center"
                  owner="John Doe"
                  address="jyothi nagar, karmanghat"
                  phone={9866957717}
                />
                <FollowUDetails
                  status="STATUS FROM STORE"
                  onClick={handleMap}
                  name="A1 Car Service Center"
                  owner="John Doe"
                  address="jyothi nagar, karmanghat"
                  phone={9866957717}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default FollowUps;
