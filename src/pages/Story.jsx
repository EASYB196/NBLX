// import React from 'react';

// import missionImg from '../assets/images/trax_showroom.webp';
// // import valueImg from '../assets/images/accessories.png';
// import lifestyleImg from '../assets/images/crop_top_2.webp';

// const Story = () => {
//   return (
//     <div className='w-full bg-white text-black'>
//       {/* HERO */}
//       <section className='px-6 md:px-20 py-24 text-center pb-0 '>
//         <h1 className='text-sm font-semibold tracking-widest text-gray-500 uppercase'>About</h1>

//         <div className='w-full flex flex-col items-center text-center'>
//           {/* TEXT SECTION */}
//           <div className='text-black mt-6 max-w-3xl mx-auto text-base md:text-5xl font-bold uppercase leading-tight'>
//             <h1>Inspiration Behind Scenes</h1>
//           </div>

//           {/* IMAGE SECTION */}
//           <div className='mt-10 w-full overflow-hidden'>
//             <img
//               src={lifestyleImg}
//               alt='Lifestyle'
//               className='w-full h-[400px] md:h-[600px] object-cover transition-transform duration-700 hover:scale-105'
//             />
//           </div>
//         </div>
//       </section>

//       {/* MISSION (TEXT LEFT / IMAGE RIGHT) */}
//      <section className="px-6 md:px-20 py-24 bg-white">
//   <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

//     {/* TEXT SIDE */}
//     <div className="flex flex-col">

//       <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
//         Our Mission
//       </h2>

//       <h3 className="text-black mt-6 text-xl md:text-4xl font-bold uppercase leading-tight">
//         Redefining Lifestyle Wear with Comfort and Purpose
//       </h3>

//       <p className="text-black leading-relaxed mt-6 text-sm md:text-lg max-w-xl">
//         We're on a mission to revolutionize lifestyle fashion. Our curated collection
//         seamlessly blends style and purpose, offering garments that enhance your
//         individuality and elevate your lifestyle. With a focus on quality, innovation, and
//         sustainability, we collaborate with visionary designers to bring you thoughtfully
//         crafted pieces that make a statement.
//       </p>

//     </div>

//     {/* IMAGE SIDE */}
//     <div className="relative overflow-hidden rounded-2xl group">

//       <img
//         src={missionImg}
//         alt="Mission"
//         className="w-full h-[420px] md:h-[520px]  object-cover transition duration-700 ease-in-out group-hover:scale-105"
//       />

//       {/* subtle premium overlay */}
//       <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition duration-700"></div>

//     </div>

//   </div>
// </section>

//       {/* VALUES (IMAGE LEFT / TEXT RIGHT) */}

//       {/* LIFESTYLE SECTION (FULL WIDTH IMAGE STORY) */}
//       <section className='relative py-28 px-6 md:px-20 text-white'>
//         <div className='absolute inset-0'>
//           <img src={lifestyleImg} alt='Lifestyle' className='w-full h-full object-cover' />
//           <div className='absolute inset-0 bg-black/60' />
//         </div>

//         <div className='relative max-w-3xl mx-auto text-center'>
//           <h2 className='text-3xl md:text-4xl font-bold mb-4'>Fashion is Identity</h2>

//        <p className='text-gray-200 leading-relaxed'>
//   We believe clothing is more than fabric . It is expression, confidence, and identity.
//   Our collections blend timeless essentials with modern design, created to complement your everyday lifestyle.
//   Every piece is thoughtfully crafted for comfort, quality, and lasting wear.
// </p>
//         </div>
//       </section>

//       {/* QUOTE */}
//       <section className='px-6 md:px-20 py-24 text-center'>
//         <p className='text-xl md:text-2xl font-medium max-w-3xl mx-auto'>
//           “Our unwavering vision has always been to redefine the landscape of lifestyle wear.”
//         </p>

//         <p className='text-gray-500 mt-4'>Co-founder — Jacob Smith</p>
//       </section>

//       {/* MARQUEE */}
//       <section className='overflow-hidden border-t border-b py-6 whitespace-nowrap'>
//         <div className='animate-marquee text-sm md:text-base font-medium text-gray-600'>
//           {Array(15).fill('made with love & commitment • NBLX • ').join('')}
//         </div>
//       </section>

//       {/* FOOTER CTA */}
//       <section className='px-6 md:px-20 py-24 text-center'>
//         <h2 className='text-2xl font-semibold mb-4'>Stay in Touch</h2>

//         <p className='text-gray-600 mb-2'>Moments made memories @NBLX</p>

