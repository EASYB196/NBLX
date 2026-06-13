import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ text = 'Shop all products', link = '/collections', className = '' }) => {
  return (
    <div className='flex items-center justify-center p-5'>
      <Link to={link}>
        <button
          className={`
            py-3 px-5 bg-white cursor-pointer text-black border
            text-xl font-semibold rounded-md
            transition-transform duration-300
            hover:scale-110 capitalize
            ${className}
          `}
        >
          {text}
        </button>
      </Link>
    </div>
  );
};

export default Button;
