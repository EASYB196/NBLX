import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../Context/WishlistContext';

import {dropdownData} from '../data/DropDownData.js';

import Logo from '../assets/images/nblx_logo.png';

import { FaSearch, FaRegUser, FaBars } from 'react-icons/fa';
import { MdOutlineShoppingBag } from 'react-icons/md';

import { useCart } from '../Context/cartContext.jsx';

import MenuDrawer from '../components/NavDrawer/MenuDrawer.jsx';
import SearchDrawer from '../components/NavDrawer/SearchDrawer';
import Tooltip from '../components/ToolTip.jsx';

// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';

const NavBar = () => {
  const { cartItems, setShowCart } = useCart();
  const navigate = useNavigate();

  const { wishlistItems } = useWishlist();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [activePanel, setActivePanel] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  const navRef = useRef(null);

  // const dropdownData = {
  //   men: [
  //     { name: 'Jalabiya', path: '/jalabiya' },
  //     { name: 'Kafans/Shirts', path: '/kafans-shirts' },
  //     { name: 'Agbada', path: '/agbada' },
  //     { name: 'Casuals', path: '/casuals' },
  //     { name: 'T-shirts', path: '/t-shirts' },
  //     { name: 'Pants', path: '/pants' },
  //   ],
  //   women: [
  //     { name: 'Abaya', path: '/abaya' },
  //     { name: 'Crop Top', path: '/croptop' },
  //   ],
  //   accessories: [
  //     { name: 'Watches', path: '/watches' },
  //     { name: 'Bags', path: '/bags' },
  //     { name: 'Belts', path: '/belts' },
  //   ],
  // };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
    setSearchOpen(false);
    setActivePanel(null);
    setOpenDropdown(null);
  };

  const uiLocked = menuOpen || searchOpen;

  /* ---------------- SCROLL HIDE / SHOW ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      if (uiLocked) return;

      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isInsideDrawer =
        e.target.closest('.menu-drawer') || e.target.closest('.search-drawer');

      // ❌ DO NOTHING if clicking inside drawers
      if (isInsideDrawer) return;

      // ❌ DO NOTHING if clicking inside navbar
      if (navRef.current && navRef.current.contains(e.target)) return;

      // ✅ CLOSE EVERYTHING only if truly outside
      setMenuOpen(false);
      setSearchOpen(false);
      setActivePanel(null);
      setOpenDropdown(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <>
      {/* NAVBAR */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 px-4 md:px-10 py-3 flex items-center justify-between transition-transform duration-300
        ${showNav ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* LOGO */}
        <Link to='/'>
          <img src={Logo} alt='logo' className='w-36 md:w-50 h-14 object-contain' />
        </Link>

        {/* ICONS */}
        <div className='flex items-center gap-5 md:gap-7'>
          {/* SEARCH */}
          <Tooltip text='Search'>
            <FaSearch className='text-xl cursor-pointer' onClick={() => setSearchOpen(true)} />
          </Tooltip>
          {/* ACCOUNT */}
          <div className='relative'>
            <FaRegUser
              className='text-xl cursor-pointer'
              onClick={() => setActivePanel(activePanel === 'account' ? null : 'account')}
            />
            {/* ACCOUNT DROPDOWN */}{' '}
            <div className='relative left-10 '>
              <AnimatePresence>
                {' '}
                {activePanel === 'account' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className='absolute right-0 top-5 w-44 bg-white shadow-xl rounded-md p-3 flex flex-col gap-2 z-50'
                  >
                    {' '}
                    <Link to='/auth/login'>
                      {' '}
                      <button className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition'>
                        {' '}
                        Login{' '}
                      </button>{' '}
                    </Link>{' '}
                    <Link to='/auth/signup'>
                      {' '}
                      <button className='relative w-full py-2 text-black transition cursor-pointer overflow-hidden group'>
                        {' '}
                        Create Account{' '}
                        <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-black transition-all duration-300 group-hover:w-[70%]'></span>{' '}
                      </button>{' '}
                    </Link>{' '}
                  </motion.div>
                )}{' '}
              </AnimatePresence>{' '}
            </div>
          </div>
          {/* WISHLIST */}

          <Tooltip text='Wishlist'>
            <div className='relative cursor-pointer' onClick={() => navigate('/wishlist')}>
              <FaRegHeart className='text-xl' />

              {wishlistItems.length > 0 && (
                <span className='absolute -top-2 -right-2 w-4 h-4 bg-black font-bold  text-white text-xs flex items-center justify-center rounded-full'>
                  {wishlistItems.length}
                </span>
              )}
            </div>
          </Tooltip>

          {/* CART */}
          <Tooltip text='Cart'>
            <div className='relative cursor-pointer' onClick={() => setShowCart(true)}>
              <MdOutlineShoppingBag className='text-2xl' />

              {cartItems.length > 0 && (
                <span className='absolute -top-1 -right-2 w-4 h-4 bg-black font-bold text-white text-xs flex items-center justify-center rounded-full'>
                  {cartItems.length}
                </span>
              )}
            </div>
          </Tooltip>
          {/* MENU */}
          <Tooltip text='Menu'>
            <FaBars className='text-xl cursor-pointer' onClick={() => setMenuOpen(true)} />
          </Tooltip>
        </div>
      </nav>

      {/* DRAWERS */}
      <MenuDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        dropdownData={dropdownData}
        handleNavigation={handleNavigation}
      />

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
