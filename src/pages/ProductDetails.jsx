// import React, { useEffect, useMemo, useRef, useState } from 'react';

// import toast from 'react-hot-toast';
// import { useNavigate, useParams } from 'react-router-dom';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';

// import { useCart } from '../Context/cartContext';
// import { useWishlist } from '../Context/WishlistContext';
// import sizechart from '../assets/images/sizechart.png';

// import { sizeCharts } from '../data/TshirtData';

// function ProductDetails({ data = [], routePrefix = '/products' }) {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [showSizeChart, setShowSizeChart] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [hoodieType, setHoodieType] = useState('standard');

//   // BUY NOW LOADING STATE
//   const [buyNowLoading, setBuyNowLoading] = useState(false);

//   const scrollRef = useRef(null);

//   const { addToCart, setShowCart } = useCart();

//   const { toggleWishlist, isWishlisted } = useWishlist();

//   const product = data.find((item) => String(item.id) === String(id));

//   useEffect(() => {
//     if (product?.colors?.length > 0) {
//       setSelectedColor(product.colors[0].name);
//     } else {
//       setSelectedColor('Default');
//     }

//     setCurrentImageIndex(0);
//     setSelectedSize('');
//     setShowSizeChart(false);
//     setQuantity(1);
//     setHoodieType('standard');
//     setBuyNowLoading(false);
//   }, [product]);

//   const selectedColorVariant = useMemo(() => {
//     if (!product?.colors?.length) {
//       return null;
//     }

//     return (
//       product.colors.find((color) => color.name === selectedColor) ||
//       product.colors[0]
//     );
//   }, [product, selectedColor]);

//   const images = useMemo(() => {
//     if (selectedColorVariant?.images?.length) {
//       return selectedColorVariant.images;
//     }

//     return [
//       product?.image,
//       ...(product?.hoverImage ? [product.hoverImage] : []),
//     ].filter(Boolean);
//   }, [product, selectedColorVariant]);

//   useEffect(() => {
//     setCurrentImageIndex(0);

//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({
//         left: 0,
//         behavior: 'smooth',
//       });
//     }
//   }, [selectedColor]);

//   if (!product) {
//     return <div className='text-black p-10'>Product not found</div>;
//   }

//   const productRoute = `${routePrefix}/${product.id}`;

//   const handleColorChange = (colorName) => {
//     setSelectedColor(colorName);
//     setCurrentImageIndex(0);
//   };

//   const handlePrev = () => {
//     if (images.length <= 1) return;

//     setCurrentImageIndex(
//       (prev) => (prev - 1 + images.length) % images.length
//     );
//   };

//   const handleNext = () => {
//     if (images.length <= 1) return;

//     setCurrentImageIndex(
//       (prev) => (prev + 1) % images.length
//     );
//   };

//   const hasSizes =
//     Array.isArray(product.sizes) && product.sizes.length > 0;

//   const sizeChartData = sizeCharts?.[product.id];

//   const hasSizeChart =
//     hasSizes &&
//     sizeChartData &&
//     Array.isArray(sizeChartData.columns) &&
//     sizeChartData.columns.length > 0 &&
//     Array.isArray(sizeChartData.rows) &&
//     sizeChartData.rows.length > 0;

//   const isHoodieSizeChart =
//     product.id === 'Hooded-Tank-Top' ||
//     product.id?.toLowerCase().includes('hoodie') ||
//     product.id?.toLowerCase().includes('sweatshirt') ||
//     product.name?.toLowerCase().includes('hoodie') ||
//     product.name?.toLowerCase().includes('sweatshirt');

//   /*
//    * SHARED SIZE VALIDATION
//    *
//    * Both Add to Cart and Buy Now use this.
//    */
//   const validateProductSelection = () => {
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

//       return false;
//     }

//     return true;
//   };

//   /*
//    * CREATE CART PRODUCT
//    *
//    * Used by both Add to Cart and Buy Now.
//    */
//   const createCartProduct = () => ({
//     ...product,
//     route: productRoute,
//     selectedColor: selectedColor || 'Default',
//     image: images[currentImageIndex] || product.image,
//     images,
//   });

//   /*
//    * ADD TO CART
//    */
//   const handleAddToCart = () => {
//     if (!validateProductSelection()) return;

//     const cartProduct = createCartProduct();

//     addToCart(
//       cartProduct,
//       selectedSize,
//       quantity,
//       selectedColor || 'Default'
//     );

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

//   /*
//    * BUY NOW
//    *
//    * Validate
//    * ↓
//    * Loading spinner
//    * ↓
//    * Add to cart
//    * ↓
//    * Redirect to checkout
//    */
//   const handleBuyNow = async () => {
//     if (buyNowLoading) return;

//     if (!validateProductSelection()) return;

//     setBuyNowLoading(true);

//     try {
//       const cartProduct = createCartProduct();

//       addToCart(
//         cartProduct,
//         selectedSize,
//         quantity,
//         selectedColor || 'Default'
//       );

//       // Do not open the cart drawer during Buy Now.
//       setShowCart(false);

