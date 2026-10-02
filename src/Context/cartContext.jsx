// eslint-disable-next-line react-refresh/only-export-components

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');

    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [showCart, setShowCart] = useState(false);

  /*
   * BUY NOW PROCESSING STATE
   */
  const [buyNowProcessing, setBuyNowProcessing] = useState(false);

  /*
   * Navigation function registered from inside Router.
   */
  const [navigateToCheckout, setNavigateToCheckout] = useState(null);

  /*
   * Store the Buy Now timeout so it can be cleaned up.
   */
  const buyNowTimeoutRef = useRef(null);

  /*
   * SAVE CART
   */
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  /*
   * CLEAN UP BUY NOW TIMEOUT
   */
  useEffect(() => {
    return () => {
      if (buyNowTimeoutRef.current) {
        clearTimeout(buyNowTimeoutRef.current);
      }
    };
  }, []);

  /*
   * REGISTER CHECKOUT NAVIGATION
   */
  const registerCheckoutNavigation = useCallback((navigate) => {
    setNavigateToCheckout(() => navigate);
  }, []);

  /*
   * ADD TO CART
   */
  const addToCart = (
    product,
    selectedSize = product?.selectedSize || 'Default',
    quantity = 1,
    selectedColor = product?.selectedColor || 'Default',
  ) => {
    const safeQuantity = Number(quantity) || 1;

    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      route: product.route || '',
      selectedSize: selectedSize || 'Default',
      selectedColor: selectedColor || 'Default',
      quantity: safeQuantity,
    };

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.id === newItem.id &&
          (item.selectedSize || 'Default') === newItem.selectedSize &&
          (item.selectedColor || 'Default') === newItem.selectedColor,
      );

      if (existingIndex !== -1) {
        const updated = [...prevItems];

        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Number(updated[existingIndex].quantity || 0) + safeQuantity,
        };

        return updated;
      }

      return [...prevItems, newItem];
    });

    setShowCart(true);
  };

  /*
   * BUY NOW
   */
  const buyNow = useCallback(
    (product, selectedSize = 'Default', quantity = 1, selectedColor = 'Default') => {
      /*
       * Prevent duplicate clicks.
       */
      if (buyNowProcessing) {
        return;
      }

      /*
       * Make sure a product exists.
       */
      if (!product) {
        return;
      }

      /*
       * Validate size BEFORE showing
       * the processing modal.
       */
      if (Array.isArray(product.sizes) && product.sizes.length > 0 && !selectedSize) {
        toast.error('Please select a size!', {
          id: 'size-error',
        });

        return;
      }

      /*
       * Make sure checkout navigation
       * has been registered.
       */
      if (typeof navigateToCheckout !== 'function') {
        console.error('Checkout navigation has not been registered.');

        return;
      }

      /*
       * SHOW PROCESSING MODAL
       */
      setBuyNowProcessing(true);

      /*
       * CLOSE CART DRAWER
       */
      setShowCart(false);

      const safeQuantity = Number(quantity) || 1;

      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        route: product.route || '',
        selectedSize: selectedSize || 'Default',
        selectedColor: selectedColor || 'Default',
        quantity: safeQuantity,
      };

      /*
       * UPDATE CART
       */
      setCartItems((prevItems) => {
        const existingIndex = prevItems.findIndex(
          (item) =>
            item.id === newItem.id &&
            (item.selectedSize || 'Default') === newItem.selectedSize &&
            (item.selectedColor || 'Default') === newItem.selectedColor,
        );

        if (existingIndex !== -1) {
          const updated = [...prevItems];

          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: Number(updated[existingIndex].quantity || 0) + safeQuantity,
          };

          return updated;
        }

        return [...prevItems, newItem];
      });

      /*
       * PROCESSING TIME
       *
       * Minimum: 3 seconds
       * Maximum: 6 seconds
       */
      const loadingTime = Math.floor(Math.random() * 3000) + 2000;

      buyNowTimeoutRef.current = setTimeout(() => {
        navigateToCheckout('/checkout');

        setBuyNowProcessing(false);

        buyNowTimeoutRef.current = null;
      }, loadingTime);
    },
    [buyNowProcessing, navigateToCheckout],
  );

  /*
   * REMOVE FROM CART
   */
  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  /*
   * UPDATE QUANTITY
   */
  const updateQuantity = (index, newQuantity) => {
    const safeQuantity = Number(newQuantity);

    if (safeQuantity <= 0) return;

    setCartItems((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        quantity: safeQuantity,
      };

      return updated;
    });
  };

  /*
   * TOGGLE CART DRAWER
   */
  const toggleCartDrawer = () => {
    setShowCart((prev) => !prev);
  };

  /*
   * CLEAR CART
   */
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        showCart,
        setShowCart,

        addToCart,

        buyNow,
        buyNowProcessing,

        registerCheckoutNavigation,

        removeFromCart,
        updateQuantity,
        toggleCartDrawer,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
