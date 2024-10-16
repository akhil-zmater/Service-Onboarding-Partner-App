import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import logo from "../images/logo.svg";
import Home from "./Home";
import Submit from "../components/Submit";
import { useAppDispatch, useAppSelector } from "../state";
import { AddLoginDetailsLoadingState } from "../state/serviceCenter/serviceCenter.selector";
import { serviceCenterActions } from "../state/serviceCenter/serviceCenter.action";
import { scActions as scStoreActions } from "./../state/serviceCenter/serviceCenter.store";
import { getCookie } from "../utils/SessionManagement";

function Login() {
  const [showHome, setShowHome] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useAppDispatch();
  const { success } = useAppSelector(AddLoginDetailsLoadingState);

  useEffect(() => {
    const loggedUser = getCookie("user");

    if (loggedUser === null) return;

    const loggedUserJson = JSON.parse(loggedUser);

    if (loggedUserJson?.employeeId) {
      dispatch(scStoreActions.setAddLoginDetails(loggedUserJson));
      dispatch(serviceCenterActions.getAssignedFollowUpDetails());
      setShowHome(true);
    }
  }, []);

  useEffect(() => {
    if (success) {
      setShowHome(true);
    }
  }, [success]);

  const [login, setLogin] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (login.id === "" || login.password === "") {
      setShowError(true);
    } else {
      dispatch(
        serviceCenterActions.addLoginDetails({
          employeeId: login.id,
          password: login.password,
          termsAndConditions: true,
        })
      );
    }
  };

  return (
    <div>
      {showHome ? (
        <Home />
      ) : (
        <div className="bg-white h-screen w-screen flex flex-col justify-between items-center py-[1.5rem] px-[1rem]">
          {/* LOGO, TITLE, LOGIN INPUT  */}
          <div className="">
            <img src={logo} alt="logo" className="" />
            <h1 className="font-poppins mt-[1.5rem] tracking-tight text-[2rem] leading-[2.5rem] bg-gradient-to-r from-[rgba(21,79,187,1)] to-[rgba(28,73,151,1)] bg-bluegrad bg-clip-text text-transparent font-medium">
              Service Partner Onboarding
            </h1>
            <div className="mt-[1rem] flex flex-col gap-[0.5rem]">
              <p className="text-ipcol font-semibold text-[1rem] leading-[1.5rem]">
                Login
              </p>

              <div className=" flex flex-col gap-[0.25rem]">
                <p className="text-[1rem] font-normal leading-[1rem] text-ipcol">
                  User ID
                </p>
                <Input
                  type="text"
                  name="id"
                  value={login.id}
                  placeholder="Enter ID"
                  onChange={handleChange}
                  className="h-[3.5rem] w-full pl-4 border border-border rounded-[0.5rem] text-[1rem] leading-[1.5rem] font-normal"
                />
              </div>
              <div className="flex flex-col gap-[0.25rem]">
                <p className="text-[1rem] font-normal leading-[1rem] text-ipcol">
                  Password
                </p>
                <Input
                  type="password"
                  name="password"
                  value={login.password}
                  placeholder="Enter Password"
                  onChange={handleChange}
                  className="h-[3.5rem] w-full pl-4 border border-border rounded-[0.5rem] text-[1rem] leading-[1.5rem] font-normal"
                />
              </div>
              {showError && (
                <p className="text-[0.8rem] pl-1 font-normal leading-[1rem] text-red">
                  Incorrect User ID or Password
                </p>
              )}
            </div>
          </div>
          {/* SUBMIT BUTTON */}
          <div className="">
            <Submit onClick={handleSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
