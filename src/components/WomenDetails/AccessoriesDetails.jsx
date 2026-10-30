// import React, { useMemo, useState } from 'react';
// import toast from 'react-hot-toast';
// import { useParams, Link } from 'react-router-dom';
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaHeart,
//   FaRegHeart,
// } from 'react-icons/fa6';

// import YouMayAlsoLike from '../YouMayAlsoLike.jsx';

// import { AccessoriesDatas } from '../../data/AccessoriesData';
// import { BestSellerData } from '../../data/BestSellerData.js';
// import { TshirtDatas } from '../../data/TshirtData.js';
// import { DenimJeansDatas } from '../../data/DenimJeanData.js';
// import { TopDatas } from '../../data/Tops.js';
// import { SkirtsDatas } from '../../data/SkirtsData.js';
// import { FemalePantDatas } from '../../data/FemalePant.js';
// import { OuterwearJacketsDatas } from '../../data/OuterwearJacketsData.js';
// import { PantsDatas } from '../../data/PantsData.js';
// import { DressesDatas } from '../../data/DressesData.js';
// import { CropTopDatas } from '../../data/CropTop.js';
// import { HoodiesSweatshirtsDatas } from '../../data/HoodiesSweatshirtsData.js';

// import ProductDescription from '../../components/Product/ProductDescription';

// import { useCart } from '../../Context/cartContext.jsx';
// import { useWishlist } from '../../Context/WishlistContext.jsx';

// function AccessoriesDetails() {
//   const { id } = useParams();

//   const decodedId = decodeURIComponent(id ?? '');

//   // Find the requested accessory, allowing for legacy IDs with extra spaces.
//   const product = AccessoriesDatas.find(
//     (item) =>
//       String(item.id) === decodedId ||
//       String(item.id).trim() === decodedId.trim(),
//   );

//   const allProducts = useMemo(
//     () => [
//       ...AccessoriesDatas.map((item) => ({
//         ...item,
//         route: `/Accessories/${encodeURIComponent(item.id)}`,
//       })),

//       ...PantsDatas.map((item) => ({
//         ...item,
//         route: `/pants/${encodeURIComponent(item.id)}`,
//       })),

//       ...BestSellerData.map((item) => ({
//         ...item,
//         route: `/bestseller/products/${encodeURIComponent(item.id)}`,
//       })),

//       ...TshirtDatas.map((item) => ({
//         ...item,
//         route: `/t-shirt/${encodeURIComponent(item.id)}`,
//       })),

//       ...DenimJeansDatas.map((item) => ({
//         ...item,
//         route: `/Denim-Jeans/${encodeURIComponent(item.id)}`,
//       })),

//       ...FemalePantDatas.map((item) => ({
//         ...item,
//         route: `/female-pant/${encodeURIComponent(item.id)}`,
//       })),

//       ...TopDatas.map((item) => ({
//         ...item,
//         route: `/tops/${encodeURIComponent(item.id)}`,
//       })),

//       ...OuterwearJacketsDatas.map((item) => ({
//         ...item,
//         route: `/Outerwear-Jackets/${encodeURIComponent(item.id)}`,
//       })),

//       ...SkirtsDatas.map((item) => ({
//         ...item,
//         route: `/skirts/${encodeURIComponent(item.id)}`,
//       })),

//       ...DressesDatas.map((item) => ({
//         ...item,
//         route: `/dresses/${encodeURIComponent(item.id)}`,
//       })),

//       ...CropTopDatas.map((item) => ({
//         ...item,
//         route: `/crop-top/${encodeURIComponent(item.id)}`,
//       })),

//       ...HoodiesSweatshirtsDatas.map((item) => ({
//         ...item,
//         route: `/Hoodies-Sweatshirts/${encodeURIComponent(item.id)}`,
//       })),
//     ],
//     [],
//   );

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [quantity, setQuantity] = useState(1);

//   const { addToCart, setShowCart } = useCart();
//   const { toggleWishlist, isWishlisted } = useWishlist();

//   if (!product) {
//     return <div className="text-black p-10">Product not found</div>;
//   }

