// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// import { useParams, Link } from 'react-router-dom';
// import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';

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
// import { HoodiesSweatshirtsDatas } from '../../data/HoodiesSweatshirtsData.js';

// import { useCart } from '../../Context/cartContext';
// import { useWishlist } from '../../Context/WishlistContext';

// import sizechart from '../../assets/images/sizechart.png';

// function DenimJeanDetails() {
//   const { id } = useParams();

//   const product = DenimJeansDatas.find((item) => String(item.id) === String(id));

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
//     ...HoodiesSweatshirtsDatas.map((item) => ({
//       ...item,
//       route: `/Hoodies-Sweatshirts/${item.id}`,
//     })),
//   ];

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [showSizeChart, setShowSizeChart] = useState(false);

//   const { addToCart, setShowCart } = useCart();
//   const { toggleWishlist, isWishlisted } = useWishlist();

//   if (!product) {
//     return <div className='text-black p-10'>Product not found</div>;
//   }

//   const images = [product.image, ...(product.hoverImage ? [product.hoverImage] : [])];

//   const handlePrev = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const handleNext = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
//   };

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       toast.error('Please select a size!');
//       return;
//     }

//     addToCart(
//       {
//         ...product,
//         route: `/Denim-Jeans/${product.id}`,
//       },
//       selectedSize,
//       quantity,
//     );

//     setShowCart(true);

//     toast.success('Item added to cart!');
//   };

//   return (
//     <div className='bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]'>
//       {/* BREADCRUMB */}
//       <div className='flex items-center justify-center gap-2 md:gap-4 mt-23 text-sm md:text-base'>
//         <Link to='/' className='hover:underline'>
//           Home
//         </Link>

//         <FaChevronRight />

//         <Link to='/Denim-Jeans' className='hover:underline'>
//           Denim-Jeans
//         </Link>

//         <FaChevronRight />

//         <span className='text-gray-500'>{product.name}</span>
//       </div>

//       <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-10'>
//         {/* LEFT - IMAGES */}
//         <div className='flex gap-4 w-full md:w-1/2'>
//           {/* THUMBNAILS (DESKTOP) */}
//           <div className='hidden md:flex flex-col gap-3'>
//             {images.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt=''
//                 onClick={() => setCurrentImageIndex(idx)}
//                 className={`w-20 h-24 object-cover rounded-lg cursor-pointer border ${
//                   currentImageIndex === idx ? 'border-black' : 'border-transparent'
//                 }`}
//               />
//             ))}
//           </div>

//           {/* MAIN IMAGE */}
//           <div className='relative w-full h-100 md:h-125'>
//             {/* WISHLIST */}
//             <button
//               type='button'
//               onClick={() =>
//                 toggleWishlist({
//                   ...product,
//                   route: `/Denim-Jeans/${product.id}`,
//                 })
//               }
//               className='absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow'
//             >
//               {isWishlisted(product.id) ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
//             </button>

//             <img
//               src={images[currentImageIndex]}
//               className='w-full h-full object-cover rounded-xl'
//               alt='product'
//             />

//             {/* ARROWS */}
//             <button
//               type='button'
//               onClick={handlePrev}
//               className='absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
//             >
//               <FaChevronLeft />
//             </button>

//             <button
//               type='button'
//               onClick={handleNext}
//               className='absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
//             >
//               <FaChevronRight />
//             </button>
//           </div>
//         </div>

//         {/* RIGHT - INFO */}
//         <div className='flex-1 space-y-6'>
//           <h1 className='text-2xl md:text-3xl font-bold'>{product.name}</h1>

//           {/* PRICE */}
//           <div className='text-2xl font-bold'>₦{product.price.toLocaleString('en-NG')}</div>

//           {/* QUANTITY */}
//           <div className='flex items-center gap-4'>
//             <p className='font-semibold text-xl'>Quantity:</p>

//             <button
//               type='button'
//               onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//               className='w-10 h-10 bg-gray-100 rounded'
//             >
//               −
//             </button>

//             <span className='text-lg'>{quantity}</span>

//             <button
//               type='button'
//               onClick={() => setQuantity((q) => q + 1)}
//               className='w-10 h-10 bg-gray-100 rounded'
//             >
//               +
//             </button>
//           </div>

//           {/* SIZE */}
//           <div className='space-y-4'>
//             <div className='flex items-center justify'>
//               <p className='font-semibold text-lg'>
//                 Select Size
//                 {selectedSize && (
//                   <span className='ml-2 text-gray-500 font-normal'>({selectedSize})</span>
//                 )}
//               </p>
//             </div>

//             <div className='flex flex-wrap gap-3'>
//               {product.sizes.map((size) => (
//                 <button
//                   key={size}
//                   type='button'
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
//             type='button'
//             onClick={() => setShowSizeChart(true)}
//             className='flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition mt-2'
//           >
//             <img src={sizechart} alt='Size Guide' className='w-50 h-15 object-contain' />
//           </button>

