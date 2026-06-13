import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-white px- py-20">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-left mb-12">
        <h1 className="text-3xl sm:text-4xl mt-10 font-bold tracking-tight text-gray-900">
         Return & Refund Policy
        </h1>
        <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
          We aim to make your shopping experience simple, transparent, and worry-free.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto space-y-10 text-gray-700 leading-relaxed text-sm sm:text-base">
        
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Refund Policy
          </h2>
          <p className="text-lg text-black">
            We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Eligibility for Returns
          </h2>
          <p className="text-lg text-black">
            To be eligible for a return, your item must be in the same condition that you received it: unworn or unused, with tags, and in its original packaging. You will also need the receipt or proof of purchase.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Return Process
          </h2>
          <p className="text-lg text-black">
            If your return is accepted, we will send you a return shipping label and instructions on how and where to send your package. Items sent back without first requesting a return will not be accepted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Damages & Issues
          </h2>
          <p className="text-lg text-black">
            Please inspect your order upon arrival and contact us immediately if the item is defective, damaged, or incorrect so we can evaluate and resolve the issue quickly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Non-Returnable Items
          </h2>
          <p className="text-lg text-black">
            Certain items cannot be returned, including perishable goods, custom products, personal care goods, hazardous materials, sale items, and gift cards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Exchanges
          </h2>
          <p className="text-lg text-black">
            The fastest way to get what you want is to return your item once the return is approved, then place a new order separately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Refunds
          </h2>
          <p className="text-lg text-black">
            Once your return is received and inspected, we will notify you of approval. Approved refunds are processed within 10 business days to your original payment method. Bank processing times may vary.
          </p>
        </section>

        {/* Contact */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-black">
            If more than 15 business days have passed since your refund was approved, please contact us:
          </p>
          <a
            href="mailto:nblx602@gmail.com"
            className="mt-2 inline-block text-black font-medium hover:underline"
          >
            NBLX602@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;