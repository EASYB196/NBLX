// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// import { useParams, Link } from 'react-router-dom';
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaHeart,
//   FaRegHeart,
// } from 'react-icons/fa6';

// import YouMayAlsoLike from '../../components/YouMayAlsoLike';

// import { PantsDatas } from '../../data/PantsData.js';
// import { BestSellerData } from '../../data/BestSellerData';
// import { TshirtDatas } from '../../data/TshirtData';
// import { DenimJeansDatas } from '../../data/DenimJeanData.js';
// import { OuterwearJacketsDatas } from '../../data/OuterwearJacketsData.js';
// import { FemalePantDatas } from '../../data/FemalePant.js';
// import { TopDatas } from '../../data/Tops.js';
// import { SkirtsDatas } from '../../data/SkirtsData.js';
// import { DressesDatas } from '../../data/DressesData.js';
// import { AccessoriesDatas } from '../../data/AccessoriesData.js';
// import { CropTopDatas } from '../../data/CropTop.js';
// import {HoodiesSweatshirtsDatas} from "../../data/HoodiesSweatshirtsData.js"
// import { useCart } from '../../Context/cartContext';
// import { useWishlist } from '../../Context/WishlistContext';

// import sizechart from '../../assets/images/sizechart.png';

// function HoodiesSweatshirtsDetails() {
//   const { id } = useParams();

//   const product = HoodiesSweatshirtsDatas.find(
//     (item) => String(item.id) === String(id)
//   );
// const allProducts = [
//   ...AccessoriesDatas.map((item) => ({ ...item, route: `/accessories/${item.id}` })),
//   ...PantsDatas.map((item) => ({ ...item, route: `/pants/${item.id}` })),
//   ...BestSellerData.map((item) => ({ ...item, route: `/bestseller/products/${item.id}` })),
//   ...TshirtDatas.map((item) => ({ ...item, route: `/t-shirt/${item.id}` })),
//   ...DenimJeansDatas.map((item) => ({ ...item, route: `/denim-jeans/${item.id}` })),
//   ...FemalePantDatas.map((item) => ({ ...item, route: `/female-pant/${item.id}` })),
//   ...TopDatas.map((item) => ({ ...item, route: `/tops/${item.id}` })),
//   ...OuterwearJacketsDatas.map((item) => ({ ...item, route: `/Outerwear-Jackets/${item.id}` })),
//   ...SkirtsDatas.map((item) => ({ ...item, route: `/skirts/${item.id}` })),
//   ...DressesDatas.map((item) => ({ ...item, route: `/dresses/${item.id}` })),
//   ...CropTopDatas.map((item) => ({ ...item, route: `/crop-top/${item.id}` })),
//   ...HoodiesSweatshirtsDatas.map((item) => ({ ...item, route: `/Hoodies-Sweatshirts/${item.id}` })),
// ];

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

//   /*
//    * IMPORTANT:
//    * Give this product its correct detail-page route.
//    *
//    * This route is used by:
//    * - Cart drawer
//    * - Wishlist
//    * - YouMayAlsoLike
//    */
//   const productWithRoute = {
//     ...product,
//     route: `/Hoodies-Sweatshirts/${product.id}`,
//   };

//   const images = [
//     product.image,
//     ...(product.hoverImage ? [product.hoverImage] : []),
//   ];

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

//     /*
//      * Store the correct hoodie detail route
//      * inside the cart item.
//      */
//     addToCart(
//       productWithRoute,
//       selectedSize,
//       quantity
//     );

//     setShowCart(true);

//     toast.success('Item added to cart!');
//   };

//   const handleWishlist = () => {
//     toggleWishlist(productWithRoute);
//   };

//   return (
//     <div className="bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]">

//       {/* ==================== BREADCRUMB ==================== */}
//       <div className="flex items-center justify-center gap-2 md:gap-4 mt-23 text-sm md:text-base">

//         <Link
//           to="/"
//           className="hover:underline"
//         >
//           Home
//         </Link>

//         <FaChevronRight />

