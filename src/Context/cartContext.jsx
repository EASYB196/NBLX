

/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');

    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to load cart:', error);

      return [];
    }
  });

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      'cartItems',
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const addToCart = (
    product,
    selectedSize = product?.selectedSize || 'Default',
    quantity = 1
  ) => {
    if (!product?.id) return;

    const safeQuantity = Number(quantity) || 1;

    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,

      // Product detail route supplied by the detail page
      route: product.route,

      selectedSize,
      quantity: safeQuantity,
    };

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          String(item.id) === String(newItem.id) &&
          item.selectedSize === newItem.selectedSize
      );

      if (existingIndex !== -1) {
        const updated = [...prevItems];

        updated[existingIndex] = {
          ...updated[existingIndex],

          // Preserve the existing route if no new route
          // was supplied, otherwise use the latest route
          route:
            newItem.route ||
            updated[existingIndex].route,

          quantity:
            Number(
              updated[existingIndex].quantity || 0
            ) + safeQuantity,
        };

        return updated;
      }

      return [...prevItems, newItem];
    });

    setShowCart(true);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const updateQuantity = (
    index,
    newQuantity
  ) => {
    const safeQuantity = Math.max(
      1,
      Number(newQuantity) || 1
    );

    setCartItems((prev) => {
      const updated = [...prev];

      if (!updated[index]) {
        return prev;
      }

      updated[index] = {
        ...updated[index],
        quantity: safeQuantity,
      };

      return updated;
    });
  };

  const toggleCartDrawer = () => {
    setShowCart((prev) => !prev);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        showCart,
        setShowCart,
        toggleCartDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);