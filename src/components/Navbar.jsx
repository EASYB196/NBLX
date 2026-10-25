

import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  FaRegHeart,
  FaSearch,
  FaRegUser,
  FaBars,
  FaArrowRight,
  FaSignOutAlt,
} from 'react-icons/fa';
import { MdOutlineShoppingBag } from 'react-icons/md';

import {
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';

import { useWishlist } from '../Context/WishlistContext';
import { useCart } from '../Context/cartContext.jsx';

import { dropdownData } from '../data/DropDownData.js';

import Logo from '../assets/images/nblx_logo.png';

import MenuDrawer from '../components/NavDrawer/MenuDrawer.jsx';
import SearchDrawer from '../components/NavDrawer/SearchDrawer';
import Tooltip from '../components/ToolTip.jsx';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';

const ACCOUNT_PATH = '/profile';

const NavBar = () => {
  const { cartItems, setShowCart } = useCart();
  const { wishlistItems } = useWishlist();

  const navigate = useNavigate();

  const navRef = useRef(null);
  const accountRef = useRef(null);
  const lastScrollY = useRef(0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activePanel, setActivePanel] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNav, setShowNav] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const accountOpen = activePanel === 'account';
  const uiLocked = menuOpen || searchOpen;

  // Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setAuthLoading(false);
      },
      (error) => {
        console.error('Authentication state error:', error);
        setCurrentUser(null);
        setAuthLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  // Close interactive elements when navigating
  const closeNavigation = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setActivePanel(null);
    setOpenDropdown(null);
  };

  const handleNavigation = (path) => {
    closeNavigation();
    navigate(path);
  };

  // Firebase logout
  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await signOut(auth);
      closeNavigation();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  // Hide navbar when scrolling down, reveal when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      if (uiLocked) return;

      const currentScrollY = Math.max(window.scrollY, 0);
      const previousScrollY = lastScrollY.current;

      if (Math.abs(currentScrollY - previousScrollY) < 8) {
        return;
      }

      if (currentScrollY < 80 || currentScrollY < previousScrollY) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [uiLocked]);

  // Close menus when clicking outside
  useEffect(() => {
    const handlePointerDown = (event) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const isInsideDrawer =
        target.closest('.menu-drawer') ||
        target.closest('.search-drawer');

      if (isInsideDrawer) return;

      if (navRef.current?.contains(target)) return;

      closeNavigation();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  // Close the account dropdown and drawers with Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeNavigation();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className={[
          'fixed inset-x-0 top-0 z-50 w-full',
          'border-b border-black/5',
          'bg-white/95 text-black shadow-sm',
          'backdrop-blur-xl',
          'transition-transform duration-300 ease-in-out',
          showNav ? 'translate-y-0' : '-translate-y-full',
        ].join(' ')}
      >
        <div className="mx-auto flex min-h-[68px] w-full max-w-[1920px] items-center justify-between gap-3 px-4 sm:min-h-[76px] sm:px-6 md:px-10 lg:px-14 xl:px-20">
          {/* Brand logo */}
          <Link
            to="/"
            onClick={closeNavigation}
            aria-label="NBLX home"
            className="flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
          >
            <img
              src={Logo}
              alt="NBLX"
              className="h-10 w-28 object-contain object-left sm:h-12 sm:w-36 lg:w-40"
            />
          </Link>

          {/* Navigation actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
            {/* Search */}
            <Tooltip text="Search">
              <button
                type="button"
                aria-label="Open search"
                aria-expanded={searchOpen}
                onClick={() => {
                  setSearchOpen((previous) => !previous);
                  setMenuOpen(false);
                  setActivePanel(null);
                }}
                className={[
                  'flex h-10 w-10 items-center justify-center',
                  'rounded-full text-black',
                  'transition-colors duration-200',
                  'hover:bg-neutral-100 active:bg-neutral-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black',
                  'sm:h-11 sm:w-11',
                ].join(' ')}
              >
                <FaSearch aria-hidden="true" className="text-lg" />
              </button>
            </Tooltip>

            {/* Account */}
            <div ref={accountRef} className="relative">
              <Tooltip text={currentUser ? 'My Account' : 'Account'}>
                <button
                  type="button"
                  aria-label={currentUser ? 'My Account' : 'Open account menu'}
                  aria-expanded={accountOpen}
                  aria-haspopup="true"
                  onClick={() => {
                    setActivePanel((previous) =>
                      previous === 'account' ? null : 'account',
                    );
                    setMenuOpen(false);
                    setSearchOpen(false);
                  }}
                  className={[
                    'flex h-10 w-10 items-center justify-center gap-2',
                    'rounded-full text-black',
                    'transition-colors duration-200',
                    'hover:bg-neutral-100 active:bg-neutral-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black',
                    'sm:h-11 sm:w-11',
                  ].join(' ')}
                >
                  <FaRegUser aria-hidden="true" className="text-lg" />
                </button>
              </Tooltip>

              {/* Account dropdown */}
              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className={[
                      'absolute right-0 top-full z-[60] mt-3',
                      'w-64 max-w-[calc(100vw-2rem)]',
                      'overflow-hidden rounded-xl',
                      'border border-neutral-200 bg-white p-2',
                      'text-black shadow-xl shadow-black/10',
                    ].join(' ')}
                  >
                    {!authLoading && (
                      <>
                        {!currentUser ? (
                          <div className="flex flex-col gap-1">
                            <div className="px-3 pb-2 pt-2">
                              <p className="text-sm font-semibold">
                                Welcome to NBLX
                              </p>
                              <p className="mt-1 text-xs text-neutral-500">
                                Sign in to access your account.
                              </p>
                            </div>

                            <Link
                              to="/auth/login"
                              onClick={closeNavigation}
                              className={[
                                'flex min-h-11 items-center justify-center',
                                'rounded-lg bg-black px-4 py-3',
                                'text-sm font-semibold text-white',
                                'transition-colors hover:bg-neutral-800',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
                              ].join(' ')}
                            >
                              Login
                            </Link>

                            <Link
                              to="/auth/signup"
                              onClick={closeNavigation}
                              className={[
                                'flex min-h-11 items-center justify-center',
                                'rounded-lg px-4 py-3',
                                'text-sm font-semibold text-black',
                                'transition-colors hover:bg-neutral-100',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black',
                              ].join(' ')}
                            >
                              Create Account
                              <FaArrowRight
                                aria-hidden="true"
                                className="ml-2 text-xs"
                              />
                            </Link>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1">
                            <div className="border-b border-neutral-100 px-3 pb-3 pt-2">
                              <p className="text-sm font-semibold">
                                My Account
                              </p>
                              <p className="mt-1 truncate text-xs text-neutral-500">
                                {currentUser.email || 'Welcome back'}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleNavigation(ACCOUNT_PATH)}
                              className={[
                                'flex min-h-11 w-full items-center',
                                'rounded-lg px-3 py-2 text-left text-sm',
                                'transition-colors hover:bg-neutral-100',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black',
                              ].join(' ')}
                            >
                              <FaRegUser
                                aria-hidden="true"
                                className="mr-3 text-neutral-500"
                              />
                              My Account
                            </button>

                            <button
                              type="button"
                              onClick={handleLogout}
                              disabled={loggingOut}
                              className={[
                                'flex min-h-11 w-full items-center',
                                'rounded-lg px-3 py-2 text-left text-sm',
                                'text-red-600 transition-colors',
                                'hover:bg-red-50',
                                'disabled:cursor-not-allowed disabled:opacity-60',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500',
                              ].join(' ')}
                            >
                              <FaSignOutAlt
                                aria-hidden="true"
                                className="mr-3"
                              />
                              {loggingOut ? 'Logging out...' : 'Logout'}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Tooltip text="Wishlist">
              <button
                type="button"
                aria-label={`Wishlist${wishlistItems.length ? `, ${wishlistItems.length} items` : ''}`}
                onClick={() => handleNavigation('/wishlist')}
                className={[
                  'relative flex h-10 w-10 items-center justify-center',
                  'rounded-full text-black',
                  'transition-colors duration-200',
                  'hover:bg-neutral-100 active:bg-neutral-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black',
                  'sm:h-11 sm:w-11',
                ].join(' ')}
              >
                <FaRegHeart aria-hidden="true" className="text-xl" />

                {wishlistItems.length > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                    {wishlistItems.length > 99 ? '99+' : wishlistItems.length}
                  </span>
                )}
              </button>
            </Tooltip>

            {/* Cart */}
            <Tooltip text="Cart">
              <button
                type="button"
                aria-label={`Shopping bag${cartItems.length ? `, ${cartItems.length} items` : ''}`}
                onClick={() => setShowCart(true)}
                className={[
                  'relative flex h-10 w-10 items-center justify-center',
                  'rounded-full text-black',
                  'transition-colors duration-200',
                  'hover:bg-neutral-100 active:bg-neutral-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black',
                  'sm:h-11 sm:w-11',
                ].join(' ')}
              >
                <MdOutlineShoppingBag
                  aria-hidden="true"
                  className="text-2xl"
                />

                {cartItems.length > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                    {cartItems.length > 99 ? '99+' : cartItems.length}
                  </span>
                )}
              </button>
            </Tooltip>

            {/* Menu drawer toggle */}
            <Tooltip text="Menu">
              <button
                type="button"
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                onClick={() => {
                  setMenuOpen((previous) => !previous);
                  setSearchOpen(false);
                  setActivePanel(null);
                }}
                className={[
                  'flex h-10 w-10 items-center justify-center',
                  'rounded-full text-black',
                  'transition-colors duration-200',
                  'hover:bg-neutral-100 active:bg-neutral-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black',
                  'sm:h-11 sm:w-11',
                ].join(' ')}
              >
                <FaBars aria-hidden="true" className="text-xl" />
              </button>
            </Tooltip>
          </div>
        </div>
      </nav>

      {/* Existing navigation drawer */}
      <MenuDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        dropdownData={dropdownData}
        handleNavigation={handleNavigation}
      />

      {/* Existing search drawer */}
      <SearchDrawer
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};

