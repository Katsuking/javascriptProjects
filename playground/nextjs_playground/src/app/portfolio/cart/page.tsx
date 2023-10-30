import { getCart } from "@/lib/db/portfolio/cart";
import CartEntry from "./CartEntry";
import setProductQuantity from "./actions";
import formatPrice from "@/lib/format";

export const metadata = {
  title: "Cart - myshop",
};

const CartPage = async () => {
  const cart = await getCart();

  return (
    <div>
      <h1 className="text-3xl font-bold">shopping cart</h1>
      {cart?.CartItem.map((item) => (
        <CartEntry
          cartItem={item}
          key={item.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.CartItem.length && <p>Your cart is empty</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold ">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn-primary btn sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