//       // Give React a moment to commit the cart state
//       // before moving to Checkout.
//       await new Promise((resolve) => setTimeout(resolve, 150));

//       navigate('/checkout');
//     } catch (error) {
//       console.error('Buy Now error:', error);

//       setBuyNowLoading(false);

//       toast.error(
//         'Unable to add the product to your cart. Please try again.',
//         {
//           id: 'buy-now-error',
//         }
//       );
//     }
//   };

//   const handleWishlist = () => {
//     toggleWishlist({
//       ...product,
//       route: productRoute,
//       selectedColor: selectedColor || 'Default',
//       images,
//       image: images[currentImageIndex] || product.image,
//     });
//   };

//   const handleMobileScroll = () => {
//     if (!scrollRef.current) return;

//     const scrollLeft = scrollRef.current.scrollLeft;
//     const width = scrollRef.current.offsetWidth;

//     if (width > 0) {
//       setCurrentImageIndex(Math.round(scrollLeft / width));
//     }
//   };

//   const wishlistColor = selectedColor || 'Default';

//   const renderSizeChartRow = (row, rowIndex) => {
//     if (Array.isArray(row)) {
//       return (
//         <tr key={rowIndex}>
//           {sizeChartData.columns.map((_, columnIndex) => (
//             <td
//               key={columnIndex}
//               className='border p-3 whitespace-nowrap'
//             >
//               {row[columnIndex] ?? '-'}
//             </td>
//           ))}
//         </tr>
//       );
//     }

//     if (row && typeof row === 'object') {
//       const values = Object.values(row);

//       return (
//         <tr key={rowIndex}>
//           {sizeChartData.columns.map((_, columnIndex) => (
//             <td
//               key={columnIndex}
//               className='border p-3 whitespace-nowrap'
//             >
//               {values[columnIndex] ?? '-'}
//             </td>
//           ))}
//         </tr>
//       );
//     }

//     return (
//       <tr key={rowIndex}>
//         <td
//           colSpan={sizeChartData.columns.length}
//           className='border p-3 text-center'
//         >
//           -
//         </td>
//       </tr>
//     );
//   };

//   return (
//     <div className='bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]'>
//       <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mt-23'>

//         {/* LEFT - IMAGES */}
//         <div className='flex gap-4 w-full md:w-auto'>

//           {/* DESKTOP */}
//           <div className='hidden md:flex gap-4'>

//             <div className='flex flex-col gap-3'>
//               {images.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img}
//                   alt={`Thumb ${idx}`}
//                   onClick={() => setCurrentImageIndex(idx)}
//                   className={`w-20 h-24 rounded-lg cursor-pointer border ${
//                     currentImageIndex === idx
//                       ? 'border-black'
//                       : 'border-transparent'
//                   }`}
//                 />
//               ))}
//             </div>

//             <div className='relative w-100 h-125 md:h-175'>

//               <button
//                 type='button'
//                 onClick={handleWishlist}
//                 className='absolute top-4 right-4 z-20 bg-white/1 p-3 rounded-full shadow-md'
//                 aria-label={
//                   isWishlisted(product.id, wishlistColor)
//                     ? 'Remove from wishlist'
//                     : 'Add to wishlist'
//                 }
//               >
//                 {isWishlisted(product.id, wishlistColor) ? (
//                   <FaHeart className='text-[#ff0000] text-xl' />
//                 ) : (
//                   <FaRegHeart className='text-xl' />
//                 )}
//               </button>

//               <img
//                 src={images[currentImageIndex]}
//                 alt={product.name}
//                 className='w-full h-full object-cover rounded-xl'
//               />

//               <button
//                 type='button'
//                 onClick={handlePrev}
//                 className='absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
//               >
//                 <FaChevronLeft />
//               </button>

//               <button
//                 type='button'
//                 onClick={handleNext}
//                 className='absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
//               >
//                 <FaChevronRight />
//               </button>
//             </div>
//           </div>

//           {/* MOBILE */}
//           <div
//             ref={scrollRef}
//             onScroll={handleMobileScroll}
//             className='md:hidden w-full overflow-x-auto snap-x snap-mandatory flex gap-4 scroll-smooth no-scrollbar'
//           >
//             {images.map((img, index) => (
//               <div
//                 key={index}
//                 className='shrink-0 w-full snap-center relative'
//               >
//                 <img
//                   src={img}
//                   alt={`Product ${index + 1}`}
//                   className='w-full h-125 object-cover rounded-xl'
//                 />

//                 <button
//                   type='button'
//                   onClick={handleWishlist}
//                   className='absolute top-4 right-4 z-20 bg-white p-3 rounded-full shadow-md'
//                   aria-label={
//                     isWishlisted(product.id, wishlistColor)
//                       ? 'Remove from wishlist'
//                       : 'Add to wishlist'
//                   }
//                 >
//                   {isWishlisted(product.id, wishlistColor) ? (
//                     <FaHeart className='text-[#ff0000] text-xl' />
//                   ) : (
//                     <FaRegHeart className='text-xl' />
//                   )}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* MOBILE DOTS */}
//         {images.length > 1 && (
//           <div className='flex justify-center gap-2 md:hidden -mt-2'>
//             {images.map((_, index) => (
//               <button
//                 type='button'
//                 key={index}
//                 onClick={() => {
//                   setCurrentImageIndex(index);