//         <Link
//           to="/Hoodies-Sweatshirts"
//           className="hover:underline"
//         >
//           Hoodies-Sweatshirts
//         </Link>

//         <FaChevronRight />

//         <span className="text-gray-500">
//           {product.name}
//         </span>
//       </div>

//       {/* ==================== PRODUCT SECTION ==================== */}
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-10">

//         {/* ==================== LEFT - IMAGES ==================== */}
//         <div className="flex gap-4 w-full md:w-1/2">

//           {/* DESKTOP THUMBNAILS */}
//           {images.length > 1 && (
//             <div className="hidden md:flex flex-col gap-3">
//               {images.map((img, idx) => (
//                 <button
//                   key={idx}
//                   type="button"
//                   onClick={() => setCurrentImageIndex(idx)}
//                   className={`rounded-lg border ${
//                     currentImageIndex === idx
//                       ? 'border-black'
//                       : 'border-transparent'
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt={`${product.name} ${idx + 1}`}
//                     className="w-20 h-24 object-cover rounded-lg cursor-pointer"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* MAIN IMAGE */}
//           <div className="relative w-full h-100 md:h-125">

//             {/* WISHLIST */}
//             <button
//               type="button"
//               onClick={handleWishlist}
//               aria-label={
//                 isWishlisted(product.id)
//                   ? 'Remove from wishlist'
//                   : 'Add to wishlist'
//               }
//               className="absolute top-4 right-4 z-10 bg-white p-3 rounded-full shadow hover:scale-105 transition"
//             >
//               {isWishlisted(product.id) ? (
//                 <FaHeart className="text-red-500" />
//               ) : (
//                 <FaRegHeart />
//               )}
//             </button>

//             {/* MAIN PRODUCT IMAGE */}
//             <img
//               src={images[currentImageIndex]}
//               className="w-full h-full object-cover rounded-xl"
//               alt={product.name}
//             />

//             {/* IMAGE ARROWS */}
//             {images.length > 1 && (
//               <>
//                 <button
//                   type="button"
//                   onClick={handlePrev}
//                   aria-label="Previous image"
//                   className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
//                 >
//                   <FaChevronLeft />
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleNext}
//                   aria-label="Next image"
//                   className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
//                 >
//                   <FaChevronRight />
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* ==================== RIGHT - PRODUCT INFO ==================== */}
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
//               type="button"
//               onClick={() =>
//                 setQuantity((q) => Math.max(1, q - 1))
//               }
//               aria-label="Decrease quantity"
//               className="w-10 h-10 bg-gray-100 rounded hover:bg-gray-200 transition"
//             >
//               −
//             </button>

//             <span className="text-lg min-w-5 text-center">
//               {quantity}
//             </span>

//             <button
//               type="button"
//               onClick={() =>
//                 setQuantity((q) => q + 1)
//               }
//               aria-label="Increase quantity"
//               className="w-10 h-10 bg-gray-100 rounded hover:bg-gray-200 transition"
//             >
//               +
//             </button>
//           </div>

//           {/* SIZE */}
//           <div>
//             <p className="mb-3 font-semibold text-lg">
//               Select Size:{' '}
//               {selectedSize && (
//                 <span className="text-gray-600 font-normal">
//                   {selectedSize}
//                 </span>
//               )}
//             </p>

//             <div className="flex flex-wrap gap-2">
//               {product.sizes.map((size) => (
//                 <button
//                   key={size}
//                   type="button"
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-4 py-2 border rounded-lg transition ${
//                     selectedSize === size
//                       ? 'bg-black text-white border-black'
//                       : 'bg-white text-black border-gray-300 hover:bg-gray-200 hover:border-black'
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* SIZE CHART */}
//           <button
//             type="button"
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
//               type="button"
//               onClick={handleAddToCart}
//               className="w-full md:w-55 border py-3 rounded-xl hover:bg-black hover:text-white transition"
//             >
//               Add to Cart
//             </button>

