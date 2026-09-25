
// import React, { useEffect, useMemo, useState } from 'react';
// import toast from 'react-hot-toast';
// import { useParams, Link } from 'react-router-dom';
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaHeart,
//   FaRegHeart,
// } from 'react-icons/fa6';

// import YouMayAlsoLike from '../../components/YouMayAlsoLike';

// import { PantsDatas } from '../../data/PantsData';
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

// import { useCart } from '../../Context/cartContext';
// import { useWishlist } from '../../Context/WishlistContext';

// import sizechart from '../../assets/images/sizechart.png';

// function PantsDetails() {
//   const { id } = useParams();

//   const product = PantsDatas.find(
//     (item) => String(item.id) === String(id),
//   );

//   const allProducts = [
//     ...AccessoriesDatas.map((item) => ({
//       ...item,
//       route: `/accessories/${item.id}`,
//     })),

//     ...PantsDatas.map((item) => ({
//       ...item,
//       route: `/pants/${item.id}`,
//     })),

//     ...BestSellerData.map((item) => ({
//       ...item,
//       route: `/bestseller/products/${item.id}`,
//     })),

//     ...TshirtDatas.map((item) => ({
//       ...item,
//       route: `/t-shirt/${item.id}`,
//     })),

//     ...DenimJeansDatas.map((item) => ({
//       ...item,
//       route: `/denim-jeans/${item.id}`,
//     })),

//     ...FemalePantDatas.map((item) => ({
//       ...item,
//       route: `/female-pant/${item.id}`,
//     })),

//     ...TopDatas.map((item) => ({
//       ...item,
//       route: `/tops/${item.id}`,
//     })),

//     ...OuterwearJacketsDatas.map((item) => ({
//       ...item,
//       route: `/Outerwear-Jackets/${item.id}`,
//     })),

//     ...SkirtsDatas.map((item) => ({
//       ...item,
//       route: `/skirts/${item.id}`,
//     })),

//     ...DressesDatas.map((item) => ({
//       ...item,
//       route: `/dresses/${item.id}`,
//     })),

//     ...CropTopDatas.map((item) => ({
//       ...item,
//       route: `/crop-top/${item.id}`,
//     })),
//   ];

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [showSizeChart, setShowSizeChart] = useState(false);

//   const { addToCart, setShowCart } = useCart();
//   const { toggleWishlist, isWishlisted } = useWishlist();

//   /*
//    * Set the first available color as the default.
//    * Products without color variants use Default.
//    */
//   useEffect(() => {
//     if (product?.colors?.length > 0) {
//       setSelectedColor(product.colors[0].name);
//     } else {
//       setSelectedColor('Default');
//     }

//     setCurrentImageIndex(0);
//     setSelectedSize('');
//     setQuantity(1);
//   }, [product]);

//   /*
//    * Get the currently selected color variant.
//    */
//   const selectedColorVariant = useMemo(() => {
//     if (!product?.colors?.length) {
//       return null;
//     }

//     return (
//       product.colors.find(
//         (color) => color.name === selectedColor,
//       ) || product.colors[0]
//     );
//   }, [product, selectedColor]);

//   /*
//    * Gallery changes according to the selected color.
//    */
//   const images = useMemo(() => {
//     if (selectedColorVariant?.images?.length) {
//       return selectedColorVariant.images;
//     }

//     return [
//       product?.image,
//       ...(product?.hoverImage ? [product.hoverImage] : []),
//     ].filter(Boolean);
//   }, [product, selectedColorVariant]);

//   /*
//    * Reset gallery whenever color changes.
//    */
//   useEffect(() => {
//     setCurrentImageIndex(0);
//   }, [selectedColor]);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4 text-black">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-3">
//             Product not found
//           </h1>

