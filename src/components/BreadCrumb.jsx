// import React from 'react';
// import { Link } from 'react-router-dom';

// const Breadcrumb = ({ category, productName }) => {
//   const scrollToBestSellers = () => {
//     const section = document.getElementById('best-sellers');

//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//     } else {
//       // fallback if user is on another page
//       window.location.href = '/#best-sellers';
//     }
//   };

//   return (
//     <div className='flex items-center flex-wrap gap-2 bg-white text-sm md:text-base px-4 md:px-10 py-4 mb-10 mt-20 border-b'>
//       {/* HOME */}
//       <Link to='/' className='text-gray-600 hover:text-black transition'>
//         Home
//       </Link>

//       {/* CATEGORY (SCROLL ACTION) */}
//       {category && (
//         <>
//           <span>/</span>

//           <button
//             onClick={scrollToBestSellers}
//             className='text-gray-600 font-medium hover:text-black transition'
//           >
//             {category}
//           </button>
//         </>
//       )}

//       {/* PRODUCT NAME */}
//       {productName && (
//         <>
//           <span>/</span>

//           <span className='text-gray-600 truncate max-w-50 md:max-w-full'>{productName}</span>
//         </>
//       )}
//     </div>
//   );
// };

// export default Breadcrumb;

import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({
  category,
  productName,
  categoryLink,
}) => {
  return (
    <div className='flex items-center flex-wrap gap-2 bg-white text-sm md:text-base px-4 md:px-10 py-4 mb-10 mt-20 border-b'>
      <Link
        to='/'
        className='text-gray-600 hover:text-black transition'
      >
        Home
      </Link>

      {category && (
        <>
          <span>/</span>

          {categoryLink ? (
            <Link
              to={categoryLink}
              className='text-gray-600 hover:text-black transition'
            >
              {category}
            </Link>
          ) : (
            <span className='text-gray-600'>
              {category}
            </span>
          )}
        </>
      )}

      {productName && (
        <>
          <span>/</span>

          <span className='text-gray-600 truncate max-w-50 md:max-w-full'>
            {productName}
          </span>
        </>
      )}
    </div>
  );
};

export default Breadcrumb;