//             <button
//               type="button"
//               className="w-full md:w-55 bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition"
//             >
//               Buy it now
//             </button>

//           </div>
//         </div>
//       </div>

//       {/* ==================== SIZE CHART MODAL ==================== */}
//       {showSizeChart && (
//         <div
//           className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
//           onClick={() => setShowSizeChart(false)}
//         >
//           <div
//             className="bg-white rounded-xl p-6 max-w-xl w-full relative max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >

//             <button
//               type="button"
//               onClick={() => setShowSizeChart(false)}
//               aria-label="Close size chart"
//               className="absolute top-3 right-4 text-2xl font-extrabold text-black hover:text-gray-500 transition"
//             >
//               ×
//             </button>

//             <h2 className="text-xl font-bold mb-4 text-black pr-8">
//               Hoodies & Sweatshirts Size Guide
//             </h2>

//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse border text-black">

//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border p-3">Size</th>
//                     <th className="border p-3">Chest (in)</th>
//                     <th className="border p-3">Shoulder (in)</th>
//                     <th className="border p-3">Sleeve (in)</th>
//                     <th className="border p-3">Length (in)</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   <tr>
//                     <td className="border p-3">S</td>
//                     <td className="border p-3">36-38</td>
//                     <td className="border p-3">17</td>
//                     <td className="border p-3">24</td>
//                     <td className="border p-3">26</td>
//                   </tr>

//                   <tr>
//                     <td className="border p-3">M</td>
//                     <td className="border p-3">39-41</td>
//                     <td className="border p-3">18</td>
//                     <td className="border p-3">25</td>
//                     <td className="border p-3">27</td>
//                   </tr>

//                   <tr>
//                     <td className="border p-3">L</td>
//                     <td className="border p-3">42-44</td>
//                     <td className="border p-3">19</td>
//                     <td className="border p-3">26</td>
//                     <td className="border p-3">28</td>
//                   </tr>

//                   <tr>
//                     <td className="border p-3">XL</td>
//                     <td className="border p-3">45-47</td>
//                     <td className="border p-3">20</td>
//                     <td className="border p-3">27</td>
//                     <td className="border p-3">29</td>
//                   </tr>

//                   <tr>
//                     <td className="border p-3">XXL</td>
//                     <td className="border p-3">48-50</td>
//                     <td className="border p-3">21</td>
//                     <td className="border p-3">28</td>
//                     <td className="border p-3">30</td>
//                   </tr>
//                 </tbody>

//               </table>
//             </div>

//             <p className="text-xs text-gray-500 mt-4">
//               Measurements are approximate and may vary slightly
//               depending on design and fit.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* ==================== YOU MAY ALSO LIKE ==================== */}
//       <YouMayAlsoLike
//         products={allProducts}
//         currentProductId={product.id}
//       />

//     </div>
//   );
// }

// export default HoodiesSweatshirtsDetails;

import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';

import YouMayAlsoLike from '../../components/YouMayAlsoLike';

import { PantsDatas } from '../../data/PantsData.js';
import { BestSellerData } from '../../data/BestSellerData';
import { TshirtDatas } from '../../data/TshirtData';
import { DenimJeansDatas } from '../../data/DenimJeanData.js';
import { OuterwearJacketsDatas } from '../../data/OuterwearJacketsData.js';
import { FemalePantDatas } from '../../data/FemalePant.js';
import { TopDatas } from '../../data/Tops.js';
import { SkirtsDatas } from '../../data/SkirtsData.js';
import { DressesDatas } from '../../data/DressesData.js';
import { AccessoriesDatas } from '../../data/AccessoriesData.js';
import { CropTopDatas } from '../../data/CropTop.js';
import { HoodiesSweatshirtsDatas } from '../../data/HoodiesSweatshirtsData.js';

import { useCart } from '../../Context/cartContext';
import { useWishlist } from '../../Context/WishlistContext';

import sizechart from '../../assets/images/sizechart.png';

