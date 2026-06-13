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

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const supportLinks = [
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'Shipping & Delivery Information', path: '/shipping-policy' },
  ];

  const legalLinks = [
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Return & Refund Policy', path: '/returns' },
  ];

  const socialLinks = [
    {
      icon: <FaInstagram />,
      url: 'https://instagram.com',
      label: 'Instagram',
    },
    {
      icon: <FaFacebookF />,
      url: 'https://facebook.com',
      label: 'Facebook',
    },
    {
      icon: <FaPinterestP />,
      url: 'https://pinterest.com',
      label: 'Pinterest',
    },
    {
      icon: <FaTwitter />,
      url: 'https://twitter.com',
      label: 'Twitter',
    },
    {
      icon: <FaWhatsapp />,
      url: 'https://wa.me/2347041554896',
      label: 'WhatsApp',
    },
  ];

  const FooterSection = ({ title, links, sectionKey }) => (
    <div>
      <button
        onClick={() => toggleSection(sectionKey)}
        className='w-full flex items-center justify-between md:cursor-default'
      >
        <h3 className='uppercase text-sm tracking-[0.25em] text-white font-semibold'>
          {title}
        </h3>

        <FaChevronDown
          className={`md:hidden text-white transition-transform duration-300 ${
            openSection === sectionKey ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          openSection === sectionKey
            ? 'max-h-96 mt-5'
            : 'max-h-0 md:max-h-96 md:mt-5'
        }`}
      >
        <div className='flex flex-col gap-3'>
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className='text-gray-400 hover:text-white transition duration-300 w-fit relative group'
            >
              {link.name}

              <span className='absolute left-0 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full'></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <footer className='bg-[#1A1A1A] text-white border-t border-white/10 mt-24'>
      <div className='max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16'>
        <div className='grid lg:grid-cols-[1.8fr_1fr_1fr] gap-12'>
          {/* Brand + Newsletter */}
          <div>
            <Link to='/'>
              <h2 className='text-3xl font-semibold tracking-wide'>
                NBLX 
              </h2>
            </Link>

            <p className='text-gray-400 leading-relaxed mt-5 max-w-md'>
              Timeless essentials crafted for everyday confidence. Discover
              premium fashion designed with simplicity, quality, and style in
              mind.
            </p>

            <div className='mt-6 space-y-2 text-gray-400'>
              <p>NBLX06@gmail.com</p>
              <p>+234 704 155 4896</p>
            </div>

            {/* Newsletter */}
            {/* <div className='mt-10'>
              <h3 className='text-lg font-medium mb-2 text-white'>
                Join Our Community
              </h3>

              <p className='text-gray-400 text-sm mb-5'>
                Subscribe for exclusive drops, offers, and updates.
              </p>

              <div className='flex flex-col sm:flex-row gap-3 bg-[#222222] p-2 rounded-2xl border border-white/10'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='
                    flex-1
                    h-12
                    px-4
                    rounded-xl
                    border
                    border-white/10
                    bg-[#2A2A2A]
                    text-white
                    placeholder:text-gray-500
                    outline-none
                    transition-all
                    duration-300
                    focus:border-white/30
                    focus:bg-[#303030]
                  '
                />

                <button
                  className='
                    h-12
                    px-6
                    rounded-xl
                    bg-white
                    text-black
                    font-medium
                    hover:bg-gray-200
                    transition-all
                    duration-300
                    active:scale-95
                  '
                >
                  Subscribe
                </button>
              </div>
            </div> */}

            
          </div>

          {/* Customer Support */}
          <FooterSection
            title='Customer Support'
            links={supportLinks}
            sectionKey='support'
          />

          {/* Legal */}
          <FooterSection
            title='Legal'
            links={legalLinks}
            sectionKey='legal'
          />
        </div>

        {/* Social Section */}
        <div className='border-t border-white/10 mt-14 pt-10'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div>
              <h3 className='uppercase tracking-[0.25em] text-sm text-gray-400 mb-4'>
                Follow Us
              </h3>

              <div className='flex items-center gap-4'>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={social.label}
                    className='
                      w-11
                      h-11
                      rounded-full
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                      text-gray-400
                      hover:text-white
                      hover:border-white
                      hover:scale-110
                      transition-all
                      duration-300
                    '
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className='text-center lg:text-right'>
              <p className='text-gray-500 text-sm'>
                Secure Shopping Experience
              </p>

              <p className='text-gray-400 text-sm mt-1'>
                Trusted fashion essentials crafted with care.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-white/10 mt-10 pt-8'>
          <p className='text-center text-sm text-gray-500'>
            © {new Date().getFullYear()} NBLX Collections. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;