// const images =
//   ['Grove-Street', 'Graffiti-Halo'].includes(
//     product.id,
//   )
//     ? [product.image].filter(Boolean)
//     : [
//         product.image,
//         ...(product.hoverImage ? [product.hoverImage] : []),
//       ].filter(Boolean);
//   const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;

//   const handlePrev = () => {
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + images.length) % images.length,
//     );
//   };

//   const handleNext = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
//   };

//   const handleAddToCart = () => {
//     if (hasSizes && !selectedSize) {
//       toast.error('Please select a size!');
//       return;
//     }

//     addToCart(
//       {
//         ...product,
//         route: `/Accessories/${encodeURIComponent(product.id)}`,
//         selectedSize: hasSizes ? selectedSize : 'Default',
//         image: images[currentImageIndex],
//       },
//       hasSizes ? selectedSize : 'Default',
//       quantity,
//     );

//     setShowCart(true);
//     toast.success('Item added to cart!');
//   };

//   const wishlisted = isWishlisted(product.id);

//   const handleWishlist = () => {
//     toggleWishlist({
//       ...product,
//       route: `/Accessories/${encodeURIComponent(product.id)}`,
//       image: product.image,
//       images,
//     });
//   };

//   return (
//     <div className="bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]">
//       {/* BREADCRUMB */}
//       <div className="flex items-center justify-center gap-2 md:gap-4 mt-23 text-sm md:text-base">
//         <Link to="/" className="hover:underline">
//           Home
//         </Link>

//         <FaChevronRight />

//         <Link to="/Accessories" className="hover:underline">
//           Accessories
//         </Link>

//         <FaChevronRight />

//         <span className="text-gray-500">{product.name}</span>
//       </div>

//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-10">
//         {/* LEFT - IMAGES */}
//         <div className="flex gap-4 w-full md:w-1/2">
//           {/* THUMBNAILS */}
//           {images.length > 1 && (
//             <div className="hidden md:flex flex-col gap-3">
//               {images.map((img, idx) => (
//                 <img
//                   key={`${img}-${idx}`}
//                   src={img}
//                   alt={`${product.name} view ${idx + 1}`}
//                   onClick={() => setCurrentImageIndex(idx)}
//                   className={`w-20 h-24 object-cover rounded-lg cursor-pointer border ${
//                     currentImageIndex === idx
//                       ? 'border-black'
//                       : 'border-transparent'
//                   }`}
//                 />
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
//                 wishlisted ? 'Remove from wishlist' : 'Add to wishlist'
//               }
//               className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow"
//             >
//               {wishlisted ? (
//                 <FaHeart className="text-red-500" />
//               ) : (
//                 <FaRegHeart />
//               )}
//             </button>

//             {images.length > 0 ? (
//               <img
//                 src={images[currentImageIndex] || images[0]}
//                 className="w-full h-full object-cover rounded-xl"
//                 alt={product.name}
//               />
//             ) : (
//               <div className="w-full h-full rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
//                 Image unavailable
//               </div>
//             )}

//             {/* IMAGE ARROWS: ONLY SHOWN FOR MULTIPLE IMAGES */}
//             {images.length > 1 && (
//               <>
//                 <button
//                   type="button"
//                   onClick={handlePrev}
//                   aria-label="Previous image"
//                   className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
//                 >
//                   <FaChevronLeft />
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleNext}
//                   aria-label="Next image"
//                   className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
//                 >
//                   <FaChevronRight />
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* RIGHT - PRODUCT INFORMATION */}
//         <div className="flex-1 space-y-6">
//           {/* PRODUCT NAME */}
//           <h1 className="text-2xl md:text-3xl font-bold">
//             {product.name}
//           </h1>

//           {/* PRICE */}
//           <div className="text-2xl font-bold">
//             ₦{Number(product.price).toLocaleString('en-NG')}
//           </div>

//           {/* QUANTITY */}
//           <div className="flex items-center gap-4">
//             <p className="font-semibold text-xl">Quantity:</p>

