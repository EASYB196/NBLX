import React from "react";

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
      {title}
    </h2>
    <div className="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line">
      {children}
    </div>
  </div>
);

const TermsOfService = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-16">
      
      {/* HEADER */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-5xl pt-10 font-bold text-gray-900">
          Terms of Service
        </h1>
        <p className="mt-4 text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
          Please read these Terms carefully before using NBLX Monochrome services.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto space-y-16">

        <Section title="OVERVIEW">
{`This website is operated by NBLX Monochrome. Throughout the site, the terms “we”, “us” and “our” refer to NBLX Monochrome.

NBLX Monochrome offers this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.

By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by these Terms of Service (“Terms”), including additional terms referenced herein.

These Terms apply to all users including browsers, vendors, customers, merchants, and contributors of content.

If you do not agree to all terms, you may not access the website or use services.

We reserve the right to update or change these Terms at any time without notice. Continued use constitutes acceptance.`}
        </Section>

        <Section title="SECTION 1 - ONLINE STORE TERMS">
{`By using this site, you confirm you are of legal age in your jurisdiction or have consent from a guardian.

You may not use our products for illegal or unauthorized purposes.

You must not transmit viruses, worms, or harmful code.

Violation of any Terms will result in immediate termination of services.

We reserve full discretion to restrict access to any user.`}
        </Section>

        <Section title="SECTION 2 - GENERAL CONDITIONS">
{`We reserve the right to refuse service at any time for any reason.

Your content (excluding credit card information) may be transferred unencrypted across networks.

Credit card data is always encrypted during transfer.

You agree not to copy, sell, resell, or exploit any part of the Service without written permission.

Headings are included for convenience only and do not affect interpretation.`}
        </Section>

        <Section title="SECTION 3 - ACCURACY OF INFORMATION">
{`We are not responsible if information on this site is inaccurate, incomplete, or outdated.

All materials are provided for general informational purposes only.

You should not rely solely on this information for decision-making.

We may update content at any time but are not obligated to do so.

It is your responsibility to monitor changes.`}
        </Section>

        <Section title="SECTION 4 - MODIFICATIONS TO SERVICE AND PRICES">
{`Prices are subject to change without notice.

We may modify or discontinue services at any time without liability.

We are not responsible for any modification, suspension, or discontinuation.`}
        </Section>

        <Section title="SECTION 5 - PRODUCTS OR SERVICES">
{`Some products may be available exclusively online and may have limited quantities.

These products are subject to our Refund Policy.

We make efforts to display accurate product colors but cannot guarantee screen accuracy.

We reserve the right to limit sales by region, customer, or quantity.

All product descriptions and pricing are subject to change at any time.

We may discontinue any product without notice.`}
        </Section>

        <Section title="SECTION 6 - BILLING AND ACCOUNT INFORMATION">
{`We reserve the right to refuse or cancel any order.

We may limit or cancel quantities per customer, household, or order.

You agree to provide accurate billing and account information.

You must update your details promptly to ensure successful transactions.

We may contact you regarding order issues.`}
        </Section>

        <Section title="SECTION 7 - OPTIONAL TOOLS">
{`We may provide access to third-party tools without monitoring or control.

These tools are provided “as is” without warranties.

Use of optional tools is at your own risk.

Future features will also be governed by these Terms.`}
        </Section>

        <Section title="SECTION 8 - THIRD-PARTY LINKS">
{`Our Service may include third-party content or links.

We are not responsible for third-party websites or their accuracy.

We are not liable for any damages from third-party interactions.

You should review third-party policies before use.`}
        </Section>

        <Section title="SECTION 9 - USER COMMENTS AND FEEDBACK">
{`You agree that we may use any comments you submit without restriction.

We are not obligated to maintain comments in confidence or pay compensation.

We may remove content deemed unlawful or inappropriate.

You are responsible for your submissions.`}
        </Section>

        <Section title="SECTION 10 - PERSONAL INFORMATION">
{`Your personal information is governed by our Privacy Policy.`}
        </Section>

        <Section title="SECTION 11 - ERRORS AND OMISSIONS">
{`Occasionally there may be errors or inaccuracies in product descriptions or pricing.

We reserve the right to correct errors or cancel orders at any time.

We are not obligated to update information unless required by law.`}
        </Section>

        <Section title="SECTION 12 - PROHIBITED USES">
{`You are prohibited from using the site:

- For unlawful purposes  
- To violate laws or regulations  
- To infringe intellectual property rights  
- To harass or abuse others  
- To distribute malware or viruses  
- To collect or track personal data  
- To spam or scrape data  
- For obscene or immoral purposes  

We reserve the right to terminate access for violations.`}
        </Section>

        <Section title="SECTION 13 - DISCLAIMER OF WARRANTIES">
{`We do not guarantee uninterrupted, timely, or error-free service.

All services are provided “as is” and “as available”.

We make no warranties regarding reliability or accuracy.

Use of the service is at your sole risk.`}
        </Section>

        <Section title="SECTION 14 - LIMITATION OF LIABILITY">
{`NBLX Monochrome shall not be liable for any damages including:

- Loss of profits  
- Loss of data  
- Service interruption  
- Indirect or incidental damages  

This applies even if we were advised of possible damages.`}
        </Section>

        <Section title="SECTION 15 - INDEMNIFICATION">
{`You agree to indemnify NBLX Monochrome against claims arising from your violation of these Terms or applicable laws.`}
        </Section>

        <Section title="SECTION 16 - SEVERABILITY">
{`If any provision is found unenforceable, the remaining provisions remain valid.`}
        </Section>

        <Section title="SECTION 17 - TERMINATION">
{`We may terminate or suspend access immediately for violations.

You may stop using the service at any time.`}
        </Section>

        <Section title="SECTION 18 - ENTIRE AGREEMENT">
{`These Terms constitute the full agreement between you and NBLX Monochrome.`}
        </Section>

        <Section title="SECTION 19 - GOVERNING LAW">
{`These Terms are governed by the laws of NIGERIA.`}
        </Section>

        <Section title="SECTION 20 - CHANGES TO TERMS">
{`We may update these Terms at any time.

Continued use means acceptance of updates.`}
        </Section>

        <Section title="SECTION 21 - CONTACT INFORMATION">
{`NBLX602@gmail.com

[INSERT TRADING NAME]
[INSERT BUSINESS ADDRESS]
[INSERT BUSINESS PHONE NUMBER]
[INSERT BUSINESS REGISTRATION NUMBER]
[INSERT VAT NUMBER]`}
        </Section>

      </div>
    </div>
  );
};

export default TermsOfService;