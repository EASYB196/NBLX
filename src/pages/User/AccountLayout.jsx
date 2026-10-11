// import { NavLink, Link } from 'react-router-dom';
// import { FaUser, FaBox, FaHeart, FaMapMarkerAlt, FaCog } from 'react-icons/fa';

// const links = [
//   { label: 'Overview', path: '/profile', icon: FaUser, end: true },
//   { label: 'My Orders', path: '/profile/orders', icon: FaBox },
//   { label: 'My Wishlist', path: '/profile/wishlist', icon: FaHeart },
//   { label: 'Personal Details', path: '/profile/details', icon: FaUser },
//   { label: 'Addresses', path: '/profile/addresses', icon: FaMapMarkerAlt },
//   { label: 'Settings', path: '/profile/settings', icon: FaCog },
// ];

// export default function AccountLayout({ title, description, children }) {
//   return (
//     <main className='min-h-screen bg-[#f7f7f7] text-gray-900'>
//       <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
//         <p className='mb-2 text-xs uppercase tracking-[0.25em] text-gray-500'>
//           NBLX
//         </p>

//         <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>{title}</h1>

//         <p className='mt-2 text-sm text-gray-500 sm:text-base'>{description}</p>

//         <div className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[250px_1fr]'>
//           <aside className='h-fit rounded-2xl border border-gray-200 bg-white p-3'>
//             {links.map(({ label, path, icon: Icon, end }) => (
//               <NavLink
//                 key={path}
//                 to={path}
//                 end={end}
//                 className={({ isActive }) =>
//                   `mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
//                     isActive
//                       ? 'bg-black text-white '
//                       : 'text-gray-600 hover:bg-gray-100 hover:text-black'
//                   }`
//                 }
//               >
//                 <Icon />
//                 {label}
//               </NavLink>
//             ))}

//             <Link
//               to='/'
//               className='mt-3 block border-t border-gray-100 px-4 pt-4 text-sm text-gray-500 hover:text-black'
//             >
//               ← Continue shopping
//             </Link>
//           </aside>

//           <section className='min-w-0'>{children}</section>
//         </div>
//       </div>
//     </main>
//   );
// }

import { NavLink, Link } from 'react-router-dom';
import { FaUser, FaBox, FaHeart, FaMapMarkerAlt, FaCog, FaArrowLeft } from 'react-icons/fa';

const links = [
  { label: 'Overview', path: '/profile', icon: FaUser, end: true },
  { label: 'My Orders', path: '/profile/orders', icon: FaBox },
  { label: 'My Wishlist', path: '/profile/wishlist', icon: FaHeart },
  { label: 'Personal Details', path: '/profile/details', icon: FaUser },
  { label: 'Addresses', path: '/profile/addresses', icon: FaMapMarkerAlt },
  { label: 'Settings', path: '/profile/settings', icon: FaCog },
];

export default function AccountLayout({ title, description, children }) {
  const focusStyle =
    'focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white';

  return (
    <main className='min-h-screen bg-[#fafafa] text-[#171717]'>
      <div className='mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14'>
        {/* Page Header */}
        <header className='border-b border-gray-200 pb-7 sm:pb-9'>
          <p className='mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500'>
            NBLX / MY ACCOUNT
          </p>

          <h1 className='text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl'>{title}</h1>

          {description && (
            <p className='mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base'>
              {description}
            </p>
          )}
        </header>

        {/* Account Layout */}
        <div className='mt-7 grid grid-cols-1 items-start gap-6 lg:mt-9 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8'>
          {/* Sidebar */}
          <aside className='h-fit overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 sm:p-4'>
            <p className='px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400'>
              Account Menu
            </p>

            <nav className='space-y-1' aria-label='Account navigation'>
              {links.map(({ label, path, icon: Icon, end }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={end}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200 ${focusStyle} ${
                      isActive
                        ? 'bg-black font-semibold text-white! shadow-sm'
                        : 'font-medium text-gray-600 hover:bg-gray-100 hover:text-black'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          isActive
                            ? 'bg-white/15 text-white'
                            : 'bg-gray-50 text-gray-500 group-hover:bg-white group-hover:text-black'
                        }`}
                      >
                        <Icon size={15} aria-hidden='true' />
                      </span>

                      <span className='flex-1'>{label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Continue Shopping */}
            <div className='mt-4 border-t border-gray-100 pt-3'>
              <Link
                to='/'
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-black ${focusStyle}`}
              >
                <span className='flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 transition-colors group-hover:bg-white'>
                  <FaArrowLeft size={13} aria-hidden='true' />
                </span>

                <span>Continue shopping</span>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <section className='min-w-0'>{children}</section>
        </div>
      </div>
    </main>
  );
}
