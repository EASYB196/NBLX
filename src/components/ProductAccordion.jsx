import React, { useState } from 'react';
import { FiLayers, FiPackage, FiDroplet, FiChevronDown } from 'react-icons/fi';

function ProductAccordion({ fabric, care }) {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const sections = [
    {
      id: 'materials',
      title: 'Materials',
      icon: <FiLayers className="text-black text-lg" />,
      content: (
        <div className="space-y-1 text-sm text-gray-600">
          <p className="font-semibold text-black">{fabric || '100% Premium Heavyweight Cotton (240 GSM)'}</p>
          <p>Engineered for high durability, breathability, and shape retention over time.</p>
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      icon: <FiPackage className="text-black text-lg" />,
      content: (
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong className="text-black">Standard Shipping:</strong> Delivered in 1–3 business days nationwide.
          </p>
          <p>
            <strong className="text-black">Returns:</strong> Eligible for exchange or return within 7 days of receipt. Items must be unworn and in original condition with tags.
          </p>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Care Guide',
      icon: <FiDroplet className="text-black text-lg" />,
      content: (
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
          {care && care.length > 0 ? (
            care.map((item, idx) => <li key={idx}>{item}</li>)
          ) : (
            <>
              <li>Machine wash cold inside out with similar colors.</li>
              <li>Hang dry recommended to prevent shrinkage.</li>
              <li>Do not iron directly on graphic prints.</li>
              <li>Do not bleach or dry clean.</li>
            </>
          )}
        </ul>
      ),
    },
  ];

  return (
    <div className="w-full border-t border-b border-gray-200 divide-y divide-gray-200 my-6 font-[Raleway]">
      {sections.map((item) => {
        const isOpen = openSection === item.id;
        return (
          <div key={item.id} className="py-3.5">
            <button
              onClick={() => toggleSection(item.id)}
              className="w-full flex items-center justify-between text-left group focus:outline-none"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-medium text-sm md:text-base uppercase tracking-wider text-black group-hover:text-gray-500 transition-colors">
                  {item.title}
                </span>
              </div>
              <FiChevronDown
                className={`transform transition-transform duration-200 text-base text-gray-500 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="pt-3 pb-1 pl-7 transition-all duration-200">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProductAccordion;