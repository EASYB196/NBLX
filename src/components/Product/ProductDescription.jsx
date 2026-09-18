import React from 'react';

function ProductDescription({ 
  description, 
  features = [], 
  fabric = '', 
  care = [] 
}) {
  if (!description && !features.length && !fabric && !care.length) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4 font-[Raleway]">
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-xl md:text-2xl font-bold text-black mb-6 uppercase tracking-wide">
          Product Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-black">
          {/* MAIN DESCRIPTION */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-semibold text-lg text-black">Overview</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {description || 'No detailed description available for this product.'}
            </p>

            {/* FEATURES / HIGHLIGHTS */}
            {features.length > 0 && (
              <div className="pt-2">
                <h4 className="font-semibold text-sm uppercase text-gray-800 mb-2">
                  Key Features
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-600">
                  {features.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* FABRIC & CARE INSTRUCTIONS */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-4 border border-gray-100">
            {fabric && (
              <div>
                <h4 className="font-semibold text-sm uppercase text-black mb-1">
                  Material & Fabric
                </h4>
                <p className="text-sm text-gray-600">{fabric}</p>
              </div>
            )}

            {care.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm uppercase text-black mb-1">
                  Care Instructions
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {care.map((instruction, idx) => (
                    <li key={idx}>{instruction}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;