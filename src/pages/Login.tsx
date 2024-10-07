import React, { useState } from "react";
import Input from "../components/Input";
import logo from "../images/logo.svg";
import Home from "./Home";
import Submit from "../components/Submit";
import axios from "axios";
// import axios from "axios";

function Login() {
  const [showHome, setShowHome] = useState(false);
  const [login, setLogin] = useState({
    id: "",
    password: "",
  });
  const [incorrect, setIncorrect] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    // const url = "https://gateway-dev.thevehicle.app/internal/user/login";
    // const headers = {
    //   Authorization:
    //     "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTE2MzAzOTQzMzgyIiwiUk9MRSI6IntcInVzZXJJZFwiOlwiM1wiLFwidXNlclJvbGVcIjpcIlVTRVJfU0VSVklDRV9DRU5URVJfT1dORVJcIixcInNlcnZpY2VDZW50ZXJJZFwiOlwiMlwiLFwidGVjaG5pY2lhbklkXCI6XCIyXCIsXCJvbkJvYXJkaW5nQ29tcGxldGVGbGFnXCI6dHJ1ZSxcInZlcmljYXRpb25TdGF0dXNcIjpcIkFQUFJPVkVEXCIsXCJhcHBsaWNhdGlvbklkXCI6XCIyXCIsXCJib29raW5nTWFuYWdlclwiOnRydWV9IiwiVVNFUklEIjoiMyIsIlpNQVRFUl9JTlRFUk5BTF9TRVNTSU9OIjoiL0VVTUpaaVRDRGI1TEVYMVptaW8vQTFqcXlhdXB2OVhoaE5zZ0owbnZsUUk1eFRxNnFmZkVJVXU2WUk2TG1WMGlIeWVmMkhSTFpkYS9UcGljaHFPV3ZLVXpCR0ZrZ3U3RXpOTjc5UlBFQzQ9IiwiaWF0IjoxNzI4MDQ4MjQ2LCJleHAiOjE3NTk2MDU4NDZ9.StKfwXR3hMVJPUzgkYVqhv_6OwEgWxjk15VvamIKKPAmCkPIjimex5dX_JqHrnVggY6Q8p_NzsSErNk5Tjowcw",
    // };
    // axios
    //   .post(
    //     url,
    //     {
    //       employeeId: login.id,
    //       password: login.password,
    //       termsAndConditions: true,
    //     },
    //     { headers }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    if (login.id === "" || login.password === "") {
      setIncorrect(true);
    } else {
      setShowHome(true);
    }
    // })
    // .catch((err) => {
    //   setIncorrect(true);
    //   console.log("Incorrect Login Details");
    // });
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
                  type="number"
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
              {incorrect && (
                <p className="text-[1rem] font-normal leading-[1rem] text-red">
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
