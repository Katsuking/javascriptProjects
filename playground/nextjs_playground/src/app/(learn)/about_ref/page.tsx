"use client";

import { useRef, useState } from "react";
import CustomInput from "./childComp";

// sfc
const About_useImperativeHandle = () => {
  const [value, setValue] = useState("red");
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <CustomInput
        type="text"
        ref={inputRef}
        onChange={(e: any) => setValue(e.target.name)}
      />
      <br />
      <button
        onClick={() => inputRef.current?.focus()}
        className="btn-primary btn"
      >
        focus
      </button>
    </>
  );
};

export default About_useImperativeHandle;
