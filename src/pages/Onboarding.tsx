import React, { useState } from "react";
import Submit from "../components/Submit";
import Input from "../components/Input";
import NextFollowup from "./NextFollowup";
import Navbar from "./Navbar";
import Main from "./Main";

function Onboarding() {
  const [showMain, setShowMain] = useState(false);
  const [onboarding, setOnboarding] = useState<string | null>("");
  const [inputs, setInputsss] = useState({
    phone: "",
    sales_rep_id: "",
    service_center_name: "",
    service_center_owner: "",
    service_center_phone: "",
    service_center_location: "",
    status: "",
    additional_comments: "",
    verifier_name: "",
    transaction_id: "",
    verifier_comments: "",
    photographer_name: "",
    technician_name: "",
    installation_comments: "",
    subscription_type: null,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputsss({ ...inputs, [name]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowMain(true);
  };

  const handleOnboardingToggle = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    const statuss = e.currentTarget.getAttribute("data-name");
    if (statuss) {
      setInputsss((prev) => ({
        ...prev,
        status: statuss,
      }));
      setOnboarding(statuss);
    }
  };

  const OnboardingStatusButtons = ["Onboarding Pending", "Onboarding Complete"];

  const onboardingComp = OnboardingStatusButtons.map((status, key) => (
    <div key={key} className="flex flex-col">
      <div className="text-sm text-black">
        <div
          data-name={status}
          onClick={handleOnboardingToggle}
          className={`${
            key === OnboardingStatusButtons.length - 1
              ? "flex justify-between items-center pb-2 pt-2 text-black font-normal text-[0.75rem] leading-[1rem]"
              : "flex justify-between items-center pb-3 pt-2 border-b border-border text-black font-normal text-[0.75rem] leading-[1rem]"
          }`}
        >
          <p>{status}</p>
          <div
            className={`${
              onboarding === status
                ? "bg-white rounded-full w-5 h-5 flex justify-center items-center border-2 border-blue"
                : "bg-white rounded-full w-5 h-5 flex justify-center items-center border-2 border-border"
            }`}
          >
            <button
              type="button"
              name={status}
              data-name={status}
              onClick={handleOnboardingToggle}
              className={`${
                onboarding === status
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
    <div>
      {showMain ? (
        <Main />
      ) : (
        <div>
          {showMain ? (
            <Main />
          ) : (
            <div>
              <Navbar onClick={handleMain} />
              <div className="ml-[0.7rem] mt-[1.2rem] mr-[0.5rem]">
                <h1 className="tracking-tight text-[1rem] leading-[1.5rem] bg-gradient-to-r from-[rgba(21,79,187,1)] to-[rgba(28,73,151,1)] bg-bluegrad bg-clip-text text-transparent font-medium">
                  Onboarding
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
                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                      Onboarding Status
                    </p>
                    <div className="border border-border p-2 rounded-lg">
                      {onboardingComp}
                    </div>
                  </div>
                  {onboarding === "Onboarding Pending" ? (
                    <NextFollowup />
                  ) : (
                    <div className="flex flex-col gap-1">
                      <p className="font-normal text-[0.75rem] leading-[1rem] text-ipcol">
                        Comments
                      </p>
                      <Input
                        type="text"
                        name="comments"
                        value={inputs.additional_comments}
                        placeholder=""
                        onChange={handleInput}
                        className="h-24 w-full pl-4 border border-border leading-[1rem] text-ipcol font-normal rounded-lg text-[1rem]"
                      />
                    </div>
                  )}
                  <Submit onClick={handleSubmit} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Onboarding;
