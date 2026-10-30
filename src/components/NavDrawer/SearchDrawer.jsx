// import React, { useCallback, useEffect, useMemo, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { FaSearch, FaTimes, FaArrowRight } from 'react-icons/fa';

// import { UniqueSearchProducts } from '../../data/SearchProducts';

// const CATEGORIES = [
//   { name: 'T-Shirts & Tops', path: '/t-shirt' },
//   { name: 'Pants & Shorts', path: '/pants' },
//   { name: 'Denim & Jeans', path: '/Denim-Jeans' },
//   { name: 'Outerwear & Jackets', path: '/Outerwear-Jackets' },
//   { name: 'Hoodies & Sweatshirts', path: '/Hoodies-Sweatshirts' },
//   { name: 'Shirts', path: '/kafans-shirts' },
//   { name: 'Crop Top', path: '/crop-top' },
//   { name: 'Tops', path: '/tops' },
//   { name: 'Female Pants', path: '/female-pant' },
//   { name: 'Dresses', path: '/dresses' },
//   { name: 'Skirts', path: '/skirts' },
// ];

// /**
//  * Normalize product names so duplicate entries with different IDs
//  * can still be recognized as the same product.
//  */
// const normalizeProductName = (product) =>
//   String(product?.name || product?.title || '')
//     .trim()
//     .toLowerCase()
//     .replace(/\s+/g, ' ');

// /**
//  * Prefer the normalized product name for deduplication.
//  * Fall back to the ID when no name is available.
//  */
// const getProductKey = (product) =>
//   normalizeProductName(product) || (product?.id != null ? String(product.id) : '');

// /**
//  * Remove duplicate products while preserving their original order.
//  */
// const getUniqueProducts = (products = []) => {
//   const uniqueProducts = new Map();

//   products.forEach((product) => {
//     const key = getProductKey(product);

//     if (key && !uniqueProducts.has(key)) {
//       uniqueProducts.set(key, product);
//     }
//   });

//   return Array.from(uniqueProducts.values());
// };

// const formatPrice = (price) => {
//   const numericPrice = Number(price);

//   if (!Number.isFinite(numericPrice)) {
//     return 'Price unavailable';
//   }

//   return `₦${numericPrice.toLocaleString('en-NG')}`;
// };

// const SearchDrawer = ({ open, onClose, searchQuery, setSearchQuery }) => {
//   const inputRef = useRef(null);
//   const drawerRef = useRef(null);
//   const previouslyFocusedRef = useRef(null);

//   const closeDrawer = useCallback(() => {
//     setSearchQuery('');
//     onClose();
//   }, [onClose, setSearchQuery]);

//   const clearSearch = useCallback(() => {
//     setSearchQuery('');
//     inputRef.current?.focus();
//   }, [setSearchQuery]);

//   const handleProductClick = useCallback(() => {
//     setSearchQuery('');
//     onClose();
//   }, [onClose, setSearchQuery]);

//   /**
//    * Focus the search input when the drawer opens.
//    * Prevent background scrolling while open.
//    * Restore focus when the drawer closes.
//    */
//   useEffect(() => {
//     if (!open) return undefined;

//     previouslyFocusedRef.current = document.activeElement;

//     const previousOverflow = document.body.style.overflow;

//     document.body.style.overflow = 'hidden';

//     const frame = window.requestAnimationFrame(() => {
//       inputRef.current?.focus();
//     });

//     return () => {
//       window.cancelAnimationFrame(frame);

//       document.body.style.overflow = previousOverflow;

//       const previouslyFocused = previouslyFocusedRef.current;

//       if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
//         previouslyFocused.focus();
//       }
//     };
//   }, [open]);

//   /**
//    * Support Escape to close the drawer and keep keyboard
//    * navigation inside the open drawer.
//    */
//   useEffect(() => {
//     if (!open) return undefined;

//     const handleKeyDown = (event) => {
//       if (event.key === 'Escape') {
//         event.preventDefault();
//         closeDrawer();
//         return;
//       }

//       if (event.key !== 'Tab' || !drawerRef.current) {
//         return;
//       }

