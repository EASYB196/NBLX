// /* eslint-disable react-refresh/only-export-components */

// import { createContext, useContext, useState } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [showCart, setShowCart] = useState(false);

//   const addToCart = (product, selectedSize, quantity) => {
//     const newItem = {
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       selectedSize,
//       quantity,
//     };

//     setCartItems((prevItems) => {
//       const existingIndex = prevItems.findIndex(
//         (item) => item.id === newItem.id && item.selectedSize === newItem.selectedSize,
//       );

//       if (existingIndex !== -1) {
//         const updated = [...prevItems];
//         updated[existingIndex].quantity += quantity;
//         return updated;
//       }

//       return [...prevItems, newItem];
//     });

//     setShowCart(true);
//   };

//   const removeFromCart = (index) => {
//     setCartItems((prev) => prev.filter((_, i) => i !== index));
//   };

//   const toggleCartDrawer = () => {
//     setShowCart((prev) => !prev);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         showCart,
//         setShowCart,
//         toggleCartDrawer,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showCart, setShowCart] = useState(false);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add to cart (safe + flexible)
  const addToCart = (
    product,
    selectedSize = product?.selectedSize || "Default",
    quantity = 1
  ) => {
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedSize,
      quantity,
    };

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.selectedSize === newItem.selectedSize
      );

      if (existingIndex !== -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prevItems, newItem];
    });

    setShowCart(true);
  };

  // ✅ Remove item by index
  const removeFromCart = (index) => {
    setCartItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // ✅ Update quantity (bonus professional feature)
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) return;

    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQuantity;
      return updated;
    });
  };

  // ✅ Toggle cart drawer
  const toggleCartDrawer = () => {
    setShowCart((prev) => !prev);
  };

  // ✅ Clear cart (useful for checkout)
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

// ✅ Custom hook
export const useCart = () => useContext(CartContext);