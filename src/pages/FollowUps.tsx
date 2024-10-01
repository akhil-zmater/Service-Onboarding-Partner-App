import React, { useState } from "react";
import Navbar from "./Navbar";
import FollowUDetails from "../components/FollowUDetails";
import Home from "./Home";
import Maps from "./Maps";

function FollowUps() {
  const [showHome, setShowHome] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleHome = (e: React.MouseEvent<HTMLImageElement>) => {
    setShowHome(true);
  };

  const handleMap = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
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
          <div className="my-5 ml-3 mr-2">
            <div className="flex gap-1 border border-blue px-2 w-max rounded py-[0.25rem] px-[0.35rem] text-[0.75rem] leading-[1.25rem]">
              <h1 className="text-background font-normal">
                Total Follow Ups:{" "}
              </h1>
              <p className="font-medium">5</p>
            </div>
            <p className="bg-whh text-sm mt-[1rem] py-[0.25rem] px-[0.35rem] rounded">
              09 Sep (Today)
            </p>
            <div className="pl-1">
              <FollowUDetails
                onClick={handleMap}
                name="A1 Car Service Center"
                owner="John Doe"
                address="jyothi nagar, karmanghat"
                phone={9866957717}
              />
              <FollowUDetails
                onClick={handleMap}
                name="A1 Car Service Center"
                owner="John Doe"
                address="jyothi nagar, karmanghat"
                phone={9866957717}
              />
              <FollowUDetails
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
                onClick={handleMap}
                name="A1 Car Service Center"
                owner="John Doe"
                address="jyothi nagar, karmanghat"
                phone={9866957717}
              />
              <FollowUDetails
                onClick={handleMap}
                name="A1 Car Service Center"
                owner="John Doe"
                address="jyothi nagar, karmanghat"
                phone={9866957717}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FollowUps;
