"use client";

import { useState } from "react";

const Form_useState = () => {
  // 下記のように一つずつ書く必要はない
  // const [fistname, setFirstname] = useState("")

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // e.target.nameを使って、該当するinputのみ変更
  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev, // 前のオブジェクトの状態を保持
      [e.target.name]: e.target.value,
    }));
  };

  console.log(form);

  return (
    <div className="p-5">
      <h2 className="py-4 text-center">
        How to use one useState for all inputs (check code)
      </h2>
      <form className="mx-auto flex max-w-xl flex-col gap-y-3">
        <input
          type="text"
          name="firstName"
          placeholder="first name"
          className="gap-y-3 rounded-lg border-2 border-gray-400 py-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="last name"
          className="gap-y-3 rounded-lg border-2 border-gray-400 py-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="email address"
          className="gap-y-3 rounded-lg border-2 border-gray-400 py-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          className="gap-y-3 rounded-lg border-2 border-gray-400 py-2"
          onChange={handleChange}
        />
        <p className="">
          {form.firstName === "" || form.lastName === ""
            ? "Please Enter your name"
            : `Welcome!, ${form.firstName} ${form.lastName}`}
        </p>
      </form>
    </div>
  );
};

export default Form_useState;