//         <p className='text-gray-500'>get inspired with @NBLX</p>
//       </section>
//     </div>
//   );
// };

// export default Story;

import React from 'react';

import Servicefeatures from '../components/ServiseFeatures';

import missionImg from '../assets/images/trax_showroom.webp';
import lifestyleImg from '../assets/images/STORY/lifestyleImg.png';

const Story = () => {
  return (
    <div className='w-full bg-white text-black'>
      {/* HERO */}
      <section className='px-6 md:px-20 py-24 text-center pb-0'>
        <h1 className='text-sm font-semibold tracking-widest text-gray-500 uppercase'>About</h1>

        <div className='w-full flex flex-col items-center text-center'>
          <div className='mt-6 max-w-3xl mx-auto'>
            <h1 className='text-black text-3xl md:text-5xl font-bold uppercase leading-tight'>
              Inspiration Behind Scenes
            </h1>
          </div>

          <div className='mt-10 w-full overflow-hidden'>
            <img
              src={lifestyleImg}
              alt='Lifestyle'
              className='w-full h-100 md:h-150   object-cover transition-transform duration-700 hover:scale-105'
            />
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className='px-6 md:px-20 py-24 bg-white'>
        <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
          {/* TEXT */}
          <div className='flex flex-col'>
            <h2 className='text-sm font-semibold tracking-widest text-gray-500 uppercase'>
              Our Mission
            </h2>

            <h3 className='text-black mt-6 text-2xl md:text-4xl font-bold uppercase leading-tight'>
              Redefining Lifestyle Wear with Comfort and Purpose
            </h3>

            <p className='text-gray-700 leading-relaxed mt-6 text-sm md:text-lg max-w-xl'>
              We are committed to redefining modern lifestyle fashion through intentional design
              and timeless style. Our collections blend comfort, quality, and innovation
              .Created to complement your individuality and everyday life.
            </p>
          </div>

          {/* IMAGE */}
          <div className='relative overflow-hidden rounded-2xl group'>
            <img
              src={missionImg}
              alt='Mission'
              className='w-full h-[420px] md:h-[520px] object-cover transition duration-700 group-hover:scale-105'
            />

            <div className='absolute inset-0 bg-black/5 group-hover:bg-black/0 transition duration-700' />
          </div>
        </div>
      </section>

    {/* QUOTE */}
      <section className='px-6 md:px-20 py-24 text-center'>

        <p className='text-xl md:text-2xl font-medium max-w-3xl mx-auto'>
          “Our vision has always been to redefine the meaning of modern lifestyle wear.”
        </p>

        

  {
  /* IMAGE + AUTHOR */
}
<div className='flex flex-col items-center mt-4'>
  {/* IMAGE */}
  <div className='w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-full border-2 border-gray-200 shadow-md'>
    <img
      src={missionImg} // replace if needed
      alt='Co-founder'
      className='w-full h-full object-cover hover:scale-105 transition duration-700'
    />
  </div>

  {/* TEXT */}
  <p className='text-gray-500 mt-4'>Co-founder — Jacob Smith</p>
</div>;


      </section>

            <Servicefeatures />


      {/* LIFESTYLE SECTION */}
      <section className='relative py-28 px-6 md:px-20 text-white'>
        <div className='absolute inset-0'>
          <img src={lifestyleImg} alt='Lifestyle' className='w-full h-full object-cover' />
          <div className='absolute inset-0 bg-black/60' />
        </div>

        <div className='relative max-w-3xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>Fashion is Identity</h2>

          <p className='text-gray-200 leading-relaxed'>
            Clothing is more than fabric. it is expression, confidence, and identity. Our
            collections blend timeless essentials with modern design, crafted to complement your
            everyday lifestyle. Every piece is thoughtfully designed for comfort, quality, and
            lasting wear.
          </p>
        </div>
      </section>

      {/* MARQUEE */}
      <section className='overflow-hidden border-t border-b py-6 whitespace-nowrap'>
        <div className='animate-marquee text-sm md:text-base font-medium text-gray-600'>
          {Array(15).fill('crafted with purpose • NBLX • ').join('')}
        </div>
      </section>

      {/* CTA */}
      <section className='px-6 md:px-20 py-24 text-center'>
        <h2 className='text-2xl font-semibold mb-4'>Stay in Touch</h2>

        <p className='text-gray-600 mb-2'>Moments made memories @NBLX</p>

        <p className='text-gray-500'>Get inspired with @NBLX</p>
      </section>
    </div>
  );
};

export default Story;
