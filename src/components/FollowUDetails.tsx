import React from "react";
import call from "../images/phoneicon.svg";
import loc from "../images/mapsiconn.svg";

interface FollowUDetailsProps {
  name: string;
  owner: string;
  phone: number;
  address: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function FollowUDetails(props: FollowUDetailsProps) {
  return (
    <div className="text-sm flex flex-col gap-1 border-b py-3 border-border">
      <h1 className="text-[1rem] text-black leading-[1.5rem] font-normal ">
        {props.name}
      </h1>
      <div className="flex flex-col gap-[0.25rem]">
        <div className="flex gap-1 items-center">
          <p className="text-background text-[0.8rem] leading-[1rem] pl-[0.32rem] font-normal ">
            Owner:{" "}
          </p>
          <p>{props.owner}</p>
        </div>
        <div className="flex gap-1">
          <div className="flex items-center">
            <img src={call} alt="" />
            <p className="text-blue  text-[0.75rem] pb-[0.2rem] leading-[1rem] font-medium">
              Call
            </p>
          </div>
          <div onClick={props.onClick} className="flex items-center">
            <img src={loc} alt="" />
            <p className="underline text-blue text-[0.85rem] leading-[1rem] font-normal pb-[0.5rem]">
              {props.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowUDetails;