function HoodiesSweatshirtsDetails() {
  const { id } = useParams();

  const [hoodieType, setHoodieType] = useState('standard'); // 'standard' | 'armless'

  const product = HoodiesSweatshirtsDatas.find((item) => String(item.id) === String(id));

  const allProducts = [
    ...AccessoriesDatas.map((item) => ({
      ...item,
      route: `/accessories/${item.id}`,
    })),
    ...PantsDatas.map((item) => ({
      ...item,
      route: `/pants/${item.id}`,
    })),
    ...BestSellerData.map((item) => ({
      ...item,
      route: `/bestseller/products/${item.id}`,
    })),
    ...TshirtDatas.map((item) => ({
      ...item,
      route: `/t-shirt/${item.id}`,
    })),
    ...DenimJeansDatas.map((item) => ({
      ...item,
      route: `/denim-jeans/${item.id}`,
    })),
    ...FemalePantDatas.map((item) => ({
      ...item,
      route: `/female-pant/${item.id}`,
    })),
    ...TopDatas.map((item) => ({
      ...item,
      route: `/tops/${item.id}`,
    })),
    ...OuterwearJacketsDatas.map((item) => ({
      ...item,
      route: `/Outerwear-Jackets/${item.id}`,
    })),
    ...SkirtsDatas.map((item) => ({
      ...item,
      route: `/skirts/${item.id}`,
    })),
    ...DressesDatas.map((item) => ({
      ...item,
      route: `/dresses/${item.id}`,
    })),
    ...CropTopDatas.map((item) => ({
      ...item,
      route: `/crop-top/${item.id}`,
    })),
    ...HoodiesSweatshirtsDatas.map((item) => ({
      ...item,
      route: `/Hoodies-Sweatshirts/${item.id}`,
    })),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const { addToCart, setShowCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  /* ==================== DEFAULT COLOR ==================== */

  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0].name);
    } else {
      setSelectedColor('Default');
    }

    setCurrentImageIndex(0);
  }, [product]);

  /* ==================== SELECTED COLOR ==================== */

  const selectedColorVariant = useMemo(() => {
    if (!product?.colors?.length) return null;

    return product.colors.find((color) => color.name === selectedColor) || product.colors[0];
  }, [product, selectedColor]);

  /* ==================== PRODUCT IMAGES ==================== */

  const images = useMemo(() => {
    if (selectedColorVariant?.images?.length) {
      return selectedColorVariant.images;
    }

    return [product?.image, ...(product?.hoverImage ? [product.hoverImage] : [])].filter(
      Boolean,
    );
  }, [product, selectedColorVariant]);

  /* ==================== RESET IMAGE ==================== */

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColor]);

  if (!product) {
    return <div className='text-black p-10'>Product not found</div>;
  }

  /*
   * IMPORTANT:
   * Give this product its correct detail-page route.
   *
   * This route is used by:
   * - Cart drawer
   * - Wishlist
   * - YouMayAlsoLike
   */
  const productWithRoute = {
    ...product,
    route: `/Hoodies-Sweatshirts/${product.id}`,
    selectedColor: selectedColor || 'Default',
    images,
    image: images[0],
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  /* ==================== COLOR CHANGE ==================== */

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
    setCurrentImageIndex(0);
  };

  /* ==================== ADD TO CART ==================== */

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size!');
      return;
    }

    const cartProduct = {
      ...product,
      route: `/Hoodies-Sweatshirts/${product.id}`,
      selectedColor: selectedColor || 'Default',
      image: images[currentImageIndex],
      images,
    };

    addToCart(cartProduct, selectedSize, quantity, selectedColor || 'Default');

    setShowCart(true);

    toast.success('Item added to cart!');
  };

  /* ==================== WISHLIST ==================== */

  const handleWishlist = () => {
    toggleWishlist(productWithRoute);
  };

  return (
    <div className='bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]'>
      {/* ==================== BREADCRUMB ==================== */}
      <div className='flex items-center justify-center gap-2 md:gap-4 mt-23 text-sm md:text-base'>
        <Link to='/' className='hover:underline'>
          Home
        </Link>

        <FaChevronRight />

        <Link to='/Hoodies-Sweatshirts' className='hover:underline'>
          Hoodies-Sweatshirts
        </Link>

        <FaChevronRight />

        <span className='text-gray-500'>{product.name}</span>
      </div>

      {/* ==================== PRODUCT SECTION ==================== */}
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-10'>
        {/* ==================== LEFT - IMAGES ==================== */}
        <div className='flex gap-4 w-full md:w-1/2'>
          {/* DESKTOP THUMBNAILS */}
          {images.length > 1 && (
            <div className='hidden md:flex flex-col gap-3'>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type='button'
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`rounded-lg border ${
                    currentImageIndex === idx ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className='w-20 h-24 object-cover rounded-lg cursor-pointer'
                  />
                </button>
              ))}
            </div>
          )}

          {/* MAIN IMAGE */}
          <div className='relative w-full h-100 md:h-125'>
            {/* WISHLIST */}
            <button
              type='button'
              onClick={handleWishlist}
              aria-label={
                isWishlisted(product.id, selectedColor || 'Default')
                  ? 'Remove from wishlist'
                  : 'Add to wishlist'
              }
              className='absolute top-4 right-4 z-10 bg-white p-3 rounded-full shadow hover:scale-105 transition'
            >
              {isWishlisted(product.id, selectedColor || 'Default') ? (
                <FaHeart className='text-red-500' />
              ) : (
                <FaRegHeart />
              )}
            </button>

            {/* MAIN PRODUCT IMAGE */}
            <img
              src={images[currentImageIndex]}
              className='w-full h-full object-cover rounded-xl'
              alt={product.name}
            />

            {/* IMAGE ARROWS */}
            {images.length > 1 && (
              <>
                <button
                  type='button'
                  onClick={handlePrev}
                  aria-label='Previous image'
                  className='absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition'
                >
                  <FaChevronLeft />
                </button>

                <button
                  type='button'
                  onClick={handleNext}
                  aria-label='Next image'
                  className='absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition'
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
        </div>

        {/* ==================== RIGHT - PRODUCT INFO ==================== */}
        <div className='flex-1 space-y-6'>
          {/* PRODUCT NAME */}
          <h1 className='text-2xl md:text-3xl font-bold'>{product.name}</h1>

          {/* PRICE */}
          <div className='text-2xl font-bold'>₦{product.price.toLocaleString('en-NG')}</div>

          {/* COLOR */}
          {product.colors?.length > 0 && (
            <div>
              <p className='mb-3 font-semibold text-lg'>
                Color:{' '}
                {selectedColor && (
                  <span className='text-gray-600 font-normal'>{selectedColor}</span>
                )}
              </p>

              <div className='flex flex-wrap gap-3'>
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type='button'
                    onClick={() => handleColorChange(color.name)}
                    aria-label={`Select ${color.name}`}
                    title={color.name}
                    className={`w-8 h-8 rounded-full border-2 transition ${
                      selectedColor === color.name
                        ? 'border-black scale-110'
                        : 'border-gray-300 hover:border-black'
                    }`}
                    style={{
                      backgroundColor: color.value,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
          <div className='flex items-center gap-4'>
            <p className='font-semibold text-xl'>Quantity:</p>

            <button
              type='button'
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label='Decrease quantity'
              className='w-10 h-10 bg-gray-100 rounded hover:bg-gray-200 transition'
            >
              −
            </button>

            <span className='text-lg min-w-5 text-center'>{quantity}</span>

            <button
              type='button'
              onClick={() => setQuantity((q) => q + 1)}
              aria-label='Increase quantity'
              className='w-10 h-10 bg-gray-100 rounded hover:bg-gray-200 transition'
            >
              +
            </button>
          </div>

          {/* SIZE */}
          <div>
            <p className='mb-3 font-semibold text-lg'>
              Select Size:{' '}
              {selectedSize && (
                <span className='text-gray-600 font-normal'>{selectedSize}</span>
              )}
            </p>

            <div className='flex flex-wrap gap-2'>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type='button'
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg transition ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:bg-gray-200 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE CHART */}
          <button
            type='button'
            onClick={() => setShowSizeChart(true)}
            className='flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition mt-2'
          >
            <img src={sizechart} alt='Size Guide' className='w-50 h-15 object-contain' />
          </button>

          {/* BUTTONS */}
          <div className='flex flex-col md:flex-row gap-4'>
            <button
              type='button'
              onClick={handleAddToCart}
              className='w-full md:w-55 border py-3 rounded-xl hover:bg-black hover:text-white transition'
            >
              Add to Cart
            </button>

            <button
              type='button'
              className='w-full md:w-55 bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition'
            >
              Buy it now
            </button>
          </div>
        </div>
      </div>

      {/* ==================== SIZE CHART MODAL ==================== */}
      {/* {showSizeChart && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          onClick={() => setShowSizeChart(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-xl w-full relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              onClick={() => setShowSizeChart(false)}
              aria-label="Close size chart"
              className="absolute top-3 right-4 text-2xl font-extrabold text-black hover:text-gray-500 transition"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 text-black pr-8">
              Hoodies & Sweatshirts Size Guide
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border text-black">

                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3">Size</th>
                    <th className="border p-3">Chest (in)</th>
                    <th className="border p-3">Shoulder (in)</th>
                    <th className="border p-3">Sleeve (in)</th>
                    <th className="border p-3">Length (in)</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="border p-3">S</td>
                    <td className="border p-3">36-38</td>
                    <td className="border p-3">17</td>
                    <td className="border p-3">24</td>
                    <td className="border p-3">26</td>
                  </tr>

                  <tr>
                    <td className="border p-3">M</td>
                    <td className="border p-3">39-41</td>
                    <td className="border p-3">18</td>
                    <td className="border p-3">25</td>
                    <td className="border p-3">27</td>
                  </tr>

                  <tr>
                    <td className="border p-3">L</td>
                    <td className="border p-3">42-44</td>
                    <td className="border p-3">19</td>
                    <td className="border p-3">26</td>
                    <td className="border p-3">28</td>
                  </tr>

                  <tr>
                    <td className="border p-3">XL</td>
                    <td className="border p-3">45-47</td>
                    <td className="border p-3">20</td>
                    <td className="border p-3">27</td>
                    <td className="border p-3">29</td>
                  </tr>

                  <tr>
                    <td className="border p-3">XXL</td>
                    <td className="border p-3">48-50</td>
                    <td className="border p-3">21</td>
                    <td className="border p-3">28</td>
                    <td className="border p-3">30</td>
                  </tr>
                </tbody>

              </table>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Measurements are approximate and may vary slightly
              depending on design and fit.
            </p>
          </div>
        </div>
      )} */}

      {showSizeChart && (
        <div
          className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4'
          onClick={() => setShowSizeChart(false)}
        >
          <div
            className='bg-white rounded-xl p-6 max-w-xl w-full relative max-h-[90vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type='button'
              onClick={() => setShowSizeChart(false)}
              aria-label='Close size chart'
              className='absolute top-3 right-4 text-2xl font-extrabold text-black hover:text-gray-500 transition'
            >
              ×
            </button>

            <h2 className='text-xl font-bold mb-4 text-black pr-8'>
              Hoodies & Sweatshirts Size Guide
            </h2>

            {/* Style Selector Tabs */}
            <div className='flex border-b border-gray-200 mb-4 text-sm font-medium'>
              <button
                type='button'
                onClick={() => setHoodieType('standard')}
                className={`pb-2 px-4 border-b-2 transition-colors ${
                  hoodieType === 'standard'
                    ? 'border-black text-black font-semibold'
                    : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                Standard Hoodie
              </button>
              <button
                type='button'
                onClick={() => setHoodieType('armless')}
                className={`pb-2 px-4 border-b-2 transition-colors ${
                  hoodieType === 'armless'
                    ? 'border-black text-black font-semibold'
                    : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                Armless / Sleeveless
              </button>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full border-collapse border text-black text-left'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border p-3'>Size</th>
                    <th className='border p-3'>Chest (in)</th>
                    <th className='border p-3'>Shoulder (in)</th>
                    {hoodieType === 'standard' ? (
                      <th className='border p-3'>Sleeve (in)</th>
                    ) : (
                      <th className='border p-3'>Armhole (in)</th>
                    )}
                    <th className='border p-3'>Length (in)</th>
                  </tr>
                </thead>

                <tbody>
                  {hoodieType === 'standard' ? (
                    <>
                      <tr>
                        <td className='border p-3'>S</td>
                        <td className='border p-3'>36-38</td>
                        <td className='border p-3'>17</td>
                        <td className='border p-3'>24</td>
                        <td className='border p-3'>26</td>
                      </tr>
                      <tr>
                        <td className='border p-3'>M</td>
                        <td className='border p-3'>39-41</td>
                        <td className='border p-3'>18</td>
                        <td className='border p-3'>25</td>
                        <td className='border p-3'>27</td>
                      </tr>
                      <tr>
                        <td className='border p-3'>L</td>
                        <td className='border p-3'>42-44</td>
                        <td className='border p-3'>19</td>
                        <td className='border p-3'>26</td>
                        <td className='border p-3'>28</td>
                      </tr>
                      <tr>
                        <td className='border p-3'>XL</td>
                        <td className='border p-3'>45-47</td>
                        <td className='border p-3'>20</td>
                        <td className='border p-3'>27</td>
                        <td className='border p-3'>29</td>
                      </tr>
                      <tr>
                        <td className='border p-3'>XXL</td>
                        <td className='border p-3'>48-50</td>
                        <td className='border p-3'>21</td>
                        <td className='border p-3'>28</td>
                        <td className='border p-3'>30</td>
                      </tr>
                      <tr>
                        <td className='border p-3'>3XL</td>
                        <td className='border p-3'>51-53</td>
                        <td className='border p-3'>22</td>
                        <td className='border p-3'>29</td>
                        <td className='border p-3'>31</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td className='border p-3'>S</td>
                        <td className='border p-3'>36-38</td>
                        <td className='border p-3'>16</td>
                        <td className='border p-3'>9</td>
                        <td className='border p-3'>26</td>
                      </tr>
                      <tr>
                        <td className='border p-3'>M</td>
                        <td className='border p-3'>39-41</td>
                        <td className='border p-3'>17</td>
                        <td className='border p-3'>9.5</td>
                        <td className='border p-3'>27</td>
                      </tr>
                      <tr>
                        <td className='border p-3'>L</td>
                        <td className='border p-3'>42-44</td>
                        <td className='border p-3'>18</td>
                        <td className='border p-3'>10</td>
                        <td className='border p-3'>28</td>
                      </tr>
                      <tr>
                        <td className='border p-3'>XL</td>
                        <td className='border p-3'>45-47</td>
                        <td className='border p-3'>19</td>
                        <td className='border p-3'>10.5</td>
                        <td className='border p-3'>29</td>
                      </tr>
                      <tr>
                        <td className='border p-3'>XXL</td>
                        <td className='border p-3'>48-50</td>
                        <td className='border p-3'>20</td>
                        <td className='border p-3'>11</td>
                        <td className='border p-3'>30</td>
                      </tr>
                      <tr>
                        <td className='border p-3'>3XL</td>
                        <td className='border p-3'>51-53</td>
                        <td className='border p-3'>21</td>
                        <td className='border p-3'>11.5</td>
                        <td className='border p-3'>31</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            <p className='text-xs text-gray-500 mt-4'>
              Measurements are approximate and may vary slightly depending on design and fit.
            </p>
          </div>
        </div>
      )}

      {/* ==================== YOU MAY ALSO LIKE ==================== */}
      <YouMayAlsoLike products={allProducts} currentProductId={product.id} />
    </div>
  );
}

export default HoodiesSweatshirtsDetails;