//           <Link
//             to="/Pants"
//             className="inline-block bg-black text-white px-6 py-3 rounded-xl"
//           >
//             Back to Pants
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const handlePrev = () => {
//     if (images.length <= 1) return;

//     setCurrentImageIndex(
//       (prev) => (prev - 1 + images.length) % images.length,
//     );
//   };

//   const handleNext = () => {
//     if (images.length <= 1) return;

//     setCurrentImageIndex(
//       (prev) => (prev + 1) % images.length,
//     );
//   };

//   const handleColorChange = (colorName) => {
//     setSelectedColor(colorName);
//     setCurrentImageIndex(0);
//   };

//   const handleWishlist = () => {
//     toggleWishlist({
//       ...product,
//       route: `/pants/${product.id}`,
//       selectedColor: selectedColor || 'Default',
//       images,
//       image: images[0],
//     });
//   };

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       toast.error('Please select a size!');
//       return;
//     }

//     const cartProduct = {
//       ...product,
//       route: `/pants/${product.id}`,
//       selectedColor: selectedColor || 'Default',
//       image: images[currentImageIndex],
//       images,
//     };

//     addToCart(
//       cartProduct,
//       selectedSize,
//       quantity,
//       selectedColor || 'Default',
//     );

//     setShowCart(true);

//     toast.success('Item added to cart!');
//   };

//   return (
//     <div className="bg-white text-black min-h-screen py-8 sm:py-10 px-4 sm:px-6 md:px-10 font-[Raleway] overflow-x-hidden">
//       {/* BREADCRUMB */}
//       <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-16 sm:mt-20 md:mt-23 text-xs sm:text-sm md:text-base text-center">
//         <Link
//           to="/"
//           className="hover:underline whitespace-nowrap"
//         >
//           Home
//         </Link>

//         <FaChevronRight className="text-xs shrink-0" />

//         <Link
//           to="/Pants"
//           className="hover:underline whitespace-nowrap"
//         >
//           Pants
//         </Link>

//         <FaChevronRight className="text-xs shrink-0" />

//         <span className="text-gray-500 truncate max-w-35 sm:max-w-none">
//           {product.name}
//         </span>
//       </div>

//       {/* MAIN PRODUCT SECTION */}
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-10 mt-8 sm:mt-10">
//         {/* LEFT - IMAGES */}
//         <div className="w-full md:w-1/2 min-w-0">
//           <div className="flex flex-col-reverse md:flex-row gap-3 sm:gap-4 w-full">
//             {/* THUMBNAILS */}
//             <div className="flex md:flex-col gap-2 sm:gap-3 overflow-x-auto md:overflow-visible w-full md:w-auto pb-1 md:pb-0">
//               {images.map((img, idx) => (
//                 <button
//                   key={`${img}-${idx}`}
//                   type="button"
//                   onClick={() => setCurrentImageIndex(idx)}
//                   className={`shrink-0 rounded-lg border-2 overflow-hidden transition-all ${
//                     currentImageIndex === idx
//                       ? 'border-black'
//                       : 'border-transparent'
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt={`${product.name} ${idx + 1}`}
//                     className="w-16 h-20 sm:w-18 sm:h-22 md:w-20 md:h-24 object-cover"
//                   />
//                 </button>
//               ))}
//             </div>

//             {/* MAIN IMAGE */}
//             <div className="relative w-full min-w-0 aspect-square sm:aspect-4/5 md:aspect-auto md:h-125">
//               {/* WISHLIST */}
//               <button
//                 type="button"
//                 onClick={handleWishlist}
//                 aria-label="Add to wishlist"
//                 className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white p-2.5 sm:p-3 rounded-full shadow-md hover:scale-105 transition-transform"
//               >
//                 {isWishlisted(
//                   product.id,
//                   selectedColor || 'Default',
//                 ) ? (
//                   <FaHeart className="text-red-500 text-base sm:text-lg" />
//                 ) : (
//                   <FaRegHeart className="text-base sm:text-lg" />
//                 )}
//               </button>

//               <img
//                 src={images[currentImageIndex]}
//                 className="w-full h-full object-cover rounded-xl"
//                 alt={product.name}
//               />

//               {/* PREVIOUS */}
//               {images.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={handlePrev}
//                   aria-label="Previous image"
//                   className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/95 p-2 sm:p-2.5 rounded-full shadow hover:bg-white transition"
//                 >
//                   <FaChevronLeft className="text-sm sm:text-base" />
//                 </button>
//               )}

//               {/* NEXT */}
//               {images.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={handleNext}
//                   aria-label="Next image"
//                   className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/95 p-2 sm:p-2.5 rounded-full shadow hover:bg-white transition"
//                 >
//                   <FaChevronRight className="text-sm sm:text-base" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT - INFO */}
//         <div className="w-full md:w-1/2 flex-1 space-y-5 sm:space-y-6">
//           {/* PRODUCT NAME */}
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
//               {product.name}
//             </h1>
//           </div>

//           {/* PRICE */}
//           <div className="text-xl sm:text-2xl font-bold">
//             ₦{product.price.toLocaleString('en-NG')}
//           </div>

//           {/* COLOR */}
//           {product.colors?.length > 0 && (
//             <div className="space-y-3 sm:space-y-4">
//               <p className="font-semibold text-base sm:text-lg">
//                 Color

//                 {selectedColor && (
//                   <span className="ml-2 text-gray-500 font-normal">
//                     ({selectedColor})
//                   </span>
//                 )}
//               </p>

//               <div className="flex flex-wrap gap-3">
//                 {product.colors.map((color) => (
//                   <button
//                     key={color.name}
//                     type="button"
//                     onClick={() =>
//                       handleColorChange(color.name)
//                     }
//                     aria-label={`Select ${color.name}`}
//                     title={color.name}
//                     className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-all duration-200 ${
//                       selectedColor === color.name
//                         ? 'border-black scale-110'
//                         : 'border-gray-300 hover:border-black'
//                     }`}
//                     style={{
//                       background: color.value,
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* QUANTITY */}
//           <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
//             <p className="font-semibold text-base sm:text-xl">
//               Quantity:
//             </p>

