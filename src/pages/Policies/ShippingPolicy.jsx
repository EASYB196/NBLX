import React from 'react';

const Section = ({ title, children }) => (
  <section className='space-y-4'>
    <h2 className='text-xl sm:text-2xl font-semibold text-gray-900'>{title}</h2>
    <div className='text-xl sm:text-lg text-gray-700 leading-tight whitespace-pre-line'>
      {children}
    </div>
  </section>
);

const ShippingPolicy = () => {
  return (
    <div className='bg-white min-h-screen px-4 py-16'>
      {/* HEADER */}
      <div className='max-w-5xl mx-auto text-center mb-16'>
        <h1 className='text-3xl sm:text-5xl pt-10 font-bold text-gray-900'>Shipping Policy</h1>
        <p className='mt-4 text-gray-500 text-sm sm:text-base'>
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* CONTENT */}
      <div className='max-w-5xl mx-auto space-y-14'>
        <Section title='Overview'>
          {`At NBLX , we are committed to delivering your orders safely and efficiently.

This Shipping Policy explains how we process, handle, and ship your orders.`}
        </Section>

        <Section title='Order Processing Time'>
          {`All orders are processed within 1–3 business days after payment confirmation.

Orders are not shipped or delivered on weekends or public holidays.

If we experience high order volumes, processing may be delayed slightly.`}
        </Section>

        <Section title='Shipping Rates & Delivery Estimates'>
          {`Shipping charges for your order will be calculated and displayed at checkout.

Estimated delivery times:

• Local Shipping: 2–5 business days  
• International Shipping: 5–15 business days  

Delivery times may vary depending on your location and courier delays.`}
        </Section>

        <Section title='Order Tracking'>
          {`Once your order has been shipped, you will receive a tracking number via email.

You can use this tracking number to monitor your delivery status in real time.`}
        </Section>

        <Section title='Shipping Locations'>
          {`We currently ship both locally and internationally.

However, some regions may be restricted due to courier limitations or legal restrictions.

If we are unable to ship to your location, you will be notified at checkout.`}
        </Section>

        <Section title='Delays & Issues'>
          {`While we aim to deliver on time, delays may occur due to:

• Customs clearance  
• Weather conditions  
• Courier disruptions  
• High order volumes  

NBLX is not responsible for delays caused by external shipping carriers.`}
        </Section>

        <Section title='Wrong Address Disclaimer'>
          {`It is the customer’s responsibility to ensure that the shipping address is correct.

We are not responsible for orders shipped to incorrect or incomplete addresses provided by the customer.`}
        </Section>

        <Section title='Lost or Stolen Packages'>
          {`NBLX  is not responsible for lost or stolen packages once marked as delivered.

If your package is missing, please contact the shipping carrier first.

We will assist where possible but cannot guarantee replacements.`}
        </Section>

        <Section title='Customs, Duties & Taxes'>
          {`International orders may be subject to customs duties, taxes, or import fees.

These charges are the responsibility of the customer and are not included in the product or shipping cost.

NBLX is not responsible for delays caused by customs.`}
        </Section>

        <Section title='Changes to Orders'>
          {`Once an order is placed, we begin processing immediately.

If you need to change or cancel your order, please contact us within 12 hours of purchase.

After this period, we may not be able to make changes.`}
        </Section>

        <Section title='Contact Information'>
          {`If you have any questions about shipping, please contact us:

Email: NBLX602@gmail.com  
Brand: NBLX `}
        </Section>
      </div>
    </div>
  );
};

export default ShippingPolicy;


