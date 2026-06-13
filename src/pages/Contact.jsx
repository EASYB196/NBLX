import React, { useState } from 'react';
import { Link } from 'react-router-dom';      
import { FiCopy } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    request: '',
  });
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [emailError, setEmailError] = useState('');

  const [copied, setCopied] = useState('');
  const [loading, setLoading] = useState(false);

  const TOAST_ID = 'nblx-contact-toast';

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);

    setTimeout(() => {
      setCopied('');
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email.trim().toLowerCase() === 'nblx062') {
      setEmailError('Enter your Gmail name(we’ll add @gmail.com)');
      return;
    }
    toast.dismiss(TOAST_ID);

    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError('Please enter a valid phone number');
      toast.error('Invalid phone number', {
        id: TOAST_ID,
      });
      return;
    }

    const parsed = parsePhoneNumber(phone);

    if (parsed?.nationalNumber?.length > 10) {
      setPhoneError('Phone number must be max 10 digits');
      toast.error('Phone number too long', {
        id: TOAST_ID,
      });
      return;
    }
    setPhoneError('');
    setLoading(true);

    const loadingToast = toast.loading('Sending message...', {
      id: TOAST_ID,
    });

    try {
      const response = await fetch('https://formspree.io/f/mojbbpwn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          email: `${formData.email}@gmail.com`,
          phone,
        }),
      });

      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success('Message sent successfully!', {
          id: TOAST_ID,
        });

        setFormData({
          name: '',
          email: '',
          request: '',
        });

        setPhone('');
      } else {
        toast.error('Failed to send message.', {
          id: TOAST_ID,
        });
      }
    } catch (error) {
      console.error(error);

      toast.error('Network error.', {
        id: TOAST_ID,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[#f8f8f8] px-4 py-16'>
      <div className='max-w-6xl mx-auto min-h-[80vh] grid lg:grid-cols-2 gap-10 items-center'>
        {/* Left Side */}
        <div>
          <p className='uppercase tracking-[0.3em] text-sm text-gray-500 mb-4'>Contact</p>

          <h1 className='text-4xl sm:text-5xl font-semibold leading-tight text-black'>
            Let’s Start a Conversation
          </h1>

          <p className='mt-6 text-gray-600 leading-relaxed max-w-lg'>
            Have a question, special request, or need support? Fill out the form and our team
            will get back to you as soon as possible.
          </p>

          {/* Contact Cards */}
          <div className='mt-10 space-y-4'>
            {/* Email Card */}
            <div className='bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition duration-300'>
              <div className='overflow-hidden'>
                <p className='text-sm text-gray-500'>E-mail</p>

                <a
                  href='mailto:NBLX06@gmail.com'
                  className='mt-1 text-black font-medium hover:underline break-all'
                >
                  NBLX06@gmail.com
                </a>
              </div>

              <button
                onClick={() => copyToClipboard('NBLX06@gmail.com', 'email')}
                className='
    relative
    min-w-10
    h-10
    rounded-full
    border
    border-gray-300
    flex
    items-center
    justify-center
    text-gray-700
    hover:text-black
    hover:border-black
    hover:scale-110
    active:scale-95
    transition-all
    duration-300
    shadow-[0_0_0_rgba(0,0,0,0)]
    hover:shadow-[0_0_20px_rgba(0,0,0,0.08)]
  '
              >
                <FiCopy
                  size={18}
                  className='
      transition-transform
      duration-300
      hover:rotate-12
    '
                />

                {copied === 'email' && (
                  <span
                    className='
        absolute
        -top-10
        right-0
        text-black
        text-xs
        font-medium
        whitespace-nowrap
        animate-pulse
      '
                  >
                    Copied!
                  </span>
                )}
              </button>
            </div>
            {/* Phone Card */}
            <div className='bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition duration-300'>
              <div>
                <p className='text-sm text-gray-500'>Phone</p>

                <a
                  href='tel:+2347041554896'
                  className='mt-1 text-black font-medium hover:underline'
                >
                  +234 704 155 4896
                </a>
              </div>

              <button
                onClick={() => copyToClipboard('+2347041554896', 'phone')}
                className='
    relative
    min-w-10
    h-10
    rounded-full
    border
    border-gray-300
    flex
    items-center
    justify-center
    text-gray-700
    hover:text-black
    hover:border-black
    hover:scale-110
    active:scale-95
    transition-all
    duration-300
    shadow-[0_0_0_rgba(0,0,0,0)]
    hover:shadow-[0_0_20px_rgba(0,0,0,0.08)]
  '
              >
                <FiCopy
                  size={18}
                  className='
      transition-transform
      duration-300
      hover:rotate-12
    '
                />

                {copied === 'phone' && (
                  <span
                    className='
        absolute
        -top-10
        right-0
        text-black
        text-xs
        font-medium
        whitespace-nowrap
        animate-pulse
      '
                  >
                    Copied!
                  </span>
                )}
              </button>
            </div>

            {/* WhatsApp Card */}
            <div className='relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-lg transition-all duration-500 group'>
              {/* Subtle Line Effect */}
              <div className='absolute left-0 top-0 h-full w-1 bg-black scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top rounded-full'></div>

              {/* Left Content */}
              <div className='relative z-10'>
                <p className='text-xs uppercase tracking-[0.2em] text-gray-400'>WhatsApp</p>

                <a
                  href='https://wa.me/2347041554896'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-2 inline-block text-black font-semibold text-lg hover:tracking-wide transition-all duration-300'
                >
                  Chat With Us
                </a>

                <p className='text-sm text-gray-500 mt-1'>Fast replies & instant support</p>
              </div>

              {/* Icon Side */}
              <a
                href='https://wa.me/2347041554896'
                target='_blank'
                rel='noopener noreferrer'
                className='
      relative
      z-10
      min-w-12
      h-12
      rounded-full
      border
      border-gray-300
      flex
      items-center
      justify-center
      text-gray-700
      group-hover:text-black
      group-hover:border-black
      group-hover:scale-110
      transition-all
      duration-300
    '
              >
                <FaWhatsapp
                  size={22}
                  className='group-hover:rotate-12 transition-transform duration-300'
                />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Name */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Name*</label>

              <input
                type='text'
                name='name'
                placeholder='Your name'
                value={formData.name}
                onChange={handleChange}
                required
                className='w-full h-14 px-4 rounded-xl border border-gray-300 outline-none focus:border-black transition'
              />
            </div>

            {/* Email */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Gmail Address*
              </label>

              <div className='flex h-14 rounded-xl border border-gray-300 overflow-hidden focus-within:border-black transition'>
                <input
                  type='text'
                  name='email'
                  placeholder='NBLX062'
                  value={formData.email}
                  onChange={(e) => {
                    let value = e.target.value.toLowerCase();

                    value = value.replace(/[@.]/g, '');
                    value = value.replace(/gmail|com/g, '');

                    setFormData((prev) => ({
                      ...prev,
                      email: value,
                    }));
                  }}
                  required
                  className='flex-1 px-4 outline-none bg-white'
                />

                <div className='px-4 flex items-center bg-gray-100 border-l border-gray-300 text-gray-600 text-sm whitespace-nowrap'>
                  @gmail.com
                </div>
              </div>
              {emailError && <h6 className='text-red-500 text-sm mt-2 ml-2'>{emailError}</h6>}
            </div>

            {/* Phone */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Phone Number*
              </label>

              <PhoneInput
                international
                defaultCountry='NG'
                value={phone}
                onChange={(value) => {
                  if (!value) {
                    setPhone('');
                    return;
                  }

                  const phoneObj = parsePhoneNumber(value);

                  if (!phoneObj) {
                    setPhone('');
                    return;
                  }

                  const nationalNumber = phoneObj.nationalNumber;

                  // enforce max 10 digits for all countries (your rule)
                  if (nationalNumber.length <= 10) {
                    setPhone(value);
                    setPhoneError('');
                  } else {
                    setPhoneError('Phone number cannot exceed 10 digits');
                  }
                }}
                className='w-full border border-gray-300 rounded-xl p-4'
              />

              {phoneError && <p className='text-red-500 text-sm mt-2'>{phoneError}</p>}
            </div>

            {/* Request */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Your Request*
              </label>

              <textarea
                name='request'
                placeholder='Write your message...'
                value={formData.request}
                onChange={handleChange}
                required
                rows='5'
                className='w-full px-4 py-4 rounded-xl border border-gray-300 outline-none focus:border-black transition resize-none'
              />
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={loading}
              className='
    w-full
    h-14
    rounded-xl
    bg-black
    text-white
    font-medium
    hover:bg-gray-900
    transition
    duration-300
    disabled:opacity-60
    disabled:cursor-not-allowed
  '
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>

            {/* Footer Text */}
          <p className='text-xs sm:text-sm text-gray-500 leading-6 sm:leading-relaxed text-center sm:text-left'>
  By submitting this form, you agree to our{' '}
  <Link
    to='/term-of-services'
    className='text-black font-medium hover:underline'
  >
    Terms of Service
  </Link>{' '}
  and{' '}
  <Link
    to='/privacy-policy'
    className='text-black font-medium hover:underline'
  >
    Privacy Policy
  </Link>
  .
</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
