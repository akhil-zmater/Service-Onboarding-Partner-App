import React from "react";

type InputProps = {
  type: "text" | "number" | "file" | "password" | "email" | "tel";
  name: string;
  value: string | number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  maxLength?: number;
  isReadOnly?: boolean;
};

function Input(props: InputProps) {
  return (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      className={props.className}
      maxLength={props.maxLength}
      readOnly={props.isReadOnly}
    />
  );
}

export default Input;
