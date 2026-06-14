
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