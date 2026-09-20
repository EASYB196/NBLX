// import React from 'react';

// import { features } from '../data/Features';
// import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';

// const iconMap = {
//   truck: <FiTruck />,
//   shield: <FiShield />,
//   refresh: <FiRefreshCw />,
//   headphones: <FiHeadphones />,
// };

// const ServiceFeatures = () => {
//   return (
//     <section className='w-full bg-white py-16 px-6 md:px-12 lg:px-20'>
    
//       <div className='max-w-7xl mx-auto'>
      
//         <div className='grid md:grid-cols-4 gap-8'>
//           {features.map((item, index) => (
//             <div
//               key={index}
//               className='text-center space-y-3 hover:scale-105 transition duration-300 group'
//             >
//               {/* ICON */}
//               <div className='text-2xl text-black flex justify-center'>
//                 {iconMap[item.icon]}
//               </div>

//               {/* TITLE */}
//               <h3 className='font-semibold text-lg'>{item.title}</h3>

//               {/* DESCRIPTION */}
//               <p className='text-gray-500 text-sm leading-relaxed'>{item.description}</p>

//               {/* CTA */}
//               <a
//                 href={item.link}
//                 className='relative text-sm font-semibold text-black inline-block'
//               >
//                 {item.cta}

//                 {/* underline animation */}
//                 <span className='absolute left-0 -bottom-1 w-0 h-px bg-black transition-all duration-300 group-hover:w-full'></span>
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServiceFeatures;

import React from 'react';

import { features } from '../data/Features';
import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
} from 'react-icons/fi';

const iconMap = {
  truck: <FiTruck />,
  shield: <FiShield />,
  refresh: <FiRefreshCw />,
  headphones: <FiHeadphones />,
};

const ServiceFeatures = () => {
  return (
    <section className='w-full bg-white py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-10 lg:px-20'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 md:gap-x-8'>
          {features.map((item, index) => (
            <div
              key={index}
              className='text-center space-y-2.5 sm:space-y-3 hover:scale-105 transition duration-300 group px-3 sm:px-4 md:px-2'
            >
              {/* ICON */}
              <div className='text-xl sm:text-2xl text-black flex justify-center'>
                {iconMap[item.icon]}
              </div>

              {/* TITLE */}
              <h3 className='font-semibold text-base sm:text-lg'>
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className='text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto'>
                {item.description}
              </p>

              {/* CTA */}
              <a
                href={item.link}
                className='relative text-xs sm:text-sm font-semibold text-black inline-block'
              >
                {item.cta}

                {/* UNDERLINE ANIMATION */}
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