export default NavBar;










// import React, { useEffect, useRef, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// import { FaRegHeart } from 'react-icons/fa';
// import { FaSearch, FaRegUser, FaBars } from 'react-icons/fa';
// import { MdOutlineShoppingBag } from 'react-icons/md';

// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { auth } from '../firebase';

// import { useWishlist } from '../Context/WishlistContext';
// import { useCart } from '../Context/cartContext.jsx';

// import { dropdownData } from '../data/DropDownData.js';

// import Logo from '../assets/images/nblx_logo.png';

// import MenuDrawer from '../components/NavDrawer/MenuDrawer.jsx';
// import SearchDrawer from '../components/NavDrawer/SearchDrawer';
// import Tooltip from '../components/ToolTip.jsx';

// // eslint-disable-next-line no-unused-vars
// import { AnimatePresence, motion } from 'framer-motion';

// // Update these paths to match your existing App.jsx routes.
// const ACCOUNT_PATH = '/profile';
// const ORDERS_PATH = '/profile/orders';

// const NavBar = () => {
//   const { cartItems, setShowCart } = useCart();
//   const { wishlistItems } = useWishlist();

//   const navigate = useNavigate();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);

//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [activePanel, setActivePanel] = useState(null);

//   const [searchQuery, setSearchQuery] = useState('');

