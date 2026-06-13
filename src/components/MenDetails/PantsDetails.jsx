// import React, { useState, useRef } from 'react';
// import toast from 'react-hot-toast';
// import { useParams, Link } from 'react-router-dom';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
// import { PantsDatas } from '../../data/AgbadaData';
// import { useCart } from '../../Context/cartContext';

// function PantsDetails() {
//   const { id } = useParams();
//   const product = PantsDatas.find((item) => item.id === id);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const scrollRef = useRef(null);
//   const { addToCart, setShowCart } = useCart();

//   if (!product) return <div className='text-white p-10'>Product not found</div>;

//   const images = [product.image, product.hoverImage];

//   const handlePrev = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const handleNext = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
//   };

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       toast.error('Please select a size!', {
//         duration: 3000,
//         style: {
//           border: '1px solid #facc15',
//           padding: '16px',
//           color: 'black',
//           fontWeight: 'bold',
//           backgroundColor: '#fef08a',
//         },
//         iconTheme: {
//           primary: '#facc15',
//           secondary: '#fff',
//         },
//       });
//       return;
//     }

//     addToCart(product, selectedSize, quantity);
//     setShowCart(false); // Open the cart drawer
//     toast.success('Item added to cart!', {
//       duration: 3000,
//       style: {
//         border: '1px solid #4ade80',
//         padding: '16px',
//         color: '#000',
//         backgroundColor: '#bbf7d0',
//       },
//       iconTheme: {
//         primary: '#22c55e',
//         secondary: '#fff',
//       },
//     });
//   };

//   return (
//     <div className='bg-black text-white min-h-screen py-10 px-4 md:px-10 font-[Raleway]'>
//       <div className='flex items-center justify-center gap-2 md:gap-5 mt-23'>
//         <Link to={'/'} className='text-sm md:text-lg text-white'>
//           Home
//         </Link>
//         <FaChevronRight className='text-white w-2' />
//         <Link to={'/agbada'} className='text-white text-sm md:text-lg'>
//           Agbada
//         </Link>
//         <FaChevronRight className='text-white w-2' />
//         <span className='text-sm'>{product.name}</span>
//       </div>
//       <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mt-23'>
//         {/* Left section - Images */}
//         <div className='flex gap-4'>
//           {/* Desktop Thumbnails */}
//           <div className='hidden md:flex gap-4'>
//             <div className='flex flex-col gap-3'>
//               {images.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img}
//                   alt={`Thumb ${idx}`}
//                   onClick={() => setCurrentImageIndex(idx)}
//                   className={`w-20 h-24 rounded-lg cursor-pointer border-2 ${currentImageIndex === idx ? 'border-yellow-400' : 'border-transparent'}`}
//                 />
//               ))}
//             </div>

//             <div className='relative w-100 h-125 md:h-175'>
//               <img
//                 src={images[currentImageIndex]}
//                 alt='Main Product'
//                 className='w-full h-full object-cover rounded-xl'
//               />
//               <button
//                 onClick={handlePrev}
//                 className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full'
//               >
//                 <FaChevronLeft />
//               </button>
//               <button
//                 onClick={handleNext}
//                 className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full'
//               >
//                 <FaChevronRight />
//               </button>
//             </div>
//           </div>

//           {/* Mobile Images */}
//           <div
//             ref={scrollRef}
//             onScroll={() => {
//               const scrollLeft = scrollRef.current.scrollLeft;
//               const width = scrollRef.current.offsetWidth;
//               setCurrentImageIndex(Math.round(scrollLeft / width));
//             }}
//             className='md:hidden w-full overflow-x-auto snap-x snap-mandatory flex gap-4 scroll-smooth no-scrollbar'
//           >
//             {images.map((img, index) => (
//               <div key={index} className='shrink-0 w-full snap-center'>
//                 <img
//                   src={img}
//                   alt={`Mobile Product ${index}`}
//                   className='w-full h-125 object-cover rounded-xl'
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Mobile Dot Indicators */}
//         <div className='flex justify-center mt-4 gap-2 md:hidden'>
//           {images.map((_, index) => (
//             <span
//               key={index}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${currentImageIndex === index ? 'bg-yellow-400' : 'bg-gray-400'}`}
//             />
//           ))}
//         </div>

//         {/* Right section - Product Info */}
//         <div className='flex-1 space-y-6'>
//           <h2 className='ml-5 md:ml-0 text-3xl font-bold'>{product.name}</h2>
//           <p className='text-white font-semibold'>
//             Only {product.inStock} item(s) left in stock!
//           </p>
//           <div className='flex'>
//             <div className='bg-red-600 h-1 w-20 rounded-full absolute'></div>
//             <div className='bg-white h-1 w-75 md:w-90 rounded-full relative left-10'></div>
//           </div>

//           {/* Price */}
//           <div className='text-2xl font-bold text-yellow-400 font-[cinzel]'>
//             ₦{product.price.toLocaleString('en-NG')}
//             <span className='line-through ml-3 text-gray-400 text-lg'>
//               ₦{product.oldPrice.toLocaleString('en-NG')}
//             </span>
//           </div>

//           {/* Size selection */}
//           <div>
//             <p className='mb-2 font-semibold'>
//               Select a Size: <span className='text-yellow-400'>{selectedSize}</span>
//             </p>
//             <div className='flex flex-wrap gap-2'>
//               {product.sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-4 py-2 border rounded transition ${
//                     selectedSize === size
//                       ? 'bg-yellow-500 text-black font-bold'
//                       : 'border-white text-white hover:bg-white hover:text-black'
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Quantity selection */}
//           <div className='flex items-center gap-4 mt-4'>
//             <p className='font-semibold'>Quantity:</p>
//             <button
//               onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//               className='w-10 h-10 bg-gray-800 rounded text-xl cursor-pointer'
//             >
//               −
//             </button>
//             <span className='text-xl'>{quantity}</span>
//             <button
//               onClick={() => setQuantity((q) => q + 1)}
//               className='w-10 h-10 bg-gray-800 rounded text-xl cursor-pointer'
//             >
//               +
//             </button>
//           </div>