//       const focusableElements = drawerRef.current.querySelectorAll(
//         [
//           'a[href]',
//           'button:not([disabled])',
//           'input:not([disabled])',
//           '[tabindex]:not([tabindex="-1"])',
//         ].join(','),
//       );

//       const focusable = Array.from(focusableElements).filter(
//         (element) =>
//           !element.hasAttribute('inert') && element.getAttribute('aria-hidden') !== 'true',
//       );

//       if (focusable.length === 0) {
//         event.preventDefault();
//         return;
//       }

//       const first = focusable[0];
//       const last = focusable[focusable.length - 1];

//       if (event.shiftKey && document.activeElement === first) {
//         event.preventDefault();
//         last.focus();
//       } else if (!event.shiftKey && document.activeElement === last) {
//         event.preventDefault();
//         first.focus();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [open, closeDrawer]);

//   /**
//    * Search across product names, titles, categories,
//    * descriptions, and tags.
//    *
//    * Duplicate products are removed before rendering.
//    */
//   const filteredProducts = useMemo(() => {
//     const query = searchQuery.trim().toLowerCase();

//     if (!query) return [];

//     const results = UniqueSearchProducts.filter((product) => {
//       const tags = Array.isArray(product?.tags) ? product.tags.join(' ') : product?.tags || '';

//       const searchableText = [
//         product?.name,
//         product?.title,
//         product?.category,
//         product?.description,
//         tags,
//       ]
//         .filter(Boolean)
//         .join(' ')
//         .toLowerCase();

//       return searchableText.includes(query);
//     });

//     return getUniqueProducts(results);
//   }, [searchQuery]);

//   /**
//    * Featured products are deduplicated too, preventing
//    * repeated products in the recommendations section.
//    */
//   const recommendedProducts = useMemo(
//     () =>
//       getUniqueProducts(
//         UniqueSearchProducts.filter(
//           (product) =>
//             product?.id != null && product?.image && (product?.name || product?.title),
//         ),
//       ).slice(0, 4),
//     [],
//   );

//   /**
//    * Shared product card used in featured and recommended
//    * product sections.
//    */
//   const renderProductCard = (product) => {
//     const productName = product.name || product.title || 'NBLX product';

//     return (
//       <Link
//         key={getProductKey(product)}
//         to={`/bestseller/products/${product.id}`}
//         onClick={handleProductClick}
//         className='group min-w-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
//         aria-label={`View ${productName}, ${formatPrice(product.price)}`}
//       >
//         <div className='relative aspect-[4/5] min-w-0 overflow-hidden rounded-xl bg-neutral-100'>
//           <img
//             src={product.image}
//             alt={productName}
//             loading='lazy'
//             className='h-full w-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-105'
//           />

//           <div className='absolute inset-x-3 bottom-3 hidden translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block'>
//             <div className='flex items-center justify-between gap-3 rounded-lg bg-white! px-3 py-3 shadow-lg'>
//               <span className='text-[10px] font-bold uppercase tracking-[0.12em]'>
//                 View product
//               </span>

//               <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white!'>
//                 <FaArrowRight aria-hidden='true' className='text-[9px]' />
//               </span>
//             </div>
//           </div>
//         </div>

//         <p className='mt-3 white!space-normal break-words text-sm font-semibold leading-5 text-neutral-900'>
//           {productName}
//         </p>

//         <p className='mt-1 text-sm text-neutral-500'>{formatPrice(product.price)}</p>
//       </Link>
//     );
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <button
//         type='button'
//         aria-label='Close search'
//         tabIndex={open ? 0 : -1}
//         onClick={closeDrawer}
//         className={`fixed inset-0 z-[60] cursor-default bg-black/45 backdrop-blur-[3px] transition-opacity duration-300 motion-reduce:transition-none ${
//           open ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'
//         }`}
//       />

