import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import hoodieImg from '../assets/images/image copy.png';
import jacketImg from '../assets/images/pants.jpg';
import hatImg from '../assets/images/image copy.png';
import jeanImg from '../assets/images/sweatshirt.png';

const collections = [
  {
    title: 'Hoodies',
    desc: 'Heavyweight and oversized with a relaxed fit. Made from soft, durable fabric with ribbed cuffs and a structured hood for everyday wear.',
    image: hoodieImg,
    cta: 'SHOP HOODIES',
  },
  {
    title: 'Jackets',
    desc: 'Premium outerwear designed for comfort and style. Built to keep you warm while maintaining a clean, modern look.',
    image: jacketImg,
    cta: 'SHOP JACKETS',
  },
  {
    title: 'Hats',
    desc: 'Minimal, stylish, and versatile headwear made to complete your everyday streetwear fit effortlessly.',
    image: hatImg,
    cta: 'SHOP HATS',
  },
  {
    title: 'Jeans',
    desc: 'Classic and durable denim crafted for everyday wear with a perfect balance of comfort and structure.',
    image: jeanImg,
    cta: 'SHOP JEANS',
  },
];

const CollectionsSection = () => {
  return (
    <div className='w-full bg-white px-6 md:px-20 md:pt-22 py-12'>
      {/* Top Header */}
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-red-600 text-xs tracking-[0.3em] uppercase'>Collections</p>
          <h2 className='text-3xl md:text-5xl font-light mt-2'>Shop by Collections</h2>
        </div>

        <button className='bg-black text-white text-xs md:text-sm px-5 py-3 rounded-md hover:bg-gray-800 transition'>
          VIEW ALL
        </button>
      </div>

      {/* Divider */}
      <div className='border-t border-gray-200 mt-6 mb-10' />

      {/* Content */}
      <div className='space-y-4'>
        {collections.map((item, index) => (
          <div
            key={index}
            className={`grid md:grid-cols-2 gap-10 border-t py-5 items-center ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Image Side */}
            <div className='w-full h-105 overflow-hidden rounded-md'>
              <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
            </div>

            {/* Text Side */}
            <div className='space-y-6'>
              <h3 className='text-2xl md:text-3xl font-light'>{item.title}</h3>

              <p className='text-gray-600 leading-relaxed max-w-md'>{item.desc}</p>

              {/* CTA */}
              <button className='flex items-center gap-2 text-sm font-medium border-b border-black w-fit hover:gap-3 transition-all'>
                <FaArrowRight className='text-xs' />
                {item.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsSection;


