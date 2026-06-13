import React from 'react';
import { AnimatePresence } from 'framer-motion';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import store from '../../assets/images/showroom.jpg';

const MenuDrawer = ({
  open,
  onClose,
  openDropdown,
  setOpenDropdown,
  dropdownData,
  handleNavigation,
}) => {
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const Chevron = ({ isOpen }) => (
    <motion.div
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className='text-sm'
    >
      <FaChevronDown />
    </motion.div>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50'
        >
          {/* OVERLAY */}
          <div onClick={onClose} className='absolute inset-0 bg-black/40' />

          {/* DRAWER */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            onClick={(e) => e.stopPropagation()}
            transition={{ duration: 0.3 }}
            className='menu-drawer absolute right-0 top-0 h-full w-[85%] md:w-96 bg-white shadow-xl overflow-y-auto'
          >
            {/* HEADER */}
            <div className='flex items-center justify-between p-5 border-b border-gray-200'>
              <h1 className='text-lg font-semibold'>MENU</h1>
              <button onClick={onClose} className='text-2xl'>
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div className='p-5 flex flex-col gap-5 text-sm'>
                <p className='cursor-pointer'>NEW ARRIVALS</p>

              {/* MEN */}
              <div>
                <div
                  onClick={() => toggleDropdown('men')}
                  className='flex justify-between items-center cursor-pointer'
                >
                  <p>SHOP MEN</p>
                  <Chevron isOpen={openDropdown === 'men'} />
                </div>

                <AnimatePresence>
                  {openDropdown === 'men' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className='pl-4 mt-3 flex flex-col gap-3 text-gray-600 overflow-hidden'
                    >
                      {dropdownData.men.map((item, i) => (
                        <p
                          key={i}
                          onClick={() => handleNavigation(item.path)}
                          className='cursor-pointer hover:text-black text-[16px]'
                        >
                          {item.name}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* WOMEN */}
              <div>
                <div
                  onClick={() => toggleDropdown('women')}
                  className='flex justify-between items-center cursor-pointer'
                >
                  <p>SHOP WOMEN</p>
                  <Chevron isOpen={openDropdown === 'women'} />
                </div>

                <AnimatePresence>
                  {openDropdown === 'women' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className='pl-4 mt-3 flex flex-col gap-3 text-gray-600 overflow-hidden'
                    >
                      {dropdownData.women.map((item, i) => (
                        <p
                          key={i}
                          onClick={() => handleNavigation(item.path)}
                          className='cursor-pointer hover:text-black'
                        >
                          {item.name}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className='cursor-pointer'>DENIM</p>

              {/* ACCESSORIES */}
              <div>
                <div
                  onClick={() => toggleDropdown('accessories')}
                  className='flex justify-between items-center cursor-pointer'
                >
                  <p>ACCESSORIES</p>
                  <Chevron isOpen={openDropdown === 'accessories'} />
                </div>

                <AnimatePresence>
                  {openDropdown === 'accessories' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className='pl-4 mt-3 flex flex-col gap-3 text-gray-600 overflow-hidden'
                    >
                      {dropdownData.accessories.map((item, i) => (
                        <p
                          key={i}
                          onClick={() => handleNavigation(item.path)}
                          className='cursor-pointer hover:text-black'
                        >
                          {item.name}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className='cursor-pointer'>FOOTWEAR</p>
              <p className='cursor-pointer'>LIFESTYLE</p>
              <Link to='/bestseller' className='cursor-pointer'>
                BEST SELLER{' '}
              </Link>

              {/* STORE */}
              <div className='mt-6'>
                <img src={store} alt='store' className='w-full h-44 object-cover rounded-lg' />

                <h2 className='text-center mt-4 text-lg font-medium'>STORE LOCATIONS</h2>

                <button className='w-full mt-4 bg-black text-white py-3 rounded-full'>
                  VISIT US
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuDrawer;
