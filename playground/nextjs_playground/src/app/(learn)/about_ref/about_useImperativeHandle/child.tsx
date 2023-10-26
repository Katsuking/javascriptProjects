"use client";

import { Ref, forwardRef, useImperativeHandle, useState } from "react";

export type ChildCompRef = {
  reset: () => void;
};

interface ChildCompProps {}

const ChildComp = ({}: ChildCompProps, ref: Ref<ChildCompRef>) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  //  want to expose this to a parent comp
  const reset = () => {
    setCount(0);
  };

  useImperativeHandle(ref, () => ({
    reset,
  }));

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={decrement} className="btn">
        Decrement
      </button>
      <button onClick={increment} className="btn">
        Increment
      </button>
    </div>
  );
};

export default forwardRef(ChildComp);
