"use client";

import { CartItemWithProduct } from "@/lib/db/portfolio/cart";
import formatPrice from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

// use server actions this way to use NextAuth.
interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>; // server action
}

const CartEntry = ({
  cartItem: { product, quantity },
  setProductQuantity,
}: CartEntryProps) => {
  // dropdownで選択できる個数
  // <options>を格納するので、JSX.Elementのarray型になる
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  // use clientって言っときながら、server actionsを使うならお決まりのuseTransition
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Link
            href={"/portfolio/products/" + product.id}
            className="font-bold"
          >
            {product.name}
          </Link>
          <div>Price: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            {/* 商品の個数をdropdownで変更する */}
            Quantity:
            <select
              className="select-bordered select w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value); // dropdownで選択した個数
                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantity); // db情報の更新
                });
              }}
            >
              <option value={0}>0 (remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-3">
            Total: {formatPrice(product.price * quantity)}
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
};

export default CartEntry;
