import React, { forwardRef } from "react";

type CustomInputProps = {
  className?: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// TODO: useImperativeHandle
const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type, ...props }: CustomInputProps, ref) => {
    console.log(ref);
    return <input {...props} ref={ref} type="text" />;
  },
);

export default CustomInput;
