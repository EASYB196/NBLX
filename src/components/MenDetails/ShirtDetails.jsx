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

// import { ShirtData } from '../../data/ShirtData';
// import { PantsDatas } from '../../data/PantsData';
// import { BestSellerData } from '../../data/BestSellerData';
// import { TshirtDatas } from '../../data/TshirtData';
// import { DenimJeansDatas } from '../../data/DenimJeanData.js';

// import { useCart } from '../../Context/cartContext';
// import { useWishlist } from '../../Context/WishlistContext';

// import sizechart from '../../assets/images/sizechart.png';

// function ShirtDetails() {
//   const { id } = useParams();

//   const product = ShirtData.find(
//     (item) => String(item.id) === String(id)
//   );

//   const allProducts = [
//     ...ShirtData,
//     ...PantsDatas,
//     ...BestSellerData,
//     ...TshirtDatas,
//     ...DenimJeansDatas,
//   ];

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [showSizeChart, setShowSizeChart] = useState(false);

//   const { addToCart } = useCart();
//   const { toggleWishlist, isWishlisted } = useWishlist();

//   if (!product) {
//     return (
//       <div className='text-black p-10'>
//         Product not found
//       </div>
//     );
//   }

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

//     addToCart(product, selectedSize, quantity);

//     toast.success('Item added to cart!');
//   };

//   return (
//     <div className='bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]'>

//       {/* BREADCRUMB */}
//       <div className='flex items-center justify-center gap-2 md:gap-4 mt-23 text-sm md:text-base'>
//         <Link
//           to='/'
//           className='hover:underline'
//         >
//           Home
//         </Link>

//         <FaChevronRight />

//         <Link
//           to='/shirts'
//           className='hover:underline'
//         >
//           Shirt
//         </Link>

//         <FaChevronRight />

//         <span className='text-gray-500'>
//           {product.name}
//         </span>
//       </div>

//       {/* PRODUCT */}
//       <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-10'>

//         {/* LEFT - IMAGES */}
//         <div className='flex gap-4 w-full md:w-1/2'>

//           {/* THUMBNAILS */}
//           <div className='hidden md:flex flex-col gap-3'>
//             {images.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt=''
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
//           <div className='relative w-full h-100 md:h-125'>

//             {/* WISHLIST */}
//             <button
//               type='button'
//               onClick={() =>
//                 toggleWishlist({
//                   ...product,
//                   route: `/shirts/${product.id}`,
//                 })
//               }
//               className='absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow'
//             >
//               {isWishlisted(product.id) ? (
//                 <FaHeart className='text-red-500' />
//               ) : (
//                 <FaRegHeart />
//               )}
//             </button>

//             <img
//               src={images[currentImageIndex]}
//               className='w-full h-full object-cover rounded-xl'
//               alt='product'
//             />

//             {/* ARROWS */}
//             {images.length > 1 && (
//               <>
//                 <button
//                   type='button'
//                   onClick={handlePrev}
//                   className='absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
//                 >
//                   <FaChevronLeft />
//                 </button>

//                 <button
//                   type='button'
//                   onClick={handleNext}
//                   className='absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
//                 >
//                   <FaChevronRight />
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* RIGHT - INFO */}
//         <div className='flex-1 space-y-6'>

//           <h1 className='text-2xl md:text-3xl font-bold'>
//             {product.name}
//           </h1>

//           {/* PRICE */}
//           <div className='text-2xl font-bold'>
//             ₦{product.price.toLocaleString('en-NG')}
//           </div>

//           {/* QUANTITY */}
//           <div className='flex items-center gap-4'>
//             <p className='font-semibold text-xl'>
//               Quantity:
//             </p>

//             <button
//               type='button'
//               onClick={() =>
//                 setQuantity((q) => Math.max(1, q - 1))
//               }
//               className='w-10 h-10 bg-gray-100 rounded'
//             >
//               −
//             </button>

//             <span className='text-lg'>
//               {quantity}
//             </span>

//             <button
//               type='button'
//               onClick={() =>
//                 setQuantity((q) => q + 1)
//               }
//               className='w-10 h-10 bg-gray-100 rounded'
//             >
//               +
//             </button>
//           </div>

//           {/* SIZE */}
//           <div className='space-y-4'>

//             <p className='font-semibold text-lg'>
//               Select Size

//               {selectedSize && (
//                 <span className='ml-2 text-gray-500 font-normal'>
//                   ({selectedSize})
//                 </span>
//               )}
//             </p>

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
//             <img
//               src={sizechart}
//               alt='Size Guide'
//               className='w-50 h-15 object-contain'
//             />
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

//       {/* SIZE CHART MODAL */}
//       {showSizeChart && (
//         <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4'>
//           <div className='bg-white rounded-xl p-6 max-w-lg w-full relative'>

//             <button
//               type='button'
//               onClick={() => setShowSizeChart(false)}
//               className='absolute top-3 right-4 text-2xl font-extrabold'
//             >
//               ×
//             </button>

//             <h2 className='text-xl font-bold mb-4'>
//               Shirt Size Guide
//             </h2>

//             <div className='overflow-x-auto'>
//               <table className='w-full border'>

//                 <thead>
//                   <tr className='bg-gray-100'>
//                     <th className='border p-2'>Size</th>
//                     <th className='border p-2'>Chest</th>
//                     <th className='border p-2'>Length</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   <tr>
//                     <td className='border p-2'>S</td>
//                     <td className='border p-2'>36-38</td>
//                     <td className='border p-2'>40</td>
//                   </tr>

//                   <tr>
//                     <td className='border p-2'>M</td>
//                     <td className='border p-2'>38-40</td>
//                     <td className='border p-2'>41</td>
//                   </tr>

