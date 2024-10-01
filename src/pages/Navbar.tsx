import React from "react";
import nav from "../images/back.svg";
import logo from "../images/logo.svg";

interface NavbarProps {
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
}

export default function Navbar(props: NavbarProps) {
  return (
    <div className="flex justify-between items-center h-[3.5rem] border-b px-[1rem] py-[0.8rem] border-blue w-screen shadow-lg">
      <img src={nav} alt="" className="w-7 h-7" onClick={props.onClick} />
      <h1 className="tracking-tight text-[0.83rem] text-wrap w-[6rem] leading-[1.2rem] bg-gradient-to-r from-[rgba(21,79,187,1)] to-[rgba(28,73,151,1)] bg-bluegrad bg-clip-text text-transparent font-medium text-center">
        Service Partner Onboarding
      </h1>
      <img src={logo} alt="" className="w-10 h-10" />
    </div>
  );
}
