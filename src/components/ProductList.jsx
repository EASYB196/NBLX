// import React, { useState } from 'react';
// import { ProductData } from '../data/ProductData';
// import { FaEye, FaShoppingCart } from 'react-icons/fa';
// import { Link } from 'react-router';
// // eslint-disable-next-line no-unused-vars
// import { motion } from 'framer-motion';

// const ProductCard = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div className='md:px-5'>
//       <Link to={`/products/${product.id}`}>
//         <div
//           className='relative group w-90 md:w-84   rounded-lg  shadow-lg'
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <motion.img
//             src={product.image}
//             alt={product.name}
//             className={`w-40  md:w-full h-70 md:h-120 object-cover transition-transform rounded-xl duration-300 ml-3 md:ml-0`}
//             initial={{ opacity: 1 }}
//             animate={{ opacity: isHovered ? 0 : 1 }}
//             transition={{ duration: 0.5, ease: 'easeInOut' }}
//           />

//           <motion.img
//             src={product.hoverImage}
//             alt={product.name}
//             className='absolute top-0 left-0 w-40 md:w-full h-70 md:h-120 object-cover rounded-xl ml-3 md:ml-0 '
//             initial={{ opacity: 0, scale: 1 }}
//             animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 1 }}
//             transition={{ duration: 0.9, ease: 'easeInOut' }}
//           />

//           <h3 className='text-sm font-semibold  text-white px-1 bg-red-400 rounded-xl w-10 md:w-13 text-center relative bottom-68 md:bottom-118 left-3 md:left-2 ml-3 md:ml-0'>
//             NEW
//           </h3>

//           <div
//             className={`absolute inset-0 flex flex-col space-y-2  items-center justify-center space-x-4 transition-transform duration-300 ${
//               isHovered ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <button className='bg-white p-2 rounded-full cursor-pointer shadow-md hover:bg-yellow-500 transition relative -left-6 md:left-35 bottom-25 md:bottom-50'>
//               <FaEye size={12} className='text-gray-800 hover:text-white ' />
//             </button>
//             <button className='bg-white p-2 rounded-full cursor-pointer shadow-md hover:bg-yellow-500 transition relative -left-8 md:left-33 bottom-25  md:bottom-50'>
//               <FaShoppingCart size={12} className='text-gray-800 hover:text-white ' />
//             </button>
//           </div>
//         </div>
//       </Link>

//       <div className=' bg-white text-black ml-4 md:ml-0'>
//         <h3 className='text-sm md:text-lg font-semibold uppercase'>{product.name}</h3>
//         <p className='text-black font-[cinzel] font-bold'>
//           {' '}
//           ₦{product.price.toLocaleString('en-NG')}
//         </p>
//         <Link to={`/product/${product.id}`}></Link>
//       </div>
//     </div>
//   );
// };

// const ProductList = () => {
//   return (
//     <div className='relative bg-white grid grid-cols-1 md:grid-cols-12 gap-1 p-4 pt-0'>
//       {/* LEFT HERO IMAGE (BIG FEATURED) */}
//       <div className='md:col-span-7 border border-gray-400 h-[150vh] bg-gray-100 overflow-hidden'>
//         <img
//           src={ProductData[0].image}
//           alt='featured'
//           className='w-full h-full object-cover object-top'
//         />
//       </div>
//       {/* RIGHT SIDE PRODUCTS (MANUAL SLIDER) */}
//       <div className='md:col-span-5 flex items-center justify-center'>
//         <div
//           className='
//       w-full
//       overflow-x-auto
//       flex
//       gap-6
//       px-2
//       scroll-smooth
//       snap-x
//       snap-mandatory
//       hide-scrollbar
//     '
//         >
//           {/* ITEM 1 */}
//           <div className='min-w-55 border h-screen shrink-0 snap-start bg-white flex items-center justify-center'>
//             <ProductCard product={ProductData[1]} />
//           </div>

//           {/* ITEM 2 */}
//           <div className='min-w-55 border h-screen shrink-0 snap-start bg-white flex items-center justify-center'>
//             <ProductCard product={ProductData[2]} />
//           </div>

//           {/* ITEM 3 */}
//           {/* <div className='min-w-55 border h-screen shrink-0 snap-start bg-white flex items-center justify-center'>
//             <ProductCard product={ProductData[1]} />
//           </div> */}

//           {/* ITEM 4 */}
//           {/* <div className='min-w-55 border h-screen shrink-0 snap-start bg-white flex items-center justify-center'>
//             <ProductCard product={ProductData[2]} />
//           </div> */}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ProductList;

import React, { useState } from 'react';
import { ProductData } from '../data/ProductData';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='w-full'>
      <Link to={`/products/${product.id}`}>
        <div
          className='relative overflow-hidden rounded-2xl bg-gray-100 group cursor-pointer'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* MAIN IMAGE */}
          <motion.img
            src={product.image}
            alt={product.name}
            className='w-full h-70 sm:h-95 md:h-125 lg:h-155 object-cover object-top rounded-2xl'
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />

          {/* HOVER IMAGE */}
          <motion.img
            src={product.hoverImage}
            alt={product.name}
            className='absolute inset-0 w-full h-70 sm:h-95 md:h-125 lg:h-155 object-cover object-top rounded-2xl'
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />

          {/* NEW BADGE */}
          <div className='absolute top-3 left-3 z-20'>
            <span className='bg-red-500 text-white text-[10px] sm:text-xs md:text-sm px-3 py-1 rounded-full font-semibold tracking-wide'>
              NEW
            </span>
          </div>

          {/* HOVER ACTIONS */}
          <div
            className={`absolute inset-0 flex items-center justify-end pr-4 md:pr-6 gap-3 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          ></div>

          {/* OPTIONAL OVERLAY */}
          <div className='absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-300 rounded-2xl' />
        </div>
      </Link>

      {/* PRODUCT INFO */}
      <div className='mt-4 px-1'>
        <h3 className='text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide text-black line-clamp-1'>
          {product.name}
        </h3>

        <p className='text-sm sm:text-base md:text-lg font-bold font-[cinzel] text-black mt-1'>
          ₦{product.price.toLocaleString('en-NG')}
        </p>
      </div>
    </div>
  );
};

const ProductList = () => {
  return (
    <section className='bg-white px-4 md:px-6 lg:px-10 py-6'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8'>
        {/* LEFT FEATURED IMAGE */}
        <div className='lg:col-span-7'>
          <div className='overflow-hidden rounded-3xl bg-gray-100 h-100 sm:h-137.5 md:h-175 lg:h-full'>
            <img
              src={ProductData[0].image}
              alt='featured'
              className='w-full h-full object-cover object-top hover:scale-105 transition duration-700'
            />
          </div>
        </div>

        {/* RIGHT PRODUCTS */}
        <div className='lg:col-span-5'>
          <div
            className='
              flex
              gap-5
              overflow-x-auto
              scroll-smooth
              snap-x
              snap-mandatory
              hide-scrollbar
              pb-2
            '
          >
            {/* CARD 1 */}
            <div className='min-w-[75%] sm:min-w-[55%] md:min-w-[48%] lg:min-w-[85%] snap-start shrink-0'>
              <ProductCard product={ProductData[1]} />
            </div>

            {/* CARD 2 */}
            <div className='min-w-[75%] sm:min-w-[55%] md:min-w-[48%] lg:min-w-[85%] snap-start shrink-0'>
              <ProductCard product={ProductData[2]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
