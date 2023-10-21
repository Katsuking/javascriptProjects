"use client";

import { useState, useTransition } from "react";

interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
}

// rfc
export default function AddToCartButton({
  productId,
  incrementProductQuantity,
}: AddToCartButtonProps) {
  // "use client" の中で、serverで動作するものは、startTransitionでwrapする
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn-primary btn"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId); // server aciton
            setSuccess(true);
          });
        }}
      >
        Add to Cart
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added to Cart</span>
      )}
    </div>
  );
}