//             <div className="flex items-center gap-3">
//               <button
//                 type="button"
//                 onClick={() =>
//                   setQuantity((q) => Math.max(1, q - 1))
//                 }
//                 aria-label="Decrease quantity"
//                 className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded hover:bg-gray-200 transition"
//               >
//                 −
//               </button>

//               <span className="text-base sm:text-lg min-w-5 text-center">
//                 {quantity}
//               </span>

//               <button
//                 type="button"
//                 onClick={() => setQuantity((q) => q + 1)}
//                 aria-label="Increase quantity"
//                 className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded hover:bg-gray-200 transition"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* SIZE */}
//           <div className="space-y-3 sm:space-y-4">
//             <div>
//               <p className="font-semibold text-base sm:text-lg">
//                 Select Size

//                 {selectedSize && (
//                   <span className="ml-2 text-gray-500 font-normal">
//                     ({selectedSize})
//                   </span>
//                 )}
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-2 sm:gap-3">
//               {product.sizes.map((size) => (
//                 <button
//                   key={size}
//                   type="button"
//                   onClick={() => setSelectedSize(size)}
//                   className={`min-w-12 sm:min-w-13.75 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-xs sm:text-sm font-medium transition-all duration-200 ${
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

//           {/* SIZE CHART BUTTON */}
//           <button
//             type="button"
//             onClick={() => setShowSizeChart(true)}
//             className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition mt-2"
//           >
//             <img
//               src={sizechart}
//               alt="Size Guide"
//               className="w-40 sm:w-50 h-12 sm:h-15 object-contain"
//             />
//           </button>

//           {/* BUTTONS */}
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1">
//             <button
//               type="button"
//               onClick={handleAddToCart}
//               className="w-full sm:flex-1 md:w-55 border py-3 rounded-xl hover:bg-black hover:text-white transition"
//             >
//               Add to Cart
//             </button>

//             <button
//               type="button"
//               className="w-full sm:flex-1 md:w-55 bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition"
//             >
//               Buy it now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* SIZE CHART MODAL */}
//       {showSizeChart && (
//         <div
//           className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-3 sm:px-4 py-4"
//           onClick={() => setShowSizeChart(false)}
//         >
//           <div
//             className="bg-white rounded-xl p-4 sm:p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               type="button"
//               onClick={() => setShowSizeChart(false)}
//               aria-label="Close size chart"
//               className="absolute top-3 right-4 text-2xl font-extrabold hover:text-gray-500 transition"
//             >
//               ×
//             </button>