//                   if (scrollRef.current) {
//                     scrollRef.current.scrollTo({
//                       left:
//                         scrollRef.current.offsetWidth * index,
//                       behavior: 'smooth',
//                     });
//                   }
//                 }}
//                 className={`w-3 h-3 rounded-full ${
//                   currentImageIndex === index
//                     ? 'bg-black'
//                     : 'bg-gray-400'
//                 }`}
//                 aria-label={`Go to image ${index + 1}`}
//               />
//             ))}
//           </div>
//         )}

//         {/* RIGHT - INFO */}
//         <div className='flex-1 space-y-6'>

//           <h2 className='text-3xl font-bold'>
//             {product.name}
//           </h2>

//           <div className='text-2xl font-bold text-black font-[cinzel]'>
//             ₦{Number(product.price || 0).toLocaleString('en-NG')}
//           </div>

//           {/* COLOR */}
//           {product.colors?.length > 0 && (
//             <div>
//               <p className='mb-3 font-semibold text-lg'>
//                 Color:{' '}
//                 {selectedColor && (
//                   <span className='text-gray-600 font-normal'>
//                     {selectedColor}
//                   </span>
//                 )}
//               </p>

//               <div className='flex flex-wrap gap-3'>
//                 {product.colors.map((color) => (
//                   <button
//                     key={color.name}
//                     type='button'
//                     onClick={() => handleColorChange(color.name)}
//                     aria-label={`Select ${color.name}`}
//                     title={color.name}
//                     className={`w-8 h-8 rounded-full border-2 transition ${
//                       selectedColor === color.name
//                         ? 'border-black scale-110'
//                         : 'border-gray-300 hover:border-black'
//                     }`}
//                     style={{
//                       backgroundColor: color.value,
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* SIZE */}
//           {hasSizes && (
//             <div>
//               <p className='mb-2 font-semibold text-lg'>
//                 Select Size:
//                 {selectedSize && (
//                   <span className='text-black ml-2'>
//                     {selectedSize}
//                   </span>
//                 )}
//               </p>

//               <div className='flex flex-wrap gap-2'>
//                 {product.sizes.map((size) => (
//                   <button
//                     type='button'
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`
//                       px-4 py-2
//                       border
//                       rounded-lg
//                       transition-all
//                       duration-300
//                       ${
//                         selectedSize === size
//                           ? 'bg-black text-white border-black'
//                           : 'border-gray-300 hover:border-gray hover:bg-gray-200 hover:text-black'
//                       }
//                     `}
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
//               type='button'
//               onClick={() =>
//                 setQuantity((q) => Math.max(1, q - 1))
//               }
//               className='w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded'
//             >
//               −
//             </button>

//             <span className='text-xl'>{quantity}</span>

//             <button
//               type='button'
//               onClick={() => setQuantity((q) => q + 1)}
//               className='w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded'
//             >
//               +
//             </button>
//           </div>

//           {/* SIZE CHART */}
//           {hasSizeChart && (
//             <button
//               type='button'
//               onClick={() => setShowSizeChart(true)}
//               className='flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition mt-2'
//             >
//               <img
//                 src={sizechart}
//                 alt='Size Guide'
//                 className='w-50 h-15 object-contain'
//               />
//             </button>
//           )}

//           {/* BUTTONS */}
//           <div className='flex flex-col md:flex-row gap-4'>

//             {/* ADD TO CART */}
//             <button
//               type='button'
//               onClick={handleAddToCart}
//               className='w-full md:w-[30%] border py-3 rounded-xl hover:bg-black hover:text-white'
//             >
//               Add to Cart
//             </button>

//             {/* BUY NOW */}
//             <button
//               type='button'
//               onClick={handleBuyNow}
//               disabled={buyNowLoading}
//               className='w-full md:w-[30%] bg-black text-white py-3 rounded-xl hover:bg-gray-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
//             >
//               {buyNowLoading ? (
//                 <>
//                   <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
//                   <span>Processing...</span>
//                 </>
//               ) : (
//                 'Buy it now'
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* SIZE CHART MODAL */}
//       {showSizeChart && hasSizeChart && (
//         <div
//           className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4'
//           onClick={() => setShowSizeChart(false)}
//         >
//           <div
//             className='bg-white rounded-xl p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto'
//             onClick={(event) => event.stopPropagation()}
//           >
//             <button
//               type='button'
//               onClick={() => setShowSizeChart(false)}
//               aria-label='Close size chart'
//               className='absolute top-3 right-4 text-2xl font-extrabold text-black hover:text-gray-500 transition'
//             >
//               ×
//             </button>

//             <h2 className='text-xl font-bold mb-4 text-black pr-8'>
//               {isHoodieSizeChart
//                 ? 'Hoodies Size Guide'
//                 : sizeChartData.title || 'Size Guide'}
//             </h2>

