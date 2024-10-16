import React, { useState } from "react";
import Input from "../components/Input";
import Navbar from "./Navbar";
import Main from "./Main";
import NextFollowup from "./NextFollowup";
import Submit from "../components/Submit";
import { useAppDispatch, useAppSelector } from "../state";
import { serviceCenterActions } from "../state/serviceCenter/serviceCenter.action";
import {
  BtnTypes,
  PTOStatusEnum,
} from "../state/serviceCenter/servicCenter.types";
import {
  AddTrainingDetailsLoadingState,
  getEmployeeId,
  getFollowUpDetails,
} from "../state/serviceCenter/serviceCenter.selector";
import { scActions } from "../state/serviceCenter/serviceCenter.store";
import { getActiveScDetails } from "../state/serviceCenter/serviceCenter.selector";

interface TrainingProps {
  isEditing: boolean;
}

function TrainAndOnboard(props: TrainingProps) {
  const activeSCDetails = useAppSelector(getActiveScDetails);
  const followUpDetails = useAppSelector(getFollowUpDetails);
  const [showMain, setShowMain] = useState(false);
  const dispatch = useAppDispatch();
  const { success } = useAppSelector(AddTrainingDetailsLoadingState);
  const [inputs, setInputsss] = useState({
    status: "",
    additional_comments: "",
  });
  const TrainingStatusButtons = ["Training Pending", "Training Complete"];

  React.useEffect(() => {
    if (success) {
      setShowMain(true);
      dispatch(scActions.resetSCloadingStates());
    }
  }, [success]);

  React.useEffect(() => {
    if (activeSCDetails?.trainingDetails !== null) {
      console.log("hdhsjkjas", activeSCDetails?.trainingDetails?.status);
      if (activeSCDetails?.trainingDetails?.status === PTOStatusEnum.COMPLETE) {
        setInputsss((prev) => ({
          ...prev,
          status: "Training Complete",
          additional_comments: activeSCDetails.trainingDetails
            ?.comments as string,
        }));
      }
      if (activeSCDetails?.trainingDetails?.status === PTOStatusEnum.PENDING) {
        setInputsss((prev) => ({
          ...prev,
          status: "Training Pending",
        }));
        console.log(inputs);
      }
    }
  }, [activeSCDetails]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputsss({ ...inputs, [name]: value });
  };
  const empId = useAppSelector(getEmployeeId);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("details====>>", inputs);
    if (inputs.status !== "") {
      if (
        inputs.status === TrainingStatusButtons[0] &&
        followUpDetails.reason === ""
      ) {
        alert("Please Fill All Input Fields");
        return;
      }
      if (
        inputs?.status === TrainingStatusButtons[1] &&
        inputs.additional_comments === ""
      ) {
        alert("Please Fill All Input Fields");
        return;
      }
      dispatch(
        serviceCenterActions.addTrainingDetails({
          comments: inputs.additional_comments,
          repId: empId as string,
          status:
            inputs.status === "Training Complete"
              ? PTOStatusEnum.COMPLETE
              : PTOStatusEnum.PENDING,
          isFollowUpClicked: inputs.status === "Training Pending",
        })
      );
    } else {
      alert("Please Fill All Input Fields");
    }
  };

  const handleTrainingToggle = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    if (!props.isEditing) {
      const statuss = e.currentTarget.getAttribute("data-name");
      console.log("Status====>>>>>", statuss);
      if (statuss) {
        setInputsss((prev) => ({
          ...prev,
          status: statuss,
        }));
      }
    }
  };

  const TrainingComp = TrainingStatusButtons.map((status, key) => (
    <div key={key} className="flex flex-col">
      <div className="text-sm text-black">
        <div
          data-name={status}
          onClick={handleTrainingToggle}
          className={`${
            key === TrainingStatusButtons.length - 1
              ? "flex justify-between items-center pb-2 pt-2 text-black font-normal text-[0.75rem] leading-[1rem]"
              : "flex justify-between items-center pb-3 pt-2 border-b border-border text-black font-normal text-[0.75rem] leading-[1rem]"
          }`}
        >
          <p>{status}</p>
          <div
            className={`${
              inputs.status === status
                ? "bg-white rounded-full w-5 h-5 flex justify-center items-center border-2 border-blue"
                : "bg-white rounded-full w-5 h-5 flex justify-center items-center border-2 border-border"
            }`}
          >
            <button
              type="button"
              name={status}
              data-name={status}
              onClick={handleTrainingToggle}
              className={`${
                inputs.status === status
                  ? "bg-blue rounded-full w-3 h-3"
                  : "bg-gray-300 rounded-full w-3 h-3"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  ));

  const currDate = new Date();

  const formattedDate = currDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleMain = (e: React.MouseEvent<HTMLImageElement>) => {
    setShowMain(true);
  };

  return (
    <div className="w-screen">
      {showMain ? (
        <Main />
      ) : (
        <div className="w-screen">
          {showMain ? (
            <Main />
          ) : (
            <div className="w-screen">
              <Navbar onClick={handleMain} />
              <div className="ml-[0.7rem] mt-[1.2rem] mr-[0.5rem]">
                <h1 className="tracking-tight text-[1rem] leading-[1.5rem] bg-gradient-to-r from-[rgba(21,79,187,1)] to-[rgba(28,73,151,1)] bg-bluegrad bg-clip-text text-transparent font-medium">
                  Training
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
                <div className="flex flex-col w-full">
                  <div className="mt-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                        Trainig Status
                      </p>
                      <div className="border border-border p-2 rounded-lg">
                        {TrainingComp}
                      </div>
                    </div>
                    {inputs.status === "Training Pending" ? (
                      <NextFollowup tab={BtnTypes.TRAINING} />
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
                          onChange={handleInput}
                          isReadOnly={props.isEditing}
                          className="h-24 w-full pl-4 border border-border leading-[1rem] text-ipcol font-normal rounded-lg text-[1rem]"
                        />
                      </div>
                    )}
                    <div className="self-center">
                      <Submit
                        onClick={handleSubmit}
                        isDisabled={
                          activeSCDetails?.trainingDetails !== null
                            ? activeSCDetails?.trainingDetails?.status ===
                              PTOStatusEnum.COMPLETE
                            : false
                        }
                      />
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

export default TrainAndOnboard;
