// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   FaChevronDown,
//   FaFacebookF,
//   FaInstagram,
//   FaPinterestP,
//   FaTwitter,
//   FaWhatsapp,
// } from 'react-icons/fa';

// const Footer = () => {
//   const [openSection, setOpenSection] = useState(null);

//   const toggleSection = (section) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   const supportLinks = [
//     { name: 'Contact Us', path: '/contact' },
//     { name: 'FAQs', path: '/faqs' },
//     // { name: 'Track Order', path: '/track-order' },
//     { name: 'Shipping & Delivery Information', path: '/shipping-policy' },
//   ];

//   const legalLinks = [
//     { name: 'Terms of Service', path: '/terms-of-service' },
//     { name: 'Privacy Policy', path: '/privacy-policy' },
//     { name: 'Return & Refund Policy', path: '/returns' },
//   ];

//   const socialLinks = [
//     {
//       icon: <FaInstagram />,
//       url: 'https://instagram.com',
//       label: 'Instagram',
//     },
//     {
//       icon: <FaFacebookF />,
//       url: 'https://facebook.com',
//       label: 'Facebook',
//     },
//     {
//       icon: <FaPinterestP />,
//       url: 'https://pinterest.com',
//       label: 'Pinterest',
//     },
//     {
//       icon: <FaTwitter />,
//       url: 'https://twitter.com',
//       label: 'Twitter',
//     },
//     {
//       icon: <FaWhatsapp />,
//       url: 'https://wa.me/2349117098144',
//       label: 'WhatsApp',
//     },
//   ];

//   const FooterSection = ({ title, links, sectionKey }) => (
//     <div>
//       <button
//         onClick={() => toggleSection(sectionKey)}
//         className='w-full flex items-center justify-between md:cursor-default'
//       >
//         <h3 className='uppercase text-sm tracking-[0.25em] text-white font-semibold'>
//           {title}
//         </h3>

//         <FaChevronDown
//           className={`md:hidden text-white transition-transform duration-300 ${
//             openSection === sectionKey ? 'rotate-180' : ''
//           }`}
//         />
//       </button>

//       <div
//         className={`overflow-hidden transition-all duration-300 ${
//           openSection === sectionKey ? 'max-h-96 mt-5' : 'max-h-0 md:max-h-96 md:mt-5'
//         }`}
//       >
//         <div className='flex flex-col gap-3'>
//           {links.map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               className='text-gray-400 hover:text-white transition duration-300 w-fit relative group'
//             >
//               {link.name}

//               <span className='absolute left-0 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full'></span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <footer className='bg-[#1A1A1A] text-white border-t border-white/10 mt-24'>
//       <div className='max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16'>
//         <div className='grid lg:grid-cols-[1.8fr_1fr_1fr] gap-12'>
//           {/* Brand + Newsletter */}
//           <div>
//             <Link to='/'>
//               <h2 className='text-3xl font-semibold tracking-wide'>NBLX</h2>
//             </Link>

//             <p className='text-gray-400 leading-relaxed mt-5 max-w-md'>
//               Timeless essentials crafted for everyday confidence. Discover premium fashion
//               designed with simplicity, quality, and style in mind.
//             </p>

//             <div className='mt-6 space-y-2 text-gray-400'></div>

//             {/* Newsletter */}
//             {/* <div className='mt-10'>
//               <h3 className='text-lg font-medium mb-2 text-white'>
//                 Join Our Community
//               </h3>

//               <p className='text-gray-400 text-sm mb-5'>
//                 Subscribe for exclusive drops, offers, and updates.
//               </p>

//               <div className='flex flex-col sm:flex-row gap-3 bg-[#222222] p-2 rounded-2xl border border-white/10'>
//                 <input
//                   type='email'
//                   placeholder='Enter your email'
//                   className='
//                     flex-1
//                     h-12
//                     px-4
//                     rounded-xl
//                     border
//                     border-white/10
//                     bg-[#2A2A2A]
//                     text-white
//                     placeholder:text-gray-500
//                     outline-none
//                     transition-all
//                     duration-300
//                     focus:border-white/30
//                     focus:bg-[#303030]
//                   '
//                 />

