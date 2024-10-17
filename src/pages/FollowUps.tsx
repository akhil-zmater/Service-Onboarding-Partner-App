import React, { useState } from "react";
import Navbar from "./Navbar";
import FollowUDetails from "../components/FollowUDetails";
import Home from "./Home";
import Maps from "./Maps";
import { useAppDispatch, useAppSelector } from "../state";
import {
  getAssignedDetails,
  getFollowUpDetailsData,
} from "../state/serviceCenter/serviceCenter.selector";
import Main from "./Main";
import { serviceCenterActions } from "../state/serviceCenter/serviceCenter.action";

function FollowUps() {
  const assignedDetails = useAppSelector(getAssignedDetails);
  const followUpDetails = useAppSelector(getFollowUpDetailsData);
  const [selectedCoordinates, setSelectedCoordinates] = React.useState<{
    lat: number;
    lng: number;
  }>();
  const [showMain, setShowMain] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [button, setButton] = useState<string | null>("Assigned");
  const dispatch = useAppDispatch();

  const handleHome = (e: React.MouseEvent<HTMLImageElement>) => {
    setShowHome(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  const handleAssigned = (e: React.MouseEvent<HTMLDivElement>) => {
    const comp = e.currentTarget.getAttribute("data-name");
    setButton(comp);
  };
  const isLastElementFolloWUp = followUpDetails.length - 1;
  const isLastElementAssigned = assignedDetails.length - 1;

  return (
    <div>
      {showMain ? (
        <Main />
      ) : (
        <div>
          {showHome ? (
            <Home />
          ) : (
            <div>
              {showMap && (
                <div className="fixed inset-0 bg-black opacity-95 flex items-center justify-center z-50">
                  <Maps
                    cross={handleCloseMap}
                    latitude={selectedCoordinates?.lat as number}
                    longitude={selectedCoordinates?.lng as number}
                  />
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
                    ASSIGNED ({assignedDetails.length})
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
                    FOLLOWUP ({followUpDetails.length})
                  </div>
                </div>
              </div>
              {button === "Assigned" && (
                <div className="px-[1rem]">
                  {/* <p className="bg-whh text-sm mt-[1rem] py-[0.25rem] px-[0.35rem] rounded">
                09 Sep (Today) // TODO: removed Date
              </p> */}
                  {assignedDetails.map((details, key) => {
                    return (
                      <div
                        key={key}
                        className={"pl-1"}
                        onClick={() => {
                          dispatch(
                            serviceCenterActions.getScDetailsByMobileNum({
                              mobileNumber: details.serviceCenterPhonenumber,
                            })
                          );
                          setShowMain(true);
                        }}
                      >
                        <FollowUDetails
                          index={isLastElementAssigned === key}
                          key={key}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCoordinates({
                              lat: details.latitude as number,
                              lng: details.longitude as number,
                            });
                            setShowMap(true);
                          }}
                          name={details.serviceCenterName}
                          owner={details.serviceCenterOwnerName}
                          address={details.serviceCenterAddress}
                          phone={parseInt(details.serviceCenterPhonenumber)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              {button === "FollowUp" && (
                <div className="px-[1rem]">
                  {/* <p className="bg-whh text-sm mt-[1rem] py-[0.25rem] px-[0.35rem] rounded">
                09 Sep (Today) // TODO: removed Date
              </p> */}
                  {followUpDetails.map((details, key) => {
                    return (
                      <div
                        className={"pl-1"}
                        key={key}
                        onClick={() => {
                          dispatch(
                            serviceCenterActions.getScDetailsByMobileNum({
                              mobileNumber: details.serviceCenterPhonenumber,
                            })
                          );
                          setShowMain(true);
                        }}
                      >
                        <FollowUDetails
                          index={isLastElementFolloWUp === key}
                          key={key}
                          status={`Next FollowUp Date : ${details.followUpDetails?.followUpDate}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCoordinates({
                              lat: details.latitude as number,
                              lng: details.longitude as number,
                            });
                            setShowMap(true);
                          }}
                          name={details.serviceCenterName}
                          owner={details.serviceCenterOwnerName}
                          address={details.serviceCenterAddress}
                          phone={parseInt(details.serviceCenterPhonenumber)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FollowUps;