//       {/* Search drawer */}
//       <aside
//         ref={drawerRef}
//         id='nblx-search-drawer'
//         role='dialog'
//         aria-modal={open ? 'true' : undefined}
//         aria-labelledby='nblx-search-title'
//         aria-hidden={!open}
//         inert={!open}
//         className={`search-drawer fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-full flex-col bg-white! text-neutral-950 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:w-[min(480px,100vw)] md:w-[540px] lg:w-[580px] ${
//           open ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         {/* Header */}
//         <header className='shrink-0 border-b border-neutral-200 px-5 pb-5 pt-5 sm:px-7 sm:pt-6'>
//           <div className='mb-5 flex items-center justify-between gap-4'>
//             <div>
//               <p className='mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400'>
//                 NBLX
//               </p>

//               <h2
//                 id='nblx-search-title'
//                 className='text-xl font-bold tracking-tight sm:text-2xl'
//               >
//                 Search
//               </h2>
//             </div>

//             <button
//               type='button'
//               onClick={closeDrawer}
//               aria-label='Close search'
//               className='group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 transition-colors duration-200 hover:border-black hover:bg-black hover:text-white! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
//             >
//               <FaTimes
//                 aria-hidden='true'
//                 className='text-sm transition-transform duration-300 group-hover:rotate-90'
//               />
//             </button>
//           </div>

//           {/* Search input */}
//           <form
//             role='search'
//             onSubmit={(event) => event.preventDefault()}
//             className='group relative'
//           >
//             <FaSearch
//               aria-hidden='true'
//               className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neutral-400 transition-colors group-focus-within:text-black'
//             />

//             <input
//               ref={inputRef}
//               type='text'
//               value={searchQuery}
//               onChange={(event) => setSearchQuery(event.target.value)}
//               placeholder='Search shirts, hoodies, jackets...'
//               autoComplete='off'
//               aria-label='Search NBLX products'
//               aria-controls='nblx-search-content'
//               className='h-13 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-11 pr-12 text-base outline-none transition-colors placeholder:text-neutral-400 focus:border-black focus:bg-white! sm:text-sm'
//             />

//             {/* The only clear-search X icon */}
//             {searchQuery && (
//               <button
//                 type='button'
//                 onClick={clearSearch}
//                 aria-label='Clear search'
//                 className='absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black'
//               >
//                 <FaTimes aria-hidden='true' className='text-xs' />
//               </button>
//             )}
//           </form>
//         </header>

//         {/* Scrollable content */}
//         <main
//           id='nblx-search-content'
//           className='min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7'
//         >
//           {/* Default content when search is empty */}
//           {!searchQuery.trim() && (
//             <section aria-label='Explore NBLX'>
//               <p className='mb-7 text-sm leading-6 text-neutral-500'>
//                 Find your next piece from the complete NBLX collection.
//               </p>

//               {/* Categories */}
//               <div className='mb-9'>
//                 <h3 className='mb-4 text-xs font-bold uppercase tracking-[0.18em]'>
//                   Explore categories
//                 </h3>

//                 <div className='flex flex-wrap gap-2'>
//                   {CATEGORIES.map((category) => (
//                     <Link
//                       key={category.path}
//                       to={category.path}
//                       onClick={closeDrawer}
//                       className='inline-flex max-w-full items-center rounded-full border border-neutral-200 px-3.5 py-2.5 text-xs font-medium leading-5 transition-colors duration-200 hover:border-black hover:bg-black hover:text-white! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:scale-[0.98] sm:px-4'
//                     >
//                       {category.name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               {/* Featured products */}
//               {recommendedProducts.length > 0 && (
//                 <section aria-labelledby='nblx-featured-title'>
//                   <div className='mb-4 flex items-center justify-between gap-4'>
//                     <h3
//                       id='nblx-featured-title'
//                       className='text-xs font-bold uppercase tracking-[0.18em]'
//                     >
//                       Featured
//                     </h3>

//                     <Link
//                       to='/collections'
//                       onClick={handleProductClick}
//                       className='inline-flex shrink-0 items-center gap-2 text-xs font-semibold hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
//                     >
//                       View all
//                       <FaArrowRight aria-hidden='true' className='text-[9px]' />
//                     </Link>
//                   </div>

//                   <div className='grid min-w-0 grid-cols-2 gap-x-4 gap-y-6'>
//                     {recommendedProducts.map(renderProductCard)}
//                   </div>
//                 </section>
//               )}
//             </section>
//           )}

