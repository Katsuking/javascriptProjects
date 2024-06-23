import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { clearCart } from '../redux/features/cart/cartSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => {
    console.log('state:', state);
    return state.cart;
  });
  return (
    <>
      <div>
        <h3>Redux toolkit</h3>
        <p>
          {cartItems.map((el) => (
            <div key={el.id}>{el.title}</div>
          ))}
        </p>
        <button onClick={() => dispatch(clearCart())}>Clear cart</button>
      </div>
    </>
  );
};

export default Navbar;
