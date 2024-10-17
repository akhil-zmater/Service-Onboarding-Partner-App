import React, { useRef } from "react";
import call from "../images/phoneicon.svg";
import loc from "../images/mapsiconn.svg";

interface FollowUDetailsProps {
  name: string;
  owner: string;
  phone: number;
  address: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  status?: string;
  index: boolean;
}

function FollowUDetails(props: FollowUDetailsProps) {
  const phoneRef = useRef<HTMLAnchorElement>(null);

  const handleCallClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (phoneRef.current) {
      phoneRef.current.click();
      e.stopPropagation();
    }
  };

  return (
    <div
      className={`${
        props.index
          ? "flex flex-col gap-1 py-[0.5rem] "
          : "flex flex-col gap-1 border-b py-[0.5rem] border-border"
      }`}
    >
      <h1 className="text-[0.9rem] text-black leading-[1.5rem] font-normal overflow-hidden">
        {props.name}
      </h1>
      <div className="flex flex-col gap-1">
        <h1 className="text-ipcol font-normal leading-[1rem] text-[0.7rem]">
          {props.status}
        </h1>
        <div className="flex gap-2">
          <div onClick={handleCallClick} className="flex items-center">
            <img src={call} alt="" className="w-6 h-6" />
            <a href={`tel: ${props.phone}`} className="hidden" ref={phoneRef}>
              {props.phone}
            </a>
            <p className="text-blue text-[0.8rem] pb-[0.2rem] leading-[1rem] font-medium ">
              Call
            </p>
          </div>
          <div onClick={props.onClick} className="flex items-center">
            <img src={loc} alt="" />
            <p className="underline text-blue text-[0.85rem] leading-4 font-normal overflow-hidden whitespace-nowrap overflow-ellipsis w-full max-w-[200px]">
              {props.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowUDetails;
