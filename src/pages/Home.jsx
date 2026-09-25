import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../pages/Header';
import Category from '../pages/Category';
import Arrival from '../pages/Arrival';
import Button from '../components/Button';
import StorySection from '../components/StorySection';
import CategoryCarousel from '../components/CategoryCarousel';
import Section from '../components/Section';
import BestSeller from '../components/BestSeller';
import Servicefeatures from '../components/ServiseFeatures';
import CollectionsSection from './Collections';

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#best-sellers') {
      const section = document.getElementById('best-sellers');

      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  }, [location]);

  return (
    <div>
      <Header />
      <div id='best-sellers'>
        <BestSeller />
      </div>{' '}
      {/* <Arrival /> */}
      <Section />

      <section className='overflow-hidden border-t border-b py-6 whitespace-nowrap'>
        <Servicefeatures />

        <div className='animate-marquee text-sm md:text-base font-medium text-gray-600'>
          {Array(15).fill('crafted with purpose • NBLX • ').join('')}
        </div>
      </section>
      <CollectionsSection />
      <section className='overflow-hidden border-t border-b py-6 whitespace-nowrap'>
        <div className='animate-marquee text-sm md:text-base font-medium text-gray-600'>
          {Array(15).fill('Move Different Think Bigger • NBLX • ').join('')}
        </div>
      </section>
      {/* <StorySection /> */}
      {/* <CategoryCarousel /> */}
    </div>
  );
}

export default Home;
