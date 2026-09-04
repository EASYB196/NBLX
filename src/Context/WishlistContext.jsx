// import { createContext, useContext, useEffect, useState } from 'react';
// /* eslint-disable react-refresh/only-export-components */
// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlistItems, setWishlistItems] = useState(() => {
//     const saved = localStorage.getItem('wishlist');
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
//   }, [wishlistItems]);

//   const toggleWishlist = (product) => {
//     const exists = wishlistItems.find((item) => item.id === product.id);

//     if (exists) {
//       setWishlistItems((prev) =>
//         prev.filter((item) => item.id !== product.id)
//       );
//     } else {
//       setWishlistItems((prev) => [...prev, product]);
//     }
//   };

//   const isWishlisted = (id) => {
//     return wishlistItems.some((item) => item.id === id);
//   };

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlistItems,
//         toggleWishlist,
//         isWishlisted,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);





import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

/* eslint-disable react-refresh/only-export-components */

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');

    try {
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      'wishlist',
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    if (!product?.id) return;

    setWishlistItems((prevItems) => {
      const exists = prevItems.some(
        (item) =>
          String(item.id) === String(product.id)
      );

      if (exists) {
        return prevItems.filter(
          (item) =>
            String(item.id) !== String(product.id)
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          id: product.id,
          route: product.route,
        },
      ];
    });
  };

  const isWishlisted = (id) => {
    return wishlistItems.some(
      (item) =>
        String(item.id) === String(id)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);