//           {/* Search results */}
//           {searchQuery.trim() && filteredProducts.length > 0 && (
//             <section aria-labelledby='nblx-results-title' aria-live='polite'>
//               <div className='mb-5'>
//                 <p className='mb-1 text-[10px] uppercase tracking-[0.2em] text-neutral-400'>
//                   Results
//                 </p>

//                 <h3 id='nblx-results-title' className='text-lg font-bold'>
//                   {filteredProducts.length} product
//                   {filteredProducts.length !== 1 ? 's' : ''}
//                 </h3>
//               </div>

//               <div className='space-y-2'>
//                 {filteredProducts.map((product) => {
//                   const productName = product.name || product.title || 'NBLX product';

//                   return (
//                     <Link
//                       key={getProductKey(product)}
//                       to={`/bestseller/products/${product.id}`}
//                       onClick={handleProductClick}
//                       className='group flex min-w-0 items-center gap-3 rounded-xl p-2 transition-colors duration-200 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:gap-4'
//                       aria-label={`View ${productName}, ${formatPrice(product.price)}`}
//                     >
//                       <div className='h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100'>
//                         {product.image ? (
//                           <img
//                             src={product.image}
//                             alt={productName}
//                             loading='lazy'
//                             className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none'
//                           />
//                         ) : (
//                           <div className='flex h-full items-center justify-center text-neutral-400'>
//                             <FaSearch aria-hidden='true' />
//                           </div>
//                         )}
//                       </div>

//                       <div className='min-w-0 flex-1 py-1'>
//                         <h4 className='white!space-normal break-words text-sm font-semibold leading-5'>
//                           {productName}
//                         </h4>

//                         {product.category && (
//                           <p className='mt-1 white!space-normal break-words text-xs leading-4 text-neutral-400'>
//                             {product.category}
//                           </p>
//                         )}

//                         <p className='mt-2 text-sm font-medium'>{formatPrice(product.price)}</p>
//                       </div>

//                       <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 transition-colors group-hover:border-black group-hover:bg-black group-hover:text-white!'>
//                         <FaArrowRight aria-hidden='true' className='text-[9px]' />
//                       </span>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </section>
//           )}

//           {/* No results */}
//           {searchQuery.trim() && filteredProducts.length === 0 && (
//             <section className='min-w-0 py-4 text-center' aria-live='polite'>
//               <div className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100'>
//                 <FaSearch aria-hidden='true' className='text-neutral-400' />
//               </div>

//               <p className='mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400'>
//                 Nothing found
//               </p>

//               <h3 className='break-words text-xl font-bold'>
//                 No results for <span className='font-normal'>“{searchQuery}”</span>
//               </h3>

//               <p className='mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-500'>
//                 Try another search or explore the full NBLX collection to discover something
//                 different.
//               </p>

//               <Link
//                 to='/collections'
//                 onClick={handleProductClick}
//                 className='group mt-6 inline-flex max-w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-white! shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:translate-y-0'
//               >
//                 <span>VIEW COLLECTION</span>

//                 <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white! text-black transition-transform duration-200 group-hover:translate-x-0.5'>
//                   <FaArrowRight aria-hidden='true' className='text-[8px]' />
//                 </span>
//               </Link>

//               {/* Recommended products */}
//               {recommendedProducts.length > 0 && (
//                 <section
//                   className='mt-10 border-t border-neutral-100 pt-7 text-left'
//                   aria-labelledby='nblx-recommended-title'
//                 >
//                   <div className='mb-4 flex items-center justify-between gap-4'>
//                     <h3
//                       id='nblx-recommended-title'
//                       className='text-xs font-bold uppercase tracking-[0.18em]'
//                     >
//                       You may like
//                     </h3>

//                     <Link
//                       to='/collections'
//                       onClick={handleProductClick}
//                       className='inline-flex shrink-0 items-center gap-2 text-xs font-semibold hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
//                     >
//                       Explore
//                       <FaArrowRight aria-hidden='true' className='text-[8px]' />
//                     </Link>
//                   </div>

