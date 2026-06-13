
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaChevronDown } from 'react-icons/fa'; 
// // eslint-disable-next-line no-unused-vars
// import { motion, AnimatePresence } from 'framer-motion';
// import Breadcrumb from '../components/Breadcrumb';

// const Category = () => {
//   const navigate = useNavigate();
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleDropdown = (menu) => {
//     setOpenDropdown(openDropdown === menu ? null : menu);
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//     setOpenDropdown(null);
//   };

//   const categories = [
//     { name: 'NEW ARRIVALS', path: '/new-arrivals' },

//     {
//       name: 'SHOP MEN',
//       key: 'men',
//       children: [
//         { name: 'Jalabiya', path: '/jalabiya' },
//         { name: 'Kafans/Shirts', path: '/kafans-shirts' },
//         { name: 'Agbada', path: '/agbada' },
//         { name: 'Casuals', path: '/casuals' },
//       ],
//     },

//     {
//       name: 'SHOP WOMEN',
//       key: 'women',
//       children: [
//         { name: 'Abaya', path: '/abaya' },
//         { name: 'Crop Top', path: '/croptop' },
//       ],
//     },

//     { name: 'DENIM', path: '/denim' },

//     {
//       name: 'ACCESSORIES',
//       key: 'accessories',
//       children: [
//         { name: 'Watches', path: '/watches' },
//         { name: 'Bags', path: '/bags' },
//         { name: 'Belts', path: '/belts' },
//       ],
//     },

//     { name: 'FOOTWEAR', path: '/footwear' },
//     { name: 'LIFESTYLE', path: '/lifestyle' },
//     { name: 'BEST SELLERS', path: '/best-sellers' },
//   ];

//   return (
//     <div className='w-full min-h-screen px-6 md:px-20 py-10 bg-white text-black'>
//       {/* BREADCRUMB */}
//       <Breadcrumb />

//       {/* TITLE */}
//       <h1 className='text-xl md:text-3xl font-bold text-center uppercase tracking-tight mb-10'>
//         Shop by Category
//       </h1>

//       {/* LIST */}
//       <div className='w-full border-t border-b'>
//         {categories.map((item, index) => {
//           const isDropdown = item.children;

//           return (
//             <div key={index} className='border-b last:border-b-0'>
//               {/* MAIN ROW */}
//               <div
//                 onClick={() =>
//                   isDropdown ? toggleDropdown(item.key) : handleNavigation(item.path)
//                 }
//                 className='flex items-center justify-between py-6 md:py-8 text-base md:text-lg font-medium tracking-wide cursor-pointer transition-colors hover:text-gray-500'
//               >
//                 <span>{item.name}</span>

//                 {isDropdown && (
//                   <motion.div
//                     animate={{ rotate: openDropdown === item.key ? 180 : 0 }}
//                     transition={{ duration: 0.25 }}
//                   >
//                     <FaChevronDown />
//                   </motion.div>
//                 )}
//               </div>

//               {/* DROPDOWN */}
//               <AnimatePresence>
//                 {openDropdown === item.key && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: 'auto', opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className='pl-6 pb-4 flex flex-col gap-3 text-sm md:text-base text-gray-500 overflow-hidden border-t border-b border-gray-100'
//                   >
//                     {item.children.map((sub, i) => (
//                       <p
//                         key={i}
//                         onClick={() => handleNavigation(sub.path)}
//                         className='cursor-pointer hover:text-black transition-colors'
//                       >
//                         {sub.name}
//                       </p>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Category;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';

const Category = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpenDropdown(null);
  };

  const categories = [
    { name: 'NEW ARRIVALS', path: '/new-arrivals' },

    {
      name: 'SHOP MEN',
      key: 'men',
      children: [
        { name: 'Jalabiya', path: '/jalabiya' },
        { name: 'Kafans/Shirts', path: '/kafans-shirts' },
        { name: 'Agbada', path: '/agbada' },
        { name: 'Casuals', path: '/casuals' },
      ],
    },

    {
      name: 'SHOP WOMEN',
      key: 'women',
      children: [
        { name: 'Abaya', path: '/abaya' },
        { name: 'Crop Top', path: '/croptop' },
      ],
    },

    { name: 'DENIM', path: '/denim' },

    {
      name: 'ACCESSORIES',
      key: 'accessories',
      children: [
        { name: 'Watches', path: '/watches' },
        { name: 'Bags', path: '/bags' },
        { name: 'Belts', path: '/belts' },
      ],
    },

    { name: 'FOOTWEAR', path: '/footwear' },
    { name: 'LIFESTYLE', path: '/lifestyle' },
    { name: 'BEST SELLERS', path: '/best-sellers' },
  ];

  return (
    <div className="w-full min-h-screen px-6  bg-white text-black">

      {/* ✅ FIXED BREADCRUMB */}
      <Breadcrumb category="Categories" />

      {/* TITLE */}
      <h1 className="text-xl md:text-3xl font-bold text-center uppercase tracking-tight mb-10">
        Shop by Category
      </h1>

      {/* LIST */}
      <div className="w-full border-t border-b">

        {categories.map((item, index) => {
          const isDropdown = item.children;

          return (
            <div key={index} className="border-b last:border-b-0">

              {/* MAIN ROW */}
              <div
                onClick={() =>
                  isDropdown
                    ? toggleDropdown(item.key)
                    : handleNavigation(item.path)
                }
                className="flex items-center justify-between py-6 md:py-8 text-base md:text-lg font-bold tracking-wide cursor-pointer transition-colors hover:text-gray-500"
              >
                <span>{item.name}</span>

                {isDropdown && (
                  <motion.div
                    animate={{ rotate: openDropdown === item.key ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FaChevronDown />
                  </motion.div>
                )}
              </div>

              {/* DROPDOWN */}
              <AnimatePresence>
                {openDropdown === item.key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pl-6 pb-4 flex flex-col gap-3 text-sm md:text-base text-gray-500 overflow-hidden border-t border-b border-gray-100"
                  >
                    {item.children.map((sub, i) => (
                      <p
                        key={i}
                        onClick={() => handleNavigation(sub.path)}
                        className="cursor-pointer hover:text-black transition-colors"
                      >
                        {sub.name}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Category;