//             <button
//               type="button"
//               onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//               aria-label="Decrease quantity"
//               className="w-10 h-10 bg-gray-100 rounded"
//             >
//               −
//             </button>

//             <span className="text-lg">{quantity}</span>

//             <button
//               type="button"
//               onClick={() => setQuantity((q) => q + 1)}
//               aria-label="Increase quantity"
//               className="w-10 h-10 bg-gray-100 rounded"
//             >
//               +
//             </button>
//           </div>

//           {/* SIZE - ONLY FOR PRODUCTS THAT HAVE SIZES */}
//           {hasSizes && (
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <p className="font-semibold text-lg">
//                   Select Size
//                   {selectedSize && (
//                     <span className="ml-2 text-gray-500 font-normal">
//                       ({selectedSize})
//                     </span>
//                   )}
//                 </p>
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 {product.sizes.map((size) => (
//                   <button
//                     key={size}
//                     type="button"
//                     onClick={() => setSelectedSize(size)}
//                     className={`min-w-13.75 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
//                       selectedSize === size
//                         ? 'bg-black text-white border-black'
//                         : 'bg-white text-black border-gray-300 hover:border-black hover:bg-gray-50'
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ACTION BUTTONS */}
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

//       {/* PRODUCT DESCRIPTION */}
//       <ProductDescription
//         description={product.description}
//         features={product.features}
//         fabric={product.fabric}
//         care={product.care}
//       />

//       {/* YOU MAY ALSO LIKE */}
//       <YouMayAlsoLike
//         products={allProducts}
//         currentProductId={product.id}
//       />
//     </div>
//   );
// }

// export default AccessoriesDetails;

import React, { useMemo, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';

import YouMayAlsoLike from '../YouMayAlsoLike.jsx';

import { AccessoriesDatas } from '../../data/AccessoriesData';
import { BestSellerData } from '../../data/BestSellerData.js';
import { TshirtDatas } from '../../data/TshirtData.js';
import { DenimJeansDatas } from '../../data/DenimJeanData.js';
import { TopDatas } from '../../data/Tops.js';
import { SkirtsDatas } from '../../data/SkirtsData.js';
import { FemalePantDatas } from '../../data/FemalePant.js';
import { OuterwearJacketsDatas } from '../../data/OuterwearJacketsData.js';
import { PantsDatas } from '../../data/PantsData.js';
import { DressesDatas } from '../../data/DressesData.js';
import { CropTopDatas } from '../../data/CropTop.js';
import { HoodiesSweatshirtsDatas } from '../../data/HoodiesSweatshirtsData.js';

import ProductDescription from '../../components/Product/ProductDescription';

import { useCart } from '../../Context/cartContext.jsx';
import { useWishlist } from '../../Context/WishlistContext.jsx';

function AccessoriesDetails() {
  const { id } = useParams();

  const decodedId = decodeURIComponent(id ?? '');

  // Find the requested accessory.
  const product = AccessoriesDatas.find(
    (item) => String(item.id) === decodedId || String(item.id).trim() === decodedId.trim(),
  );

  const isMeshCap = product?.id === 'Mesh-Cap';

  const allProducts = useMemo(
    () => [
      ...AccessoriesDatas.map((item) => ({
        ...item,
        route: `/Accessories/${encodeURIComponent(item.id)}`,
      })),

      ...PantsDatas.map((item) => ({
        ...item,
        route: `/pants/${encodeURIComponent(item.id)}`,
      })),

      ...BestSellerData.map((item) => ({
        ...item,
        route: `/bestseller/products/${encodeURIComponent(item.id)}`,
      })),

      ...TshirtDatas.map((item) => ({
        ...item,
        route: `/t-shirt/${encodeURIComponent(item.id)}`,
      })),

      ...DenimJeansDatas.map((item) => ({
        ...item,
        route: `/Denim-Jeans/${encodeURIComponent(item.id)}`,
      })),

      ...FemalePantDatas.map((item) => ({
        ...item,
        route: `/female-pant/${encodeURIComponent(item.id)}`,
      })),

      ...TopDatas.map((item) => ({
        ...item,
        route: `/tops/${encodeURIComponent(item.id)}`,
      })),

      ...OuterwearJacketsDatas.map((item) => ({
        ...item,
        route: `/Outerwear-Jackets/${encodeURIComponent(item.id)}`,
      })),

      ...SkirtsDatas.map((item) => ({
        ...item,
        route: `/skirts/${encodeURIComponent(item.id)}`,
      })),

      ...DressesDatas.map((item) => ({
        ...item,
        route: `/dresses/${encodeURIComponent(item.id)}`,
      })),

      ...CropTopDatas.map((item) => ({
        ...item,
        route: `/crop-top/${encodeURIComponent(item.id)}`,
      })),

      ...HoodiesSweatshirtsDatas.map((item) => ({
        ...item,
        route: `/Hoodies-Sweatshirts/${encodeURIComponent(item.id)}`,
      })),
    ],
    [],
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Color selection is specifically for the combined Mesh Cap.
  const [selectedColor, setSelectedColor] = useState(
    product?.id === 'Mesh-Cap' ? (product.colors?.[0]?.name ?? '') : '',
  );

  const { addToCart, setShowCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Reset the gallery and selected color when the product changes.
  useEffect(() => {
    setSelectedColor(product?.id === 'Mesh-Cap' ? (product.colors?.[0]?.name ?? '') : '');
    setCurrentImageIndex(0);
  }, [product?.id]);

  if (!product) {
    return <div className='text-black p-10'>Product not found</div>;
  }

  // Resolve the selected color only for Mesh-Cap.
  const selectedColorData = isMeshCap
    ? (product.colors?.find((color) => color.name === selectedColor) ?? product.colors?.[0])
    : undefined;

  // Mesh-Cap uses the selected color's images.
  // All other accessories retain their original image behavior.
  const images =
    isMeshCap && selectedColorData?.images?.length
      ? selectedColorData.images.filter(Boolean)
      : ['Grove-Street', 'Graffiti-Halo'].includes(product.id)
        ? [product.image].filter(Boolean)
        : [product.image, ...(product.hoverImage ? [product.hoverImage] : [])].filter(Boolean);

  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;

  const handlePrev = () => {
    if (!images.length) return;

    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    if (!images.length) return;

    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      toast.error('Please select a size!');
      return;
    }

    const cartProduct = {
      ...product,
      route: `/Accessories/${encodeURIComponent(product.id)}`,
      selectedSize: hasSizes ? selectedSize : 'Default',
      image: images[currentImageIndex] ?? images[0] ?? product.image,
    };

    // Preserve color-specific details only for Mesh-Cap.
    if (isMeshCap) {
      cartProduct.selectedColor = selectedColorData?.name;
      cartProduct.images = images;
    }

    addToCart(cartProduct, hasSizes ? selectedSize : 'Default', quantity);

    setShowCart(true);
    toast.success('Item added to cart!');
  };

  const wishlisted = isWishlisted(product.id);

  const handleWishlist = () => {
    const wishlistProduct = {
      ...product,
      route: `/Accessories/${encodeURIComponent(product.id)}`,
      image: images[currentImageIndex] ?? images[0] ?? product.image,
    };

    // Preserve color-specific details only for Mesh-Cap.
    if (isMeshCap) {
      wishlistProduct.selectedColor = selectedColorData?.name;
      wishlistProduct.images = images;
    }

    toggleWishlist(wishlistProduct);
  };

  return (
    <div className='bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]'>
      {/* BREADCRUMB */}
      <div className='flex items-center justify-center gap-2 md:gap-4 mt-23 text-sm md:text-base'>
        <Link to='/' className='hover:underline'>
          Home
        </Link>

        <FaChevronRight />

        <Link to='/Accessories' className='hover:underline'>
          Accessories
        </Link>

        <FaChevronRight />

        <span className='text-gray-500'>{product.name}</span>
      </div>

      <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-10'>
        {/* LEFT - IMAGES */}
        <div className='flex gap-4 w-full md:w-1/2'>
          {/* THUMBNAILS */}
          {images.length > 1 && (
            <div className='hidden md:flex flex-col gap-3'>
              {images.map((img, idx) => (
                <img
                  key={`${img}-${idx}`}
                  src={img}
                  alt={`${product.name} ${
                    isMeshCap && selectedColorData ? `${selectedColorData.name} ` : ''
                  }view ${idx + 1}`}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-20 h-24 object-cover rounded-lg cursor-pointer border ${
                    currentImageIndex === idx ? 'border-black' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          )}

          {/* MAIN IMAGE */}
          <div className='relative w-full h-100 md:h-125'>
            {/* WISHLIST */}
            <button
              type='button'
              onClick={handleWishlist}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className='absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow'
            >
              {wishlisted ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
            </button>

            {images.length > 0 ? (
              <img
                src={images[currentImageIndex] || images[0]}
                className='w-full h-full object-cover rounded-xl'
                alt={`${product.name}${
                  isMeshCap && selectedColorData ? ` - ${selectedColorData.name}` : ''
                }`}
              />
            ) : (
              <div className='w-full h-full rounded-xl bg-gray-100 flex items-center justify-center text-gray-500'>
                Image unavailable
              </div>
            )}

            {/* IMAGE ARROWS */}
            {images.length > 1 && (
              <>
                <button
                  type='button'
                  onClick={handlePrev}
                  aria-label='Previous image'
                  className='absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
                >
                  <FaChevronLeft />
                </button>

                <button
                  type='button'
                  onClick={handleNext}
                  aria-label='Next image'
                  className='absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
        </div>

        {/* RIGHT - PRODUCT INFORMATION */}
        <div className='flex-1 space-y-6'>
          {/* PRODUCT NAME */}
          <h1 className='text-2xl md:text-3xl font-bold'>{product.name}</h1>

          {/* PRICE */}
          <div className='text-2xl font-bold'>
            ₦{Number(product.price).toLocaleString('en-NG')}
          </div>

          {/* COLOR SELECTOR - ONLY FOR MESH CAP */}
          {isMeshCap && product.colors?.length > 0 && (
            <div className='space-y-3'>
              <p className='font-semibold text-lg'>
                Color:{' '}
                <span className='font-normal text-gray-500'>{selectedColorData?.name}</span>
              </p>

              <div className='flex flex-wrap gap-3'>
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type='button'
                    onClick={() => {
                      setSelectedColor(color.name);
                      setCurrentImageIndex(0);
                    }}
                    aria-label={`Select ${color.name} color`}
                    aria-pressed={selectedColorData?.name === color.name}
                    title={color.name}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColorData?.name === color.name
                        ? 'border-black ring-2 ring-gray-300 ring-offset-2'
                        : 'border-gray-300 hover:border-black'
                    }`}
                    style={{ backgroundColor: color.value }}
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
              className='w-10 h-10 bg-gray-100 rounded'
            >
              −
            </button>

            <span className='text-lg'>{quantity}</span>

            <button
              type='button'
              onClick={() => setQuantity((q) => q + 1)}
              aria-label='Increase quantity'
              className='w-10 h-10 bg-gray-100 rounded'
            >
              +
            </button>
          </div>

          {/* SIZE - ONLY FOR PRODUCTS THAT HAVE SIZES */}
          {hasSizes && (
            <div className='space-y-4'>
              <div className='flex items-center'>
                <p className='font-semibold text-lg'>
                  Select Size
                  {selectedSize && (
                    <span className='ml-2 text-gray-500 font-normal'>({selectedSize})</span>
                  )}
                </p>
              </div>

              <div className='flex flex-wrap gap-3'>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type='button'
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
          )}

          {/* ACTION BUTTONS */}
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

      {/* PRODUCT DESCRIPTION */}
      <ProductDescription
        description={product.description}
        features={product.features}
        fabric={product.fabric}
        care={product.care}
      />

      {/* YOU MAY ALSO LIKE */}
      <YouMayAlsoLike products={allProducts} currentProductId={product.id} />
    </div>
  );
}

export default AccessoriesDetails;
