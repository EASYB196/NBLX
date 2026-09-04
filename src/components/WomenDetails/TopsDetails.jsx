
// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// import { useParams, Link } from 'react-router-dom';
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaHeart,
//   FaRegHeart,
// } from 'react-icons/fa6';

// import { TopDatas } from '../../data/Tops.js';
// import { useCart } from '../../Context/cartContext';
// import { useWishlist } from '../../Context/WishlistContext';

// import sizechart from '../../assets/images/sizechart.png';

// function TopDetails() {
//   const { id } = useParams();

//   const product = TopDatas.find(
//     (item) => String(item.id) === String(id)
//   );

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [showSizeChart, setShowSizeChart] = useState(false);

//   const { addToCart, setShowCart } = useCart();
//   const { toggleWishlist, isWishlisted } = useWishlist();

//   if (!product) {
//     return (
//       <div className="text-black p-10">
//         Product not found
//       </div>
//     );
//   }

//   const images = [
//     product.image,
//     ...(product.hoverImage ? [product.hoverImage] : []),
//   ];

//   /*
//     YMAL PRODUCTS
//     Removes the current product and displays other products
//     from the same TopDatas collection.
//   */
//   const ymalProducts = TopDatas.filter(
//     (item) => String(item.id) !== String(product.id)
//   ).slice(0, 4);

//   const handlePrev = () => {
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + images.length) % images.length
//     );
//   };

//   const handleNext = () => {
//     setCurrentImageIndex(
//       (prev) => (prev + 1) % images.length
//     );
//   };

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       toast.error('Please select a size!');
//       return;
//     }

//     addToCart(product, selectedSize, quantity);
//     setShowCart(true);

//     toast.success('Item added to cart!');
//   };

//   const handleWishlist = () => {
//     toggleWishlist({
//       ...product,
//       route: `/tops/${product.id}`,
//     });
//   };

//   return (
//     <div className="bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]">

//       {/* ================= BREADCRUMB ================= */}
//       <div className="flex items-center justify-center gap-2 md:gap-4 mt-23 text-sm md:text-base">
//         <Link
//           to="/"
//           className="hover:underline"
//         >
//           Home
//         </Link>

//         <FaChevronRight />

//         <Link
//           to="/tops"
//           className="hover:underline"
//         >
//           Tops
//         </Link>

//         <FaChevronRight />

//         <span className="text-gray-500">
//           {product.name}
//         </span>
//       </div>

//       {/* ================= PRODUCT SECTION ================= */}
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-10">

//         {/* ================= LEFT - IMAGES ================= */}
//         <div className="flex gap-4 w-full md:w-1/2">

//           {/* DESKTOP THUMBNAILS */}
//           <div className="hidden md:flex flex-col gap-3">
//             {images.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt={`${product.name} ${idx + 1}`}
//                 onClick={() => setCurrentImageIndex(idx)}
//                 className={`w-20 h-24 object-cover rounded-lg cursor-pointer border ${
//                   currentImageIndex === idx
//                     ? 'border-black'
//                     : 'border-transparent'
//                 }`}
//               />
//             ))}
//           </div>

//           {/* MAIN IMAGE */}
//           <div className="relative w-full h-100 md:h-125">

//             {/* WISHLIST */}
//             <button
//               onClick={handleWishlist}
//               aria-label="Add to wishlist"
//               className="absolute top-4 right-4 z-10 bg-white p-3 rounded-full shadow hover:scale-105 transition"
//             >
//               {isWishlisted(product.id) ? (
//                 <FaHeart className="text-red-500" />
//               ) : (
//                 <FaRegHeart />
//               )}
//             </button>

//             <img
//               src={images[currentImageIndex]}
//               className="w-full h-full object-cover rounded-xl"
//               alt={product.name}
//             />

//             {/* PREVIOUS */}
//             {images.length > 1 && (
//               <button
//                 onClick={handlePrev}
//                 aria-label="Previous image"
//                 className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
//               >
//                 <FaChevronLeft />
//               </button>
//             )}

//             {/* NEXT */}
//             {images.length > 1 && (
//               <button
//                 onClick={handleNext}
//                 aria-label="Next image"
//                 className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
//               >
//                 <FaChevronRight />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* ================= RIGHT - INFO ================= */}
//         <div className="flex-1 space-y-6">

//           {/* PRODUCT NAME */}
//           <h1 className="text-2xl md:text-3xl font-bold">
//             {product.name}
//           </h1>