//             <h2 className="text-lg sm:text-xl font-bold mb-4 pr-8">
//               Pants Size Guide
//             </h2>

//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse min-w-100 text-xs sm:text-sm">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border p-2 sm:p-3 text-left">
//                       Size
//                     </th>

//                     <th className="border p-2 sm:p-3 text-left">
//                       Waist
//                     </th>

//                     <th className="border p-2 sm:p-3 text-left">
//                       Length
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   <tr>
//                     <td className="border p-2 sm:p-3">S</td>
//                     <td className="border p-2 sm:p-3">30-32</td>
//                     <td className="border p-2 sm:p-3">40</td>
//                   </tr>

//                   <tr>
//                     <td className="border p-2 sm:p-3">M</td>
//                     <td className="border p-2 sm:p-3">32-34</td>
//                     <td className="border p-2 sm:p-3">41</td>
//                   </tr>

//                   <tr>
//                     <td className="border p-2 sm:p-3">L</td>
//                     <td className="border p-2 sm:p-3">34-36</td>
//                     <td className="border p-2 sm:p-3">42</td>
//                   </tr>

//                   <tr>
//                     <td className="border p-2 sm:p-3">XL</td>
//                     <td className="border p-2 sm:p-3">36-38</td>
//                     <td className="border p-2 sm:p-3">43</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* YOU MAY ALSO LIKE */}
//       <div className="mt-12 sm:mt-16">
//         <YouMayAlsoLike
//           products={allProducts}
//           currentProductId={product.id}
//         />
//       </div>
//     </div>
//   );
// }

// export default PantsDetails;


import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa6';

import YouMayAlsoLike from '../../components/YouMayAlsoLike';

import { PantsDatas } from '../../data/PantsData';
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

import ProductDescription from "../Product/ProductDescription.jsx"

import { useCart } from '../../Context/cartContext';
import { useWishlist } from '../../Context/WishlistContext';

import sizechart from '../../assets/images/sizechart.png';

