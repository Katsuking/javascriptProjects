"use client";

import { ShoppingCart } from "@/lib/db/cart";
import formatPrice from "@/lib/format";
import Link from "next/link";

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null; // cartがまだ存在しない場合もある
}

function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
  const closeDropdown = () => {
    // manually close drop down
    const elem = document.activeElement as HTMLElement;
    if (elem) elem.blur();
  };

  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle btn">
        <div className="indicator">
          <h3>logo here</h3>
          <span className="badge badge-sm indicator-item">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-20 mt-3 w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.size || 0} items</span>
          <span className="text-info ">
            Subtotal: {formatPrice(cart?.subtotal || 0)}
          </span>
          <div className="card-actions">
            <Link
              href="/portfolio/cart"
              className="btn-primary btn-block btn"
              onClick={closeDropdown}
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartButton;