//           {/* PRICE */}
//           <div className="text-2xl font-bold">
//             ₦{product.price.toLocaleString('en-NG')}
//           </div>

//           {/* QUANTITY */}
//           <div className="flex items-center gap-4">
//             <p className="font-semibold text-xl">
//               Quantity:
//             </p>

//             <button
//               onClick={() =>
//                 setQuantity((q) => Math.max(1, q - 1))
//               }
//               className="w-10 h-10 bg-gray-100 rounded hover:bg-gray-200 transition"
//             >
//               −
//             </button>

//             <span className="text-lg min-w-5 text-center">
//               {quantity}
//             </span>

//             <button
//               onClick={() =>
//                 setQuantity((q) => q + 1)
//               }
//               className="w-10 h-10 bg-gray-100 rounded hover:bg-gray-200 transition"
//             >
//               +
//             </button>
//           </div>

//           {/* SIZE */}
//           <div className="space-y-4">

//             <p className="font-semibold text-lg">
//               Select Size

//               {selectedSize && (
//                 <span className="ml-2 text-gray-500 font-normal">
//                   ({selectedSize})
//                 </span>
//               )}
//             </p>

//             <div className="flex flex-wrap gap-3">
//               {product.sizes?.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`min-w-13.75 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
//                     selectedSize === size
//                       ? 'bg-black text-white border-black'
//                       : 'bg-white text-black border-gray-300 hover:border-black hover:bg-gray-50'
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* SIZE CHART */}
//           <button
//             onClick={() => setShowSizeChart(true)}
//             className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition mt-2"
//           >
//             <img
//               src={sizechart}
//               alt="Size Guide"
//               className="w-50 h-15 object-contain"
//             />
//           </button>

//           {/* BUTTONS */}
//           <div className="flex flex-col md:flex-row gap-4">

//             <button
//               onClick={handleAddToCart}
//               className="w-full md:w-55 border border-black py-3 rounded-xl hover:bg-black hover:text-white transition"
//             >
//               Add to Cart
//             </button>

//             <button
//               className="w-full md:w-55 bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition"
//             >
//               Buy it now
//             </button>

//           </div>
//         </div>
//       </div>

//       {/* ================= YMAL ================= */}
//       {ymalProducts.length > 0 && (
//         <section className="max-w-7xl mx-auto mt-20 md:mt-28">

//           {/* YMAL HEADER */}
//           <div className="text-center mb-10">
//             <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">
//               Discover More
//             </p>

//             <h2 className="text-2xl md:text-3xl font-bold">
//               You May Also Like
//             </h2>
//           </div>

//           {/* PRODUCTS */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

//             {ymalProducts.map((item) => (
//               <Link
//                 key={item.id}
//                 to={`/tops/${item.id}`}
//                 className="group"
//               >

//                 {/* IMAGE */}
//                 <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-3/4">

//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
//                   />

//                   {item.hoverImage && (
//                     <img
//                       src={item.hoverImage}
//                       alt={`${item.name} alternate`}
//                       className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     />
//                   )}

//                   {/* WISHLIST */}
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();

//                       toggleWishlist({
//                         ...item,
//                         route: `/tops/${item.id}`,
//                       });
//                     }}
//                     className="absolute top-3 right-3 bg-white p-2.5 rounded-full shadow-sm z-10 hover:scale-105 transition"
//                   >
//                     {isWishlisted(item.id) ? (
//                       <FaHeart className="text-red-500 text-sm" />
//                     ) : (
//                       <FaRegHeart className="text-sm" />
//                     )}
//                   </button>

//                 </div>

//                 {/* PRODUCT INFO */}
//                 <div className="mt-3">

//                   <h3 className="font-medium text-sm md:text-base truncate">
//                     {item.name}
//                   </h3>

//                   <p className="font-semibold mt-1 text-sm md:text-base">
//                     ₦{item.price.toLocaleString('en-NG')}
//                   </p>

//                 </div>

//               </Link>
//             ))}

//           </div>
//         </section>
//       )}

//       {/* ================= SIZE CHART MODAL ================= */}
//       {showSizeChart && (
//         <div
//           className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
//           onClick={() => setShowSizeChart(false)}
//         >
//           <div
//             className="bg-white rounded-xl p-6 max-w-lg w-full relative"
//             onClick={(e) => e.stopPropagation()}
//           >

//             {/* CLOSE */}
//             <button
//               onClick={() => setShowSizeChart(false)}
//               className="absolute top-3 right-4 text-2xl font-extrabold hover:text-gray-500"
//               aria-label="Close size chart"
//             >
//               ×
//             </button>