//           {/* BUTTONS */}
//           <div className='flex flex-col md:flex-row gap-4'>
//             <button
//               type='button'
//               onClick={handleAddToCart}
//               className='w-full md:w-55 border py-3 rounded-xl hover:bg-black hover:text-white transition'
//             >
//               Add to Cart
//             </button>

//             <button
//               type='button'
//               className='w-full md:w-55 bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition'
//             >
//               Buy it now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* SIZE CHART */}
//       {showSizeChart && (
//         <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4'>
//           <div className='bg-white rounded-xl p-6 max-w-xl w-full relative'>
//             <button
//               type='button'
//               onClick={() => setShowSizeChart(false)}
//               className='absolute top-3 right-4 text-2xl font-extrabold text-black'
//             >
//               ×
//             </button>

//             <h2 className='text-xl font-bold mb-4 text-black'>Denim & Jeans Size Guide</h2>

//             <div className='overflow-x-auto'>
//               <table className='w-full border-collapse border text-black'>
//                 <thead>
//                   <tr className='bg-gray-100'>
//                     <th className='border p-3'>Size</th>
//                     <th className='border p-3'>Waist (in)</th>
//                     <th className='border p-3'>Hip (in)</th>
//                     <th className='border p-3'>Inseam (in)</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   <tr>
//                     <td className='border p-3'>S</td>
//                     <td className='border p-3'>28-30</td>
//                     <td className='border p-3'>36-38</td>
//                     <td className='border p-3'>30</td>
//                   </tr>

//                   <tr>
//                     <td className='border p-3'>M</td>
//                     <td className='border p-3'>31-33</td>
//                     <td className='border p-3'>39-41</td>
//                     <td className='border p-3'>31</td>
//                   </tr>

//                   <tr>
//                     <td className='border p-3'>L</td>
//                     <td className='border p-3'>34-36</td>
//                     <td className='border p-3'>42-44</td>
//                     <td className='border p-3'>32</td>
//                   </tr>

//                   <tr>
//                     <td className='border p-3'>XL</td>
//                     <td className='border p-3'>37-39</td>
//                     <td className='border p-3'>45-47</td>
//                     <td className='border p-3'>33</td>
//                   </tr>

//                   <tr>
//                     <td className='border p-3'>XXL</td>
//                     <td className='border p-3'>40-42</td>
//                     <td className='border p-3'>48-50</td>
//                     <td className='border p-3'>34</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             <p className='text-xs text-gray-500 mt-4'>
//               Measurements are approximate and may vary slightly depending on the fit and style.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* YOU MAY ALSO LIKE */}
//       <YouMayAlsoLike products={allProducts} currentProductId={product.id} />
//     </div>
//   );
// }

// export default DenimJeanDetails;

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

