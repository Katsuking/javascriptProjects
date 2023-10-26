"use client";

import { useRef } from "react";
import ChildComp, { ChildCompRef } from "./child";

const About_useImperativeHandle = () => {
  const counterRef = useRef<ChildCompRef>(null);

  return (
    <div>
      <div>
        <ChildComp ref={counterRef} />
      </div>
      {/* 子コンポーネントでuseImperativeHandleを使って、関数をこの親コンポーネントに
      持ってきているので、refで使用可能 */}
      <button onClick={() => counterRef.current?.reset()} className="btn">
        Reset Button from parent
      </button>
    </div>
  );
};

export default About_useImperativeHandle;
