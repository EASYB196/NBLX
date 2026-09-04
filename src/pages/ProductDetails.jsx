// import React, { useState, useRef } from 'react';
// import toast from 'react-hot-toast';
// import { useParams } from 'react-router-dom';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
// import { useCart } from '../Context/cartContext';
// import sizechart from '../assets/images/sizechart.png';

// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { useWishlist } from '../Context/WishlistContext';

// function ProductDetails({ data = [] }) {
//   const { id } = useParams();

//   const [showSizeChart, setShowSizeChart] = useState(false);

//   const product = data.find((item) => String(item.id) === String(id));

//   const { toggleWishlist, isWishlisted } = useWishlist();

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const scrollRef = useRef(null);
//   const { addToCart, setShowCart } = useCart();

//   if (!product) {
//     return <div className='text-black p-10'>Product not found</div>;
//   }

//   const images = [product.image, ...(product.hoverImage ? [product.hoverImage] : [])];
//   const handlePrev = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const handleNext = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
//   };
//   const hasSizes = product.sizes && product.sizes.length > 0;

//   const handleAddToCart = () => {
//     if (hasSizes && !selectedSize) {
//       toast.error('Please select a size!', {
//         id: 'size-error',
//         duration: 1000,
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
//     setShowCart(false);

//     toast.success('Item added to cart!', {
//       id: 'add-cart-success',
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
//     <div className='bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]'>
//       <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mt-23'>
//         {/* LEFT - IMAGES */}
//         <div className='flex gap-4'>
//           {/* Desktop thumbnails */}
//           <div className='hidden md:flex gap-4'>
//             <div className='flex flex-col gap-3'>
//               {images.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img}
//                   alt={`Thumb ${idx}`}
//                   onClick={() => setCurrentImageIndex(idx)}
//                   className={`w-20 h-24 rounded-lg cursor-pointer border ${
//                     currentImageIndex === idx ? 'border-black' : 'border-transparent'
//                   }`}
//                 />
//               ))}
//             </div>

//             <div className='relative w-100 h-125 md:h-175'>
//               <button
//                 onClick={() =>
//                   toggleWishlist({
//                     ...product,
//                     route: `/bestseller/products/${product.id}`,
//                   })
//                 }
//                 className='absolute top-4 right-4 z-20 bg-white/1 p-3 rounded-full shadow-md'
//               >
//                 {isWishlisted(product.id) ? (
//                   <FaHeart className='text-[#ff0000] text-xl' />
//                 ) : (
//                   <FaRegHeart className='text-xl' />
//                 )}
//               </button>

//               <img
//                 src={images[currentImageIndex]}
//                 alt='Product'
//                 className='w-full h-full object-cover rounded-xl'
//               />

//               <button
//                 onClick={handlePrev}
//                 className='absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
//               >
//                 <FaChevronLeft />
//               </button>

//               <button
//                 onClick={handleNext}
//                 className='absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
//               >
//                 <FaChevronRight />
//               </button>
//             </div>
//           </div>

//           {/* Mobile scroll images */}
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
//                   alt={`Product ${index}`}
//                   className='w-full h-125 object-cover rounded-xl'
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* DOTS (mobile) */}
//         <div className='flex justify-center mt-4 gap-2 md:hidden'>
//           {images.map((_, index) => (
//             <span
//               key={index}
//               className={`w-3 h-3 rounded-full ${
//                 currentImageIndex === index ? 'bg-black' : 'bg-gray-400'
//               }`}
//             />
//           ))}
//         </div>

//         {/* RIGHT - INFO */}
//         <div className='flex-1 space-y-6'>
//           <h2 className='text-3xl font-bold'>{product.name}</h2>

//           {/* <p className='font-semibold'>Only {product.inStock} item(s) left in stock!</p> */}

//           {/* PRICE */}
//           <div className='text-2xl font-bold text-black font-[cinzel]'>
//             ₦{product.price.toLocaleString('en-NG')}
//             {/* <span className='line-through ml-3 text-gray-400 text-lg'>
//               ₦{product.oldPrice.toLocaleString('en-NG')}
//             </span> */}
//           </div>

//           {/* SIZE */}
//           {hasSizes && (
//             <div>
//               <p className='mb-2 font-semibold text-lg'>
//                 Select Size:
//                 {selectedSize && <span className='text-black ml-2'>{selectedSize}</span>}
//               </p>