//                   <div className='grid min-w-0 grid-cols-2 gap-4'>
//                     {recommendedProducts.map(renderProductCard)}
//                   </div>
//                 </section>
//               )}
//             </section>
//           )}
//         </main>
//       </aside>
//     </>
//   );
// };

// export default SearchDrawer;



import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes, FaArrowRight } from 'react-icons/fa';

import { UniqueSearchProducts } from '../../data/SearchProducts';

const CATEGORIES = [
  { name: 'T-Shirts & Tops', path: '/t-shirt' },
  { name: 'Pants & Shorts', path: '/pants' },
  { name: 'Denim & Jeans', path: '/Denim-Jeans' },
  { name: 'Outerwear & Jackets', path: '/Outerwear-Jackets' },
  { name: 'Hoodies & Sweatshirts', path: '/Hoodies-Sweatshirts' },
  { name: 'Shirts', path: '/kafans-shirts' },
  { name: 'Crop Top', path: '/crop-top' },
  { name: 'Tops', path: '/tops' },
  { name: 'Female Pants', path: '/female-pant' },
  { name: 'Dresses', path: '/dresses' },
  { name: 'Skirts', path: '/skirts' },
];

/**
 * Normalize product names for deduplication.
 */
const normalizeProductName = (product) =>
  String(product?.name || product?.title || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');

const getProductKey = (product) =>
  normalizeProductName(product) ||
  (product?.id != null ? String(product.id) : '');

const getUniqueProducts = (products = []) => {
  const uniqueProducts = new Map();

  products.forEach((product) => {
    const key = getProductKey(product);

    if (key && !uniqueProducts.has(key)) {
      uniqueProducts.set(key, product);
    }
  });

  return Array.from(uniqueProducts.values());
};

const formatPrice = (price) => {
  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice)) {
    return 'Price unavailable';
  }

  return `₦${numericPrice.toLocaleString('en-NG')}`;
};

/**
 * Use the original route assigned to each product in SearchProducts.js.
 * This preserves the product's correct category and detail page.
 */
const getProductPath = (product) => {
  if (
    typeof product?.route === 'string' &&
    product.route.trim() !== ''
  ) {
    return product.route;
  }

  // Safe fallback for products without an assigned route.
  // Do not send unknown products to the BestSeller page.
  if (product?.id != null) {
    return `/products/${product.id}`;
  }

  return '/collections';
};