//   const [showNav, setShowNav] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loggingOut, setLoggingOut] = useState(false);

//   const lastScrollY = useRef(0);
//   const navRef = useRef(null);

//   // AUTHENTICATION STATE
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(
//       auth,
//       (user) => {
//         setCurrentUser(user);
//       },
//       (error) => {
//         console.error('Authentication state error:', error);
//         setCurrentUser(null);
//       },
//     );

//     return unsubscribe;
//   }, []);

//   const handleNavigation = (path) => {
//     navigate(path);

//     setMenuOpen(false);
//     setSearchOpen(false);
//     setActivePanel(null);
//     setOpenDropdown(null);
//   };

//   // LOGOUT
//   const handleLogout = async () => {
//     if (loggingOut) return;

//     setLoggingOut(true);

//     try {
//       await signOut(auth);

//       setActivePanel(null);
//       setMenuOpen(false);
//       setSearchOpen(false);

//       navigate('/');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     } finally {
//       setLoggingOut(false);
//     }
//   };

//   const uiLocked = menuOpen || searchOpen;

//   // SCROLL HIDE / SHOW
//   useEffect(() => {
//     const handleScroll = () => {
//       if (uiLocked) return;

//       const currentScrollY = window.scrollY;

//       if (Math.abs(currentScrollY - lastScrollY.current) < 10) {
//         return;
//       }

//       if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
//         setShowNav(false);
//       } else {
//         setShowNav(true);
//       }

//       lastScrollY.current = currentScrollY;
//     };

//     window.addEventListener('scroll', handleScroll, {
//       passive: true,
//     });

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [menuOpen, searchOpen]);

//   // CLOSE MENUS WHEN CLICKING OUTSIDE
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       const isInsideDrawer =
//         e.target.closest('.menu-drawer') || e.target.closest('.search-drawer');

//       if (isInsideDrawer) return;

//       if (navRef.current && navRef.current.contains(e.target)) {
//         return;
//       }