function PantsDetails() {
  const { id } = useParams();

  const product = useMemo(() => {
    return PantsDatas.find(
      (item) => String(item.id).toLowerCase() === String(id).toLowerCase()
    );
  }, [id]);

  const allProducts = useMemo(() => [
    ...AccessoriesDatas.map((item) => ({ ...item, route: `/accessories/${item.id}` })),
    ...PantsDatas.map((item) => ({ ...item, route: `/pants/${item.id}` })),
    ...BestSellerData.map((item) => ({ ...item, route: `/bestseller/products/${item.id}` })),
    ...TshirtDatas.map((item) => ({ ...item, route: `/t-shirt/${item.id}` })),
    ...DenimJeansDatas.map((item) => ({ ...item, route: `/denim-jeans/${item.id}` })),
    ...FemalePantDatas.map((item) => ({ ...item, route: `/female-pant/${item.id}` })),
    ...TopDatas.map((item) => ({ ...item, route: `/tops/${item.id}` })),
    ...OuterwearJacketsDatas.map((item) => ({ ...item, route: `/Outerwear-Jackets/${item.id}` })),
    ...SkirtsDatas.map((item) => ({ ...item, route: `/skirts/${item.id}` })),
    ...DressesDatas.map((item) => ({ ...item, route: `/dresses/${item.id}` })),
    ...CropTopDatas.map((item) => ({ ...item, route: `/crop-top/${item.id}` })),
  ], []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const { addToCart, setShowCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  /*
   * Initialize state on product change
   */
  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0].name);
    } else {
      setSelectedColor('Default');
    }

    setCurrentImageIndex(0);
    setSelectedSize('');
    setQuantity(1);
  }, [product]);

  /*
   * Get selected color variant metadata
   */
  const selectedColorVariant = useMemo(() => {
    if (!product?.colors?.length) return null;
    return (
      product.colors.find((color) => color.name === selectedColor) ||
      product.colors[0]
    );
  }, [product, selectedColor]);

  /*
   * Computed image gallery stack
   */
  const images = useMemo(() => {
    if (selectedColorVariant?.images?.length) {
      return selectedColorVariant.images;
    }

    return [
      product?.image,
      ...(product?.hoverImage ? [product.hoverImage] : []),
    ].filter(Boolean);
  }, [product, selectedColorVariant]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-3">Product not found</h1>
          <Link
            to="/Pants"
            className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Back to Pants
          </Link>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
    setCurrentImageIndex(0);
  };

  const handleWishlist = () => {
    toggleWishlist({
      ...product,
      route: `/pants/${product.id}`,
      selectedColor: selectedColor || 'Default',
      images,
      image: images[0],
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size!');
      return;
    }

    const cartProduct = {
      ...product,
      route: `/pants/${product.id}`,
      selectedColor: selectedColor || 'Default',
      image: images[currentImageIndex],
      images,
    };

    addToCart(
      cartProduct,
      selectedSize,
      quantity,
      selectedColor || 'Default'
    );

    setShowCart(true);
    toast.success('Item added to cart!');
  };

  return (
    <div className="bg-white text-black min-h-screen py-8 sm:py-10 px-4 sm:px-6 md:px-10 font-[Raleway] overflow-x-hidden">
      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-16 sm:mt-20 md:mt-23 text-xs sm:text-sm md:text-base text-center">
        <Link to="/" className="hover:underline whitespace-nowrap">
          Home
        </Link>
        <FaChevronRight className="text-xs shrink-0" />
        <Link to="/Pants" className="hover:underline whitespace-nowrap">
          Pants
        </Link>
        <FaChevronRight className="text-xs shrink-0" />
        <span className="text-gray-500 truncate max-w-35 sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* MAIN PRODUCT SECTION */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-10 mt-8 sm:mt-10">
        {/* LEFT - IMAGES GALLERY */}
        <div className="w-full md:w-1/2 min-w-0">
          <div className="flex flex-col-reverse md:flex-row gap-3 sm:gap-4 w-full">
            {/* THUMBNAILS */}
            <div className="flex md:flex-col gap-2 sm:gap-3 overflow-x-auto md:overflow-visible w-full md:w-auto pb-1 md:pb-0">
              {images.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`shrink-0 rounded-lg border-2 overflow-hidden transition-all ${
                    currentImageIndex === idx
                      ? 'border-black'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-16 h-20 sm:w-18 sm:h-22 md:w-20 md:h-24 object-cover"
                  />
                </button>
              ))}
            </div>

            {/* MAIN DISPLAY IMAGE */}
            <div className="relative w-full min-w-0 aspect-square sm:aspect-4/5 md:aspect-auto md:h-125">
              <button
                type="button"
                onClick={handleWishlist}
                aria-label="Add to wishlist"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white p-2.5 sm:p-3 rounded-full shadow-md hover:scale-105 transition-transform"
              >
                {isWishlisted(product.id, selectedColor || 'Default') ? (
                  <FaHeart className="text-red-500 text-base sm:text-lg" />
                ) : (
                  <FaRegHeart className="text-base sm:text-lg" />
                )}
              </button>

              <img
                src={images[currentImageIndex]}
                className="w-full h-full object-cover rounded-xl"
                alt={product.name}
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous image"
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/95 p-2 sm:p-2.5 rounded-full shadow hover:bg-white transition"
                  >
                    <FaChevronLeft className="text-sm sm:text-base" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next image"
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/95 p-2 sm:p-2.5 rounded-full shadow hover:bg-white transition"
                  >
                    <FaChevronRight className="text-sm sm:text-base" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT - PRODUCT INFO & ACTIONS */}
        <div className="w-full md:w-1/2 flex-1 space-y-5 sm:space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="text-xl sm:text-2xl font-bold">
            ₦{product.price.toLocaleString('en-NG')}
          </div>

          {/* COLOR SELECTION */}
          {product.colors?.length > 0 && (
            <div className="space-y-3 sm:space-y-4">
              <p className="font-semibold text-base sm:text-lg">
                Color:
                {selectedColor && (
                  <span className="ml-2 text-gray-500 font-normal">
                    ({selectedColor})
                  </span>
                )}
              </p>

              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleColorChange(color.name)}
                    aria-label={`Select ${color.name}`}
                    title={color.name}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color.name
                        ? 'border-black scale-110'
                        : 'border-gray-300 hover:border-black'
                    }`}
                    style={{ background: color.value }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY CONTROL */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <p className="font-semibold text-base sm:text-xl">Quantity:</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded hover:bg-gray-200 transition font-bold"
              >
                −
              </button>
              <span className="text-base sm:text-lg min-w-5 text-center font-medium">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded hover:bg-gray-200 transition font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* SIZE SELECTION */}
          <div className="space-y-3 sm:space-y-4">
            <p className="font-semibold text-base sm:text-lg">
              Select Size
              {selectedSize && (
                <span className="ml-2 text-gray-500 font-normal">
                  ({selectedSize})
                </span>
              )}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-12 sm:min-w-13.75 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-xs sm:text-sm font-medium transition-all duration-200 ${
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

          {/* SIZE GUIDE TRIGGER */}
          <button
            type="button"
            onClick={() => setShowSizeChart(true)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition mt-2"
          >
            <img
              src={sizechart}
              alt="Size Guide"
              className="w-40 sm:w-50 h-12 sm:h-15 object-contain"
            />
          </button>

          {/* ADD TO CART & BUY NOW */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full sm:flex-1 md:w-55 border border-black py-3 rounded-xl font-semibold hover:bg-black hover:text-white transition"
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="w-full sm:flex-1 md:w-55 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
            >
              Buy it now
            </button>
          </div>
        </div>
      </div>

      {/* SIZE CHART MODAL */}
      {showSizeChart && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-3 sm:px-4 py-4"
          onClick={() => setShowSizeChart(false)}
        >
          <div
            className="bg-white rounded-xl p-4 sm:p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowSizeChart(false)}
              aria-label="Close size chart"
              className="absolute top-3 right-4 text-2xl font-extrabold hover:text-gray-500 transition"
            >
              ×
            </button>

            <h2 className="text-lg sm:text-xl font-bold mb-4 pr-8">
              Pants Size Guide
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-100 text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 sm:p-3 text-left">Size</th>
                    <th className="border p-2 sm:p-3 text-left">Waist (in)</th>
                    <th className="border p-2 sm:p-3 text-left">Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 sm:p-3 font-semibold">S</td>
                    <td className="border p-2 sm:p-3">30-32</td>
                    <td className="border p-2 sm:p-3">40</td>
                  </tr>
                  <tr>
                    <td className="border p-2 sm:p-3 font-semibold">M</td>
                    <td className="border p-2 sm:p-3">32-34</td>
                    <td className="border p-2 sm:p-3">41</td>
                  </tr>
                  <tr>
                    <td className="border p-2 sm:p-3 font-semibold">L</td>
                    <td className="border p-2 sm:p-3">34-36</td>
                    <td className="border p-2 sm:p-3">42</td>
                  </tr>
                  <tr>
                    <td className="border p-2 sm:p-3 font-semibold">XL</td>
                    <td className="border p-2 sm:p-3">36-38</td>
                    <td className="border p-2 sm:p-3">43</td>
                  </tr>
                  <tr>
                    <td className="border p-2 sm:p-3 font-semibold">XXL</td>
                    <td className="border p-2 sm:p-3">38-40</td>
                    <td className="border p-2 sm:p-3">44</td>
                  </tr>
                  <tr>
                    <td className="border p-2 sm:p-3 font-semibold">3XL</td>
                    <td className="border p-2 sm:p-3">40-42p</td>
                    <td className="border p-2 sm:p-3">45</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT DESCRIPTION */}

            <ProductDescription
              description={product.description}
              features={product.features}
              fabric={product.fabric}
              care={product.care}
            />

      {/* RECOMMENDED PRODUCTS */}
      <div className="mt-12 sm:mt-16">
        <YouMayAlsoLike
          products={allProducts}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}

export default PantsDetails;