//               <div className='flex flex-wrap gap-2'>
//                 {product.sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`
//             px-4 py-2
//             border
//             rounded-lg
//             transition-all
//             duration-300
//             ${
//               selectedSize === size
//                 ? 'bg-black text-white border-black'
//                 : 'border-gray-300 hover:border-gray hover:bg-gray-200 hover:text-black'
//             }
//           `}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* QUANTITY */}
//           <div className='flex items-center gap-4'>
//             <p className='font-semibold'>Quantity:</p>

//             <button
//               onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//               className='w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded'
//             >
//               −
//             </button>

//             <span className='text-xl'>{quantity}</span>

//             <button
//               onClick={() => setQuantity((q) => q + 1)}
//               className='w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded'
//             >
//               +
//             </button>
//           </div>

//           {/* SIZE CHART */}
//           {hasSizes && (
//             <button
//               onClick={() => setShowSizeChart(true)}
//               className='flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition mt-2'
//             >
//               <img src={sizechart} alt='Size Guide' className='w-50 h-15 object-contain' />
//             </button>
//           )}

//           {/* BUTTONS */}
//           <div className='flex flex-col md:flex-row gap-4'>
//             <button
//               onClick={handleAddToCart}
//               className='w-full md:w-[30%] border py-3 rounded-xl hover:bg-black hover:text-white'
//             >
//               Add to Cart
//             </button>

//             <button className='w-full md:w-[30%] bg-black text-white py-3 rounded-xl hover:bg-gray-900'>
//               Buy it now
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* SIZE CHART MODAL */}
//       {showSizeChart && (
//         <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4'>
//           <div className='bg-white rounded-xl p-6 max-w-xl w-full relative'>
//             <button
//               onClick={() => setShowSizeChart(false)}
//               className='absolute top-3 right-4 text-2xl font-extrabold text-black'
//             >
//               ×
//             </button>

//             <h2 className='text-xl font-bold mb-4 text-black'>Size Guide</h2>

//             <div className='overflow-x-auto'>
//               <table className='w-full border-collapse border text-black'>
//                 <thead>
//                   <tr className='bg-gray-100'>
//                     <th className='border p-3'>Size</th>
//                     <th className='border p-3'>Chest (in)</th>
//                     <th className='border p-3'>Waist (in)</th>
//                     <th className='border p-3'>Length (in)</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   <tr>
//                     <td className='border p-3'>S</td>
//                     <td className='border p-3'>36-38</td>
//                     <td className='border p-3'>28-30</td>
//                     <td className='border p-3'>27</td>
//                   </tr>

//                   <tr>
//                     <td className='border p-3'>M</td>
//                     <td className='border p-3'>39-41</td>
//                     <td className='border p-3'>31-33</td>
//                     <td className='border p-3'>28</td>
//                   </tr>

//                   <tr>
//                     <td className='border p-3'>L</td>
//                     <td className='border p-3'>42-44</td>
//                     <td className='border p-3'>34-36</td>
//                     <td className='border p-3'>29</td>
//                   </tr>

//                   <tr>
//                     <td className='border p-3'>XL</td>
//                     <td className='border p-3'>45-47</td>
//                     <td className='border p-3'>37-39</td>
//                     <td className='border p-3'>30</td>
//                   </tr>

//                   <tr>
//                     <td className='border p-3'>XXL</td>
//                     <td className='border p-3'>48-50</td>
//                     <td className='border p-3'>40-42</td>
//                     <td className='border p-3'>31</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             <p className='text-xs text-gray-500 mt-4'>
//               Measurements are approximate and may vary slightly depending on the fit and style.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductDetails;





import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { useCart } from '../Context/cartContext';
import { useWishlist } from '../Context/WishlistContext';
import sizechart from '../assets/images/sizechart.png';

