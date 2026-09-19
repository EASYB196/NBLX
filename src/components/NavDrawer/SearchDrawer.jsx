import React, { useEffect, useMemo, useRef } from 'react';

import { Link } from 'react-router-dom';

import { FaSearch, FaTimes, FaArrowRight } from 'react-icons/fa';

import { UniqueSearchProducts } from '../../data/SearchProducts';

const SearchDrawer = ({ open, onClose, searchQuery, setSearchQuery }) => {
  const inputRef = useRef(null);

  // ======================================================
  // AUTO FOCUS
  // ======================================================

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => clearTimeout(timer);
  }, [open]);

  // ======================================================
  // ESCAPE KEY
  // ======================================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && open) {
        closeDrawer();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  // ======================================================
  // CREATE PRODUCT SLUG
  // ======================================================

  const createSlug = (name) => {
    return String(name || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // ======================================================
  // SEARCH ENGINE
  // ======================================================

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return UniqueSearchProducts.filter((product) => {
      const name = product?.name || '';

      const title = product?.title || '';

      const category = product?.category || '';

      const description = product?.description || '';

      const tags = Array.isArray(product?.tags) ? product.tags.join(' ') : product?.tags || '';

      const searchableText = [name, title, category, description, tags].join(' ').toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery]);

  // ======================================================
  // RECOMMENDED PRODUCTS
  // ======================================================

  const recommendedProducts = useMemo(() => {
    return UniqueSearchProducts.filter((product) => product?.image && product?.name).slice(
      0,
      4,
    );
  }, []);

  // ======================================================
  // CLEAR SEARCH
  // ======================================================

  const clearSearch = () => {
    setSearchQuery('');

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  // ======================================================
  // CLOSE DRAWER
  // ======================================================

  const closeDrawer = () => {
    setSearchQuery('');

    onClose();
  };

  // ======================================================
  // PRODUCT CLICK
  // ======================================================

  const handleProductClick = () => {
    setSearchQuery('');

    onClose();
  };

  return (
    <>
      {/* ==================================================
          BACKDROP
      ================================================== */}

      <div
        className={`
          fixed
          inset-0
          bg-black/40
          backdrop-blur-[3px]
          z-[60]
          transition-opacity
          duration-300

          ${open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
        onClick={closeDrawer}
      />

      {/* ==================================================
          SEARCH DRAWER
      ================================================== */}

      <aside
        className={`
          search-drawer

          fixed
          top-0
          right-0
          h-dvh

          w-full
          sm:w-[480px]
          md:w-[540px]
          lg:w-[580px]

          bg-white
          text-black

          z-[70]

          shadow-2xl

          transform

          transition-transform
          duration-500

          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className='h-full flex flex-col'>
          {/* ==================================================
              HEADER
          ================================================== */}

          <header
            className='
              px-5
              sm:px-7
              pt-6
              pb-5
              border-b
              border-gray-200
            '
          >
            {/* HEADER TOP */}

            <div
              className='
                flex
                items-center
                justify-between
                mb-6
              '
            >
              <div>
                <p
                  className='
                    text-[10px]
                    uppercase
                    tracking-[0.3em]
                    text-gray-400
                    mb-1
                  '
                >
                  NBLX
                </p>

                <h2
                  className='
                    text-xl
                    font-bold
                    tracking-tight
                  '
                >
                  Search
                </h2>
              </div>

              {/* CLOSE */}

              <button
                type='button'
                onClick={closeDrawer}
                aria-label='Close search'
                className='
                  group

                  w-10
                  h-10

                  rounded-full

                  flex
                  items-center
                  justify-center

                  border
                  border-gray-200

                  hover:bg-black
                  hover:text-white
                  hover:border-black

                  transition-all
                  duration-300

                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-black
                '
              >
                <FaTimes
                  className='
                    text-sm

                    transition-transform
                    duration-300

                    group-hover:rotate-90
                  '
                />
              </button>
            </div>

            {/* ==================================================
                SEARCH INPUT
            ================================================== */}

            <div className='relative group'>
              <FaSearch
                className='
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2

                  text-gray-400

                  text-sm

                  pointer-events-none

                  transition-colors
                  duration-300

                  group-focus-within:text-black
                '
              />

              <input
                ref={inputRef}
                type='search'
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder='
                  Search shirts, hoodies, jackets...
                '
                autoComplete='off'
                className='
                  w-full
                  h-13

                  pl-11
                  pr-11

                  bg-gray-50

                  border
                  border-gray-200

                  rounded-xl

                  outline-none

                  text-sm

                  placeholder:text-gray-400

                  focus:bg-white
                  focus:border-black

                  transition-all
                  duration-300
                '
              />

              {/* CLEAR */}

              {searchQuery && (
                <button
                  type='button'
                  onClick={clearSearch}
                  aria-label='Clear search'
                  className='
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2

                    w-6
                    h-6

                    rounded-full

                    bg-gray-200

                    flex
                    items-center
                    justify-center

                    text-gray-500

                    hover:bg-black
                    hover:text-white

                    transition-all
                    duration-200
                  '
                >
                  <FaTimes className='text-[9px]' />
                </button>
              )}
            </div>
          </header>

          {/* ==================================================
              CONTENT
          ================================================== */}

          <main
            className='
              flex-1
              overflow-y-auto

              px-5
              sm:px-7

              py-6
            '
          >
            {/* ==================================================
                INITIAL STATE
            ================================================== */}

            {!searchQuery.trim() && (
              <section>
                <p
                  className='
                    text-sm
                    text-gray-500
                    leading-relaxed
                    mb-7
                  '
                >
                  Find your next piece from the complete NBLX collection.
                </p>

                {/* QUICK SEARCH */}

                <div className='mb-9'>
                  <div
                    className='
                      flex
                      items-center
                      justify-between
                      mb-4
                    '
                  >
                    <h3
                      className='
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.18em]
                      '
                    >
                      Explore
                    </h3>
                  </div>

                  <div
                    className='
    flex 
    flex-wrap 
    gap-2 
  '
                  >
                    {[
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
                    ].map((category) => (
                      <Link
                        key={category.path}
                        to={category.path}
                        onClick={closeDrawer}
                        className='
        group

        px-4
        py-2.5

        border
        border-gray-200

        rounded-full

        text-xs
        font-medium

        hover:bg-black
        hover:text-white!
        hover:border-black

        active:scale-95

        transition-all
        duration-300
      '
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* ==================================================
                    FEATURED PRODUCTS
                ================================================== */}

                {recommendedProducts.length > 0 && (
                  <section>
                    <div
                      className='
                        flex
                        items-center
                        justify-between
                        mb-4
                      '
                    >
                      <h3
                        className='
                          text-xs
                          font-bold
                          uppercase
                          tracking-[0.18em]
                        '
                      >
                        Featured
                      </h3>

                      <Link
                        to='/collections'
                        onClick={handleProductClick}
                        className='
                          group

                          flex
                          items-center
                          gap-2

                          text-xs
                          font-semibold
                        '
                      >
                        View all
                        <FaArrowRight
                          className='
                            text-[9px]

                            transition-transform
                            duration-300

                            group-hover:translate-x-1
                          '
                        />
                      </Link>
                    </div>

                    <div
                      className='
                        grid
                        grid-cols-2
                        gap-x-4
                        gap-y-6
                      '
                    >
                      {recommendedProducts.map((product) => {
                        return (
                          <Link
                            key={product.id}
                            // to={`/bestseller/product/${slug}`}
                            to={`/bestseller/products/${product.id}`}
                            onClick={handleProductClick}
                            className='group'
                          >
                            {/* IMAGE */}

                            <div
                              className='
                                  relative

                                  aspect-[4/5]

                                  overflow-hidden

                                  rounded-xl

                                  bg-gray-100
                                '
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className='
                                    w-full
                                    h-full

                                    object-cover

                                    transition-transform
                                    duration-700
                                    ease-out

                                    group-hover:scale-105
                                  '
                              />

                              {/* MODERN HOVER CTA */}

                              <div
                                className='
                                    absolute
                                    left-3
                                    right-3
                                    bottom-3

                                    translate-y-2

                                    opacity-0

                                    group-hover:translate-y-0
                                    group-hover:opacity-100

                                    transition-all
                                    duration-300
                                  '
                              >
                                <div
                                  className='
                                      flex
                                      items-center
                                      justify-between

                                      bg-white

                                      px-4
                                      py-3

                                      rounded-lg

                                      shadow-lg
                                    '
                                >
                                  <span
                                    className='
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.15em]
                                      '
                                  >
                                    View Product
                                  </span>

                                  <span
                                    className='
                                        w-6
                                        h-6

                                        rounded-full

                                        bg-black
                                        text-white

                                        flex
                                        items-center
                                        justify-center
                                      '
                                  >
                                    <FaArrowRight className='text-[8px]' />
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* PRODUCT INFO */}

                            <p
                              className='
                                  mt-3

                                  text-sm
                                  font-semibold

                                  truncate
                                '
                            >
                              {product.name}
                            </p>

                            <p
                              className='
                                  mt-1

                                  text-sm
                                  text-gray-500
                                '
                            >
                              ₦{Number(product.price || 0).toLocaleString('en-NG')}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                )}
              </section>
            )}

            {/* ==================================================
                SEARCH RESULTS
            ================================================== */}

            {searchQuery.trim() && filteredProducts.length > 0 && (
              <section>
                {/* RESULT HEADER */}

                <div
                  className='
                      flex
                      items-end
                      justify-between
                      mb-5
                    '
                >
                  <div>
                    <p
                      className='
                          text-[10px]
                          uppercase
                          tracking-[0.2em]
                          text-gray-400
                          mb-1
                        '
                    >
                      Results
                    </p>

                    <h3
                      className='
                          text-lg
                          font-bold
                        '
                    >
                      {filteredProducts.length} product
                      {filteredProducts.length !== 1 ? 's' : ''}
                    </h3>
                  </div>
                </div>

                {/* RESULTS */}

                <div className='space-y-2'>
                  {filteredProducts.map((product) => {
                    const slug = createSlug(product.name);

                    return (
                      <Link
                        key={product.id}
                        to={`/bestseller/product/${slug}`}
                        onClick={handleProductClick}
                        className='
                              group

                              flex
                              items-center
                              gap-4

                              p-2

                              rounded-xl

                              hover:bg-gray-50

                              transition-all
                              duration-300
                            '
                      >
                        {/* IMAGE */}

                        <div
                          className='
                                relative

                                w-20
                                h-24

                                shrink-0

                                overflow-hidden

                                rounded-lg

                                bg-gray-100
                              '
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className='
                                  w-full
                                  h-full

                                  object-cover

                                  transition-transform
                                  duration-500

                                  group-hover:scale-105
                                '
                          />
                        </div>

                        {/* PRODUCT INFO */}

                        <div
                          className='
                                flex-1
                                min-w-0
                              '
                        >
                          <h4
                            className='
                                  text-sm
                                  font-semibold
                                  truncate
                                '
                          >
                            {product.name}
                          </h4>

                          {product.category && (
                            <p
                              className='
                                    mt-1

                                    text-xs
                                    text-gray-400
                                  '
                            >
                              {product.category}
                            </p>
                          )}

                          <p
                            className='
                                  mt-2

                                  text-sm
                                  font-medium
                                '
                          >
                            ₦{Number(product.price || 0).toLocaleString('en-NG')}
                          </p>
                        </div>

                        {/* ARROW */}

                        <div
                          className='
                                w-9
                                h-9

                                shrink-0

                                rounded-full

                                border
                                border-gray-200

                                flex
                                items-center
                                justify-center

                                group-hover:bg-black
                                group-hover:text-white
                                group-hover:border-black

                                transition-all
                                duration-300
                              '
                        >
                          <FaArrowRight
                            className='
                                  text-[9px]

                                  transition-transform
                                  duration-300

                                  group-hover:translate-x-0.5
                                '
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ==================================================
                NO RESULTS
            ================================================== */}

            {searchQuery.trim() && filteredProducts.length === 0 && (
              <section>
                {/* MESSAGE */}

                <div
                  className='
                      text-center

                      pt-5
                      pb-8
                    '
                >
                  <div
                    className='
                        w-14
                        h-14

                        mx-auto

                        rounded-full

                        bg-gray-100

                        flex
                        items-center
                        justify-center

                        mb-5
                      '
                  >
                    <FaSearch
                      className='
                          text-gray-400
                        '
                    />
                  </div>

                  <p
                    className='
                        text-[10px]
                        uppercase
                        tracking-[0.2em]
                        text-gray-400

                        mb-2
                      '
                  >
                    Nothing found
                  </p>

                  <h3
                    className='
                        text-xl
                        font-bold
                      '
                  >
                    No results for
                    <span className='font-normal'> "{searchQuery}"</span>
                  </h3>

                  <p
                    className='
                        max-w-sm

                        mx-auto

                        mt-3

                        text-sm
                        text-gray-500

                        leading-relaxed
                      '
                  >
                    Try another search or explore the full NBLX collection to discover something
                    different.
                  </p>

                  {/* VIEW COLLECTION */}

                  <Link
                    to='/collections'
                    onClick={handleProductClick}
                    className='
                        group

                        inline-flex
                        items-center
                        gap-3

                        mt-6

                        px-7
                        py-3.5

                        bg-black
                        !text-white

                        rounded-full

                        text-xs
                        font-bold

                        tracking-[0.12em]

                        hover:bg-gray-800

                        hover:-translate-y-0.5

                        active:translate-y-0
                        active:scale-95

                        transition-all
                        duration-300

                        shadow-sm
                        hover:shadow-lg
                      '
                  >
                    VIEW COLLECTION
                    <span
                      className='
                          w-6
                          h-6

                          rounded-full

                          bg-white
                          text-black

                          flex
                          items-center
                          justify-center

                          transition-transform
                          duration-300

                          group-hover:translate-x-1
                        '
                    >
                      <FaArrowRight className='text-[8px]' />
                    </span>
                  </Link>
                </div>

                {/* ==================================================
                      RECOMMENDED PRODUCTS
                  ================================================== */}

                {recommendedProducts.length > 0 && (
                  <section
                    className='
                        border-t
                        border-gray-100

                        pt-7
                      '
                  >
                    <div
                      className='
                          flex
                          items-center
                          justify-between

                          mb-4
                        '
                    >
                      <h3
                        className='
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.18em]
                          '
                      >
                        You May Like
                      </h3>

                      <Link
                        to='/collections'
                        onClick={handleProductClick}
                        className='
                            group

                            flex
                            items-center
                            gap-2

                            text-xs
                            font-semibold
                          '
                      >
                        Explore
                        <FaArrowRight
                          className='
                              text-[8px]

                              transition-transform
                              duration-300

                              group-hover:translate-x-1
                            '
                        />
                      </Link>
                    </div>

                    <div
                      className='
                          grid
                          grid-cols-2

                          gap-4
                        '
                    >
                      {recommendedProducts.slice(0, 4).map((product) => {
                        const slug = createSlug(product.name);

                        return (
                          <Link
                            key={product.id}
                            to={`/bestseller/product/${slug}`}
                            onClick={handleProductClick}
                            className='group'
                          >
                            <div
                              className='
                                    relative

                                    aspect-[4/5]

                                    overflow-hidden

                                    rounded-xl

                                    bg-gray-100
                                  '
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className='
                                      w-full
                                      h-full

                                      object-cover

                                      transition-transform
                                      duration-700

                                      group-hover:scale-105
                                    '
                              />

                              {/* HOVER CTA */}

                              <div
                                className='
                                      absolute

                                      left-3
                                      right-3
                                      bottom-3

                                      translate-y-2

                                      opacity-0

                                      group-hover:translate-y-0
                                      group-hover:opacity-100

                                      transition-all
                                      duration-300
                                    '
                              >
                                <div
                                  className='
                                        bg-white

                                        rounded-lg

                                        px-3
                                        py-2.5

                                        flex
                                        items-center
                                        justify-between

                                        shadow-lg
                                      '
                                >
                                  <span
                                    className='
                                          text-[9px]
                                          font-bold
                                          uppercase
                                          tracking-wider
                                        '
                                  >
                                    Shop
                                  </span>

                                  <span
                                    className='
                                          w-5
                                          h-5

                                          rounded-full

                                          bg-black
                                          text-white

                                          flex
                                          items-center
                                          justify-center
                                        '
                                  >
                                    <FaArrowRight
                                      className='
                                            text-[7px]
                                          '
                                    />
                                  </span>
                                </div>
                              </div>
                            </div>

                            <p
                              className='
                                    mt-2

                                    text-xs
                                    font-semibold

                                    truncate
                                  '
                            >
                              {product.name}
                            </p>

                            <p
                              className='
                                    mt-1

                                    text-xs
                                    text-gray-500
                                  '
                            >
                              ₦{Number(product.price || 0).toLocaleString('en-NG')}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                )}
              </section>
            )}
          </main>
        </div>
      </aside>
    </>
  );
};

export default SearchDrawer;