//           {/* Add to cart button */}
//           <button
//             onClick={handleAddToCart}
//             className='w-full md:w-1/2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl mt-6 cursor-pointer'
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PantsDetails;



import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';

import { PantsDatas } from '../../data/PantsData';
import { useCart } from '../../Context/cartContext';
import { useWishlist } from '../../Context/WishlistContext';

function PantsDetails() {
  const { id } = useParams();
  const product = PantsDatas.find((item) => String(item.id) === String(id));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  // const scrollRef = useRef(null);

  const { addToCart, setShowCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (!product) {
    return <div className="text-black p-10">Product not found</div>;
  }

  const images = [product.image, ...(product.hoverImage ? [product.hoverImage] : [])];

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size!');
      return;
    }

    addToCart(product, selectedSize, quantity);
    setShowCart(true);

    toast.success('Item added to cart!');
  };

  return (
    <div className="bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]">

      {/* BREADCRUMB */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mt-23 text-sm md:text-base">
        <Link to="/" className="hover:underline">Home</Link>
        <FaChevronRight />
        <Link to="/Pants" className="hover:underline">Pants</Link>
        <FaChevronRight />
        <span className="text-gray-500">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-10">

        {/* LEFT - IMAGES */}
        <div className="flex gap-4 w-full md:w-1/2">

          {/* THUMBNAILS (DESKTOP) */}
          <div className="hidden md:flex flex-col gap-3">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-20 h-24 object-cover rounded-lg cursor-pointer border ${
                  currentImageIndex === idx ? 'border-black' : 'border-transparent'
                }`}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="relative w-full h-[400px] md:h-[500px]">

            {/* WISHLIST */}
            <button
              onClick={() =>
                toggleWishlist({
                  ...product,
                  route: `/pants/${product.id}`,
                })
              }
              className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow"
            >
              {isWishlisted(product.id) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart />
              )}
            </button>

            <img
              src={images[currentImageIndex]}
              className="w-full h-full object-cover rounded-xl"
              alt="product"
            />

            {/* ARROWS */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* RIGHT - INFO */}
        <div className="flex-1 space-y-6">

          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

          {/* PRICE */}
          <div className="text-2xl font-bold">
            ₦{product.price.toLocaleString('en-NG')}
          </div>

          {/* SIZE */}
          <div>
            <p className="mb-2 font-semibold">
              Select Size:{' '}
              <span className="text-gray-600">{selectedSize}</span>
            </p>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg transition ${
                    selectedSize === size
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-4">
            <p className="font-semibold">Quantity:</p>

            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 bg-gray-100 rounded"
            >
              −
            </button>

            <span className="text-lg">{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 bg-gray-100 rounded"
            >
              +
            </button>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={handleAddToCart}
            className="w-full md:w-1/2 bg-black text-white py-3 rounded-xl hover:bg-gray-900"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default PantsDetails;

