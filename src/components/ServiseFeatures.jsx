import React from 'react';

import { features } from '../data/features';
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';

const iconMap = {
  truck: <FiTruck />,
  shield: <FiShield />,
  refresh: <FiRefreshCw />,
  headphones: <FiHeadphones />,
};

const ServiceFeatures = () => {
  return (
    <section className='w-full bg-white py-16 px-6 md:px-12 lg:px-20'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid md:grid-cols-4 gap-8'>
          {features.map((item, index) => (
            <div
              key={index}
              className='text-center space-y-3 hover:scale-105 transition duration-300 group'
            >
              {/* ICON */}
              <div className='text-2xl text-black flex justify-center'>
                {iconMap[item.icon]}
              </div>

              {/* TITLE */}
              <h3 className='font-semibold text-lg'>{item.title}</h3>

              {/* DESCRIPTION */}
              <p className='text-gray-500 text-sm leading-relaxed'>{item.description}</p>

              {/* CTA */}
              <a
                href={item.link}
                className='relative text-sm font-semibold text-black inline-block'
              >
                {item.cta}

                {/* underline animation */}
                <span className='absolute left-0 -bottom-1 w-0 h-px bg-black transition-all duration-300 group-hover:w-full'></span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