//             {isHoodieSizeChart && (
//               <div className='flex border-b border-gray-200 mb-4 text-sm font-medium overflow-x-auto'>
//                 <button
//                   type='button'
//                   onClick={() => setHoodieType('standard')}
//                   className={`pb-2 px-4 border-b-2 transition-colors whitespace-nowrap ${
//                     hoodieType === 'standard'
//                       ? 'border-black text-black font-semibold'
//                       : 'border-transparent text-gray-500 hover:text-black'
//                   }`}
//                 >
//                   Standard Hoodie
//                 </button>

//                 <button
//                   type='button'
//                   onClick={() => setHoodieType('armless')}
//                   className={`pb-2 px-4 border-b-2 transition-colors whitespace-nowrap ${
//                     hoodieType === 'armless'
//                       ? 'border-black text-black font-semibold'
//                       : 'border-transparent text-gray-500 hover:text-black'
//                   }`}
//                 >
//                   Armless / Sleeveless
//                 </button>
//               </div>
//             )}

//             {!isHoodieSizeChart && sizeChartData.fit && (
//               <p className='text-sm text-gray-500 mb-4'>
//                 <span className='font-semibold text-gray-700'>
//                   Fit:
//                 </span>{' '}
//                 {sizeChartData.fit}
//               </p>
//             )}

