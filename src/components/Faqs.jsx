import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiChevronDown,
  FiMinus,
  FiPlus,
  FiSearch,
  FiX,
  FiArrowRight,
  FiMessageCircle,
} from 'react-icons/fi';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqCategories = [
  {
    title: 'Shopping',
    questions: [
      {
        question: 'How do I place an order?',
        answer:
          'Browse our collections, select the product you want, choose your preferred size and quantity, add it to your cart, and proceed to checkout. Review your order details before completing your purchase.',
      },
      {
        question: 'How do I know which size to choose?',
        answer:
          'Check the size information provided on the individual product page before placing your order. If you are still unsure, contact our support team for assistance.',
      },
      {
        question: 'Are all products available online?',
        answer:
          'Our online store features a selection of available products. Availability may vary by product, size, colour, and collection.',
      },
      {
        question: 'Will sold-out products be restocked?',
        answer:
          'Some products may be restocked depending on availability. Keep an eye on the product page for future availability.',
      },
    ],
  },

  {
    title: 'Orders',
    questions: [
      {
        question: 'Can I change or cancel my order?',
        answer:
          'Orders are processed as quickly as possible. If you need to make a change or cancellation, contact us as soon as possible. Once an order has been processed or dispatched, changes may no longer be possible.',
      },
      {
        question: 'How can I track my order?',
        answer:
          'Once your order has been dispatched, you will receive the relevant delivery information needed to track its progress.',
      },
      {
        question: 'What happens if an item becomes unavailable after I place an order?',
        answer:
          'If an ordered product unexpectedly becomes unavailable, our team will contact you and provide the appropriate options.',
      },
    ],
  },

  {
    title: 'Shipping & Delivery',
    questions: [
      {
        question: 'Where do you deliver?',
        answer:
          'We deliver to locations covered by our available delivery services. Available delivery options and charges are displayed during checkout.',
      },
      {
        question: 'How long does delivery take?',
        answer:
          'Delivery times depend on your location and the delivery option selected. Your estimated delivery information will be provided during checkout.',
      },
      {
        question: 'How much does delivery cost?',
        answer:
          'Delivery charges depend on your location, order, and selected delivery option. The applicable fee will be shown before you complete your purchase.',
      },
      {
        question: 'What should I do if my order is delayed?',
        answer:
          'If your order has exceeded the estimated delivery period, contact our support team with your order details so we can assist you.',
      },
    ],
  },

  {
    title: 'Returns & Exchanges',
    questions: [
      {
        question: 'What is your return policy?',
        answer:
          'Eligible items may be returned within the applicable return period, provided they meet the requirements outlined in our returns policy.',
      },
      {
        question: 'How do I request an exchange?',
        answer:
          'Contact our support team with your order number and details of the item you would like to exchange. Our team will guide you through the process.',
      },
      {
        question: 'Can I return an item that I have worn?',
        answer:
          'Returned items must meet the conditions specified in our returns policy. Please review the policy before requesting a return.',
      },
      {
        question: 'What if I receive the wrong item?',
        answer:
          'Contact us as soon as possible with your order number and details of the issue. Our team will review the situation and help resolve it.',
      },
    ],
  },

  {
    title: 'Payments',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'Available payment methods are displayed during checkout and may vary depending on your location.',
      },
      {
        question: 'Is my payment information secure?',
        answer:
          'Payments are processed using secure payment technology designed to protect your information during checkout.',
      },
      {
        question: 'When will I be charged?',
        answer:
          'Payment is generally processed when you complete your purchase. The exact timing may depend on the payment method selected.',
      },
    ],
  },

  {
    title: 'Products & Care',
    questions: [
      {
        question: 'How should I care for my clothing?',
        answer:
          'Follow the care instructions provided with each garment. Proper washing, drying, and storage will help maintain the quality and appearance of your clothing.',
      },
      {
        question: 'Are product colours exactly as shown online?',
        answer:
          'We make every effort to display product colours accurately. However, colours may appear slightly different depending on your screen and display settings.',
      },
      {
        question: 'Where can I find product information?',
        answer:
          'Product pages contain available information such as product descriptions, sizing, materials, and care instructions.',
      },
    ],
  },
];

