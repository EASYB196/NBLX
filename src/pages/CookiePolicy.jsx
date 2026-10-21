import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCookieBite } from 'react-icons/fa';

function CookiePolicy() {
  const sections = [
    {
      title: '1. What Are Cookies?',
      content:
        'Cookies are small text files stored on your device when you visit a website. They help websites function correctly, remember preferences, and understand how visitors interact with their pages.',
    },
    {
      title: '2. How We Use Cookies',
      content:
        'NBLX uses essential technologies to support core website functionality. Optional analytics or marketing cookies should only be used if those services are implemented and permitted by your saved preferences.',
    },
    {
      title: '3. Essential Cookies',
      content:
        'Essential cookies and similar technologies support features necessary for the website to operate, such as security and shopping functionality. They remain enabled because core features may not work correctly without them.',
    },
    {
      title: '4. Analytics Cookies',
      content:
        'If analytics tools are implemented, they may help us understand how visitors use NBLX and which pages need improvement. Optional analytics tracking should respect your saved preferences and applicable consent requirements.',
    },
    {
      title: '5. Marketing and Third-Party Cookies',
      content:
        'If marketing tools are implemented, they may help measure advertising effectiveness or promotional campaigns. Third-party services may process information according to their own privacy policies and the settings you have permitted.',
    },
    {
      title: '6. Managing Your Cookie Preferences',
      content:
        'You can accept all cookies, allow essential cookies only, or customize optional analytics and marketing preferences using our cookie settings. Your saved choices remain in your browser until changed or cleared. You can also manage cookies through your browser settings.',
    },
    {
      title: '7. Changes to This Policy',
      content:
        'We may update this Cookie Policy as our website, services, or applicable requirements change. Updates will be published on this page.',
    },
    {
      title: '8. Contact Us',
      content:
        'If you have questions about this Cookie Policy or NBLX privacy practices, please contact us through our official customer support channels.',
    },
  ];

  const openCookieSettings = () => {
    window.dispatchEvent(new Event('nblx-open-cookie-preferences'));
  };

  return (
    <main className='min-h-screen bg-white px-4 pb-16 pt-28 text-black sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl'>
        <Link
          to='/'
          className='mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black'
        >
          <FaArrowLeft />
          Back to Home
        </Link>

        <header className='border-b border-gray-200 pb-8'>
          <div className='mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-2xl text-white'>
            <FaCookieBite />
          </div>

          <p className='mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-500'>
            NBLX · Privacy
          </p>

          <h1 className='text-3xl font-bold tracking-tight sm:text-5xl'>Cookie Policy</h1>

          <p className='mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base'>
            This policy explains how NBLX uses cookies and similar technologies when you visit
            our website.
          </p>
        </header>

        <section className='mt-8 rounded-xl bg-gray-50 p-5 sm:p-6'>
          <h2 className='font-bold'>Your privacy matters</h2>

          <p className='mt-2 text-sm leading-6 text-gray-600'>
            We aim to use cookies responsibly and give you control over optional tracking
            technologies. The technologies actually used depend on the features and services
            enabled on our website.
          </p>

          <button
            type='button'
            onClick={openCookieSettings}
            className='mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
          >
            <FaCookieBite />
            Review Cookie Preferences
          </button>
        </section>

        <div className='mt-10 space-y-9'>
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className='text-lg font-bold sm:text-xl'>{section.title}</h2>

              <p className='mt-3 text-sm leading-7 text-gray-600 sm:text-base'>
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <footer className='mt-12 border-t border-gray-200 pt-6'>
          <p className='text-xs leading-6 text-gray-500'>
            Please ensure this policy reflects the actual cookies, third-party services, and
            privacy practices used by NBLX.
          </p>

          <Link
            to='/category'
            className='mt-5 inline-flex rounded-lg border border-black px-5 py-3 text-sm font-semibold transition hover:bg-black hover:text-white'
          >
            Continue Shopping
          </Link>
        </footer>
      </div>
    </main>
  );
}

export default CookiePolicy;
