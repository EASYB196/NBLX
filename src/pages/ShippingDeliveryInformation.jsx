import React from "react";

const ShippingDelivery = () => {
  return (
    <div className="bg-white text-black px-5 md:px-16 py-16">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
          Shipping & Delivery Information
        </h1>

        <p className="mt-4 text-gray-600 leading-relaxed">
          At NBLX Collections, we ensure every order is processed, shipped, and delivered with care,
          speed, and reliability.
        </p>

        {/* Section 1 */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Order Processing</h2>
          <p className="mt-2 text-gray-600 leading-relaxed">
            All orders are processed within 24–48 hours after payment confirmation.
            Orders placed on weekends or public holidays are processed the next working day.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Shipping Methods</h2>
          <p className="mt-2 text-gray-600 leading-relaxed">
            We offer standard and express delivery options depending on your location.
            Shipping partners are selected to ensure safe and timely delivery.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Delivery Time</h2>
          <p className="mt-2 text-gray-600 leading-relaxed">
            Delivery typically takes:
          </p>

          <ul className="mt-3 space-y-2 text-gray-600">
            <li>• Local deliveries: 1–3 business days</li>
            <li>• Nationwide delivery: 3–7 business days</li>
            <li>• International delivery: 7–14 business days</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Shipping Fees</h2>
          <p className="mt-2 text-gray-600 leading-relaxed">
            Shipping fees are calculated at checkout based on your location and selected delivery method.
            Occasionally, we offer free shipping promotions.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Order Tracking</h2>
          <p className="mt-2 text-gray-600 leading-relaxed">
            Once your order has been shipped, you will receive a tracking number via email or SMS
            to monitor your delivery in real time.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Important Notice</h2>
          <p className="mt-2 text-gray-600 leading-relaxed">
            Delivery times are estimates and may vary due to weather conditions, courier delays,
            or high demand periods.
          </p>
        </div>

        {/* Footer Note */}
        <div className="mt-12 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            For support, contact us via the Contact page or WhatsApp. We’re always here to help.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ShippingDelivery;