// import React, { useState } from 'react';
// import { FaChevronRight } from 'react-icons/fa6';
// import { Link } from 'react-router-dom';
// // eslint-disable-next-line no-unused-vars
// import { motion } from 'framer-motion';
// import { FaEye, FaShoppingCart } from 'react-icons/fa';
// import { JalabiyaDatas } from '../../../data/JalabiyaData';

// const JalabiyaData = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div className='md:px-5 font-serif'>
//       <Link to={`/jalabiya/${product.id}`}>
//         <div
//           className='relative group w-90 md:w-84   rounded-lg  shadow-lg'
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <motion.img
//             src={product.image}
//             alt={product.name}
//             className={`w-100  md:w-full h-120 md:h-120 object-cover transition-transform rounded-xl duration-300 ml-3 md:ml-0`}
//             initial={{ opacity: 1 }}
//             animate={{ opacity: isHovered ? 0 : 1 }}
//             transition={{ duration: 0.5, ease: 'easeInOut' }}
//           />

//           <motion.img
//             src={product.hoverImage}
//             alt={product.name}
//             className='absolute top-0 left-0 w-full h-120 object-cover rounded-xl ml-3 md:ml-0'
//             initial={{ opacity: 0, scale: 1 }}
//             animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 1 }}
//             transition={{ duration: 0.9, ease: 'easeInOut' }}
//           />

//           <h3 className='text-sm font-semibold  text-black px-1 bg-red-400 rounded-xl w-13 text-center relative bottom-118 left-2 ml-3 md:ml-0'>
//             NEW
//           </h3>

//           <div
//             className={`absolute inset-0 flex flex-col space-y-2  items-center justify-center space-x-4 transition-transform duration-300 ${
//               isHovered ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <button className='bg-white p-4 rounded-full cursor-pointer shadow-md hover:bg-gray-100 transition relative left-38 md:left-35 bottom-45'>
//               <FaEye size={15} className='text-gray-800 ' />
//             </button>
//             <button className='bg-white p-4 rounded-full cursor-pointer shadow-md hover:bg-gray-100 transition relative left-36 md:left-33 bottom-45'>
//               <FaShoppingCart size={15} className='text-gray-800' />
//             </button>
//           </div>
//         </div>
//       </Link>

//       <div className=' bg-white text-black ml-4 md:ml-0'>
//         <h3 className='text-sm md:text-lg font-semibold uppercase'>{product.name}</h3>
//         <p className='text-black'>₦{product.price.toLocaleString('en-NG')}</p>
//       </div>
//     </div>
//   );
// };
// const Jalabiya = () => {
//   return (
//     <div className='bg-white mt-23 z-10 pt-10'>
//       <div className='space-y-7'>
//         <h1 className='text-black text-5xl text-center '>Tshirt</h1>

//         <div className='flex items-center justify-center gap-5'>
//           <Link to={'/'} className='text-black'>
//             Home
//           </Link>{' '}
//           <FaChevronRight className='text-black w-2' />{' '}
//           <span className='text-black'>Tshirt</span>
//         </div>
//       </div>

//       <div className='grid grid-col md:grid-cols-4 gap-5 p-4 mt-25'>
//         {JalabiyaDatas.map((product) => (
//           <JalabiyaData key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Jalabiya;

import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { TshirtDatas } from '../../../data/TshirtData';

const TshirtData = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='md:px-5 font-serif'>
      <Link to={`/t-shirt/${product.id}`}>
        <div
          className='relative group w-90 md:w-84   rounded-lg  shadow-lg'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className={`w-100  md:w-full h-120 md:h-120 object-cover transition-transform rounded-xl duration-300 ml-3 md:ml-0`}
            initial={{ opacity: 1 }}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          <motion.img
            src={product.hoverImage}
            alt={product.name}
            className='absolute top-0 left-0 w-full h-120 object-cover rounded-xl ml-3 md:ml-0'
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 1 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />

          <h3 className='text-sm font-semibold  text-black px-1 bg-red-400 rounded-xl w-13 text-center relative bottom-118 left-2 ml-3 md:ml-0'>
            NEW
          </h3>

          <div
            className={`absolute inset-0 flex flex-col space-y-2  items-center justify-center space-x-4 transition-transform duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button className='bg-white p-4 rounded-full cursor-pointer shadow-md hover:bg-gray-100 transition relative left-38 md:left-35 bottom-45'>
              <FaEye size={15} className='text-gray-800 ' />
            </button>
            <button className='bg-white p-4 rounded-full cursor-pointer shadow-md hover:bg-gray-100 transition relative left-36 md:left-33 bottom-45'>
              <FaShoppingCart size={15} className='text-gray-800' />
            </button>
          </div>
        </div>
      </Link>

      <div className=' bg-white text-black ml-4 md:ml-0'>
        <h3 className='text-sm md:text-lg font-semibold uppercase'>{product.name}</h3>
        <p className='text-black'>₦{product.price.toLocaleString('en-NG')}</p>
      </div>
    </div>
  );
};
const Tshirt = () => {
  return (
    <div className='bg-white mt-23 z-10 pt-10'>
      <div className='space-y-7'>
        <h1 className='text-black text-5xl text-center '>T-shirts</h1>

        <div className='flex items-center justify-center gap-5'>
          <Link to={'/'} className='text-black'>
            Home
          </Link>{' '}
          <FaChevronRight className='text-black w-2' />{' '}
          <span className='text-black'>Tshirt</span>
        </div>
      </div>

      <div className='grid grid-col md:grid-cols-4 gap-5 p-4 mt-25'>
        {TshirtDatas.map((product) => (
          <TshirtData key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Tshirt;
