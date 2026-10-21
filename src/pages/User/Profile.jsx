
import { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  FaUser,
  FaEnvelope,
  FaBox,
  FaHeart,
  FaMapMarkerAlt,
  FaLock,
  FaSignOutAlt,
  FaArrowRight,
  FaEdit,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';

import { auth } from '../../firebase';
import { useWishlist } from '../../Context/WishlistContext';

const Profile = () => {
  const navigate = useNavigate();
  const { wishlistItems, wishlistReady } = useWishlist();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/auth/login', { replace: true });
        return;
      }

      setUser(currentUser);
      setFullName(currentUser.displayName || '');
      setLoading(false);
    });

    return unsubscribe;
  }, [navigate]);

  const handleSaveName = async (e) => {
    e.preventDefault();

    const cleanName = fullName.trim();

    if (cleanName.length < 2) {
      toast.error('Please enter a valid name.');
      return;
    }

    if (!user) return;

    try {
      setSaving(true);

      await updateProfile(user, {
        displayName: cleanName,
      });

      setFullName(cleanName);
      setEditingName(false);

      toast.success('Profile updated successfully.');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Unable to update your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) {
      toast.error('No email address is associated with your account.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success('Password reset instructions have been sent.');
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Unable to send the reset email. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('You have been logged out.');
      navigate('/auth/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Unable to log out. Please try again.');
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-black animate-spin" />
      </div>
    );
  }

  const firstName =
    (user.displayName || user.email?.split('@')[0] || 'Customer')
      .trim()
      .split(/\s+/)[0];

  const shortcuts = [
    {
      label: 'My Orders',
      description: 'View your purchases and delivery status.',
      icon: FaBox,
      path: '/profile/orders',
    },
    {
      label: 'My Wishlist',
      description: 'Explore the products you have saved.',
      icon: FaHeart,
      path: '/profile/wishlist',
    },
    {
      label: 'Delivery Addresses',
      description: 'Manage your shipping information.',
      icon: FaMapMarkerAlt,
      path: '/profile/addresses',
    },
    {
      label: 'Account Security',
      description: 'Reset your password securely.',
      icon: FaLock,
      action: handlePasswordReset,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-gray-900">
      <div className="max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
         

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Welcome back, {firstName}.
            </h1>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Manage your account and keep track of your shopping.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 border border-gray-300 rounded-xl px-5 py-3 text-sm font-medium hover:bg-black hover:text-white hover:border-black transition w-full sm:w-auto"
          >
            <FaSignOutAlt />
            Log out
          </button>
        </div>

        {/* ACCOUNT SUMMARY */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-gray-500">Wishlist items</span>
              <FaHeart className="text-lg" />
            </div>

            <p className="text-3xl font-bold">
              {wishlistReady ? wishlistItems.length : '—'}
            </p>

            <Link
              to="/profile/wishlist"
              className="inline-flex items-center gap-2 text-sm font-medium mt-4 hover:underline"
            >
              View wishlist <FaArrowRight />
            </Link>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-gray-500">Order history</span>
              <FaBox className="text-lg" />
            </div>

            <p className="text-2xl font-bold">My purchases</p>

            <p className="text-sm text-gray-500 mt-2">
              Your order history will appear here once connected to
              the NBLX order database.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-gray-500">Account status</span>
              <FaUser className="text-lg" />
            </div>

            <p className="text-xl font-bold">Signed in</p>

            <p className="text-sm text-gray-500 mt-2 break-all">
              {user.email}
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* PERSONAL DETAILS */}
          <section className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5 sm:p-8">

            <div className="flex items-center justify-between gap-4 mb-7">
              <div>
                <h2 className="text-xl font-bold">Personal details</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Keep your account information up to date.
                </p>
              </div>

              {!editingName && (
                <button
                  type="button"
                  onClick={() => setEditingName(true)}
                  className="inline-flex items-center gap-2 text-sm font-semibold border rounded-xl px-3 py-2 hover:bg-gray-100 transition"
                >
                  <FaEdit /> Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveName} className="space-y-5">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Full name
                </label>

                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={!editingName || saving}
                    autoComplete="name"
                    className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-black disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    value={user.email || ''}
                    readOnly
                    className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 bg-gray-50 text-gray-500 outline-none"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Your email is managed by Firebase Authentication.
                </p>
              </div>

              {editingName && (
                <div className="flex flex-col-reverse sm:flex-row gap-3">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => {
                      setFullName(user.displayName || '');
                      setEditingName(false);
                    }}
                    className="inline-flex items-center justify-center gap-2 border border-gray-300 rounded-xl px-5 py-3 text-sm font-semibold hover:bg-gray-100 disabled:opacity-60"
                  >
                    <FaTimes /> Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 bg-black text-white rounded-xl px-5 py-3 text-sm font-semibold hover:bg-gray-800 disabled:opacity-60"
                  >
                    <FaCheck />
                    {saving ? 'Saving...' : 'Save changes'}
                  </button>
                </div>
              )}
            </form>
          </section>

          {/* QUICK LINKS */}
          <section className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
            <h2 className="text-xl font-bold mb-2">Account shortcuts</h2>
            <p className="text-sm text-gray-500 mb-5">
              Everything you need in one place.
            </p>

            <div className="space-y-3">
              {shortcuts.map((item) => {
                const Icon = item.icon;

                const content = (
                  <>
                    <span className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                      <Icon />
                    </span>

                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold">
                        {item.label}
                      </span>
                      <span className="block text-xs text-gray-500 mt-1 leading-relaxed">
                        {item.description}
                      </span>
                    </span>

                    <FaArrowRight className="text-gray-400 shrink-0" />
                  </>
                );

                return item.path ? (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 hover:border-gray-400 hover:bg-gray-50 transition"
                  >
                    {content}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.action}
                    className="w-full text-left flex items-center gap-3 border border-gray-100 rounded-xl p-3 hover:border-gray-400 hover:bg-gray-50 transition"
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* WISHLIST PREVIEW */}
        <section className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 mt-6">

          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold">Recently saved</h2>
              <p className="text-sm text-gray-500 mt-1">
                Your favorite NBLX products.
              </p>
            </div>

            <Link
              to="/profile/wishlist"
              className="text-sm font-semibold hover:underline whitespace-nowrap"
            >
              View all
            </Link>
          </div>

          {!wishlistReady ? (
            <p className="text-sm text-gray-500 py-6">
              Loading your wishlist...
            </p>
          ) : wishlistItems.length === 0 ? (
            <div className="text-center py-10">
              <FaHeart className="mx-auto text-3xl text-gray-300 mb-4" />

              <h3 className="font-semibold text-lg">
                Your wishlist is empty
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Save products you love and find them here later.
              </p>

              <Link
                to="/category"
                className="inline-flex items-center justify-center mt-5 bg-black text-white! rounded-xl px-6 py-3 text-sm font-semibold hover:bg-gray-800 transition"
              >
                Explore collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlistItems.slice(0, 4).map((item, index) => {
                const productImage =
                  item.image || item.images?.[0];

                const productKey =
                  `${item.id}-${item.selectedColor || 'Default'}`;

                return (
                  <div key={productKey || index} className="min-w-0">
                    <Link
                      to={item.route || '/wishlist'}
                      className="block group"
                    >
                      <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
                        {productImage ? (
                          <img
                            src={productImage}
                            alt={item.name || item.title || 'Saved product'}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FaHeart className="text-2xl" />
                          </div>
                        )}
                      </div>

                      <p className="text-sm font-medium mt-3 truncate">
                        {item.name || item.title || 'NBLX product'}
                      </p>

                      {item.selectedColor &&
                        item.selectedColor !== 'Default' && (
                          <p className="text-xs text-gray-500 mt-1">
                            Color: {item.selectedColor}
                          </p>
                        )}

                      {item.price != null && (
                        <p className="text-sm font-semibold mt-1">
                          {typeof item.price === 'number'
                            ? `₦${item.price.toLocaleString()}`
                            : item.price}
                        </p>
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Profile;