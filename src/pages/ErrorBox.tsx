import React from "react";
import crosss from "../images/crossicon.svg";

interface ErrorBoxProps {
  cross: (e: React.MouseEvent<HTMLImageElement>) => void;
}

function ErrorBox({ cross }: ErrorBoxProps) {
  return (
    <div className=" bg-white w-full mx-5 h-max rounded-lg font-poppins flex  justify-between gap-5 px-3 py-5">
      <h2 className="text-pretty w-[90%]">
        ERROR MESSAGE ERROR MESSAGE ERROR MESSAGE ERROR MESSAGE ERROR MESSAGE
        ERROR MESSAGE ERROR MESSAGE ERROR MESSAGE !!
      </h2>
      <img
        src={crosss}
        onClick={cross}
        alt=""
        className="w-5 h-5 rounded-full"
      />
    </div>
  );
}

export default ErrorBox;

{
  /* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <ErrorBox cross={handleClose} />
</div> */
}
