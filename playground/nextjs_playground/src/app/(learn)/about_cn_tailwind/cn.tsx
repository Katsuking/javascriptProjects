import React from "react";

type CnProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

// すでにbackground colorは設定されているけど、親コンポーネントで渡せるようにする
export default function Cn({ className }: CnProps) {
  return (
    <div className="p-5">
      <button className="rounded bg-blue-500 px-4 py-2 text-white">
        click
      </button>
    </div>
  );
}
