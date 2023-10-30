"use client";
import React, { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom"; // to show loading indicator

type FormSubmitButtonProps = {
  children: React.ReactNode; // こいつでまとめてanyを解決
  className?: string; // 外からclassも渡したいので設定
} & ComponentProps<"button">;

const FormSubmitButton = ({
  children,
  className,
  ...props // ComponentProps
}: FormSubmitButtonProps) => {
  const { pending } = useFormStatus(); // loading の機能追加

  return (
    // btnに加えて、追加のclassNameも追加できるようにする
    <button
      {...props} // write this first so that rest of props can overwrite
      type="submit"
      className={`btn-primary btn ${className}`}
      disabled={pending} // disable the button
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};

export default FormSubmitButton;