//             <h2 className="text-xl font-bold mb-4">
//               Tops Size Guide
//             </h2>

//             <div className="overflow-x-auto">
//               <table className="w-full border">

//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border p-2">
//                       Size
//                     </th>

//                     <th className="border p-2">
//                       Chest
//                     </th>

//                     <th className="border p-2">
//                       Length
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   <tr>
//                     <td className="border p-2">S</td>
//                     <td className="border p-2">36-38</td>
//                     <td className="border p-2">27</td>
//                   </tr>

//                   <tr>
//                     <td className="border p-2">M</td>
//                     <td className="border p-2">38-40</td>
//                     <td className="border p-2">28</td>
//                   </tr>

//                   <tr>
//                     <td className="border p-2">L</td>
//                     <td className="border p-2">40-42</td>
//                     <td className="border p-2">29</td>
//                   </tr>

//                   <tr>
//                     <td className="border p-2">XL</td>
//                     <td className="border p-2">42-44</td>
//                     <td className="border p-2">30</td>
//                   </tr>

//                 </tbody>
//               </table>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default TopDetails;

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa6';

import { TopDatas } from '../../data/Tops.js';
import { useCart } from '../../Context/cartContext';
import { useWishlist } from '../../Context/WishlistContext';

import sizechart from '../../assets/images/sizechart.png';