function DenimJeanDetails() {
  const { id } = useParams();

  const product = DenimJeansDatas.find(
    (item) => String(item.id) === String(id),
  );

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

  // SET DEFAULT COLOR
  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0].name);
    } else {
      setSelectedColor('Default');
    }

    setCurrentImageIndex(0);
  }, [product]);

  // SELECTED COLOR VARIANT
  const selectedColorVariant = useMemo(() => {
    if (!product?.colors?.length) return null;

    return (
      product.colors.find(
        (color) => color.name === selectedColor,
      ) || product.colors[0]
    );
  }, [product, selectedColor]);

  // IMAGES FOR SELECTED COLOR
  const images = useMemo(() => {
    if (selectedColorVariant?.images?.length) {
      return selectedColorVariant.images;
    }

    return [
      product?.image,
      ...(product?.hoverImage ? [product.hoverImage] : []),
    ].filter(Boolean);
  }, [product, selectedColorVariant]);

  // RESET IMAGE WHEN COLOR CHANGES
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColor]);

  if (!product) {
    return <div className='text-black p-10'>Product not found</div>;
  }

  const handlePrev = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + images.length) % images.length,
    );
  };

  const handleNext = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % images.length,
    );
  };

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
    setCurrentImageIndex(0);
  };

  const handleWishlist = () => {
    toggleWishlist({
      ...product,
      route: `/Denim-Jeans/${product.id}`,
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
      route: `/Denim-Jeans/${product.id}`,
      selectedColor: selectedColor || 'Default',
      image: images[currentImageIndex],
      images,
    };

    addToCart(
      cartProduct,
      selectedSize,
      quantity,
      selectedColor || 'Default',
    );

    setShowCart(true);

    toast.success('Item added to cart!');
  };

  return (
    <div className='bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]'>
      {/* BREADCRUMB */}
      <div className='flex items-center justify-center gap-2 md:gap-4 mt-23 text-sm md:text-base'>
        <Link to='/' className='hover:underline'>
          Home
        </Link>

        <FaChevronRight />

        <Link to='/Denim-Jeans' className='hover:underline'>
          Denim-Jeans
        </Link>

        <FaChevronRight />

        <span className='text-gray-500'>{product.name}</span>
      </div>

      <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-10'>
        {/* LEFT - IMAGES */}
        <div className='flex gap-4 w-full md:w-1/2'>
          {/* THUMBNAILS (DESKTOP) */}
          <div className='hidden md:flex flex-col gap-3'>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=''
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-20 h-24 object-cover rounded-lg cursor-pointer border ${
                  currentImageIndex === idx
                    ? 'border-black'
                    : 'border-transparent'
                }`}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className='relative w-full h-100 md:h-125'>
            {/* WISHLIST */}
            <button
              type='button'
              onClick={handleWishlist}
              className='absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow'
            >
              {isWishlisted(
                product.id,
                selectedColor || 'Default',
              ) ? (
                <FaHeart className='text-red-500' />
              ) : (
                <FaRegHeart />
              )}
            </button>

            <img
              src={images[currentImageIndex]}
              className='w-full h-full object-cover rounded-xl'
              alt='product'
            />

            {/* ARROWS */}
            <button
              type='button'
              onClick={handlePrev}
              className='absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
            >
              <FaChevronLeft />
            </button>

            <button
              type='button'
              onClick={handleNext}
              className='absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* RIGHT - INFO */}
        <div className='flex-1 space-y-6'>
          <h1 className='text-2xl md:text-3xl font-bold'>
            {product.name}
          </h1>

          {/* PRICE */}
          <div className='text-2xl font-bold'>
            ₦{product.price.toLocaleString('en-NG')}
          </div>

          {/* COLOR */}
          {product.colors?.length > 0 && (
            <div className='space-y-3'>
              <p className='font-semibold text-lg'>
                Color
                {selectedColor && (
                  <span className='ml-2 text-gray-500 font-normal'>
                    ({selectedColor})
                  </span>
                )}
              </p>

              <div className='flex flex-wrap gap-3'>
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type='button'
                    onClick={() =>
                      handleColorChange(color.name)
                    }
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                      selectedColor === color.name
                        ? 'border-black'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    <span
                      className='w-5 h-5 rounded-full border border-gray-300'
                      style={{
                        backgroundColor: color.value,
                      }}
                    />

                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
          <div className='flex items-center gap-4'>
            <p className='font-semibold text-xl'>Quantity:</p>

            <button
              type='button'
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
              className='w-10 h-10 bg-gray-100 rounded'
            >
              −
            </button>

            <span className='text-lg'>{quantity}</span>

            <button
              type='button'
              onClick={() =>
                setQuantity((q) => q + 1)
              }
              className='w-10 h-10 bg-gray-100 rounded'
            >
              +
            </button>
          </div>

          {/* SIZE */}
          <div className='space-y-4'>
            <div className='flex items-center justify'>
              <p className='font-semibold text-lg'>
                Select Size
                {selectedSize && (
                  <span className='ml-2 text-gray-500 font-normal'>
                    ({selectedSize})
                  </span>
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

          {/* SIZE CHART */}
          <button
            type='button'
            onClick={() => setShowSizeChart(true)}
            className='flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition mt-2'
          >
            <img
              src={sizechart}
              alt='Size Guide'
              className='w-50 h-15 object-contain'
            />
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

      {/* SIZE CHART */}
      {showSizeChart && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4'>
          <div className='bg-white rounded-xl p-6 max-w-xl w-full relative'>
            <button
              type='button'
              onClick={() => setShowSizeChart(false)}
              className='absolute top-3 right-4 text-2xl font-extrabold text-black'
            >
              ×
            </button>

            <h2 className='text-xl font-bold mb-4 text-black'>
              Denim & Jeans Size Guide
            </h2>

            <div className='overflow-x-auto'>
              <table className='w-full border-collapse border text-black'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border p-3'>Size</th>
                    <th className='border p-3'>Waist (in)</th>
                    <th className='border p-3'>Hip (in)</th>
                    <th className='border p-3'>Inseam (in)</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className='border p-3'>S</td>
                    <td className='border p-3'>28-30</td>
                    <td className='border p-3'>36-38</td>
                    <td className='border p-3'>30</td>
                  </tr>

                  <tr>
                    <td className='border p-3'>M</td>
                    <td className='border p-3'>31-33</td>
                    <td className='border p-3'>39-41</td>
                    <td className='border p-3'>31</td>
                  </tr>

                  <tr>
                    <td className='border p-3'>L</td>
                    <td className='border p-3'>34-36</td>
                    <td className='border p-3'>42-44</td>
                    <td className='border p-3'>32</td>
                  </tr>

                  <tr>
                    <td className='border p-3'>XL</td>
                    <td className='border p-3'>37-39</td>
                    <td className='border p-3'>45-47</td>
                    <td className='border p-3'>33</td>
                  </tr>

                  <tr>
                    <td className='border p-3'>XXL</td>
                    <td className='border p-3'>40-42</td>
                    <td className='border p-3'>48-50</td>
                    <td className='border p-3'>34</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className='text-xs text-gray-500 mt-4'>
              Measurements are approximate and may vary slightly
              depending on the fit and style.
            </p>
          </div>
        </div>
      )}

      {/* YOU MAY ALSO LIKE */}
      <YouMayAlsoLike
        products={allProducts}
        currentProductId={product.id}
      />
    </div>
  );
}

export default DenimJeanDetails;