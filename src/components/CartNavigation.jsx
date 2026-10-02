import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/cartContext';

const CartNavigation = () => {
  const navigate = useNavigate();

  const {
    registerCheckoutNavigation,
  } = useCart();

  useEffect(() => {
    registerCheckoutNavigation(navigate);
  }, [
    navigate,
    registerCheckoutNavigation,
  ]);

  return null;
};

export default CartNavigation;