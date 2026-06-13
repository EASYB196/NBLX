



import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { OuterwearJacketsDatas } from '../../../data/OuterwearJacketsData';

const OuterwearJacketData = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="font-serif">
      <Link to={`/Outerwear-Jackets/${product.id}`}>
        <div
          className="relative group rounded-lg shadow-lg overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Image */}
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-112.5 object-cover rounded-xl"
            initial={{ opacity: 1 }}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          {/* Hover Image */}
          <motion.img
            src={product.hoverImage}
            alt={product.name}
            className="absolute inset-0 w-full h-112.5 object-cover rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          {/* NEW Badge */}
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            NEW
          </span>

          {/* Action Buttons */}
          <div
            className={`absolute inset-0 flex flex-col items-end justify-center pr-4 gap-3 transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              type="button"
              className="bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
            >
              <FaEye className="text-gray-800" size={16} />
            </button>

            <button
              type="button"
              className="bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
            >
              <FaShoppingCart className="text-gray-800" size={16} />
            </button>
          </div>
        </div>
      </Link>

      {/* Product Details */}
      <div className="bg-white text-black mt-3">
        <h3 className="text-sm md:text-lg font-semibold uppercase">
          {product.name}
        </h3>

        <p className="text-black font-medium">
          ₦{product.price.toLocaleString('en-NG')}
        </p>
      </div>
    </div>
  );
};

const OuterwearJacket = () => {
  return (
    <div className="bg-white mt-23 pt-10 min-h-screen">
      {/* Header */}
      <div className="space-y-7">
        <h1 className="text-black text-3xl md:text-5xl text-center">
          Outerwear & Jackets
        </h1>

        <div className="flex items-center justify-center gap-3">
          <Link to="/" className="text-black hover:text-gray-600">
            Home
          </Link>

          <FaChevronRight className="text-black text-xs" />

          <span className="text-black">Outerwear & Jackets</span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6 mt-12">
        {OuterwearJacketsDatas.map((product) => (
          <OuterwearJacketData
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default OuterwearJacket;