// ============================================================
// CATEGORY FILTER
// ============================================================

const categoryLabels = [
  'All',
  'Shopping',
  'Orders',
  'Shipping & Delivery',
  'Returns & Exchanges',
  'Payments',
  'Products & Care',
];

// ============================================================
// FAQ ACCORDION ITEM
// ============================================================

const FAQAccordion = ({ question, answer, isOpen, onToggle, id }) => {
  const answerId = `${id}-answer`;

  return (
    <div className='border-b border-black/10'>
      <button
        type='button'
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className='
          group
          flex
          w-full
          items-center
          justify-between
          gap-6
          py-5
          text-left
          outline-none
          transition-colors
          duration-200
          focus-visible:ring-2
          focus-visible:ring-black
          focus-visible:ring-offset-4
        '
      >
        <span
          className='
            min-w-0
            pr-2
            text-[15px]
            font-medium
            leading-6
            tracking-[-0.01em]
            text-black
            sm:text-base
          '
        >
          {question}
        </span>

        <span
          aria-hidden='true'
          className='
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            border
            border-black/15
            text-black
            transition-all
            duration-200
            group-hover:border-black
          '
        >
          {isOpen ? (
            <FiMinus className='h-4 w-4' strokeWidth={1.7} />
          ) : (
            <FiPlus className='h-4 w-4' strokeWidth={1.7} />
          )}
        </span>
      </button>

      <div
        id={answerId}
        role='region'
        aria-hidden={!isOpen}
        className={`
          grid
          transition-[grid-template-rows,opacity]
          duration-300
          ease-out
          ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
        `}
      >
        <div className='min-h-0 overflow-hidden'>
          <p className='max-w-3xl pb-6 pr-10 text-sm leading-7 text-black/60 sm:text-[15px]'>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQCategory = ({ category, categoryIndex, openId, setOpenId }) => {
  return (
    <section aria-labelledby={`faq-category-${categoryIndex}`} className='scroll-mt-28'>
      <div className='mb-5 flex items-center justify-between gap-4'>
        <h2
          id={`faq-category-${categoryIndex}`}
          className='
            text-xs
            font-semibold
            uppercase
            tracking-[0.18em]
            text-black
          '
        >
          {category.title}
        </h2>

        <span className='hidden text-xs tracking-wide text-black/35 sm:block'>
          {String(category.questions.length).padStart(2, '0')}{' '}
          {category.questions.length === 1 ? 'QUESTION' : 'QUESTIONS'}
        </span>
      </div>

      <div>
        {category.questions.map((item, questionIndex) => {
          const id = `faq-${categoryIndex}-${questionIndex}`;

          return (
            <FAQAccordion
              key={id}
              id={id}
              question={item.question}
              answer={item.answer}
              isOpen={openId === id}
              onToggle={() => setOpenId((current) => (current === id ? null : id))}
            />
          );
        })}
      </div>
    </section>
  );
};

const FAQSearch = ({ search, setSearch }) => {
  return (
    <div className='relative w-full'>
      <label htmlFor='faq-search' className='sr-only'>
        Search frequently asked questions
      </label>

      <FiSearch
        aria-hidden='true'
        className='
          pointer-events-none
          absolute
          left-5
          top-1/2
          h-[18px]
          w-[18px]
          -translate-y-1/2
          text-black/45
        '
        strokeWidth={1.5}
      />

      <input
        id='faq-search'
        type='search'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder='Search questions...'
        autoComplete='off'
        className='
          h-14
          w-full
          border
          border-black/15
          bg-transparent
          pl-12
          pr-12
          text-sm
          text-black
          outline-none
          placeholder:text-black/40
          transition
          duration-200
          focus:border-black
          focus:ring-0
          sm:h-16
          sm:text-[15px]
        '
      />

      {search && (
        <button
          type='button'
          onClick={() => setSearch('')}
          aria-label='Clear search'
          className='
            absolute
            right-4
            top-1/2
            flex
            h-8
            w-8
            -translate-y-1/2
            items-center
            justify-center
            text-black/50
            transition
            hover:text-black
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-black
          '
        >
          <FiX className='h-4 w-4' />
        </button>
      )}
    </div>
  );
};

const FAQCategoryFilter = ({ activeCategory, setActiveCategory }) => {
  return (
    <div
      className='
        -mx-4
        overflow-x-auto
        px-4
        pb-1
        scrollbar-none
        sm:mx-0
        sm:px-0
      '
    >
      <div
        role='tablist'
        aria-label='FAQ categories'
        className='flex min-w-max items-center gap-2'
      >
        {categoryLabels.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type='button'
              role='tab'
              aria-selected={isActive}
              onClick={() => setActiveCategory(category)}
              className={`
                whitespace-nowrap
                border
                px-4
                py-2.5
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.12em]
                transition-all
                duration-200
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-black
                focus-visible:ring-offset-2
                ${
                  isActive
                    ? 'border-black bg-black text-white'
                    : 'border-black/15 bg-transparent text-black/60 hover:border-black hover:text-black'
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const NoResults = ({ search, onClear }) => {
  return (
    <div className='border border-black/10 px-6 py-14 text-center sm:px-10 sm:py-20'>
      <span className='mb-5 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40'>
        FAQ SEARCH
      </span>

      <h2 className='text-xl font-medium tracking-[-0.02em] sm:text-2xl'>No results found</h2>

      <p className='mx-auto mt-3 max-w-md text-sm leading-6 text-black/55'>
        We couldn't find an answer matching your search
        {search ? ` for "${search}"` : ''}.
      </p>

      <button
        type='button'
        onClick={onClear}
        className='
          mt-7
          inline-flex
          items-center
          gap-2
          border
          border-black
          px-5
          py-3
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.12em]
          text-black
          transition
          duration-200
          hover:bg-black
          hover:text-white
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-black
          focus-visible:ring-offset-2
        '
      >
        Clear search
        <FiX className='h-3.5 w-3.5' />
      </button>
    </div>
  );
};

const FAQ = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState(null);

  const filteredCategories = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    const categories =
      activeCategory === 'All'
        ? faqCategories
        : faqCategories.filter((category) => category.title === activeCategory);

    if (!normalizedSearch) {
      return categories;
    }

    return categories
      .map((category) => {
        const categoryMatches = category.title.toLowerCase().includes(normalizedSearch);

        const questions = category.questions.filter((item) => {
          const questionMatches = item.question.toLowerCase().includes(normalizedSearch);

          const answerMatches = item.answer.toLowerCase().includes(normalizedSearch);

          return questionMatches || answerMatches || categoryMatches;
        });

        return {
          ...category,
          questions,
        };
      })
      .filter((category) => category.questions.length > 0);
  }, [search, activeCategory]);

  const hasResults = filteredCategories.length > 0;

  const clearSearch = () => {
    setSearch('');
    setOpenId(null);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setOpenId(null);
  };

  return (
    <div className='min-h-screen bg-white text-black'>
      <Navbar />

      <main>
        <section className='border-b border-black/10'>
          <div className='mx-auto w-full max-w-360 px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28 lg:px-12 lg:pb-24 lg:pt-36'>
            <div className='max-w-4xl'>
              <p className='mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45 sm:mb-6 sm:text-[11px]'>
                Help Centre
              </p>

              <h1
                className='
                  max-w-4xl
                  text-[42px]
                  font-medium
                  leading-[0.98]
                  tracking-[-0.055em]
                  sm:text-6xl
                  md:text-7xl
                  lg:text-[88px]
                '
              >
                Frequently Asked Questions
              </h1>

              <p
                className='
                  mt-6
                  max-w-2xl
                  text-sm
                  leading-6
                  text-black/55
                  sm:mt-7
                  sm:text-base
                  sm:leading-7
                '
              >
                Find answers to common questions about orders, products, delivery, returns,
                payments, and more.
              </p>
            </div>
          </div>
        </section>

        <section aria-label='FAQ search and categories' className='border-b border-black/10'>
          <div className='mx-auto w-full max-w-360 px-5 py-8 sm:px-8 sm:py-10 lg:px-12'>
            <div className='mx-auto max-w-3xl'>
              <FAQSearch
                search={search}
                setSearch={(value) => {
                  setSearch(value);
                  setOpenId(null);
                }}
              />

              <div className='mt-5'>
                <FAQCategoryFilter
                  activeCategory={activeCategory}
                  setActiveCategory={handleCategoryChange}
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div
            className='
              mx-auto
              grid
              w-full
              max-w-360
              grid-cols-1
              gap-12
              px-5
              py-16
              sm:px-8
              sm:py-20
              lg:grid-cols-[240px_minmax(0,760px)]
              lg:gap-20
              lg:px-12
              lg:py-28
              xl:grid-cols-[260px_minmax(0,780px)]
              xl:gap-28
            '
          >
            {/* ----------------------------------------------
                DESKTOP INFORMATION PANEL
            ---------------------------------------------- */}
            <aside className='hidden lg:block'>
              <div className='sticky top-28'>
                <span className='text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40'>
                  Help Centre
                </span>

                <p className='mt-4 max-w-[210px] text-sm leading-6 text-black/55'>
                  Everything you need to know about shopping with NBLX.
                </p>

                <div className='mt-8 h-px w-10 bg-black' />

                <p className='mt-5 text-[10px] uppercase tracking-[0.14em] text-black/35'>
                  {hasResults
                    ? `${filteredCategories.reduce(
                        (total, category) => total + category.questions.length,
                        0,
                      )} answers`
                    : '0 answers'}
                </p>
              </div>
            </aside>

            {/* ----------------------------------------------
                FAQ LIST
            ---------------------------------------------- */}
            <div className='min-w-0'>
              {hasResults ? (
                <div className='space-y-14 sm:space-y-16'>
                  {filteredCategories.map((category, categoryIndex) => (
                    <FAQCategory
                      key={category.title}
                      category={category}
                      categoryIndex={categoryIndex}
                      openId={openId}
                      setOpenId={setOpenId}
                    />
                  ))}
                </div>
              ) : (
                <NoResults search={search} onClear={clearSearch} />
              )}
            </div>
          </div>
        </section>

        {/* ====================================================
            SUPPORT CTA
        ==================================================== */}
        <section className='border-t border-black/10'>
          <div className='mx-auto w-full max-w-360 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28'>
            <div
              className='
                flex
                flex-col
                gap-8
                border
                border-black
                p-7
                sm:p-10
                md:flex-row
                md:items-end
                md:justify-between
                md:p-12
                lg:p-16
              '
            >
              <div className='max-w-xl'>
                <span className='text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40'>
                  Need assistance?
                </span>

                <h2
                  className='
                    mt-4
                    text-3xl
                    font-medium
                    leading-tight
                    tracking-[-0.04em]
                    sm:text-4xl
                    lg:text-5xl
                  '
                >
                  Still have questions?
                </h2>

                <p className='mt-4 max-w-lg text-sm leading-6 text-black/55 sm:text-base sm:leading-7'>
                  Can't find what you're looking for? Our team is here to help.
                </p>
              </div>

              <div className='flex w-full flex-col gap-3 sm:flex-row md:w-auto'>
                <Link
                  to='/contact'
                  className='
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    gap-3
                    border
                    border-black
                    bg-white
                    px-6
                    py-3.5
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    text-white
                    transition
                    duration-200
                    hover:bg-white
                    hover:border-gray-900/10
                    hover:text-black
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-black
                    focus-visible:ring-offset-2
                  '
                >
                  Contact Us
                  <FiArrowRight className='h-4 w-4' strokeWidth={1.5} />
                </Link>

                {/*
                  IMPORTANT:
                  Replace "/whatsapp" with your existing WhatsApp
                  route/link if your project already provides one.

                  No phone number is invented here.
                */}
                <a
                  href='#whatsapp'
                  onClick={(event) => {
                    event.preventDefault();

                    const whatsappLink = document.querySelector(
                      'a[href*="wa.me"], a[href*="whatsapp.com"]',
                    );

                    if (whatsappLink) {
                      whatsappLink.click();
                    }
                  }}
                  className='
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    gap-3
                    border
                    border-black/15
                    px-6
                    py-3.5
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    text-black
                    transition
                    duration-200
                    hover:border-black
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-black
                    focus-visible:ring-offset-2
                  '
                >
                  WhatsApp Us
                  <FiMessageCircle className='h-4 w-4' strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
