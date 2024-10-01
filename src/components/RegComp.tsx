import op from "../images/open.svg";

interface RegCompProps {
  name: string;
  "data-name": string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  date: string;
  statusss: string;
  className: string;
}

function RegComp(props: RegCompProps) {
  return (
    <div
      data-name={props["data-name"]}
      onClick={props.onClick}
      className="font-poppins flex flex-col justify-center gap-[0.25rem] border rounded-[0.5rem] py-[0.75rem] px-[0.6rem] h-[4rem] border-border"
    >
      <div className="flex justify-between h-[1.5rem]">
        <p className="text-ipcol text-[1rem] leading-[1.5rem] font-medium">
          {props.name}
        </p>
        <img src={op} alt="" className="" />
      </div>
      <div className="flex justify-between h-4 text-xs leading-2">
        <p className={props.className}>{props.statusss}</p>
        <p className="text-prim font-normal leading-[1rem] text-[1rem]">
          {props.date}
        </p>
      </div>
    </div>
  );
}

export default RegComp;