//             {isHoodieSizeChart ? (
//               <div className='overflow-x-auto'>
//                 <table className='w-full border-collapse border text-black text-left'>
//                   <thead>
//                     <tr className='bg-gray-100'>
//                       <th className='border p-3 whitespace-nowrap'>
//                         Size
//                       </th>
//                       <th className='border p-3 whitespace-nowrap'>
//                         Chest (in)
//                       </th>
//                       <th className='border p-3 whitespace-nowrap'>
//                         Shoulder (in)
//                       </th>
//                       {hoodieType === 'standard' ? (
//                         <th className='border p-3 whitespace-nowrap'>
//                           Sleeve (in)
//                         </th>
//                       ) : (
//                         <th className='border p-3 whitespace-nowrap'>
//                           Armhole (in)
//                         </th>
//                       )}
//                       <th className='border p-3 whitespace-nowrap'>
//                         Length (in)
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {hoodieType === 'standard' ? (
//                       <>
//                         <tr>
//                           <td className='border p-3'>S</td>
//                           <td className='border p-3'>36-38</td>
//                           <td className='border p-3'>17</td>
//                           <td className='border p-3'>24</td>
//                           <td className='border p-3'>26</td>
//                         </tr>
//                         <tr>
//                           <td className='border p-3'>M</td>
//                           <td className='border p-3'>39-41</td>
//                           <td className='border p-3'>18</td>
//                           <td className='border p-3'>25</td>
//                           <td className='border p-3'>27</td>
//                         </tr>
//                         <tr>
//                           <td className='border p-3'>L</td>
//                           <td className='border p-3'>42-44</td>
//                           <td className='border p-3'>19</td>
//                           <td className='border p-3'>26</td>
//                           <td className='border p-3'>28</td>
//                         </tr>
//                         <tr>
//                           <td className='border p-3'>XL</td>
//                           <td className='border p-3'>45-47</td>
//                           <td className='border p-3'>20</td>
//                           <td className='border p-3'>27</td>
//                           <td className='border p-3'>29</td>
//                         </tr>
//                         <tr>
//                           <td className='border p-3'>XXL</td>
//                           <td className='border p-3'>48-50</td>
//                           <td className='border p-3'>21</td>
//                           <td className='border p-3'>28</td>
//                           <td className='border p-3'>30</td>
//                         </tr>
//                         <tr>
//                           <td className='border p-3'>3XL</td>
//                           <td className='border p-3'>51-53</td>
//                           <td className='border p-3'>22</td>
//                           <td className='border p-3'>29</td>
//                           <td className='border p-3'>31</td>
//                         </tr>
//                       </>
//                     ) : (
//                       <>
//                         <tr>
//                           <td className='border p-3'>S</td>
//                           <td className='border p-3'>36-38</td>
//                           <td className='border p-3'>16</td>
//                           <td className='border p-3'>9</td>
//                           <td className='border p-3'>26</td>
//                         </tr>
//                         <tr>
//                           <td className='border p-3'>M</td>
//                           <td className='border p-3'>39-41</td>
//                           <td className='border p-3'>17</td>
//                           <td className='border p-3'>9.5</td>
//                           <td className='border p-3'>27</td>
//                         </tr>
//                         <tr>
//                           <td className='border p-3'>L</td>
//                           <td className='border p-3'>42-44</td>
//                           <td className='border p-3'>18</td>
//                           <td className='border p-3'>10</td>
//                           <td className='border p-3'>28</td>
//                         </tr>
//                         <tr>
//                           <td className='border p-3'>XL</td>
//                           <td className='border p-3'>45-47</td>
//                           <td className='border p-3'>19</td>
//                           <td className='border p-3'>10.5</td>
//                           <td className='border p-3'>29</td>
//                         </tr>
//                         <tr>
//                           <td className='border p-3'>XXL</td>
//                           <td className='border p-3'>48-50</td>
//                           <td className='border p-3'>20</td>
//                           <td className='border p-3'>11</td>
//                           <td className='border p-3'>30</td>
//                         </tr>
//                         <tr>
//                           <td className='border p-3'>3XL</td>
//                           <td className='border p-3'>51-53</td>
//                           <td className='border p-3'>21</td>
//                           <td className='border p-3'>11.5</td>
//                           <td className='border p-3'>31</td>
//                         </tr>
//                       </>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <div className='overflow-x-auto'>
//                 <table className='w-full border-collapse border text-black'>
//                   <thead>
//                     <tr className='bg-gray-100'>
//                       {sizeChartData.columns.map((column, index) => (
//                         <th
//                           key={index}
//                           className='border p-3 whitespace-nowrap'
//                         >
//                           {column}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {sizeChartData.rows.map((row, rowIndex) =>
//                       renderSizeChartRow(row, rowIndex)
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             <p className='text-xs text-gray-500 mt-4'>
//               Measurements are approximate and may vary slightly
//               depending on design and fit.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductDetails;


// ProductDetails.jsx

import React, { useEffect, useMemo, useRef, useState } from 'react';

import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { useCart } from '../Context/cartContext';
import { useWishlist } from '../Context/WishlistContext';
import sizechart from '../assets/images/sizechart.png';

import { sizeCharts } from '../data/TshirtData';

function ProductDetails({ data = [], routePrefix = '/products' }) {
  const { id } = useParams();

  const [showSizeChart, setShowSizeChart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [hoodieType, setHoodieType] = useState('standard');

  const scrollRef = useRef(null);

  const {
    addToCart,
    buyNow,
    buyNowLoading,
    setShowCart,
  } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const product = data.find(
    (item) => String(item.id) === String(id)
  );

  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0].name);
    } else {
      setSelectedColor('Default');
    }

    setCurrentImageIndex(0);
    setSelectedSize('');
    setShowSizeChart(false);
    setQuantity(1);
    setHoodieType('standard');
  }, [product]);

  const selectedColorVariant = useMemo(() => {
    if (!product?.colors?.length) {
      return null;
    }

    return (
      product.colors.find(
        (color) => color.name === selectedColor
      ) || product.colors[0]
    );
  }, [product, selectedColor]);

  const images = useMemo(() => {
    if (selectedColorVariant?.images?.length) {
      return selectedColorVariant.images;
    }

    return [
      product?.image,
      ...(product?.hoverImage
        ? [product.hoverImage]
        : []),
    ].filter(Boolean);
  }, [product, selectedColorVariant]);

  useEffect(() => {
    setCurrentImageIndex(0);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [selectedColor]);

  if (!product) {
    return (
      <div className='text-black p-10'>
        Product not found
      </div>
    );
  }

  const productRoute = `${routePrefix}/${product.id}`;

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
    setCurrentImageIndex(0);
  };

  const handlePrev = () => {
    if (images.length <= 1) return;

    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + images.length) %
        images.length
    );
  };

  const handleNext = () => {
    if (images.length <= 1) return;

    setCurrentImageIndex(
      (prev) =>
        (prev + 1) % images.length
    );
  };

  const hasSizes =
    Array.isArray(product.sizes) &&
    product.sizes.length > 0;

  const sizeChartData =
    sizeCharts?.[product.id];

  const hasSizeChart =
    hasSizes &&
    sizeChartData &&
    Array.isArray(sizeChartData.columns) &&
    sizeChartData.columns.length > 0 &&
    Array.isArray(sizeChartData.rows) &&
    sizeChartData.rows.length > 0;

  const isHoodieSizeChart =
    product.id === 'Hooded-Tank-Top' ||
    product.id
      ?.toLowerCase()
      .includes('hoodie') ||
    product.id
      ?.toLowerCase()
      .includes('sweatshirt') ||
    product.name
      ?.toLowerCase()
      .includes('hoodie') ||
    product.name
      ?.toLowerCase()
      .includes('sweatshirt');

  /*
   * SIZE VALIDATION
   *
   * Add to Cart still validates the size here.
   * Buy Now validation is handled before calling
   * buyNow so the existing size message remains.
   */
  const validateProductSelection = () => {
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

      return false;
    }

    return true;
  };

  /*
   * CREATE CART PRODUCT
   */
  const createCartProduct = () => ({
    ...product,
    route: productRoute,
    selectedColor:
      selectedColor || 'Default',
    image:
      images[currentImageIndex] ||
      product.image,
    images,
  });

  /*
   * ADD TO CART
   */
  const handleAddToCart = () => {
    if (!validateProductSelection()) {
      return;
    }

    const cartProduct =
      createCartProduct();

    addToCart(
      cartProduct,
      selectedSize,
      quantity,
      selectedColor || 'Default'
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

  /*
   * BUY NOW
   *
   * No navigation.
   * No loading state.
   * No cart logic.
   *
   * All of that is handled by CartContext.
   */
  const handleBuyNow = () => {
    if (buyNowLoading) {
      return;
    }

    if (!validateProductSelection()) {
      return;
    }

    const cartProduct =
      createCartProduct();

    buyNow(
      cartProduct,
      selectedSize,
      quantity,
      selectedColor || 'Default'
    );
  };

  const handleWishlist = () => {
    toggleWishlist({
      ...product,
      route: productRoute,
      selectedColor:
        selectedColor || 'Default',
      images,
      image:
        images[currentImageIndex] ||
        product.image,
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

  const wishlistColor =
    selectedColor || 'Default';

  const renderSizeChartRow = (
    row,
    rowIndex
  ) => {
    if (Array.isArray(row)) {
      return (
        <tr key={rowIndex}>
          {sizeChartData.columns.map(
            (_, columnIndex) => (
              <td
                key={columnIndex}
                className='border p-3 whitespace-nowrap'
              >
                {row[columnIndex] ?? '-'}
              </td>
            )
          )}
        </tr>
      );
    }

    if (
      row &&
      typeof row === 'object'
    ) {
      const values =
        Object.values(row);

      return (
        <tr key={rowIndex}>
          {sizeChartData.columns.map(
            (_, columnIndex) => (
              <td
                key={columnIndex}
                className='border p-3 whitespace-nowrap'
              >
                {values[columnIndex] ?? '-'}
              </td>
            )
          )}
        </tr>
      );
    }

    return (
      <tr key={rowIndex}>
        <td
          colSpan={
            sizeChartData.columns.length
          }
          className='border p-3 text-center'
        >
          -
        </td>
      </tr>
    );
  };

  return (
    <div className='bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mt-23'>

        {/* LEFT - IMAGES */}
        <div className='flex gap-4 w-full md:w-auto'>

          {/* DESKTOP */}
          <div className='hidden md:flex gap-4'>

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

            <div className='relative w-100 h-125 md:h-175'>

              <button
                type='button'
                onClick={handleWishlist}
                className='absolute top-4 right-4 z-20 bg-white/1 p-3 rounded-full shadow-md'
                aria-label={
                  isWishlisted(
                    product.id,
                    wishlistColor
                  )
                    ? 'Remove from wishlist'
                    : 'Add to wishlist'
                }
              >
                {isWishlisted(
                  product.id,
                  wishlistColor
                ) ? (
                  <FaHeart className='text-[#ff0000] text-xl' />
                ) : (
                  <FaRegHeart className='text-xl' />
                )}
              </button>

              <img
                src={
                  images[currentImageIndex]
                }
                alt={product.name}
                className='w-full h-full object-cover rounded-xl'
              />

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
            </div>
          </div>

          {/* MOBILE */}
          <div
            ref={scrollRef}
            onScroll={handleMobileScroll}
            className='md:hidden w-full overflow-x-auto snap-x snap-mandatory flex gap-4 scroll-smooth no-scrollbar'
          >
            {images.map(
              (img, index) => (
                <div
                  key={index}
                  className='shrink-0 w-full snap-center relative'
                >
                  <img
                    src={img}
                    alt={`Product ${
                      index + 1
                    }`}
                    className='w-full h-125 object-cover rounded-xl'
                  />

                  <button
                    type='button'
                    onClick={
                      handleWishlist
                    }
                    className='absolute top-4 right-4 z-20 bg-white p-3 rounded-full shadow-md'
                    aria-label={
                      isWishlisted(
                        product.id,
                        wishlistColor
                      )
                        ? 'Remove from wishlist'
                        : 'Add to wishlist'
                    }
                  >
                    {isWishlisted(
                      product.id,
                      wishlistColor
                    ) ? (
                      <FaHeart className='text-[#ff0000] text-xl' />
                    ) : (
                      <FaRegHeart className='text-xl' />
                    )}
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* MOBILE DOTS */}
        {images.length > 1 && (
          <div className='flex justify-center gap-2 md:hidden -mt-2'>
            {images.map(
              (_, index) => (
                <button
                  type='button'
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(
                      index
                    );

                    if (
                      scrollRef.current
                    ) {
                      scrollRef.current.scrollTo(
                        {
                          left:
                            scrollRef
                              .current
                              .offsetWidth *
                            index,
                          behavior:
                            'smooth',
                        }
                      );
                    }
                  }}
                  className={`w-3 h-3 rounded-full ${
                    currentImageIndex ===
                    index
                      ? 'bg-black'
                      : 'bg-gray-400'
                  }`}
                  aria-label={`Go to image ${
                    index + 1
                  }`}
                />
              )
            )}
          </div>
        )}

        {/* RIGHT - INFO */}
        <div className='flex-1 space-y-6'>

          <h2 className='text-3xl font-bold'>
            {product.name}
          </h2>

          <div className='text-2xl font-bold text-black font-[cinzel]'>
            ₦
            {Number(
              product.price || 0
            ).toLocaleString('en-NG')}
          </div>

          {/* COLOR */}
          {product.colors?.length > 0 && (
            <div>
              <p className='mb-3 font-semibold text-lg'>
                Color:{' '}
                {selectedColor && (
                  <span className='text-gray-600 font-normal'>
                    {selectedColor}
                  </span>
                )}
              </p>

              <div className='flex flex-wrap gap-3'>
                {product.colors.map(
                  (color) => (
                    <button
                      key={color.name}
                      type='button'
                      onClick={() =>
                        handleColorChange(
                          color.name
                        )
                      }
                      aria-label={`Select ${color.name}`}
                      title={color.name}
                      className={`w-8 h-8 rounded-full border-2 transition ${
                        selectedColor ===
                        color.name
                          ? 'border-black scale-110'
                          : 'border-gray-300 hover:border-black'
                      }`}
                      style={{
                        backgroundColor:
                          color.value,
                      }}
                    />
                  )
                )}
              </div>
            </div>
          )}

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
                {product.sizes.map(
                  (size) => (
                    <button
                      type='button'
                      key={size}
                      onClick={() =>
                        setSelectedSize(
                          size
                        )
                      }
                      className={`
                        px-4 py-2
                        border
                        rounded-lg
                        transition-all
                        duration-300
                        ${
                          selectedSize ===
                          size
                            ? 'bg-black text-white border-black'
                            : 'border-gray-300 hover:border-gray hover:bg-gray-200 hover:text-black'
                        }
                      `}
                    >
                      {size}
                    </button>
                  )
                )}
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
                  Math.max(
                    1,
                    q - 1
                  )
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
                setQuantity(
                  (q) => q + 1
                )
              }
              className='w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded'
            >
              +
            </button>
          </div>

          {/* SIZE CHART */}
          {hasSizeChart && (
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

            {/* ADD TO CART */}
            <button
              type='button'
              onClick={
                handleAddToCart
              }
              className='w-full md:w-[30%] border py-3 rounded-xl hover:bg-black hover:text-white'
            >
              Add to Cart
            </button>

            {/* BUY NOW */}
            <button
              type='button'
              onClick={
                handleBuyNow
              }
              disabled={
                buyNowLoading
              }
              className='w-full md:w-[30%] bg-black text-white py-3 rounded-xl hover:bg-gray-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {buyNowLoading ? (
                <>
                  <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />

                  <span>
                    Processing...
                  </span>
                </>
              ) : (
                'Buy it now'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SIZE CHART MODAL */}
      {showSizeChart &&
        hasSizeChart && (
          <div
            className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4'
            onClick={() =>
              setShowSizeChart(false)
            }
          >
            <div
              className='bg-white rounded-xl p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto'
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <button
                type='button'
                onClick={() =>
                  setShowSizeChart(false)
                }
                aria-label='Close size chart'
                className='absolute top-3 right-4 text-2xl font-extrabold text-black hover:text-gray-500 transition'
              >
                ×
              </button>

              <h2 className='text-xl font-bold mb-4 text-black pr-8'>
                {isHoodieSizeChart
                  ? 'Hoodies Size Guide'
                  : sizeChartData.title ||
                    'Size Guide'}
              </h2>

              {isHoodieSizeChart && (
                <div className='flex border-b border-gray-200 mb-4 text-sm font-medium overflow-x-auto'>
                  <button
                    type='button'
                    onClick={() =>
                      setHoodieType(
                        'standard'
                      )
                    }
                    className={`pb-2 px-4 border-b-2 transition-colors whitespace-nowrap ${
                      hoodieType ===
                      'standard'
                        ? 'border-black text-black font-semibold'
                        : 'border-transparent text-gray-500 hover:text-black'
                    }`}
                  >
                    Standard Hoodie
                  </button>

                  <button
                    type='button'
                    onClick={() =>
                      setHoodieType(
                        'armless'
                      )
                    }
                    className={`pb-2 px-4 border-b-2 transition-colors whitespace-nowrap ${
                      hoodieType ===
                      'armless'
                        ? 'border-black text-black font-semibold'
                        : 'border-transparent text-gray-500 hover:text-black'
                    }`}
                  >
                    Armless /
                    Sleeveless
                  </button>
                </div>
              )}

              {!isHoodieSizeChart &&
                sizeChartData.fit && (
                  <p className='text-sm text-gray-500 mb-4'>
                    <span className='font-semibold text-gray-700'>
                      Fit:
                    </span>{' '}
                    {
                      sizeChartData.fit
                    }
                  </p>
                )}

              {isHoodieSizeChart ? (
                <div className='overflow-x-auto'>
                  <table className='w-full border-collapse border text-black text-left'>
                    <thead>
                      <tr className='bg-gray-100'>
                        <th className='border p-3 whitespace-nowrap'>
                          Size
                        </th>

                        <th className='border p-3 whitespace-nowrap'>
                          Chest (in)
                        </th>

                        <th className='border p-3 whitespace-nowrap'>
                          Shoulder (in)
                        </th>

                        {hoodieType ===
                        'standard' ? (
                          <th className='border p-3 whitespace-nowrap'>
                            Sleeve (in)
                          </th>
                        ) : (
                          <th className='border p-3 whitespace-nowrap'>
                            Armhole (in)
                          </th>
                        )}

                        <th className='border p-3 whitespace-nowrap'>
                          Length (in)
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {hoodieType ===
                      'standard' ? (
                        <>
                          <tr>
                            <td className='border p-3'>
                              S
                            </td>
                            <td className='border p-3'>
                              36-38
                            </td>
                            <td className='border p-3'>
                              17
                            </td>
                            <td className='border p-3'>
                              24
                            </td>
                            <td className='border p-3'>
                              26
                            </td>
                          </tr>

                          <tr>
                            <td className='border p-3'>
                              M
                            </td>
                            <td className='border p-3'>
                              39-41
                            </td>
                            <td className='border p-3'>
                              18
                            </td>
                            <td className='border p-3'>
                              25
                            </td>
                            <td className='border p-3'>
                              27
                            </td>
                          </tr>

                          <tr>
                            <td className='border p-3'>
                              L
                            </td>
                            <td className='border p-3'>
                              42-44
                            </td>
                            <td className='border p-3'>
                              19
                            </td>
                            <td className='border p-3'>
                              26
                            </td>
                            <td className='border p-3'>
                              28
                            </td>
                          </tr>

                          <tr>
                            <td className='border p-3'>
                              XL
                            </td>
                            <td className='border p-3'>
                              45-47
                            </td>
                            <td className='border p-3'>
                              20
                            </td>
                            <td className='border p-3'>
                              27
                            </td>
                            <td className='border p-3'>
                              29
                            </td>
                          </tr>

                          <tr>
                            <td className='border p-3'>
                              XXL
                            </td>
                            <td className='border p-3'>
                              48-50
                            </td>
                            <td className='border p-3'>
                              21
                            </td>
                            <td className='border p-3'>
                              28
                            </td>
                            <td className='border p-3'>
                              30
                            </td>
                          </tr>

                          <tr>
                            <td className='border p-3'>
                              3XL
                            </td>
                            <td className='border p-3'>
                              51-53
                            </td>
                            <td className='border p-3'>
                              22
                            </td>
                            <td className='border p-3'>
                              29
                            </td>
                            <td className='border p-3'>
                              31
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr>
                            <td className='border p-3'>
                              S
                            </td>
                            <td className='border p-3'>
                              36-38
                            </td>
                            <td className='border p-3'>
                              16
                            </td>
                            <td className='border p-3'>
                              9
                            </td>
                            <td className='border p-3'>
                              26
                            </td>
                          </tr>

                          <tr>
                            <td className='border p-3'>
                              M
                            </td>
                            <td className='border p-3'>
                              39-41
                            </td>
                            <td className='border p-3'>
                              17
                            </td>
                            <td className='border p-3'>
                              9.5
                            </td>
                            <td className='border p-3'>
                              27
                            </td>
                          </tr>

                          <tr>
                            <td className='border p-3'>
                              L
                            </td>
                            <td className='border p-3'>
                              42-44
                            </td>
                            <td className='border p-3'>
                              18
                            </td>
                            <td className='border p-3'>
                              10
                            </td>
                            <td className='border p-3'>
                              28
                            </td>
                          </tr>

                          <tr>
                            <td className='border p-3'>
                              XL
                            </td>
                            <td className='border p-3'>
                              45-47
                            </td>
                            <td className='border p-3'>
                              19
                            </td>
                            <td className='border p-3'>
                              10.5
                            </td>
                            <td className='border p-3'>
                              29
                            </td>
                          </tr>

                          <tr>
                            <td className='border p-3'>
                              XXL
                            </td>
                            <td className='border p-3'>
                              48-50
                            </td>
                            <td className='border p-3'>
                              20
                            </td>
                            <td className='border p-3'>
                              11
                            </td>
                            <td className='border p-3'>
                              30
                            </td>
                          </tr>

                          <tr>
                            <td className='border p-3'>
                              3XL
                            </td>
                            <td className='border p-3'>
                              51-53
                            </td>
                            <td className='border p-3'>
                              21
                            </td>
                            <td className='border p-3'>
                              11.5
                            </td>
                            <td className='border p-3'>
                              31
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className='overflow-x-auto'>
                  <table className='w-full border-collapse border text-black'>
                    <thead>
                      <tr className='bg-gray-100'>
                        {sizeChartData.columns.map(
                          (
                            column,
                            index
                          ) => (
                            <th
                              key={
                                index
                              }
                              className='border p-3 whitespace-nowrap'
                            >
                              {
                                column
                              }
                            </th>
                          )
                        )}
                      </tr>
                    </thead>

                    <tbody>
                      {sizeChartData.rows.map(
                        (
                          row,
                          rowIndex
                        ) =>
                          renderSizeChartRow(
                            row,
                            rowIndex
                          )
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              <p className='text-xs text-gray-500 mt-4'>
                Measurements are
                approximate and
                may vary slightly
                depending on
                design and fit.
              </p>
            </div>
          </div>
        )}
    </div>
  );
}

export default ProductDetails;