import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { TshirtDatas } from '../../data/TshirtData';
import { useCart } from '../../Context/cartContext';

import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../../Context/WishlistContext';

function TshirtDetails() {
  const { id } = useParams();
  const product = TshirtDatas.find((item) => item.id === id);

  const { toggleWishlist, isWishlisted } = useWishlist();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const scrollRef = useRef(null);
  const { addToCart, setShowCart , cartItems} = useCart();

  if (!product) return <div className='text-black p-10'>Product not found</div>;

  const images = [product.image, product.hoverImage];

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleAddToCart = () => {
  if (product.sizes?.length > 0 && !selectedSize) {
    toast.error('Please select a size!', {
      id: 'size-error',
      duration: 1000,
    });
    return;
  }

  const existingItem = cartItems.find(
    (item) =>
      item.id === product.id &&
      item.selectedSize === selectedSize
  );

  addToCart(product, selectedSize, quantity);

  if (existingItem) {
    toast.success('Cart updated!', {
      id: 'cart-updated',
      duration: 2000,
    });
  } else {
    toast.success('Item added to cart!', {
      id: 'add-cart-success',
      duration: 2000,
    });
  }

  setShowCart(true);
};

  return (
    <div className='bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]'>
      <div className='flex items-center justify-center gap-2 md:gap-5 mt-23'>
        <Link to={'/'} className='text-sm md:text-lg text-black'>
          Home
        </Link>
        <FaChevronRight className='text-black w-2' />
        <Link to={'/t-shirts'} className='text-black text-sm md:text-lg'>
          Tshirt
        </Link>
        <FaChevronRight className='text-black w-2' />
        <span className='text-sm'>{product.name}</span>
      </div>


      <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mt-23'>
        {/* Left section - Images */}
        <div className='flex gap-4'>
          {/* Desktop Thumbnails */}
          <div className='hidden md:flex gap-4'>
            <div className='flex flex-col gap-3'>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumb ${idx}`}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-20 h-24 rounded-lg cursor-pointer border-2 ${currentImageIndex === idx ? 'border-yellow-400' : 'border-transparent'}`}
                />
              ))}
            </div>
          </div>
          <div className='relative w-100 h-125 md:h-175'>
            <button
              onClick={() =>
                toggleWishlist({
                  ...product,
                  route: `/bestseller/products/${product.id}`,
                })
              }
              className='absolute top-4 right-4 z-20 bg-white/1 p-3 rounded-full shadow-md'
            >
              {isWishlisted(product.id) ? (
                <FaHeart className='text-[#ff0000] text-xl' />
              ) : (
                <FaRegHeart className='text-xl' />
              )}
            </button>

            <img
              src={images[currentImageIndex]}
              alt='Product'
              className='w-full h-full object-cover rounded-xl'
            />

            <button
              onClick={handlePrev}
              className='absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={handleNext}
              className='absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Mobile Images */}
          <div
            ref={scrollRef}
            onScroll={() => {
              const scrollLeft = scrollRef.current.scrollLeft;
              const width = scrollRef.current.offsetWidth;
              setCurrentImageIndex(Math.round(scrollLeft / width));
            }}
            className='md:hidden w-full overflow-x-auto snap-x snap-mandatory flex gap-4 scroll-smooth no-scrollbar'
          >
            {images.map((img, index) => (
              <div key={index} className=' shrink-0 w-full snap-center'>
                <img
                  src={img}
                  alt={`Mobile Product ${index}`}
                  className='w-full h-125 object-cover rounded-xl'
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Dot Indicators */}
        <div className='flex justify-center mt-4 gap-2 md:hidden'>
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentImageIndex === index ? 'bg-yellow-400' : 'bg-gray-400'}`}
            />
          ))}
        </div>

        {/* Right section - Product Info */}
        <div className='flex-1 space-y-6'>
          <h2 className='text-3xl font-bold'>
  {product.name}
</h2>

<div className='text-2xl font-bold text-black font-[cinzel]'>
  ₦{product.price.toLocaleString('en-NG')}

 
</div>

{product.description && (
  <p className='text-gray-600 leading-relaxed'>
    {product.description}
  </p>
)}

{/* SIZE */}
<div>
  <p className='mb-2 font-semibold text-lg'>
    Select Size:
    {selectedSize && (
      <span className='text-black ml-2'>
        {selectedSize}
      </span>
    )}
  </p>

  <div className='flex flex-wrap gap-2'>
    {product.sizes.map((size) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`
          px-4 py-2
          border
          rounded-lg
          transition-all
          duration-300
          ${
            selectedSize === size
              ? 'bg-black text-white border-black'
              : 'border-gray-300 hover:bg-gray-200'
          }
        `}
      >
        {size}
      </button>
    ))}
  </div>
</div>

{/* QUANTITY */}
<div className='flex items-center gap-4'>
  <p className='font-semibold'>
    Quantity:
  </p>

  <button
    onClick={() =>
      setQuantity((q) => Math.max(1, q - 1))
    }
    className='w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded'
  >
    −
  </button>

  <span className='text-xl'>
    {quantity}
  </span>

  <button
    onClick={() => setQuantity((q) => q + 1)}
    className='w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded'
  >
    +
  </button>
</div>

{/* BUTTONS */}
<div className='flex flex-col md:flex-row gap-4'>

  <button
    onClick={handleAddToCart}
    className='w-full md:w-55 border py-3 rounded-xl hover:bg-black hover:text-white transition'
  >
    Add to Cart
  </button>

  <button className='w-full md:w-55 bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition'>
    Buy it now
  </button>

</div>
        </div>
      </div>
    </div>
  );
}

export default TshirtDetails;
