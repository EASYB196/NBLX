import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../pages/Header';
import Category from '../pages/Category';
import Arrival from '../pages/Arrival';
import ProductList from '../components/ProductList';
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
      <BestSeller />
      <Section />
      <Servicefeatures />
      <Arrival />
      {/* <ProductList /> */}
      <CollectionsSection />
      <StorySection />
      {/* <CategoryCarousel /> */}
    </div>
  );
}

export default Home;
