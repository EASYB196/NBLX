import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useWishlist } from '../../Context/WishlistContext';
import AccountLayout from './AccountLayout';

export default function ProfileWishlist() {
  const { wishlistItems = [], wishlistReady } = useWishlist();

  return (
    <AccountLayout
      title="My Wishlist"
      description="Your saved NBLX products, all in one place."
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
        <h2 className="text-xl font-bold">
          Saved products ({wishlistItems.length})
        </h2>

        {!wishlistReady ? (
          <p className="py-10 text-sm text-gray-500">
            Loading your wishlist...
          </p>
        ) : wishlistItems.length === 0 ? (
          <div className="py-12 text-center">
            <FaHeart className="mx-auto text-3xl text-gray-300" />
            <p className="mt-4 font-semibold">Your wishlist is empty</p>
            <Link
              to="/category"
              className="mt-5 inline-block rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white"
            >
              Explore collections
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {wishlistItems.map((item, index) => {
              const image = item.image || item.images?.[0];
              const name = item.name || item.title || 'NBLX Product';

              return (
                <Link
                  key={`${item.id || name}-${item.selectedColor || ''}-${index}`}
                  to={item.route || '/wishlist'}
                  className="group min-w-0"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
                    {image && (
                      <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>

                  <p className="mt-3 truncate text-sm font-semibold">
                    {name}
                  </p>

                  {item.selectedColor && (
                    <p className="mt-1 text-xs text-gray-500">
                      Color: {item.selectedColor}
                    </p>
                  )}

                  {item.price != null && (
                    <p className="mt-1 text-sm font-medium">
                      {typeof item.price === 'number'
                        ? `₦${item.price.toLocaleString('en-NG')}`
                        : item.price}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}