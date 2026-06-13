import React from "react";

const Section = ({ title, children }) => (
  <section className="space-y-4">
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
      {title}
    </h2>
    <div className="text-xl sm:text-lg text-gray-700 leading-tight whitespace-pre-line">
      {children}
    </div>
  </section>
);

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-16">
      
      {/* HEADER */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-5xl pt-10 font-bold text-gray-900">
          Privacy Policy
        </h1>
        <p className="mt-4 text-gray-500 text-sm sm:text-base">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto space-y-14">

        <Section title="Overview">
{`This Privacy Policy describes how NBLX  ("we", "us", or "our") collects, uses, and discloses your personal information when you use our website or services.

By using our site, you agree to the collection and use of information in accordance with this policy.`}
        </Section>

        <Section title="Changes to This Privacy Policy">
{`We may update this Privacy Policy from time to time for legal, operational, or regulatory reasons.

We will update the "Last updated" date whenever changes are made.

Your continued use of the service means you accept these changes.`}
        </Section>

        <Section title="Information We Collect">
{`We collect different types of information depending on how you interact with our website.

This includes:

• Name, email, phone number, and address  
• Order and payment details  
• Account login information  
• Shopping activity (cart, wishlist, viewed items)  
• Customer support messages  
• Device, browser, and IP address data`}
        </Section>

        <Section title="How We Use Your Information">
{`We use your information to:

• Process and fulfill orders  
• Manage your account  
• Provide customer support  
• Send order updates and notifications  
• Improve our services and user experience  
• Prevent fraud and ensure security  
• Send marketing and promotional messages (if you opt in)`}
        </Section>

        <Section title="Cookies & Tracking Technologies">
{`We use cookies and similar technologies to improve your browsing experience.

Cookies help us:

• Remember your preferences  
• Analyze site traffic  
• Improve performance  
• Deliver personalized content and ads  

You can disable cookies in your browser, but some features may stop working correctly.`}
        </Section>

        <Section title="How We Share Your Information">
{`We may share your information with:

• Payment processors  
• Shipping and logistics partners  
• Analytics and marketing providers  
• Legal authorities if required  

We never sell your personal information for malicious purposes.`}
        </Section>

        <Section title="Data Retention">
{`We retain your personal information only as long as necessary to:

• Fulfill orders  
• Maintain your account  
• Comply with legal obligations  
• Resolve disputes  
• Enforce agreements`}
        </Section>

        <Section title="Your Rights">
{`Depending on your location, you may have the right to:

• Access your personal data  
• Request correction of your data  
• Request deletion of your data  
• Opt out of marketing emails  
• Withdraw consent at any time  
• Request a copy of your data`}
        </Section>

        <Section title="Security">
{`We use reasonable security measures to protect your data.

However, no online system is 100% secure, and we cannot guarantee absolute security.`}
        </Section>

        <Section title="Third-Party Services">
{`Our website may contain links or integrations with third-party services.

We are not responsible for the privacy practices of external websites.

Please review their policies before sharing any data.`}
        </Section>

        <Section title="Children's Privacy">
{`Our services are not intended for individuals under 16.

We do not knowingly collect data from children.

If we discover such data has been collected, we will delete it immediately.`}
        </Section>

        <Section title="International Transfers">
{`Your information may be transferred and stored in countries outside your location.

We take steps to ensure your data is handled securely and in compliance with applicable laws.`}
        </Section>

        <Section title="Contact Information">
{`If you have questions about this Privacy Policy, contact us:

Email: NBLX602@gmail.com   
'Address: '20 Onipe Street, Bariga Lagos, Nigeria`}
        </Section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;