function TopDetails() {
  const { id } = useParams();

  const product = TopDatas.find(
    (item) => String(item.id) === String(id)
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const { addToCart, setShowCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (!product) {
    return (
      <div className="text-black p-10">
        Product not found
      </div>
    );
  }

  const images = [
    product.image,
    ...(product.hoverImage ? [product.hoverImage] : []),
  ];

  /*
    ================================
    ADD TO CART
    ================================
    Save the correct Top detail-page
    route with the cart item.
  */
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size!');
      return;
    }

    addToCart(
      {
        ...product,
        route: `/tops/${product.id}`,
      },
      selectedSize,
      quantity
    );

    setShowCart(true);

    toast.success('Item added to cart!');
  };

  /*
    ================================
    WISHLIST
    ================================
  */
  const handleWishlist = () => {
    toggleWishlist({
      ...product,
      route: `/tops/${product.id}`,
    });
  };

  /*
    ================================
    IMAGE CONTROLS
    ================================
  */
  const handlePrev = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % images.length
    );
  };

  /*
    ================================
    YOU MAY ALSO LIKE
    ================================
  */
  const ymalProducts = TopDatas.filter(
    (item) => String(item.id) !== String(product.id)
  ).slice(0, 4);

  return (
    <div className="bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]">

      {/* ================= BREADCRUMB ================= */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mt-23 text-sm md:text-base">

        <Link
          to="/"
          className="hover:underline"
        >
          Home
        </Link>

        <FaChevronRight />

        <Link
          to="/tops"
          className="hover:underline"
        >
          Tops
        </Link>

        <FaChevronRight />

        <span className="text-gray-500">
          {product.name}
        </span>

      </div>

      {/* ================= PRODUCT SECTION ================= */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-10">

        {/* ================= LEFT - IMAGES ================= */}
        <div className="flex gap-4 w-full md:w-1/2">

          {/* DESKTOP THUMBNAILS */}
          {images.length > 1 && (
            <div className="hidden md:flex flex-col gap-3">

              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`rounded-lg border ${
                    currentImageIndex === idx
                      ? 'border-black'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-20 h-24 object-cover rounded-lg cursor-pointer"
                  />
                </button>
              ))}

            </div>
          )}

          {/* MAIN IMAGE */}
          <div className="relative w-full h-100 md:h-125">

            {/* WISHLIST */}
            <button
              type="button"
              onClick={handleWishlist}
              aria-label={
                isWishlisted(product.id)
                  ? 'Remove from wishlist'
                  : 'Add to wishlist'
              }
              className="absolute top-4 right-4 z-10 bg-white p-3 rounded-full shadow hover:scale-105 transition"
            >
              {isWishlisted(product.id) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart />
              )}
            </button>

            {/* MAIN PRODUCT IMAGE */}
            <img
              src={images[currentImageIndex]}
              className="w-full h-full object-cover rounded-xl"
              alt={product.name}
            />

            {/* IMAGE ARROWS */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                >
                  <FaChevronLeft />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                >
                  <FaChevronRight />
                </button>
              </>
            )}

          </div>
        </div>

        {/* ================= RIGHT - INFO ================= */}
        <div className="flex-1 space-y-6">

          {/* PRODUCT NAME */}
          <h1 className="text-2xl md:text-3xl font-bold">
            {product.name}
          </h1>

          {/* PRICE */}
          <div className="text-2xl font-bold">
            ₦{product.price.toLocaleString('en-NG')}
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-4">

            <p className="font-semibold text-xl">
              Quantity:
            </p>

            <button
              type="button"
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
              aria-label="Decrease quantity"
              className="w-10 h-10 bg-gray-100 rounded hover:bg-gray-200 transition"
            >
              −
            </button>

            <span className="text-lg min-w-5 text-center">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                setQuantity((q) => q + 1)
              }
              aria-label="Increase quantity"
              className="w-10 h-10 bg-gray-100 rounded hover:bg-gray-200 transition"
            >
              +
            </button>

          </div>

          {/* SIZE */}
          <div className="space-y-4">

            <p className="font-semibold text-lg">
              Select Size

              {selectedSize && (
                <span className="ml-2 text-gray-500 font-normal">
                  ({selectedSize})
                </span>
              )}
            </p>

            <div className="flex flex-wrap gap-3">

              {product.sizes?.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-13.75 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:border-black hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}

            </div>
          </div>

          {/* SIZE CHART */}
          <button
            type="button"
            onClick={() => setShowSizeChart(true)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition mt-2"
          >
            <img
              src={sizechart}
              alt="Size Guide"
              className="w-50 h-15 object-contain"
            />
          </button>

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4">

            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full md:w-55 border border-black py-3 rounded-xl hover:bg-black hover:text-white transition"
            >
              Add to Cart
            </button>

            <button
              type="button"
              className="w-full md:w-55 bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition"
            >
              Buy it now
            </button>

          </div>
        </div>
      </div>

      {/* ================= YMAL ================= */}
      {ymalProducts.length > 0 && (
        <section className="max-w-7xl mx-auto mt-20 md:mt-28">

          <div className="text-center mb-10">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">
              Discover More
            </p>

            <h2 className="text-2xl md:text-3xl font-bold">
              You May Also Like
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

            {ymalProducts.map((item) => (
              <Link
                key={item.id}
                to={`/tops/${item.id}`}
                className="group"
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-3/4">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />

                  {item.hoverImage && (
                    <img
                      src={item.hoverImage}
                      alt={`${item.name} alternate`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  )}

                  {/* WISHLIST */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      toggleWishlist({
                        ...item,
                        route: `/tops/${item.id}`,
                      });
                    }}
                    aria-label={
                      isWishlisted(item.id)
                        ? 'Remove from wishlist'
                        : 'Add to wishlist'
                    }
                    className="absolute top-3 right-3 bg-white p-2.5 rounded-full shadow-sm z-10 hover:scale-105 transition"
                  >
                    {isWishlisted(item.id) ? (
                      <FaHeart className="text-red-500 text-sm" />
                    ) : (
                      <FaRegHeart className="text-sm" />
                    )}
                  </button>

                </div>

                {/* PRODUCT INFO */}
                <div className="mt-3">

                  <h3 className="font-medium text-sm md:text-base truncate">
                    {item.name}
                  </h3>

                  <p className="font-semibold mt-1 text-sm md:text-base">
                    ₦{item.price.toLocaleString('en-NG')}
                  </p>

                </div>

              </Link>
            ))}

          </div>
        </section>
      )}

      {/* ================= SIZE CHART MODAL ================= */}
      {showSizeChart && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          onClick={() => setShowSizeChart(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setShowSizeChart(false)}
              className="absolute top-3 right-4 text-2xl font-extrabold hover:text-gray-500"
              aria-label="Close size chart"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">
              Tops Size Guide
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full border">

                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">
                      Size
                    </th>

                    <th className="border p-2">
                      Chest
                    </th>

                    <th className="border p-2">
                      Length
                    </th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td className="border p-2">S</td>
                    <td className="border p-2">36-38</td>
                    <td className="border p-2">27</td>
                  </tr>

                  <tr>
                    <td className="border p-2">M</td>
                    <td className="border p-2">38-40</td>
                    <td className="border p-2">28</td>
                  </tr>

                  <tr>
                    <td className="border p-2">L</td>
                    <td className="border p-2">40-42</td>
                    <td className="border p-2">29</td>
                  </tr>

                  <tr>
                    <td className="border p-2">XL</td>
                    <td className="border p-2">42-44</td>
                    <td className="border p-2">30</td>
                  </tr>

                </tbody>

              </table>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default TopDetails;