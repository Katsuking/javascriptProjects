import React from "react";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add product",
};

const addProduct = async (formData: FormData) => {
  "use server";
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Fill all fields");
  }
  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
};

const AddProductPage = () => {
  // rfce
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add product</h1>
      <form action={addProduct} className="m-5 grid grid-rows-1">
        <input
          type="text"
          name="name"
          placeholder="name"
          className="input-bordered input mb-2 w-full"
          required
        />
        <textarea
          name="description"
          id=""
          required
          placeholder="Description"
          className="textarea-bordered textarea mb-2 w-full"
        ></textarea>
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          className="input-bordered input mb-2 w-full"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          className="input-bordered input mb-2 w-full"
          required
        />
        <button type="submit" className="btn-primary btn-block btn">
          Add product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
