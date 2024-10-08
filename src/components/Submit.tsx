import Button from "./Button";

interface SubmitProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
}

export default function Submit(props: SubmitProps) {
  return (
    <div>
      <div>
        <Button
          type="button"
          name="Submit"
          onClick={props.onClick}
          disabled={props.isDisabled}
          data-name=""
          className={`${
            props.isDisabled
              ? "text-[1rem] font-semibold leading-[1.5rem] w-[18.8rem] h-12 rounded-lg shadow-xl cursor-not-allowed bg-border text-ipcol"
              : "text-[1rem] font-semibold leading-[1.5rem] w-[18.8rem] h-12 rounded-lg shadow-xl  bg-gradient-to-r from-[rgba(21,79,187,1)] to-[rgba(28,73,151,1)] text-white"
          }`}
        />
      </div>
    </div>
  );
}
