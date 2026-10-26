import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaArrowRight } from 'react-icons/fa';// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// import BreadCrumb from '../components/BreadCrumb';

const CATEGORIES = [
  {
    name: 'SHOP MEN',
    key: 'men',
    children: [
      { name: 'T-Shirts & Tops', path: '/t-shirt' },
      { name: 'Pants & Shorts', path: '/pants' },
      { name: 'Denim & Jeans', path: '/Denim-Jeans' },
      { name: 'Outerwear & Jackets', path: '/Outerwear-Jackets' },
      { name: 'Hoodies & Sweatshirts', path: '/Hoodies-Sweatshirts' },
    ],
  },
  {
    name: 'SHOP WOMEN',
    key: 'women',
    children: [
      { name: 'Skirts', path: '/skirts' },
      { name: 'Female Pants', path: '/female-pant' },
      { name: 'Tops', path: '/tops' },
    ],
  },
  {
    name: 'DENIM',
    path: '/Denim-Jeans',
  },
  {
    name: 'BEST SELLERS',
    path: '/#best-sellers',
  },
];

const Category = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const [openDropdown, setOpenDropdown] = useState(null);

  // Keep references to category buttons so focus can be restored
  // when a submenu is closed with the Escape key.
  const categoryButtonRefs = useRef({});

  const toggleDropdown = useCallback((menu) => {
    setOpenDropdown((current) => (current === menu ? null : menu));
  }, []);

  const closeDropdown = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  const handleNavigation = useCallback(
    (path) => {
      if (!path) return;

      setOpenDropdown(null);
      navigate(path);
    },
    [navigate],
  );

  const handleCategoryKeyDown = useCallback((event, item) => {
    if (event.key === 'Escape' && item.children) {
      event.preventDefault();

      setOpenDropdown(null);

      categoryButtonRefs.current[item.key]?.focus();
    }
  }, []);

  const handleSubcategoryKeyDown = useCallback((event, item) => {
    if (event.key === 'Escape') {
      event.preventDefault();

      setOpenDropdown(null);

      categoryButtonRefs.current[item.key]?.focus();
    }
  }, []);

  const animationTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        height: { duration: 0.28, ease: 'easeInOut' },
        opacity: { duration: 0.2 },
      };

  return (
    <main className='min-h-screen w-full overflow-x-clip bg-white text-black'>
      <div className='mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20'>
        {/* Breadcrumb intentionally preserved as commented-out code. */}
        {/* <BreadCrumb category="Categories" /> */}

        {/* Page heading */}
        <header className='mb-10 min-w-0 text-center sm:mb-14 lg:mb-16'>
          <p className='mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500 sm:text-xs sm:tracking-[0.35em]'>
            Discover NBLX
          </p>

          <h1 className='break-words text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl'>
            Shop by Category
          </h1>

          <p className='mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500 sm:text-base'>
            Explore the collection and find your next everyday essential.
          </p>
        </header>

        {/* Category navigation */}
        <nav aria-label='Shop categories' className='mx-auto w-full min-w-0'>
          <div className='border-y border-neutral-200'>
            {CATEGORIES.map((item, index) => {
              const isDropdown = Boolean(item.children);
              const isOpen = openDropdown === item.key;
              const panelId = `category-panel-${item.key || index}`;

              return (
                <div
                  key={item.key || item.path}
                  className='min-w-0 border-b border-neutral-200 last:border-b-0'
                >
                  {/* Main category row */}
                  <button
                    ref={
                      isDropdown
                        ? (element) => {
                            categoryButtonRefs.current[item.key] = element;
                          }
                        : undefined
                    }
                    type='button'
                    aria-expanded={isDropdown ? isOpen : undefined}
                    aria-controls={isDropdown ? panelId : undefined}
                    onClick={() =>
                      isDropdown ? toggleDropdown(item.key) : handleNavigation(item.path)
                    }
                    onKeyDown={(event) => handleCategoryKeyDown(event, item)}
                    className='group flex min-h-[76px] w-full min-w-0 items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black sm:min-h-[88px] sm:py-6 md:min-h-[96px]'
                  >
                    <span className='min-w-0 break-words text-sm font-bold leading-relaxed tracking-[0.08em] sm:text-base sm:tracking-[0.12em] md:text-lg'>
                      {item.name}
                    </span>

                    <span
                      aria-hidden='true'
                      className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 transition-colors duration-200 group-hover:border-black group-hover:bg-black group-hover:text-white sm:h-11 sm:w-11'
                    >
                      {isDropdown ? (
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{
                            duration: prefersReducedMotion ? 0 : 0.22,
                          }}
                          className='flex items-center justify-center'
                        >
                          <FaChevronDown className='text-[11px]' />
                        </motion.span>
                      ) : (
                        <FaArrowRight className='text-[11px] transition-transform duration-200 group-hover:translate-x-0.5' />
                      )}
                    </span>
                  </button>

                  {/* Expandable subcategories */}
                  {isDropdown && (
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          key={panelId}
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={animationTransition}
                          className='min-w-0 overflow-hidden'
                        >
                          <div className='mb-5 ml-2 min-w-0 border-l border-neutral-200 pl-4 sm:mb-7 sm:ml-4 sm:pl-6 md:ml-5 md:pl-7'>
                            <div className='flex min-w-0 flex-col'>
                              {item.children.map((sub) => (
                                <button
                                  key={sub.path}
                                  type='button'
                                  onClick={() => handleNavigation(sub.path)}
                                  onKeyDown={(event) => handleSubcategoryKeyDown(event, item)}
                                  className='group flex min-h-12 w-full min-w-0 items-center justify-between gap-3 py-3 text-left text-sm leading-6 text-neutral-600 transition-colors duration-200 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black sm:text-base'
                                >
                                  <span className='min-w-0 break-words'>{sub.name}</span>

                                  <FaArrowRight
                                    aria-hidden='true'
                                    className='shrink-0 text-[10px] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100'
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Closing note */}
        <p className='mt-8 text-center text-xs leading-5 text-neutral-500 sm:mt-10 sm:text-sm'>
          Designed for everyday wear. Discover your NBLX essentials.
        </p>
      </div>
    </main>
  );
};

export default Category;
