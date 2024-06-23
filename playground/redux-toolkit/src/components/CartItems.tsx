import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  calculateTotal,
  increment,
  removeItem,
} from '../redux/features/cart/cartSlice';
import { useEffect } from 'react';

const CartItems = () => {
  const dispatch = useDispatch();
  const { cartItems, total, amount } = useSelector(
    (state: RootState) => state.cart,
  );

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  return (
    <div>
      {cartItems.map((el) => (
        <div key={el.id}>
          {el.title} {el.price} {el.amount}
          <button onClick={() => dispatch(removeItem(el.id))}>
            Remove this item
          </button>
          <button onClick={() => dispatch(increment(el.id))}>Increment</button>
        </div>
      ))}
      <div>total: {total}</div>
      <div>amount: {amount}</div>
    </div>
  );
};

export default CartItems;