//                 <button
//                   className='
//                     h-12
//                     px-6
//                     rounded-xl
//                     bg-white
//                     text-black
//                     font-medium
//                     hover:bg-gray-200
//                     transition-all
//                     duration-300
//                     active:scale-95
//                   '
//                 >
//                   Subscribe
//                 </button>
//               </div>
//             </div> */}
//           </div>

//           {/* Customer Support */}
//           <FooterSection title='Customer Support' links={supportLinks} sectionKey='support' />

//           {/* Legal */}
//           <FooterSection title='Legal' links={legalLinks} sectionKey='legal' />
//         </div>

//         {/* Social Section */}
//         <div className='border-t border-white/10 mt-14 pt-10'>
//           <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
//             <div>
//               <h3 className='uppercase tracking-[0.25em] text-sm text-gray-400 mb-4'>
//                 Follow Us
//               </h3>

//               <div className='flex items-center gap-4'>
//                 {socialLinks.map((social) => (
//                   <a
//                     key={social.label}
//                     href={social.url}
//                     target='_blank'
//                     rel='noopener noreferrer'
//                     aria-label={social.label}
//                     className='
//                       w-11
//                       h-11
//                       rounded-full
//                       border
//                       border-white/10
//                       flex
//                       items-center
//                       justify-center
//                       text-gray-400
//                       hover:text-white
//                       hover:border-white
//                       hover:scale-110
//                       transition-all
//                       duration-300
//                     '
//                   >
//                     {social.icon}
//                   </a>
//                 ))}
//               </div>
//             </div>

//             <div className='text-center lg:text-right'>
//               <p className='text-gray-500 text-sm'>Secure Shopping Experience</p>

//               <p className='text-gray-400 text-sm mt-1'>
//                 Trusted fashion essentials crafted with care.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className='border-t border-white/10 mt-10 pt-8'>
//           <p className='text-center text-sm text-gray-500'>
//             © {new Date().getFullYear()} NBLX Collections. All Rights Reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaChevronDown,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';