function ProductDetails({
  data = [],
  routePrefix = '/products',
}) {
  const { id } = useParams();

  const [showSizeChart, setShowSizeChart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const scrollRef = useRef(null);

  const { addToCart, setShowCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const product = data.find(
    (item) =>
      String(item.id) === String(id)
  );

  if (!product) {
    return (
      <div className='text-black p-10'>
        Product not found
      </div>
    );
  }

  const productRoute = `${routePrefix}/${product.id}`;

  const images = [
    product.image,
    ...(product.hoverImage
      ? [product.hoverImage]
      : []),
  ];

  const handlePrev = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + images.length) %
        images.length
    );
  };

  const handleNext = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev + 1) % images.length
    );
  };

  const hasSizes =
    product.sizes &&
    product.sizes.length > 0;

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      toast.error('Please select a size!', {
        id: 'size-error',
        duration: 1000,
        style: {
          border: '1px solid #facc15',
          padding: '16px',
          color: 'black',
          fontWeight: 'bold',
          backgroundColor: '#fef08a',
        },
        iconTheme: {
          primary: '#facc15',
          secondary: '#fff',
        },
      });

      return;
    }

    addToCart(
      {
        ...product,
        route: productRoute,
      },
      selectedSize,
      quantity
    );

    setShowCart(false);

    toast.success('Item added to cart!', {
      id: 'add-cart-success',
      duration: 3000,
      style: {
        border: '1px solid #4ade80',
        padding: '16px',
        color: '#000',
        backgroundColor: '#bbf7d0',
      },
      iconTheme: {
        primary: '#22c55e',
        secondary: '#fff',
      },
    });
  };

  const handleWishlist = () => {
    toggleWishlist({
      ...product,
      route: productRoute,
    });
  };

  const handleMobileScroll = () => {
    if (!scrollRef.current) return;

    const scrollLeft =
      scrollRef.current.scrollLeft;

    const width =
      scrollRef.current.offsetWidth;

    if (width > 0) {
      setCurrentImageIndex(
        Math.round(scrollLeft / width)
      );
    }
  };

  return (
    <div className='bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mt-23'>

        {/* LEFT - IMAGES */}
        <div className='flex gap-4 w-full md:w-auto'>

          {/* DESKTOP */}
          <div className='hidden md:flex gap-4'>

            {/* THUMBNAILS */}
            <div className='flex flex-col gap-3'>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumb ${idx}`}
                  onClick={() =>
                    setCurrentImageIndex(idx)
                  }
                  className={`w-20 h-24 rounded-lg cursor-pointer border ${
                    currentImageIndex === idx
                      ? 'border-black'
                      : 'border-transparent'
                  }`}
                />
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className='relative w-100 h-125 md:h-175'>

              {/* WISHLIST */}
              <button
                type='button'
                onClick={handleWishlist}
                className='absolute top-4 right-4 z-20 bg-white/1 p-3 rounded-full shadow-md'
                aria-label={
                  isWishlisted(product.id)
                    ? 'Remove from wishlist'
                    : 'Add to wishlist'
                }
              >
                {isWishlisted(product.id) ? (
                  <FaHeart className='text-[#ff0000] text-xl' />
                ) : (
                  <FaRegHeart className='text-xl' />
                )}
              </button>

              {/* IMAGE */}
              <img
                src={images[currentImageIndex]}
                alt='Product'
                className='w-full h-full object-cover rounded-xl'
              />

              {/* PREVIOUS */}
              <button
                type='button'
                onClick={handlePrev}
                className='absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
              >
                <FaChevronLeft />
              </button>

              {/* NEXT */}
              <button
                type='button'
                onClick={handleNext}
                className='absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          {/* MOBILE */}
          <div
            ref={scrollRef}
            onScroll={handleMobileScroll}
            className='md:hidden w-full overflow-x-auto snap-x snap-mandatory flex gap-4 scroll-smooth no-scrollbar'
          >
            {images.map((img, index) => (
              <div
                key={index}
                className='shrink-0 w-full snap-center relative'
              >
                <img
                  src={img}
                  alt={`Product ${index}`}
                  className='w-full h-125 object-cover rounded-xl'
                />

                {/* MOBILE WISHLIST */}
                <button
                  type='button'
                  onClick={handleWishlist}
                  className='absolute top-4 right-4 z-20 bg-white p-3 rounded-full shadow-md'
                  aria-label={
                    isWishlisted(product.id)
                      ? 'Remove from wishlist'
                      : 'Add to wishlist'
                  }
                >
                  {isWishlisted(product.id) ? (
                    <FaHeart className='text-[#ff0000] text-xl' />
                  ) : (
                    <FaRegHeart className='text-xl' />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE DOTS */}
        {images.length > 1 && (
          <div className='flex justify-center gap-2 md:hidden -mt-2'>
            {images.map((_, index) => (
              <button
                type='button'
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);

                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                      left:
                        scrollRef.current.offsetWidth *
                        index,
                      behavior: 'smooth',
                    });
                  }
                }}
                className={`w-3 h-3 rounded-full ${
                  currentImageIndex === index
                    ? 'bg-black'
                    : 'bg-gray-400'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* RIGHT - INFO */}
        <div className='flex-1 space-y-6'>

          <h2 className='text-3xl font-bold'>
            {product.name}
          </h2>

          {/* PRICE */}
          <div className='text-2xl font-bold text-black font-[cinzel]'>
            ₦
            {product.price.toLocaleString('en-NG')}
          </div>

          {/* SIZE */}
          {hasSizes && (
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
                    type='button'
                    key={size}
                    onClick={() =>
                      setSelectedSize(size)
                    }
                    className={`
                      px-4 py-2
                      border
                      rounded-lg
                      transition-all
                      duration-300
                      ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'border-gray-300 hover:border-gray hover:bg-gray-200 hover:text-black'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
          <div className='flex items-center gap-4'>
            <p className='font-semibold'>
              Quantity:
            </p>

            <button
              type='button'
              onClick={() =>
                setQuantity((q) =>
                  Math.max(1, q - 1)
                )
              }
              className='w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded'
            >
              −
            </button>

            <span className='text-xl'>
              {quantity}
            </span>

            <button
              type='button'
              onClick={() =>
                setQuantity((q) => q + 1)
              }
              className='w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded'
            >
              +
            </button>
          </div>

          {/* SIZE CHART */}
          {hasSizes && (
            <button
              type='button'
              onClick={() =>
                setShowSizeChart(true)
              }
              className='flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition mt-2'
            >
              <img
                src={sizechart}
                alt='Size Guide'
                className='w-50 h-15 object-contain'
              />
            </button>
          )}

          {/* BUTTONS */}
          <div className='flex flex-col md:flex-row gap-4'>
            <button
              type='button'
              onClick={handleAddToCart}
              className='w-full md:w-[30%] border py-3 rounded-xl hover:bg-black hover:text-white'
            >
              Add to Cart
            </button>

            <button
              type='button'
              className='w-full md:w-[30%] bg-black text-white py-3 rounded-xl hover:bg-gray-900'
            >
              Buy it now
            </button>
          </div>
        </div>
      </div>

      {/* SIZE CHART MODAL */}
      {showSizeChart && (
        <div
          className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4'
          onClick={() =>
            setShowSizeChart(false)
          }
        >
          <div
            className='bg-white rounded-xl p-6 max-w-xl w-full relative'
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type='button'
              onClick={() =>
                setShowSizeChart(false)
              }
              className='absolute top-3 right-4 text-2xl font-extrabold text-black'
            >
              ×
            </button>

            <h2 className='text-xl font-bold mb-4 text-black'>
              Size Guide
            </h2>

            <div className='overflow-x-auto'>
              <table className='w-full border-collapse border text-black'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border p-3'>Size</th>
                    <th className='border p-3'>Chest (in)</th>
                    <th className='border p-3'>Waist (in)</th>
                    <th className='border p-3'>Length (in)</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className='border p-3'>S</td>
                    <td className='border p-3'>36-38</td>
                    <td className='border p-3'>28-30</td>
                    <td className='border p-3'>27</td>
                  </tr>

                  <tr>
                    <td className='border p-3'>M</td>
                    <td className='border p-3'>39-41</td>
                    <td className='border p-3'>31-33</td>
                    <td className='border p-3'>28</td>
                  </tr>

                  <tr>
                    <td className='border p-3'>L</td>
                    <td className='border p-3'>42-44</td>
                    <td className='border p-3'>34-36</td>
                    <td className='border p-3'>29</td>
                  </tr>

                  <tr>
                    <td className='border p-3'>XL</td>
                    <td className='border p-3'>45-47</td>
                    <td className='border p-3'>37-39</td>
                    <td className='border p-3'>30</td>
                  </tr>

                  <tr>
                    <td className='border p-3'>XXL</td>
                    <td className='border p-3'>48-50</td>
                    <td className='border p-3'>40-42</td>
                    <td className='border p-3'>31</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className='text-xs text-gray-500 mt-4'>
              Measurements are approximate and may vary
              slightly depending on the fit and style.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;