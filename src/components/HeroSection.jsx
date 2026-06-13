import React from 'react';
import { CollectionData } from '../data/CollectionData';
import ProductList from '../components/ProductList'

function HeroSection() {
  return (
    <div className='text-3xl font-serif   text-center my-14'>
      Shop Our <span className='font-serif  border-b-3  border-[#ffff]'>New Arrival</span>
      <div className="flex flex-wrap justify-center mt-32 ">
 <ProductList/>
  <div className='bg-amber-500  px-2 py-2 rounded-2xl'>Shop All Product</div>
</div>

    </div>
  );
}

export default HeroSection;