/* -------------------------------------------------------------------------- */
/*                            ACCORDION SECTION                               */
/* -------------------------------------------------------------------------- */
const FooterSection = ({ title, links, sectionKey, openSection, toggleSection }) => {
  const isOpen = openSection === sectionKey;

  return (
    <div className='border-b border-white/10 md:border-none pb-4 md:pb-0'>
      <button
        type='button'
        onClick={() => toggleSection(sectionKey)}
        aria-expanded={isOpen}
        aria-controls={`footer-section-${sectionKey}`}
        className='w-full flex items-center justify-between py-2 md:py-0 text-left md:cursor-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded'
      >
        <h3 className='uppercase text-xs sm:text-sm tracking-[0.25em] text-white font-semibold'>
          {title}
        </h3>

        <FaChevronDown
          className={`md:hidden text-neutral-400 text-xs transition-transform duration-300 ease-in-out ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
          aria-hidden='true'
        />
      </button>

      <div
        id={`footer-section-${sectionKey}`}
        className={`grid transition-all duration-300 ease-in-out md:grid-rows-[1fr] md:opacity-100 ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 md:mt-5'
        }`}
      >
        <div className='overflow-hidden'>
          <ul className='flex flex-col gap-3 text-sm'>
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className='text-neutral-400 hover:text-white transition-colors duration-200 inline-block relative group py-0.5'
                >
                  {link.name}
                  <span
                    className='absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full'
                    aria-hidden='true'
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               MAIN FOOTER                                  */
/* -------------------------------------------------------------------------- */
const Footer = () => {
  const [openSection, setOpenSection] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  const supportLinks = [
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Shipping & Delivery', path: '/shipping-policy' },
  ];

  const legalLinks = [
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Return & Refund Policy', path: '/returns' },
  ];

  const socialLinks = [
    {
      icon: <FaInstagram className='w-4 h-4' />,
      url: 'https://instagram.com',
      label: 'Instagram',
    },
    {
      icon: <FaFacebookF className='w-4 h-4' />,
      url: 'https://facebook.com',
      label: 'Facebook',
    },
    {
      icon: <FaPinterestP className='w-4 h-4' />,
      url: 'https://pinterest.com',
      label: 'Pinterest',
    },
    {
      icon: <FaTwitter className='w-4 h-4' />,
      url: 'https://twitter.com',
      label: 'Twitter',
    },
    {
      icon: <FaWhatsapp className='w-4 h-4' />,
      url: 'https://wa.me/2349117098144',
      label: 'WhatsApp',
    },
  ];

  return (
    <footer className='bg-[#121212] text-white border-t border-white/10 mt-20 font-sans'>
      <div className='max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-12'>
        {/* Top Grid: Brand + Links */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr] gap-10 lg:gap-16'>
          {/* Brand Column & Newsletter */}
          <div className='space-y-6'>
            <Link to='/'>
              <h2 className='text-3xl font-semibold mb-2 tracking-wide'>NBLX</h2>{' '}
            </Link>
            <p className='text-neutral-400 text-sm  leading-relaxed max-w-sm font-light'>
              Timeless streetwear essentials crafted for everyday confidence. Premium fashion
              designed with simplicity, structure, and high-end construction.
            </p>

            {/* Newsletter Subscription */}
            <div className='pt-2 max-w-md'>
              <h3 className='text-xs uppercase tracking-[0.2em] font-semibold text-neutral-300 mb-2'>
                Join the Private List
              </h3>
              <p className='text-xs text-neutral-400 mb-4 font-light'>
                Subscribe for exclusive collection drops, private sales, and brand updates.
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className='flex flex-col sm:flex-row gap-2.5'
              >
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email address'
                  required
                  className='flex-1 h-11 px-4 text-xs rounded-lg border border-white/15 bg-neutral-900 text-white placeholder:text-neutral-500 outline-none transition-all duration-200 focus:border-white focus:bg-neutral-800'
                />
                <button
                  type='submit'
                  className='h-11 px-6 rounded-lg bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 active:scale-95 transition-all duration-200 shrink-0'
                >
                  Subscribe
                </button>
              </form>

              {isSubscribed && (
                <p className='text-xs text-emerald-400 mt-2 font-light'>
                  Thank you for subscribing to NBLX updates.
                </p>
              )}
            </div>
          </div>

          {/* Customer Support Links */}
          <FooterSection
            title='Customer Support'
            links={supportLinks}
            sectionKey='support'
            openSection={openSection}
            toggleSection={toggleSection}
          />

          {/* Legal Links */}
          <FooterSection
            title='Legal & Compliance'
            links={legalLinks}
            sectionKey='legal'
            openSection={openSection}
            toggleSection={toggleSection}
          />
        </div>

        {/* Middle Divider & Social Links */}
        <div className='border-t border-white/10 mt-12 pt-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left'>
            {/* Social Icons */}
            <div className='flex flex-col items-center md:items-start gap-3'>
              <span className='uppercase tracking-[0.2em] text-[11px] text-neutral-400 font-medium'>
                Connect With Us
              </span>
              <div className='flex items-center gap-3'>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={social.label}
                    className='w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white hover:bg-white/5 active:scale-95 transition-all duration-300'
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Brand Motto / Trust Badge */}
            <div className='md:text-right'>
              <p className='text-xs uppercase tracking-widest text-neutral-300 font-medium'>
                Elevated Streetwear Architecture
              </p>
              <p className='text-xs text-neutral-500 mt-1 font-light'>
                Worldwide Express Shipping & Secure Checkout
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className='border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-light'>
          <p>© {new Date().getFullYear()} NBLX Collections. All Rights Reserved.</p>
          <p className='tracking-widest uppercase text-[10px]'>Move Different. Think Bigger.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
