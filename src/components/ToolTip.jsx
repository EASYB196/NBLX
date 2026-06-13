import React from 'react';

const Tooltip = ({ text, children }) => {
  return (
    <div className="relative group flex items-center">
      {children}

      {/* tooltip */}
      <span className="
        absolute top-8 left-1/2 -translate-x-1/2
        whitespace-nowrap text-xs border bg-white text-black px-2 py-1 rounded
        opacity-0 group-hover:opacity-100
        transition duration-200 pointer-events-none
        z-50
      ">
        {text}
      </span>
    </div>
  );
};

export default Tooltip;