import React from 'react';
import { FiSliders, FiChevronDown } from 'react-icons/fi';

function ProductFilterBar({
  totalProducts = 0,
  sortOption,
  setSortOption,
  onToggleFilter,
}) {
  return (
    <div className="w-full border-b border-gray-200 py-4 px-4 md:px-10 bg-white font-[Raleway]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* LEFT: FILTER BUTTON & PRODUCT COUNT */}
        <div className="flex items-center gap-6">
          <button
            onClick={onToggleFilter}
            className="flex items-center gap-2 text-sm md:text-base font-semibold uppercase tracking-wider text-black hover:text-gray-600 transition"
          >
            <FiSliders className="text-lg" />
            <span>Filter</span>
          </button>

          <span className="text-xs md:text-sm text-gray-500 font-medium border-l border-gray-300 pl-6">
            {totalProducts} {totalProducts === 1 ? 'product' : 'products'}
          </span>
        </div>

        {/* RIGHT: SORT DROPDOWN */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort-select"
            className="text-xs md:text-sm uppercase font-semibold text-gray-500 whitespace-nowrap"
          >
            Sort by:
          </label>

          <div className="relative">
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-transparent pr-8 pl-2 py-1.5 text-xs md:text-sm font-semibold uppercase text-black cursor-pointer border-b border-black focus:outline-none focus:border-gray-500 transition"
            >
              {/* <option value="featured">Featured</option>
              <option value="relevant">Most relevant</option>
              <option value="best-selling">Best selling</option> */}
              <option value="title-ascending">Alphabetically, A-Z</option>
              <option value="title-descending">Alphabetically, Z-A</option>
              <option value="price-ascending">Price, low to high</option>
              <option value="price-descending">Price, high to low</option>
              <option value="date-ascending">Date, old to new</option>
              <option value="date-descending">Date, new to old</option>
            </select>

            <FiChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 text-black pointer-events-none text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFilterBar;

// import React from 'react';
// import { FiSliders, FiChevronDown } from 'react-icons/fi';

// function ProductFilterBar({
//   totalProducts = 0,
//   sortOption,
//   setSortOption,
//   onToggleFilter,
// }) {
//   return (
//     <div className="w-full border-y border-gray-200 py-3.5 px-4 md:px-10 bg-white font-sans tracking-tight">
//       <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
//         {/* LEFT: FILTER BUTTON & PRODUCT COUNT */}
//         <div className="flex items-center gap-5">
//           <button
//             onClick={onToggleFilter}
//             type="button"
//             className="flex items-center gap-2.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-black hover:opacity-60 transition-opacity duration-200 cursor-pointer select-none"
//           >
//             <FiSliders className="text-base md:text-lg" />
//             <span>Filter</span>
//           </button>

//           <span className="text-xs md:text-sm text-gray-400 font-normal border-l border-gray-200 pl-5">
//             {totalProducts} {totalProducts === 1 ? 'item' : 'items'}
//           </span>
//         </div>

//         {/* RIGHT: SORT DROPDOWN */}
//         <div className="flex items-center gap-3">
//           <label
//             htmlFor="sort-select"
//             className="text-xs uppercase font-medium tracking-widest text-gray-400 whitespace-nowrap"
//           >
//             Sort by
//           </label>

//           <div className="relative inline-flex items-center">
//             <select
//               id="sort-select"
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="appearance-none bg-white text-black pr-7 pl-1 py-1 text-xs md:text-sm font-semibold uppercase tracking-wide cursor-pointer border-b border-black focus:outline-none focus:border-gray-400 transition-colors"
//             >
//               <optgroup label="Relevance" className="font-sans text-xs text-gray-500 bg-white">
//                 <option value="featured" className="text-black py-1">Featured</option>
//                 <option value="relevant" className="text-black py-1">Most relevant</option>
//                 <option value="best-selling" className="text-black py-1">Best selling</option>
//               </optgroup>

//               <optgroup label="Price" className="font-sans text-xs text-gray-500 bg-white">
//                 <option value="price-ascending" className="text-black py-1">Price: Low to High</option>
//                 <option value="price-descending" className="text-black py-1">Price: High to Low</option>
//               </optgroup>

//               <optgroup label="Alphabetical" className="font-sans text-xs text-gray-500 bg-white">
//                 <option value="title-ascending" className="text-black py-1">Alphabetically: A–Z</option>
//                 <option value="title-descending" className="text-black py-1">Alphabetically: Z–A</option>
//               </optgroup>

//               <optgroup label="Date" className="font-sans text-xs text-gray-500 bg-white">
//                 <option value="date-descending" className="text-black py-1">Newest arrivals</option>
//                 <option value="date-ascending" className="text-black py-1">Oldest first</option>
//               </optgroup>
//             </select>

//             <FiChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-black pointer-events-none text-xs" />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default ProductFilterBar;