//                   <tr>
//                     <td className='border p-2'>L</td>
//                     <td className='border p-2'>40-42</td>
//                     <td className='border p-2'>42</td>
//                   </tr>

//                   <tr>
//                     <td className='border p-2'>XL</td>
//                     <td className='border p-2'>42-44</td>
//                     <td className='border p-2'>43</td>
//                   </tr>
//                 </tbody>

//               </table>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* YOU MAY ALSO LIKE */}
//       <YouMayAlsoLike
//         products={allProducts}
//         currentProductId={product.id}
//       />

//     </div>
//   );
// }

// export default ShirtDetails;



import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa6';

import YouMayAlsoLike from '../../components/YouMayAlsoLike';

import { ShirtData } from '../../data/ShirtData';
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



import { useCart } from '../../Context/cartContext';
import { useWishlist } from '../../Context/WishlistContext';

import sizechart from '../../assets/images/sizechart.png';

function ShirtDetails() {
  const { id } = useParams();

  const product = ShirtData.find(
    (item) => String(item.id) === String(id)
  );

  const allProducts = [
    ...AccessoriesDatas.map((item) => ({ ...item, route: `/accessories/${item.id}` })),
    ...ShirtData.map((item) => ({ ...item, route: `/shirts/${item.id}` })),
    ...PantsDatas.map((item) => ({ ...item, route: `/pants/${item.id}` })),
    ...BestSellerData.map((item) => ({ ...item, route: `/best-seller/${item.id}` })),
    ...TshirtDatas.map((item) => ({ ...item, route: `/tshirt/${item.id}` })),
    ...DenimJeansDatas.map((item) => ({ ...item, route: `/denim-jeans/${item.id}` })),
    ...FemalePantDatas.map((item) => ({ ...item, route: `/female-pant/${item.id}` })),
    ...TopDatas.map((item) => ({ ...item, route: `/tops/${item.id}` })),
    ...OuterwearJacketsDatas.map((item) => ({ ...item, route: `/Outerwear-Jackets/${item.id}` })),
    ...SkirtsDatas.map((item) => ({ ...item, route: `/skirts/${item.id}` })),
    ...DressesDatas.map((item) => ({ ...item, route: `/dresses/${item.id}` })),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (!product) {
    return (
      <div className='text-black p-10'>
        Product not found
      </div>
    );
  }

  const images = [
    product.image,
    ...(product.hoverImage ? [product.hoverImage] : []),
  ];

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

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size!');
      return;
    }

    // Save this product's detail-page route in the cart
    addToCart(
      {
        ...product,
        route: `/shirts/${product.id}`,
      },
      selectedSize,
      quantity
    );

    toast.success('Item added to cart!');
  };

  return (
    <div className='bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]'>

      {/* BREADCRUMB */}
      <div className='flex items-center justify-center gap-2 md:gap-4 mt-23 text-sm md:text-base'>
        <Link
          to='/'
          className='hover:underline'
        >
          Home
        </Link>

        <FaChevronRight />

        <Link
          to='/shirts'
          className='hover:underline'
        >
          Shirt
        </Link>

        <FaChevronRight />

        <span className='text-gray-500'>
          {product.name}
        </span>
      </div>

      {/* PRODUCT */}
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-10'>

        {/* LEFT - IMAGES */}
        <div className='flex gap-4 w-full md:w-1/2'>

          {/* THUMBNAILS */}
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
              onClick={() =>
                toggleWishlist({
                  ...product,
                  route: `/shirts/${product.id}`,
                })
              }
              className='absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow'
            >
              {isWishlisted(product.id) ? (
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
            {images.length > 1 && (
              <>
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
              </>
            )}
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

          {/* QUANTITY */}
          <div className='flex items-center gap-4'>
            <p className='font-semibold text-xl'>
              Quantity:
            </p>

            <button
              type='button'
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
              className='w-10 h-10 bg-gray-100 rounded'
            >
              −
            </button>

            <span className='text-lg'>
              {quantity}
            </span>

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

            <p className='font-semibold text-lg'>
              Select Size

              {selectedSize && (
                <span className='ml-2 text-gray-500 font-normal'>
                  ({selectedSize})
                </span>
              )}
            </p>

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

      {/* SIZE CHART MODAL */}
      {showSizeChart && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4'>
          <div className='bg-white rounded-xl p-6 max-w-lg w-full relative'>

            <button
              type='button'
              onClick={() => setShowSizeChart(false)}
              className='absolute top-3 right-4 text-2xl font-extrabold'
            >
              ×
            </button>

            <h2 className='text-xl font-bold mb-4'>
              Shirt Size Guide
            </h2>

            <div className='overflow-x-auto'>
              <table className='w-full border'>

                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border p-2'>Size</th>
                    <th className='border p-2'>Chest</th>
                    <th className='border p-2'>Length</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className='border p-2'>S</td>
                    <td className='border p-2'>36-38</td>
                    <td className='border p-2'>40</td>
                  </tr>

                  <tr>
                    <td className='border p-2'>M</td>
                    <td className='border p-2'>38-40</td>
                    <td className='border p-2'>41</td>
                  </tr>

                  <tr>
                    <td className='border p-2'>L</td>
                    <td className='border p-2'>40-42</td>
                    <td className='border p-2'>42</td>
                  </tr>

                  <tr>
                    <td className='border p-2'>XL</td>
                    <td className='border p-2'>42-44</td>
                    <td className='border p-2'>43</td>
                  </tr>
                </tbody>

              </table>
            </div>
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

export default ShirtDetails;