const SearchDrawer = ({
  open,
  onClose,
  searchQuery,
  setSearchQuery,
}) => {
  const inputRef = useRef(null);
  const drawerRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  const closeDrawer = useCallback(() => {
    setSearchQuery('');
    onClose();
  }, [onClose, setSearchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    inputRef.current?.focus();
  }, [setSearchQuery]);

  const handleProductClick = useCallback(() => {
    setSearchQuery('');
    onClose();
  }, [onClose, setSearchQuery]);

  /**
   * Focus the input, prevent background scrolling,
   * and restore focus when the drawer closes.
   */
  useEffect(() => {
    if (!open) return undefined;

    previouslyFocusedRef.current = document.activeElement;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;

      const previouslyFocused = previouslyFocusedRef.current;

      if (
        previouslyFocused instanceof HTMLElement &&
        previouslyFocused.isConnected
      ) {
        previouslyFocused.focus();
      }
    };
  }, [open]);

  /**
   * Support Escape and keyboard focus navigation.
   */
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDrawer();
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) {
        return;
      }

      const focusableElements = drawerRef.current.querySelectorAll(
        [
          'a[href]',
          'button:not([disabled])',
          'input:not([disabled])',
          '[tabindex]:not([tabindex="-1"])',
        ].join(','),
      );

      const focusable = Array.from(focusableElements).filter(
        (element) =>
          !element.hasAttribute('inert') &&
          element.getAttribute('aria-hidden') !== 'true',
      );

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, closeDrawer]);

  /**
   * Search product names, titles, categories,
   * descriptions, and tags.
   */
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    const results = UniqueSearchProducts.filter((product) => {
      const tags = Array.isArray(product?.tags)
        ? product.tags.join(' ')
        : product?.tags || '';

      const searchableText = [
        product?.name,
        product?.title,
        product?.category,
        product?.description,
        tags,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });

    return getUniqueProducts(results);
  }, [searchQuery]);

  /**
   * Recommended products.
   */
  const recommendedProducts = useMemo(
    () =>
      getUniqueProducts(
        UniqueSearchProducts.filter(
          (product) =>
            product?.id != null &&
            product?.image &&
            (product?.name || product?.title),
        ),
      ).slice(0, 4),
    [],
  );

  /**
   * Shared product card.
   */
  const renderProductCard = (product) => {
    const productName = product.name || product.title || 'NBLX product';

    return (
      <Link
        key={getProductKey(product)}
        to={getProductPath(product)}
        onClick={handleProductClick}
        className="group min-w-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        aria-label={`View ${productName}, ${formatPrice(product.price)}`}
      >
        <div className="relative aspect-[4/5] min-w-0 overflow-hidden rounded-xl bg-neutral-100">
          <img
            src={product.image}
            alt={productName}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-105"
          />

          <div className="absolute inset-x-3 bottom-3 hidden translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
            <div className="flex items-center justify-between gap-3 rounded-lg bg-white! px-3 py-3 shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
                View product
              </span>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white!">
                <FaArrowRight
                  aria-hidden="true"
                  className="text-[9px]"
                />
              </span>
            </div>
          </div>
        </div>

        <p className="mt-3 whitespace-normal break-words text-sm font-semibold leading-5 text-neutral-900">
          {productName}
        </p>

        <p className="mt-1 text-sm text-neutral-500">
          {formatPrice(product.price)}
        </p>
      </Link>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close search"
        tabIndex={open ? 0 : -1}
        onClick={closeDrawer}
        className={`fixed inset-0 z-[60] cursor-default bg-black/45 backdrop-blur-[3px] transition-opacity duration-300 motion-reduce:transition-none ${
          open
            ? 'visible opacity-100'
            : 'invisible pointer-events-none opacity-0'
        }`}
      />

      {/* Search drawer */}
      <aside
        ref={drawerRef}
        id="nblx-search-drawer"
        role="dialog"
        aria-modal={open ? 'true' : undefined}
        aria-labelledby="nblx-search-title"
        aria-hidden={!open}
        inert={!open}
        className={`search-drawer fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-full flex-col bg-white! text-neutral-950 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:w-[min(480px,100vw)] md:w-[540px] lg:w-[580px] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="shrink-0 border-b border-neutral-200 px-5 pb-5 pt-5 sm:px-7 sm:pt-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
                NBLX
              </p>

              <h2
                id="nblx-search-title"
                className="text-xl font-bold tracking-tight sm:text-2xl"
              >
                Search
              </h2>
            </div>

            <button
              type="button"
              onClick={closeDrawer}
              aria-label="Close search"
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 transition-colors duration-200 hover:border-black hover:bg-black hover:text-white! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              <FaTimes
                aria-hidden="true"
                className="text-sm transition-transform duration-300 group-hover:rotate-90"
              />
            </button>
          </div>

          {/* Search input */}
          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="group relative"
          >
            <FaSearch
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neutral-400 transition-colors group-focus-within:text-black"
            />

            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search shirts, hoodies, jackets..."
              autoComplete="off"
              aria-label="Search NBLX products"
              aria-controls="nblx-search-content"
              className="h-13 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-11 pr-12 text-base outline-none transition-colors placeholder:text-neutral-400 focus:border-black focus:bg-white! sm:text-sm"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <FaTimes aria-hidden="true" className="text-xs" />
              </button>
            )}
          </form>
        </header>

        {/* Scrollable content */}
        <main
          id="nblx-search-content"
          className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7"
        >
          {/* Default content */}
          {!searchQuery.trim() && (
            <section aria-label="Explore NBLX">
              <p className="mb-7 text-sm leading-6 text-neutral-500">
                Find your next piece from the complete NBLX collection.
              </p>

              {/* Categories */}
              <div className="mb-9">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em]">
                  Explore categories
                </h3>

                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      onClick={closeDrawer}
                      className="inline-flex max-w-full items-center rounded-full border border-neutral-200 px-3.5 py-2.5 text-xs font-medium leading-5 transition-colors duration-200 hover:border-black hover:bg-black hover:text-white! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:scale-[0.98] sm:px-4"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Featured products */}
              {recommendedProducts.length > 0 && (
                <section aria-labelledby="nblx-featured-title">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h3
                      id="nblx-featured-title"
                      className="text-xs font-bold uppercase tracking-[0.18em]"
                    >
                      Featured
                    </h3>

                    <Link
                      to="/collections"
                      onClick={handleProductClick}
                      className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                      View all
                      <FaArrowRight
                        aria-hidden="true"
                        className="text-[9px]"
                      />
                    </Link>
                  </div>

                  <div className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-6">
                    {recommendedProducts.map(renderProductCard)}
                  </div>
                </section>
              )}
            </section>
          )}

          {/* Search results */}
          {searchQuery.trim() && filteredProducts.length > 0 && (
            <section
              aria-labelledby="nblx-results-title"
              aria-live="polite"
            >
              <div className="mb-5">
                <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  Results
                </p>

                <h3
                  id="nblx-results-title"
                  className="text-lg font-bold"
                >
                  {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? 's' : ''}
                </h3>
              </div>

              <div className="space-y-2">
                {filteredProducts.map((product) => {
                  const productName =
                    product.name || product.title || 'NBLX product';

                  return (
                    <Link
                      key={getProductKey(product)}
                      to={getProductPath(product)}
                      onClick={handleProductClick}
                      className="group flex min-w-0 items-center gap-3 rounded-xl p-2 transition-colors duration-200 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:gap-4"
                      aria-label={`View ${productName}, ${formatPrice(product.price)}`}
                    >
                      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={productName}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-neutral-400">
                            <FaSearch aria-hidden="true" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1 py-1">
                        <h4 className="whitespace-normal break-words text-sm font-semibold leading-5">
                          {productName}
                        </h4>

                        {product.category && (
                          <p className="mt-1 whitespace-normal break-words text-xs leading-4 text-neutral-400">
                            {product.category}
                          </p>
                        )}

                        <p className="mt-2 text-sm font-medium">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 transition-colors group-hover:border-black group-hover:bg-black group-hover:text-white!">
                        <FaArrowRight
                          aria-hidden="true"
                          className="text-[9px]"
                        />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* No results */}
          {searchQuery.trim() && filteredProducts.length === 0 && (
            <section
              className="min-w-0 py-4 text-center"
              aria-live="polite"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                <FaSearch
                  aria-hidden="true"
                  className="text-neutral-400"
                />
              </div>

              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Nothing found
              </p>

              <h3 className="break-words text-xl font-bold">
                No results for{' '}
                <span className="font-normal">“{searchQuery}”</span>
              </h3>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-500">
                Try another search or explore the full NBLX collection to
                discover something different.
              </p>

              <Link
                to="/collections"
                onClick={handleProductClick}
                className="group mt-6 inline-flex max-w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-white! shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:translate-y-0"
              >
                <span>VIEW COLLECTION</span>

                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white! text-black transition-transform duration-200 group-hover:translate-x-0.5">
                  <FaArrowRight
                    aria-hidden="true"
                    className="text-[8px]"
                  />
                </span>
              </Link>

              {/* Recommended products */}
              {recommendedProducts.length > 0 && (
                <section
                  className="mt-10 border-t border-neutral-100 pt-7 text-left"
                  aria-labelledby="nblx-recommended-title"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h3
                      id="nblx-recommended-title"
                      className="text-xs font-bold uppercase tracking-[0.18em]"
                    >
                      You may like
                    </h3>

                    <Link
                      to="/collections"
                      onClick={handleProductClick}
                      className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                      Explore
                      <FaArrowRight
                        aria-hidden="true"
                        className="text-[8px]"
                      />
                    </Link>
                  </div>

                  <div className="grid min-w-0 grid-cols-2 gap-4">
                    {recommendedProducts.map(renderProductCard)}
                  </div>
                </section>
              )}
            </section>
          )}
        </main>
      </aside>
    </>
  );
};

export default SearchDrawer;