//       setMenuOpen(false);
//       setSearchOpen(false);
//       setActivePanel(null);
//       setOpenDropdown(null);
//     };

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav
//         ref={navRef}
//         className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 px-4 md:px-10 py-3 flex items-center justify-between transition-transform duration-300
//         ${showNav ? 'translate-y-0' : '-translate-y-full'}`}
//       >
//         {/* LOGO */}
//         <Link to='/'>
//           <img src={Logo} alt='NBLX logo' className='w-36 md:w-50 h-14 object-contain' />
//         </Link>

//         {/* ICONS */}
//         <div className='flex items-center gap-5 md:gap-7'>
//           {/* SEARCH */}
//           <Tooltip text='Search'>
//             <FaSearch className='text-xl cursor-pointer' onClick={() => setSearchOpen(true)} />
//           </Tooltip>

//           {/* ACCOUNT */}
//           <div className='relative'>
//             <Tooltip text={currentUser ? 'My Account' : 'Account'}>
//               <button
//                 type='button'
//                 aria-label={currentUser ? 'My Account' : 'Account'}
//                 aria-expanded={activePanel === 'account'}
//                 aria-haspopup='true'
//                 onClick={() => setActivePanel(activePanel === 'account' ? null : 'account')}
//                 className='flex items-center gap-2 bg-transparent text-black'
//               >
//                 <FaRegUser className='text-xl cursor-pointer shrink-0' />
//               </button>
//             </Tooltip>

//             {/* ACCOUNT DROPDOWN */}
//             <div className='relative left-10'>
//               <AnimatePresence>
//                 {activePanel === 'account' && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     transition={{ duration: 0.2 }}
//                     className='absolute right-0 top-5 w-44 bg-white shadow-xl rounded-md p-3 flex flex-col gap-2 z-50'
//                   >
//                     {!currentUser ? (
//                       <>
//                         {/* LOGGED OUT */}
//                         <Link to='/auth/login' onClick={() => setActivePanel(null)}>
//                           <button
//                             type='button'
//                             className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition'
//                           >
//                             Login
//                           </button>
//                         </Link>

//                         <Link to='/auth/signup' onClick={() => setActivePanel(null)}>
//                           <button
//                             type='button'
//                             className='relative w-full py-2 text-black transition cursor-pointer overflow-hidden group'
//                           >
//                             Create Account
//                             <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-black transition-all duration-300 group-hover:w-[70%]' />
//                           </button>
//                         </Link>
//                       </>
//                     ) : (
//                       <>
//                         {/* LOGGED IN */}

//                         <button
//                           type='button'
//                           onClick={() => handleNavigation(ACCOUNT_PATH)}
//                           className='w-full text-left px-2 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition'
//                         >
//                           My Account
//                         </button>

//                         <button
//                           type='button'
//                           onClick={handleLogout}
//                           disabled={loggingOut}
//                           className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed'
//                         >
//                           {loggingOut ? 'Logging out...' : 'Logout'}
//                         </button>
//                       </>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* WISHLIST */}
//           <Tooltip text='Wishlist'>
//             <div className='relative cursor-pointer' onClick={() => navigate('/wishlist')}>
//               <FaRegHeart className='text-xl' />

//               {wishlistItems.length > 0 && (
//                 <span className='absolute -top-2 -right-2 w-4 h-4 bg-black font-bold text-white text-xs flex items-center justify-center rounded-full'>
//                   {wishlistItems.length}
//                 </span>
//               )}
//             </div>
//           </Tooltip>

//           {/* CART */}
//           <Tooltip text='Cart'>
//             <div className='relative cursor-pointer' onClick={() => setShowCart(true)}>
//               <MdOutlineShoppingBag className='text-2xl' />

//               {cartItems.length > 0 && (
//                 <span className='absolute -top-1 -right-2 w-4 h-4 bg-black font-bold text-white text-xs flex items-center justify-center rounded-full'>
//                   {cartItems.length}
//                 </span>
//               )}
//             </div>
//           </Tooltip>

//           {/* MENU */}
//           <Tooltip text='Menu'>
//             <FaBars className='text-xl cursor-pointer' onClick={() => setMenuOpen(true)} />
//           </Tooltip>
//         </div>
//       </nav>

//       {/* DRAWERS */}
//       <MenuDrawer
//         open={menuOpen}
//         onClose={() => setMenuOpen(false)}
//         openDropdown={openDropdown}
//         setOpenDropdown={setOpenDropdown}
//         dropdownData={dropdownData}
//         handleNavigation={handleNavigation}
//       />

//       <SearchDrawer
//         open={searchOpen}
//         onClose={() => setSearchOpen(false)}
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//       />
//     </>
//   );
// };

// export default NavBar;


