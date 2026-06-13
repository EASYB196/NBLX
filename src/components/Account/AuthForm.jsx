import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase';
import Logo from '../../assets/images/nblx_logo.png';
import image from '../../assets/images/herobg.png';

const AuthForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showPassword] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !signupPassword || !confirmPassword) {
      return toast.error('Please fill all fields');
    }

    if (!isValidEmail(email)) {
      return toast.error('Enter a valid email address');
    }

    if (signupPassword.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    if (signupPassword !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, email, signupPassword);

      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      toast.success('Account created successfully!');

      setFullName('');
      setEmail('');
      setSignupPassword('');
      setConfirmPassword('');

      setActiveTab('login');
    } catch (error) {
      toast.error(getFirebaseError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (emailError) {
      return toast.error(emailError);
    }

    if (!email || !loginPassword) {
      return toast.error('Please enter email and password');
    }

    if (!isValidEmail(email)) {
      return toast.error('Please enter a valid email address');
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, loginPassword);

      toast.success('Login successful!');
    } catch (error) {
      toast.error(getFirebaseError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email', {
        id: 'reset-empty',
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address', {
        id: 'reset-invalid-email',
      });
      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(auth, email);

      toast.success('Password reset email sent!', {
        id: 'reset-success',
      });

      setEmail('');

      setActiveTab('login');
    } catch (error) {
      toast.error(getFirebaseError(error), {
        id: 'reset-error',
      });
    } finally {
      setLoading(false);
    }
  };
  const getFirebaseError = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered';

      case 'auth/invalid-email':
        return 'Please enter a valid email address';

      case 'auth/user-not-found':
        return 'Account not found';

      case 'auth/wrong-password':
        return 'Incorrect password';

      case 'auth/invalid-credential':
        return 'Invalid email or password';

      case 'auth/weak-password':
        return 'Password should be at least 6 characters';

      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later';

      default:
        return 'Something went wrong. Please try again';
    }
  };
  const { type } = useParams();
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const [activeTab, setActiveTab] = useState(type || 'login');

  useEffect(() => {
    setActiveTab(type || 'login');
  }, [type]);

  return (
    <div className='min-h-[80vh] md:fixed md:w-full  bg-[#f5f5f5] flex items-center justify-center px-3 sm:px-5 lg:px-10 py-6 md:pt-26 '>
<div className="absolute top-5 inset-x-0 flex justify-center md:justify-center md:pr-10 z-50">        {' '}
        <Link to={'/'}>
          <img src={Logo} alt='' className='w-60 h-28' />
        </Link>
      </div>
      {/* MAIN CONTAINER */}
      <div className='w-full max-w-4xl bg-white rounded-[30px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]'>
        {/* LEFT IMAGE SECTION (DESKTOP ONLY) */}
        <div className='hidden  lg:flex relative items-center justify-center bg-black'>
          <img
            src={image}
            alt='auth visual'
            className='w-full h-full object-cover opacity-80'
          />

          {/* Overlay */}
          <div className='absolute inset-0 bg-black/45'></div>

          {/* TEXT */}
          <div className='absolute bottom-18 left-10 z-10 text-white max-w-md'>
            <h1 className='text-5xl  font-bold tracking-[4px]'>NBLX</h1>

            <p className='mt-5 text-lg text-gray-200 leading-relaxed'>
              Premium fashion experience crafted for modern style, luxury, elegance, and
              timeless streetwear culture.
            </p>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className='flex items-center justify-center px-5 sm:px-8 md:px-14 py-0 md:py-14'>
          <div className='w-full max-w-md'>
            {/* MOBILE LOGO */}
            <div className='flex md:hidden justify-center pb-5'>
              <Link to={'/'}>
                <img
                  src={Logo}
                  alt='auth visual'
                  className='w-32 h-12 object-cover opacity-80'
                />
              </Link>
            </div>

            {/* HEADER */}
            <div className='mb-8 '>
              <h2 className='text-3xl sm:text-4xl font-bold text-black leading-tight'>
                {activeTab === 'login'
                  ? 'Welcome Back'
                  : activeTab === 'signup'
                    ? 'Create Account'
                    : 'Forgot Password'}
              </h2>

              <p className='text-gray-500 mt-3 leading-relaxed text-sm sm:text-base'>
                {activeTab === 'login' && 'Login to continue your premium shopping experience.'}

                {activeTab === 'signup' &&
                  'Create your account and discover exclusive collections.'}

                {activeTab === 'forgot' && 'Enter your email and we’ll send you a reset link.'}
              </p>
            </div>

            {/* LOGIN / SIGNUP TABS */}
            {activeTab !== 'forgot' && (
              <div className='flex bg-[#f2f2f2] rounded-full p-1 mb-8'>
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 rounded-full text-[16px] sm:text-base transition-all duration-300 font-medium ${
                    activeTab === 'login' ? 'bg-black text-white shadow-lg' : 'text-gray-600'
                  }`}
                >
                  Login
                </button>

                <button
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-2 rounded-full text-[16px] sm:text-base transition-all duration-300 font-medium ${
                    activeTab === 'signup' ? 'bg-black text-white shadow-lg' : 'text-gray-600'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* LOGIN FORM */}
            {activeTab === 'login' && (
              <form className='space-y-3' onSubmit={handleLogin}>
                {' '}
                <div className='relative'>
                  <FaEnvelope className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

                  <input
                    type='email'
                    placeholder='Email Address'
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value.trim();
                      setEmail(value);

                      const gmailTypos = [
                        '@mail.com',
                        '@gmal.com',
                        '@gmail.co',
                        '@gmai.com',
                        '@gmailcom',
                      ];

                      if (!value) {
                        setEmailError('Email is required');
                        return;
                      }

                      if (!value.includes('@')) {
                        setEmailError('Email must contain @');
                        return;
                      }

                      if (gmailTypos.some((typo) => value.includes(typo))) {
                        setEmailError('Invalid Gmail input');
                        return;
                      }

                      if (!value.includes('.')) {
                        setEmailError('Email looks incomplete');
                        return;
                      }

                      if (!isValidEmail(value)) {
                        setEmailError('Enter a valid email address');
                        return;
                      }

                      setEmailError('');
                    }}
                    className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
                  />
                  {emailError && <p className='text-red-500 text-xs mt-1 ml-1'>{emailError}</p>}
                </div>
                <div className='relative'>
                  <FaLock className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder='Password'
                    className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
                  />
                  <span
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className='absolute right-3 top-4 cursor-pointer'
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className='flex items-center justify-between text-xs sm:text-sm'>
                  <label className='flex items-center gap-2 text-gray-600'>
                    <input type='checkbox' />
                    Remember me
                  </label>

                  <button
                    type='button'
                    onClick={() => setActiveTab('forgot')}
                    className='text-black hover:underline'
                  >
                    Forgot Password?
                  </button>
                </div>
                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-black text-white text-sm py-3 rounded-2xl hover:opacity-90 transition-all duration-300 font-semibold tracking-wide'
                >
                  {loading ? 'Logging in...' : 'LOGIN'}
                </button>
              </form>
            )}

            {/* SIGNUP FORM */}
            {activeTab === 'signup' && (
              <form className='space-y-3  ' onSubmit={handleSignup}>
                <div className='relative'>
                  <FaUser className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

                  <input
                    type='text'
                    placeholder='Full Name'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
                  />
                </div>

                <div className='relative'>
                  <FaEnvelope className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />
                  <input
                    type='email'
                    placeholder='Email Address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
                  />
                </div>

                <div className='relative'>
                  <FaLock className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder='Password'
                    className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
                  />

                  <span
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className='absolute right-3 top-4 cursor-pointer'
                  >
                    {showSignupPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className='relative'>
                  <FaLock className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Repeat Password'
                    className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
                  />

                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-4 cursor-pointer'
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-black text-white py-3 text-sm rounded-2xl hover:opacity-90 transition-all duration-300 font-semibold tracking-wide'
                >
                  {loading ? 'Creating Account...' : 'CREATE ACCOUNT'}
                </button>
                <h5 className='text-center text-xs leading-tight text-gray-600'>
                  By continuing, you agree to our{' '}
                  <span
                    onClick={() => setShowTerms(true)}
                    className='underline hover:text-blue-700 cursor-pointer'
                  >
                    Terms of Service
                  </span>
                  <span> and </span>
                  <span
                    onClick={() => setShowPrivacyPolicy(true)}
                    className='underline hover:text-blue-700 cursor-pointer'
                  >
                    Privacy Policy
                  </span>
                </h5>
              </form>
            )}

            {/* FORGOT PASSWORD */}
            {activeTab === 'forgot' && (
              <form className='space-y-5' onSubmit={handleResetPassword}>
                <div className='relative'>
                  <FaEnvelope className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

                  <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
                  />
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-black text-white py-4 rounded-2xl hover:opacity-90 transition-all duration-300 font-semibold tracking-wide'
                >
                  {loading ? 'Sending...' : 'SEND RESET LINK'}
                </button>

                <button
                  type='button'
                  onClick={() => setActiveTab('login')}
                  className='w-full text-black hover:underline mt-2'
                >
                  Back to Login
                </button>
              </form>
            )}
          </div>

          {showPrivacyPolicy && (
            <div className='fixed inset-0 z-50 flex items-center justify-center'>
              {/* Overlay */}
              <div
                onClick={() => setShowPrivacyPolicy(false)}
                className='absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity'
              />

              {/* Modal */}
              <div className='relative w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl p-6 md:p-8 z-10 animate-[fadeIn_0.2s_ease-in-out]'>
                {/* Close Button */}
                <button
                  onClick={() => setShowPrivacyPolicy(false)}
                  className='absolute top-3 right-4 text-gray-500 hover:text-black text-xl'
                >
                  ✕
                </button>

                {/* Title */}
                <h2 className='text-2xl font-bold mb-4'>Privacy Policy</h2>

                {/* Content */}
                <div className='text-sm text-gray-600 leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto'>
                  <p>
                    At NBLX, we respect your privacy and are committed to protecting your
                    personal information.
                  </p>

                  <p>
                    We collect basic information such as name, email, and order details to
                    improve your shopping experience.
                  </p>

                  <p>
                    Your data is securely stored and is never sold or shared with third parties
                    without your consent.
                  </p>

                  <p>
                    We may use cookies to enhance site performance and personalize your
                    experience.
                  </p>

                  <p>
                    You can request deletion of your data at any time by contacting our support
                    team.
                  </p>

                  <p>By using our platform, you agree to this Privacy Policy.</p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setShowPrivacyPolicy(false)}
                  className='mt-6 w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition'
                >
                  I Understand
                </button>
              </div>
            </div>
          )}
          {showTerms && (
            <div className='fixed inset-0 z-50 flex items-center justify-center'>
              {/* Overlay */}
              <div
                onClick={() => setShowTerms(false)}
                className='absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity'
              />

              {/* Modal */}
              <div className='relative w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl p-6 md:p-8 z-10 animate-[fadeIn_0.2s_ease-in-out]'>
                {/* Close Button */}
                <button
                  onClick={() => setShowTerms(false)}
                  className='absolute top-3 right-4 text-gray-500 hover:text-black text-xl'
                >
                  ✕
                </button>

                {/* Title */}
                <h2 className='text-2xl font-bold mb-4'>Terms of Service</h2>

                {/* Content */}
                <div className='text-sm text-gray-600 leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto'>
                  <p>
                    Welcome to NBLX. By using our platform, you agree to comply with our terms
                    and conditions.
                  </p>

                  <p>
                    You are responsible for maintaining the confidentiality of your account and
                    password.
                  </p>

                  <p>
                    We reserve the right to update or modify these terms at any time without
                    prior notice.
                  </p>

                  <p>Continued use of the platform means you accept any updated terms.</p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setShowTerms(false)}
                  className='mt-6 w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition'
                >
                  I Understand
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
