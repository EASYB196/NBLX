import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useWishlist } from '../Context/WishlistContext';
import Breadcrumb from '../components/Breadcrumb';
function Wishlist() {
  const { wishlistItems, toggleWishlist } = useWishlist();

  return (
    <div className='max-w-7xl mx-auto px-4 md:px-8 py-10 mt-2 min-h-screen'>
      <Breadcrumb category='Wishlist' />

      {/* HEADER */}
      <div className='mb-10'>
        <h1 className='text-3xl md:text-4xl font-bold'>My Wishlist</h1>

        <p className='text-gray-500 mt-2'>{wishlistItems.length} item(s) saved</p>
      </div>

      {/* EMPTY STATE */}
      {wishlistItems.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20'>
          <FaHeart className='text-6xl text-gray-300 mb-4' />

          <h2 className='text-2xl font-semibold mb-2'>Your wishlist is empty</h2>

          <p className='text-gray-500 text-center'>
            Add products to your wishlist and they'll appear here.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className='bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300'
            >
              {/* CLICKABLE PRODUCT */}
              <Link to={item.route || `/bestseller/products/${item.id}`}>
                <div className='overflow-hidden'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-full h-72 md:h-80 object-cover hover:scale-105 transition duration-300'
                  />
                </div>

                <div className='p-4'>
                  <h3 className='font-semibold text-lg'>{item.name}</h3>

                  <p className='mt-2 font-bold'>₦{item.price.toLocaleString('en-NG')}</p>
                </div>
              </Link>

              {/* REMOVE BUTTON */}
              <div className='px-4 pb-4'>
                <button
                  onClick={() => toggleWishlist(item)}
                  className='w-full py-2 cursor-copy rounded-lg bg-[#ff0000] text-white hover:bg-[#ff0000] transition'
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
