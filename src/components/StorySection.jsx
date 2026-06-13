import React, { useEffect, useRef, useState } from 'react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import missionImg from '../assets/images/trax_showroom.webp';
import commitmentImg from '../assets/images/accessories.png';
import valuesImg from '../assets/images/crop_top_2.webp';
import { Link } from 'react-router-dom';

const StorySection = () => {
  const tabs = ['Mission', 'Commitments', 'Values'];
  const navigate = useNavigate();

  const content = {
    Mission: {
      text: 'Our mission is to deliver high-performance wears that blends comfort, durability, and modern style to help athletes and everyday users perform at their best.',
      image: missionImg,
    },
    Commitments: {
      text: 'We are committed to quality, sustainability, and innovation. Every product is designed with attention to detail and responsibility to our customers and environment.',
      image: commitmentImg,
    },
    Values: {
      text: 'Our values are built on excellence, integrity, and accessibility. We believe everyone deserves premium wears regardless of background.',
      image: valuesImg,
    },
  };

  const [activeTab, setActiveTab] = useState('Mission');
  const [hoverTab, setHoverTab] = useState(null);
  const [inView, setInView] = useState(false);

  const sectionRef = useRef(null);

  const currentTab = hoverTab || activeTab;
  const currentIndex = tabs.indexOf(currentTab);

  // scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    });

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='w-full bg-white py-16 px-6 md:px-16 lg:px-24 overflow-hidden'
    >
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12'>
        {/* LEFT SIDE */}
        <div
          className={`flex-1 flex flex-col gap-6 transition-all duration-700
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className='text-sm font-semibold tracking-widest text-gray-500 uppercase'>
            About Us
          </h2>

          {/* TABS (RESTORED UNDERLINE STYLE) */}
          <div className='flex flex-col gap-3 md:pb-30'>
            {tabs.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                onMouseEnter={() => setHoverTab(item)}
                className='flex items-center gap-2 text-lg md:text-xl font-medium text-left'
              >
                <span className='text-gray-400'>&gt;</span>

                <span
                  className={`
                    relative pb-1 transition-all duration-300
                    after:content-['']
                    after:absolute
                    after:left-0
                    after:bottom-0
                    after:h-0.5
                    after:bg-black
                    after:transition-all
                    after:duration-300

                    ${
                      currentTab === item
                        ? 'text-black after:w-full'
                        : 'text-gray-500 after:w-0 hover:text-black'
                    }
                  `}
                >
                  {item}
                </span>
              </button>
            ))}
          </div>

          {/* TEXT */}
          <p
            className={`text-gray-600 leading-relaxed text-sm md:text-xl max-w-lg transition-all duration-700
            ${inView ? 'opacity-100' : 'opacity-0 translate-y-6'}`}
          >
            {content[currentTab].text}
          </p>

          <button
            onClick={() => navigate('/story')}
            className='w-fit flex items-center gap-3 bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-900 transition'
          >
            EXPLORE OUR STORY
            <FaArrowUpRightFromSquare />
          </button>
        </div>

        {/* RIGHT IMAGE SLIDE */}
        <div className='flex-1 w-full overflow-hidden'>
          <div
            className='flex w-full h-100 md:h-150 transition-transform duration-700 ease-in-out'
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {tabs.map((key) => (
              <img
                key={key}
                src={content[key].image}
                alt={key}
                className='w-full h-full object-cover shrink-0'
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
