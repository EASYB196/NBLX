// import React, {
//   useEffect,
//   useState,
// } from 'react';

// import {
//   FaEnvelope,
//   FaLock,
//   FaUser,
//   FaEye,
//   FaEyeSlash,
// } from 'react-icons/fa';

// import {
//   useNavigate,
//   useLocation,
//   Link,
// } from 'react-router-dom';

// import toast from 'react-hot-toast';

// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   sendPasswordResetEmail,
//   updateProfile,
// } from 'firebase/auth';

// import { auth } from '../../firebase';

// import Logo from '../../assets/images/nblx_logo.png';
// import image from '../../assets/images/herobg.png';

// const AuthForm = () => {
//   const navigate =
//     useNavigate();

//   const location =
//     useLocation();

//   const [fullName, setFullName] =
//     useState('');

//   const [email, setEmail] =
//     useState('');

//   const [loading, setLoading] =
//     useState(false);

//   const [emailError, setEmailError] =
//     useState('');

//   const [loginPassword, setLoginPassword] =
//     useState('');

//   const [signupPassword, setSignupPassword] =
//     useState('');

//   const [confirmPassword, setConfirmPassword] =
//     useState('');

//   const [showSignupPassword, setShowSignupPassword] =
//     useState(false);

//   const [showConfirmPassword, setShowConfirmPassword] =
//     useState(false);

//   const [showLoginPassword, setShowLoginPassword] =
//     useState(false);

//   const [showTerms, setShowTerms] =
//     useState(false);

//   const [showPrivacyPolicy, setShowPrivacyPolicy] =
//     useState(false);

//   const getActiveTab = () => {
//     if (
//       location.pathname ===
//       '/auth/signup'
//     ) {
//       return 'signup';
//     }

//     return 'login';
//   };

//   const [activeTab, setActiveTab] =
//     useState(getActiveTab);

//   useEffect(() => {
//     if (
//       location.pathname ===
//       '/auth/signup'
//     ) {
//       setActiveTab('signup');
//     } else if (
//       location.pathname ===
//       '/auth/login'
//     ) {
//       setActiveTab('login');
//     }
//   }, [location.pathname]);

//   // ======================================================
//   // EMAIL VALIDATION
//   // ======================================================

//   const isValidEmail = (value) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
//       value
//     );
//   };

//   const validateEmail = (value) => {
//     const trimmedValue =
//       value.trim();

//     if (!trimmedValue) {
//       return 'Email is required';
//     }

//     if (!trimmedValue.includes('@')) {
//       return 'Email must contain @';
//     }

//     if (!trimmedValue.includes('.')) {
//       return 'Email looks incomplete';
//     }

//     if (!isValidEmail(trimmedValue)) {
//       return 'Enter a valid email address';
//     }

//     return '';
//   };

//   // ======================================================
//   // FIREBASE ERROR HANDLER
//   // ======================================================

//   const getFirebaseError = (
//     error
//   ) => {
//     switch (error?.code) {
//       case 'auth/email-already-in-use':
//         return 'This email is already registered';

//       case 'auth/invalid-email':
//         return 'Please enter a valid email address';

//       case 'auth/user-not-found':
//         return 'Account not found';

//       case 'auth/wrong-password':
//         return 'Incorrect password';

//       case 'auth/invalid-credential':
//         return 'Invalid email or password';

//       case 'auth/weak-password':
//         return 'Password should be at least 6 characters';

//       case 'auth/too-many-requests':
//         return 'Too many attempts. Please try again later';

//       case 'auth/user-disabled':
//         return 'This account has been disabled';

//       case 'auth/network-request-failed':
//         return 'Network error. Please check your connection';

//       case 'auth/operation-not-allowed':
//         return 'This authentication method is currently unavailable';

//       default:
//         return 'Something went wrong. Please try again';
//     }
//   };

//   // ======================================================
//   // SEND EMAIL OTP
//   // ======================================================

//  const sendEmailOtp = async (user) => {
//   const idToken = await user.getIdToken(true);

//   const response = await fetch('/api/auth/send-otp', {
//     method: 'POST',

//     headers: {
//       'Content-Type': 'application/json',
//     },

//     body: JSON.stringify({
//       idToken,
//     }),
//   });

//   // Read as text first so empty/non-JSON responses
//   // don't cause "Unexpected end of JSON input"
//   const responseText = await response.text();

//   let data = {};

//   try {
//     data = responseText
//       ? JSON.parse(responseText)
//       : {};
//   } catch (parseError) {
//     console.error(
//       'Send OTP returned invalid JSON:',
//       responseText
//     );

//     throw new Error(
//       `Verification server returned an invalid response (${response.status})`
//     );
//   }

//   if (!response.ok) {
//     throw new Error(
//       data?.message ||
//         `Unable to send verification code (${response.status})`
//     );
//   }

//   return data;
// };

//   // ======================================================
//   // SIGNUP
//   // ======================================================

//   const handleSignup = async (
//     e
//   ) => {
//     e.preventDefault();

//     if (
//       !fullName.trim() ||
//       !email.trim() ||
//       !signupPassword ||
//       !confirmPassword
//     ) {
//       toast.error(
//         'Please fill all fields',
//         {
//           id:
//             'signup-fill-fields',
//         }
//       );

//       return;
//     }

//     if (
//       fullName.trim().length <
//       2
//     ) {
//       toast.error(
//         'Please enter your full name',
//         {
//           id:
//             'signup-name-error',
//         }
//       );

//       return;
//     }

//     const emailValidationError =
//       validateEmail(email);

//     if (emailValidationError) {
//       toast.error(
//         emailValidationError,
//         {
//           id:
//             'signup-email-error',
//         }
//       );

//       return;
//     }

//     if (
//       signupPassword.length <
//       6
//     ) {
//       toast.error(
//         'Password must be at least 6 characters',
//         {
//           id:
//             'signup-short-password',
//         }
//       );

//       return;
//     }

//     if (
//       signupPassword !==
//       confirmPassword
//     ) {
//       toast.error(
//         'Passwords do not match',
//         {
//           id:
//             'signup-password-mismatch',
//         }
//       );

//       return;
//     }

//     try {
//       setLoading(true);

//       const cleanEmail =
//         email.trim().toLowerCase();

//       const cleanName =
//         fullName.trim();

//       // ==================================================
//       // CREATE FIREBASE ACCOUNT
//       // ==================================================

//       const userCredential =
//         await createUserWithEmailAndPassword(
//           auth,
//           cleanEmail,
//           signupPassword
//         );

//       const user =
//         userCredential.user;

//       // ==================================================
//       // SAVE DISPLAY NAME
//       // ==================================================

//       await updateProfile(
//         user,
//         {
//           displayName:
//             cleanName,
//         }
//       );

//       // ==================================================
//       // SEND EMAIL OTP
//       // ==================================================

//       await sendEmailOtp(
//         user
//       );

//       // ==================================================
//       // SAVE PENDING SIGNUP
//       // ==================================================

//       sessionStorage.setItem(
//         'pendingSignup',
//         JSON.stringify({
//           uid:
//             user.uid,

//           fullName:
//             cleanName,

//           email:
//             cleanEmail,
//         })
//       );

//       toast.success(
//         'Verification code sent to your email',
//         {
//           id:
//             'email-otp-sent',
//         }
//       );

//       navigate(
//         '/auth/sms'
//       );

//     } catch (error) {
//       console.error(
//         'Signup error:',
//         error
//       );

//       toast.error(
//         error?.message?.startsWith(
//           'Unable to send'
//         )
//           ? error.message
//           : getFirebaseError(error),
//         {
//           id:
//             'signup-error',
//         }
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   // ======================================================
//   // LOGIN
//   // ======================================================

//  const handleLogin = async (e) => {
//   e.preventDefault();

//   const emailValidationError =
//     validateEmail(email);

//   if (emailValidationError) {
//     setEmailError(
//       emailValidationError
//     );

//     toast.error(
//       emailValidationError,
//       {
//         id: 'login-email-error',
//       }
//     );

//     return;
//   }

//   if (!loginPassword) {
//     toast.error(
//       'Please enter your password',
//       {
//         id: 'login-password-error',
//       }
//     );

//     return;
//   }

//   try {
//     setLoading(true);

//     const cleanEmail =
//       email.trim().toLowerCase();

//     const userCredential =
//       await signInWithEmailAndPassword(
//         auth,
//         cleanEmail,
//         loginPassword
//       );

//     const user =
//       userCredential.user;

//     await user.reload();

//     // ==========================================
//     // EMAIL NOT VERIFIED
//     // ==========================================

//     if (!user.emailVerified) {
//       try {
//         await sendEmailOtp(user);

//         sessionStorage.setItem(
//           'pendingSignup',
//           JSON.stringify({
//             uid: user.uid,
//             fullName:
//               user.displayName || '',
//             email: user.email,
//           })
//         );

//         toast.error(
//           'Your email is not verified. A new verification code has been sent.',
//           {
//             id:
//               'email-not-verified',
//           }
//         );

//         navigate(
//           '/auth/sms'
//         );

//         return;

//       } catch (otpError) {
//         console.error(
//           'Login OTP error:',
//           otpError
//         );

//         toast.error(
//           otpError?.message ||
//             'Unable to send verification code',
//           {
//             id:
//               'login-otp-error',
//           }
//         );

//         return;
//       }
//     }

//     // ==========================================
//     // SUCCESSFUL LOGIN
//     // ==========================================

//     toast.success(
//       'Login successful!',
//       {
//         id: 'login-success',
//       }
//     );

//     navigate('/');

//   } catch (error) {
//     console.error(
//       'Login error:',
//       error
//     );

//     toast.error(
//       getFirebaseError(error),
//       {
//         id:
//           'login-firebase-error',
//       }
//     );

//   } finally {
//     setLoading(false);
//   }
// };

//   // ======================================================
//   // RESET PASSWORD
//   // ======================================================

//   const handleResetPassword =
//     async (e) => {
//       e.preventDefault();

//       const emailValidationError =
//         validateEmail(email);

//       if (
//         emailValidationError
//       ) {
//         toast.error(
//           emailValidationError,
//           {
//             id:
//               'reset-email-error',
//           }
//         );

//         return;
//       }

//       try {
//         setLoading(true);

//         await sendPasswordResetEmail(
//           auth,
//           email
//             .trim()
//             .toLowerCase()
//         );

//         toast.success(
//           'Password reset email sent!',
//           {
//             id:
//               'reset-success',
//           }
//         );

//         setEmail('');

//         setActiveTab(
//           'login'
//         );

//         navigate(
//           '/auth/login'
//         );

//       } catch (error) {
//         console.error(
//           'Password reset error:',
//           error
//         );

//         toast.error(
//           getFirebaseError(
//             error
//           ),
//           {
//             id:
//               'reset-error',
//           }
//         );

//       } finally {
//         setLoading(false);
//       }
//     };

//   // ======================================================
//   // EMAIL CHANGE
//   // ======================================================

//   const handleLoginEmailChange =
//     (e) => {
//       const value =
//         e.target.value.trim();

//       setEmail(value);

//       if (!value) {
//         setEmailError('');
//         return;
//       }

//       setEmailError(
//         validateEmail(value)
//       );
//     };

//   return (
//     <div className='min-h-[80vh] md:fixed md:w-full bg-[#f5f5f5] flex items-center justify-center px-3 sm:px-5 lg:px-10 py-6 md:pt-16'>

//       {/* MAIN CONTAINER */}
//       <div className='w-full max-w-4xl bg-white rounded-[30px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]'>

//         {/* LEFT IMAGE SECTION */}
//         <div className='hidden lg:flex relative items-center justify-center bg-black'>

//           <img
//             src={image}
//             alt='NBLX fashion'
//             className='w-full h-full object-cover opacity-80'
//           />

//           <div className='absolute inset-0 bg-black/45'></div>

//           <div className='absolute bottom-18 left-10 z-10 text-white max-w-md'>

//             <Link to='/'>
//               <h1 className='text-5xl font-bold tracking-[4px]'>
//                 NBLX
//               </h1>
//             </Link>

//             <p className='mt-5 text-lg text-gray-200 leading-relaxed'>
//               Premium fashion experience crafted for modern style,
//               luxury, elegance, and timeless streetwear culture.
//             </p>

//           </div>

//         </div>

//         {/* RIGHT FORM SECTION */}
//         <div className='flex items-center justify-center px-5 sm:px-8 md:px-14 py-0 md:py-14'>

//           <div className='w-full max-w-md'>

//             {/* MOBILE LOGO */}
//             <div className='flex md:hidden justify-center pb-5'>

//               <Link to='/'>
//                 <img
//                   src={Logo}
//                   alt='NBLX'
//                   className='w-32 h-16 object-cover opacity-80'
//                 />
//               </Link>

//             </div>

//             {/* HEADER */}
//             <div className='mb-8'>

//               <h2 className='text-3xl sm:text-4xl font-bold text-black leading-tight'>

//                 {activeTab === 'login'
//                   ? 'Welcome Back'
//                   : activeTab === 'signup'
//                     ? 'Create Account'
//                     : 'Forgot Password'}

//               </h2>

//               <p className='text-gray-500 mt-3 leading-relaxed text-sm sm:text-base'>

//                 {activeTab === 'login' &&
//                   'Login to continue your premium shopping experience.'}

//                 {activeTab === 'signup' &&
//                   'Create your account and discover exclusive collections.'}

//                 {activeTab === 'forgot' &&
//                   'Enter your email and we’ll send you a reset link.'}

//               </p>

//             </div>

//             {/* TABS */}
//             {activeTab !== 'forgot' && (

//               <div className='flex bg-[#f2f2f2] rounded-full p-1 mb-8'>

//                 <button
//                   type='button'
//                   onClick={() => {
//                     setActiveTab(
//                       'login'
//                     );

//                     navigate(
//                       '/auth/login'
//                     );
//                   }}
//                   className={`flex-1 py-2 rounded-full text-[16px] sm:text-base transition-all duration-300 font-medium ${
//                     activeTab ===
//                     'login'
//                       ? 'bg-black text-white shadow-lg'
//                       : 'text-gray-600'
//                   }`}
//                 >
//                   Login
//                 </button>

//                 <button
//                   type='button'
//                   onClick={() => {
//                     setActiveTab(
//                       'signup'
//                     );

//                     navigate(
//                       '/auth/signup'
//                     );
//                   }}
//                   className={`flex-1 py-2 rounded-full text-[16px] sm:text-base transition-all duration-300 font-medium ${
//                     activeTab ===
//                     'signup'
//                       ? 'bg-black text-white shadow-lg'
//                       : 'text-gray-600'
//                   }`}
//                 >
//                   Sign Up
//                 </button>

//               </div>
//             )}

//             {/* LOGIN */}
//             {activeTab === 'login' && (

//               <form
//                 className='space-y-3'
//                 onSubmit={
//                   handleLogin
//                 }
//               >

//                 <div className='relative'>

//                   <FaEnvelope className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

//                   <input
//                     type='email'
//                     placeholder='Email Address'
//                     value={email}
//                     onChange={
//                       handleLoginEmailChange
//                     }
//                     className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
//                   />

//                   {emailError && (
//                     <p className='text-red-500 text-xs mt-1 ml-1'>
//                       {emailError}
//                     </p>
//                   )}

//                 </div>

//                 <div className='relative'>

//                   <FaLock className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

//                   <input
//                     type={
//                       showLoginPassword
//                         ? 'text'
//                         : 'password'
//                     }
//                     value={
//                       loginPassword
//                     }
//                     onChange={(e) =>
//                       setLoginPassword(
//                         e.target.value
//                       )
//                     }
//                     placeholder='Password'
//                     className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-black transition-all text-sm sm:text-base'
//                   />

//                   <button
//                     type='button'
//                     onClick={() =>
//                       setShowLoginPassword(
//                         !showLoginPassword
//                       )
//                     }
//                     className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500'
//                     aria-label='Toggle password visibility'
//                   >
//                     {showLoginPassword ? (
//                       <FaEyeSlash />
//                     ) : (
//                       <FaEye />
//                     )}
//                   </button>

//                 </div>

//                 <div className='flex items-center justify-between text-xs sm:text-sm'>

//                   <label className='flex items-center gap-2 text-gray-600'>

//                     <input
//                       type='checkbox'
//                       className='accent-black'
//                     />

//                     Remember me

//                   </label>

//                   <button
//                     type='button'
//                     onClick={() => {
//                       setEmailError(
//                         ''
//                       );

//                       setActiveTab(
//                         'forgot'
//                       );
//                     }}
//                     className='text-black hover:underline'
//                   >
//                     Forgot Password?
//                   </button>

//                 </div>

//                 <button
//                   type='submit'
//                   disabled={
//                     loading
//                   }
//                   className='w-full bg-black text-white text-sm py-3 rounded-2xl hover:opacity-90 transition-all duration-300 font-semibold tracking-wide disabled:opacity-60'
//                 >
//                   {loading
//                     ? 'Logging in...'
//                     : 'LOGIN'}
//                 </button>

//               </form>
//             )}

//             {/* SIGNUP */}
//             {activeTab === 'signup' && (

//               <form
//                 className='space-y-3'
//                 onSubmit={
//                   handleSignup
//                 }
//               >

//                 {/* FULL NAME */}
//                 <div className='relative'>

//                   <FaUser className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

//                   <input
//                     type='text'
//                     placeholder='Full Name'
//                     value={
//                       fullName
//                     }
//                     onChange={(e) =>
//                       setFullName(
//                         e.target.value
//                       )
//                     }
//                     className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
//                   />

//                 </div>

//                 {/* EMAIL */}
//                 <div className='relative'>

//                   <FaEnvelope className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

//                   <input
//                     type='email'
//                     placeholder='Email Address'
//                     value={email}
//                     onChange={(e) =>
//                       setEmail(
//                         e.target.value
//                       )
//                     }
//                     className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
//                   />

//                 </div>

//                 {/* PASSWORD */}
//                 <div className='relative'>

//                   <FaLock className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

//                   <input
//                     type={
//                       showSignupPassword
//                         ? 'text'
//                         : 'password'
//                     }
//                     value={
//                       signupPassword
//                     }
//                     onChange={(e) =>
//                       setSignupPassword(
//                         e.target.value
//                       )
//                     }
//                     placeholder='Password'
//                     className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-black transition-all text-sm sm:text-base'
//                   />

//                   <button
//                     type='button'
//                     onClick={() =>
//                       setShowSignupPassword(
//                         !showSignupPassword
//                       )
//                     }
//                     className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500'
//                     aria-label='Toggle password visibility'
//                   >
//                     {showSignupPassword ? (
//                       <FaEyeSlash />
//                     ) : (
//                       <FaEye />
//                     )}
//                   </button>

//                 </div>

//                 {/* CONFIRM PASSWORD */}
//                 <div className='relative'>

//                   <FaLock className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

//                   <input
//                     type={
//                       showConfirmPassword
//                         ? 'text'
//                         : 'password'
//                     }
//                     value={
//                       confirmPassword
//                     }
//                     onChange={(e) =>
//                       setConfirmPassword(
//                         e.target.value
//                       )
//                     }
//                     placeholder='Repeat Password'
//                     className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-black transition-all text-sm sm:text-base'
//                   />

//                   <button
//                     type='button'
//                     onClick={() =>
//                       setShowConfirmPassword(
//                         !showConfirmPassword
//                       )
//                     }
//                     className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500'
//                     aria-label='Toggle password visibility'
//                   >
//                     {showConfirmPassword ? (
//                       <FaEyeSlash />
//                     ) : (
//                       <FaEye />
//                     )}
//                   </button>

//                 </div>

//                 <button
//                   type='submit'
//                   disabled={
//                     loading
//                   }
//                   className='w-full bg-black text-white py-3 text-sm rounded-2xl hover:opacity-90 transition-all duration-300 font-semibold tracking-wide disabled:opacity-60'
//                 >
//                   {loading
//                     ? 'Sending Verification...'
//                     : 'CREATE ACCOUNT'}
//                 </button>

//                 <h5 className='text-center text-xs leading-tight text-gray-600'>

//                   By continuing, you agree to our{' '}

//                   <button
//                     type='button'
//                     onClick={() =>
//                       setShowTerms(
//                         true
//                       )
//                     }
//                     className='underline hover:text-blue-700 cursor-pointer'
//                   >
//                     Terms of Service
//                   </button>

//                   <span>
//                     {' '}
//                     and{' '}
//                   </span>

//                   <button
//                     type='button'
//                     onClick={() =>
//                       setShowPrivacyPolicy(
//                         true
//                       )
//                     }
//                     className='underline hover:text-blue-700 cursor-pointer'
//                   >
//                     Privacy Policy
//                   </button>

//                 </h5>

//               </form>
//             )}

//             {/* FORGOT PASSWORD */}
//             {activeTab === 'forgot' && (

//               <form
//                 className='space-y-5'
//                 onSubmit={
//                   handleResetPassword
//                 }
//               >

//                 <div className='relative'>

//                   <FaEnvelope className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

//                   <input
//                     type='email'
//                     placeholder='Enter your email'
//                     value={
//                       email
//                     }
//                     onChange={(e) =>
//                       setEmail(
//                         e.target.value
//                       )
//                     }
//                     className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
//                   />

//                 </div>

//                 <button
//                   type='submit'
//                   disabled={
//                     loading
//                   }
//                   className='w-full bg-black text-white py-4 rounded-2xl hover:opacity-90 transition-all duration-300 font-semibold tracking-wide disabled:opacity-60'
//                 >
//                   {loading
//                     ? 'Sending...'
//                     : 'SEND RESET LINK'}
//                 </button>

//                 <button
//                   type='button'
//                   onClick={() => {
//                     setActiveTab(
//                       'login'
//                     );

//                     navigate(
//                       '/auth/login'
//                     );
//                   }}
//                   className='w-full text-black hover:underline mt-2'
//                 >
//                   Back to Login
//                 </button>

//               </form>
//             )}

//           </div>

//           {/* PRIVACY POLICY */}
//           {showPrivacyPolicy && (

//             <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>

//               <div
//                 onClick={() =>
//                   setShowPrivacyPolicy(
//                     false
//                   )
//                 }
//                 className='absolute inset-0 bg-black/50 backdrop-blur-sm'
//               />

//               <div className='relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 md:p-8 z-10'>

//                 <button
//                   type='button'
//                   onClick={() =>
//                     setShowPrivacyPolicy(
//                       false
//                     )
//                   }
//                   className='absolute top-3 right-4 text-gray-500 hover:text-black text-xl'
//                 >
//                   ✕
//                 </button>

//                 <h2 className='text-2xl font-bold mb-4'>
//                   Privacy Policy
//                 </h2>

//                 <div className='text-sm text-gray-600 leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto'>

//                   <p>
//                     At NBLX, we respect your privacy and are committed
//                     to protecting your personal information.
//                   </p>

//                   <p>
//                     We collect basic information such as name, email,
//                     phone number, and order details to improve your
//                     shopping experience.
//                   </p>

//                   <p>
//                     Your information is used to provide account,
//                     shopping, order, and support services.
//                   </p>

//                   <p>
//                     We may use cookies and similar technologies to
//                     improve site performance and functionality.
//                   </p>

//                   <p>
//                     You may request information about or deletion of
//                     your account data by contacting NBLX support.
//                   </p>

//                 </div>

//                 <button
//                   type='button'
//                   onClick={() =>
//                     setShowPrivacyPolicy(
//                       false
//                     )
//                   }
//                   className='mt-6 w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition'
//                 >
//                   I Understand
//                 </button>

//               </div>

//             </div>
//           )}

//           {/* TERMS */}
//           {showTerms && (

//             <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>

//               <div
//                 onClick={() =>
//                   setShowTerms(
//                     false
//                   )
//                 }
//                 className='absolute inset-0 bg-black/50 backdrop-blur-sm'
//               />

//               <div className='relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 md:p-8 z-10'>

//                 <button
//                   type='button'
//                   onClick={() =>
//                     setShowTerms(
//                       false
//                     )
//                   }
//                   className='absolute top-3 right-4 text-gray-500 hover:text-black text-xl'
//                 >
//                   ✕
//                 </button>

//                 <h2 className='text-2xl font-bold mb-4'>
//                   Terms of Service
//                 </h2>

//                 <div className='text-sm text-gray-600 leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto'>

//                   <p>
//                     Welcome to NBLX. By creating an account or using
//                     our platform, you agree to these terms.
//                   </p>

//                   <p>
//                     You are responsible for keeping your account
//                     credentials secure.
//                   </p>

//                   <p>
//                     Account information should be accurate and kept
//                     up to date.
//                   </p>

//                   <p>
//                     NBLX may update these terms when necessary.
//                   </p>

//                   <p>
//                     Continued use of the platform after changes means
//                     you accept the updated terms.
//                   </p>

//                 </div>

//                 <button
//                   type='button'
//                   onClick={() =>
//                     setShowTerms(
//                       false
//                     )
//                   }
//                   className='mt-6 w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition'
//                 >
//                   I Understand
//                 </button>

//               </div>

//             </div>
//           )}

//         </div>

//       </div>

//     </div>
//   );
// };

// export default AuthForm;


import React, {
  useEffect,
  useState,
} from 'react';

import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';

import {
  useNavigate,
  useLocation,
  Link,
} from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showSignupPassword, setShowSignupPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [showLoginPassword, setShowLoginPassword] =
    useState(false);

  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] =
    useState(false);

  const getActiveTab = () => {
    if (location.pathname === '/auth/signup') {
      return 'signup';
    }

    return 'login';
  };

  const [activeTab, setActiveTab] =
    useState(getActiveTab);

  useEffect(() => {
    if (location.pathname === '/auth/signup') {
      setActiveTab('signup');
    } else if (location.pathname === '/auth/login') {
      setActiveTab('login');
    }
  }, [location.pathname]);

  // ======================================================
  // EMAIL VALIDATION
  // ======================================================

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  };

  const validateEmail = (value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return 'Email is required';
    }

    if (!trimmedValue.includes('@')) {
      return 'Email must contain @';
    }

    if (!trimmedValue.includes('.')) {
      return 'Email looks incomplete';
    }

    if (!isValidEmail(trimmedValue)) {
      return 'Enter a valid email address';
    }

    return '';
  };

  // ======================================================
  // FIREBASE ERROR HANDLER
  // ======================================================

  const getFirebaseError = (error) => {
    switch (error?.code) {
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

      case 'auth/user-disabled':
        return 'This account has been disabled';

      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';

      case 'auth/operation-not-allowed':
        return 'This authentication method is currently unavailable';

      default:
        return 'Something went wrong. Please try again';
    }
  };

  // ======================================================
  // SEND EMAIL OTP
  // ======================================================

  const sendEmailOtp = async (user) => {
    const idToken = await user.getIdToken(true);

    const response = await fetch('/api/send-otp', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        idToken,
      }),
    });

    const responseText = await response.text();

    let data = {};

    try {
      data = responseText
        ? JSON.parse(responseText)
        : {};
    } catch (parseError) {
      console.error(
        'Send OTP returned invalid JSON:',
        responseText
      );

      throw new Error(
        `Verification server returned an invalid response (${response.status})`
      );
    }

    if (!response.ok) {
      throw new Error(
        data?.message ||
          `Unable to send verification code (${response.status})`
      );
    }

    return data;
  };

  // ======================================================
  // SIGNUP
  // ======================================================

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !fullName.trim() ||
      !email.trim() ||
      !signupPassword ||
      !confirmPassword
    ) {
      toast.error('Please fill all fields', {
        id: 'signup-fill-fields',
      });

      return;
    }

    if (fullName.trim().length < 2) {
      toast.error('Please enter your full name', {
        id: 'signup-name-error',
      });

      return;
    }

    const emailValidationError =
      validateEmail(email);

    if (emailValidationError) {
      toast.error(emailValidationError, {
        id: 'signup-email-error',
      });

      return;
    }

    if (signupPassword.length < 6) {
      toast.error(
        'Password must be at least 6 characters',
        {
          id: 'signup-short-password',
        }
      );

      return;
    }

    if (signupPassword !== confirmPassword) {
      toast.error('Passwords do not match', {
        id: 'signup-password-mismatch',
      });

      return;
    }

    try {
      setLoading(true);

      const cleanEmail =
        email.trim().toLowerCase();

      const cleanName =
        fullName.trim();

      // ==================================================
      // CREATE FIREBASE ACCOUNT
      // ==================================================

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          cleanEmail,
          signupPassword
        );

      const user = userCredential.user;

      // ==================================================
      // SAVE DISPLAY NAME
      // ==================================================

      await updateProfile(user, {
        displayName: cleanName,
      });

      // ==================================================
      // SEND EMAIL OTP
      // ==================================================

      await sendEmailOtp(user);

      // ==================================================
      // SAVE PENDING SIGNUP
      // ==================================================

      sessionStorage.setItem(
        'pendingSignup',
        JSON.stringify({
          uid: user.uid,
          fullName: cleanName,
          email: cleanEmail,
        })
      );

      toast.success(
        'Verification code sent to your email',
        {
          id: 'email-otp-sent',
        }
      );

      navigate('/auth/sms');
    } catch (error) {
      console.error('Signup error:', error);

      toast.error(
        error?.message?.startsWith('Unable to send')
          ? error.message
          : getFirebaseError(error),
        {
          id: 'signup-error',
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // LOGIN
  // ======================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailValidationError =
      validateEmail(email);

    if (emailValidationError) {
      setEmailError(emailValidationError);

      toast.error(emailValidationError, {
        id: 'login-email-error',
      });

      return;
    }

    if (!loginPassword) {
      toast.error('Please enter your password', {
        id: 'login-password-error',
      });

      return;
    }

    try {
      setLoading(true);

      const cleanEmail =
        email.trim().toLowerCase();

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          cleanEmail,
          loginPassword
        );

      const user = userCredential.user;

      await user.reload();

      // ==========================================
      // EMAIL NOT VERIFIED
      // ==========================================

      if (!user.emailVerified) {
        try {
          await sendEmailOtp(user);

          sessionStorage.setItem(
            'pendingSignup',
            JSON.stringify({
              uid: user.uid,
              fullName:
                user.displayName || '',
              email: user.email,
            })
          );

          toast.error(
            'Your email is not verified. A new verification code has been sent.',
            {
              id: 'email-not-verified',
            }
          );

          navigate('/auth/sms');

          return;
        } catch (otpError) {
          console.error(
            'Login OTP error:',
            otpError
          );

          toast.error(
            otpError?.message ||
              'Unable to send verification code',
            {
              id: 'login-otp-error',
            }
          );

          return;
        }
      }

      // ==========================================
      // SUCCESSFUL LOGIN
      // ==========================================

      toast.success('Login successful!', {
        id: 'login-success',
      });

      navigate('/');
    } catch (error) {
      console.error('Login error:', error);

      toast.error(
        getFirebaseError(error),
        {
          id: 'login-firebase-error',
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // RESET PASSWORD
  // ======================================================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const emailValidationError =
      validateEmail(email);

    if (emailValidationError) {
      toast.error(emailValidationError, {
        id: 'reset-email-error',
      });

      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(
        auth,
        email.trim().toLowerCase()
      );

      toast.success(
        'Password reset email sent!',
        {
          id: 'reset-success',
        }
      );

      setEmail('');

      setActiveTab('login');

      navigate('/auth/login');
    } catch (error) {
      console.error(
        'Password reset error:',
        error
      );

      toast.error(
        getFirebaseError(error),
        {
          id: 'reset-error',
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // EMAIL CHANGE
  // ======================================================

  const handleLoginEmailChange = (e) => {
    const value = e.target.value.trim();

    setEmail(value);

    if (!value) {
      setEmailError('');
      return;
    }

    setEmailError(validateEmail(value));
  };

  return (
    <div className='min-h-[80vh] md:fixed md:w-full bg-[#f5f5f5] flex items-center justify-center px-3 sm:px-5 lg:px-10 py-6 md:pt-16'>

      {/* MAIN CONTAINER */}
      <div className='w-full max-w-4xl bg-white rounded-[30px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]'>

        {/* LEFT IMAGE SECTION */}
        <div className='hidden lg:flex relative items-center justify-center bg-black'>

          <img
            src={image}
            alt='NBLX fashion'
            className='w-full h-full object-cover opacity-80'
          />

          <div className='absolute inset-0 bg-black/45'></div>

          <div className='absolute bottom-18 left-10 z-10 text-white max-w-md'>

            <Link to='/'>
              <h1 className='text-5xl font-bold tracking-[4px]'>
                NBLX
              </h1>
            </Link>

            <p className='mt-5 text-lg text-gray-200 leading-relaxed'>
              Premium fashion experience crafted for modern style,
              luxury, elegance, and timeless streetwear culture.
            </p>

          </div>

        </div>

        {/* RIGHT FORM SECTION */}
        <div className='flex items-center justify-center px-5 sm:px-8 md:px-14 py-0 md:py-14'>

          <div className='w-full max-w-md'>

            {/* MOBILE LOGO */}
            <div className='flex md:hidden justify-center pb-5'>

              <Link to='/'>
                <img
                  src={Logo}
                  alt='NBLX'
                  className='w-32 h-16 object-cover opacity-80'
                />
              </Link>

            </div>

            {/* HEADER */}
            <div className='mb-8'>

              <h2 className='text-3xl sm:text-4xl font-bold text-black leading-tight'>

                {activeTab === 'login'
                  ? 'Welcome Back'
                  : activeTab === 'signup'
                    ? 'Create Account'
                    : 'Forgot Password'}

              </h2>

              <p className='text-gray-500 mt-3 leading-relaxed text-sm sm:text-base'>

                {activeTab === 'login' &&
                  'Login to continue your premium shopping experience.'}

                {activeTab === 'signup' &&
                  'Create your account and discover exclusive collections.'}

                {activeTab === 'forgot' &&
                  'Enter your email and we’ll send you a reset link.'}

              </p>

            </div>

            {/* TABS */}
            {activeTab !== 'forgot' && (

              <div className='flex bg-[#f2f2f2] rounded-full p-1 mb-8'>

                <button
                  type='button'
                  onClick={() => {
                    setActiveTab('login');
                    navigate('/auth/login');
                  }}
                  className={`flex-1 py-2 rounded-full text-[16px] sm:text-base transition-all duration-300 font-medium ${
                    activeTab === 'login'
                      ? 'bg-black text-white shadow-lg'
                      : 'text-gray-600'
                  }`}
                >
                  Login
                </button>

                <button
                  type='button'
                  onClick={() => {
                    setActiveTab('signup');
                    navigate('/auth/signup');
                  }}
                  className={`flex-1 py-2 rounded-full text-[16px] sm:text-base transition-all duration-300 font-medium ${
                    activeTab === 'signup'
                      ? 'bg-black text-white shadow-lg'
                      : 'text-gray-600'
                  }`}
                >
                  Sign Up
                </button>

              </div>
            )}

            {/* LOGIN */}
            {activeTab === 'login' && (

              <form
                className='space-y-3'
                onSubmit={handleLogin}
              >

                <div className='relative'>

                  <FaEnvelope className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

                  <input
                    type='email'
                    placeholder='Email Address'
                    value={email}
                    onChange={handleLoginEmailChange}
                    className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
                  />

                  {emailError && (
                    <p className='text-red-500 text-xs mt-1 ml-1'>
                      {emailError}
                    </p>
                  )}

                </div>

                <div className='relative'>

                  <FaLock className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

                  <input
                    type={
                      showLoginPassword
                        ? 'text'
                        : 'password'
                    }
                    value={loginPassword}
                    onChange={(e) =>
                      setLoginPassword(
                        e.target.value
                      )
                    }
                    placeholder='Password'
                    className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-black transition-all text-sm sm:text-base'
                  />

                  <button
                    type='button'
                    onClick={() =>
                      setShowLoginPassword(
                        !showLoginPassword
                      )
                    }
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500'
                    aria-label='Toggle password visibility'
                  >
                    {showLoginPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

                <div className='flex items-center justify-between text-xs sm:text-sm'>

                  <label className='flex items-center gap-2 text-gray-600'>

                    <input
                      type='checkbox'
                      className='accent-black'
                    />

                    Remember me

                  </label>

                  <button
                    type='button'
                    onClick={() => {
                      setEmailError('');
                      setActiveTab('forgot');
                    }}
                    className='text-black hover:underline'
                  >
                    Forgot Password?
                  </button>

                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-black text-white text-sm py-3 rounded-2xl hover:opacity-90 transition-all duration-300 font-semibold tracking-wide disabled:opacity-60'
                >
                  {loading
                    ? 'Logging in...'
                    : 'LOGIN'}
                </button>

              </form>
            )}

            {/* SIGNUP */}
            {activeTab === 'signup' && (

              <form
                className='space-y-3'
                onSubmit={handleSignup}
              >

                {/* FULL NAME */}
                <div className='relative'>

                  <FaUser className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

                  <input
                    type='text'
                    placeholder='Full Name'
                    value={fullName}
                    onChange={(e) =>
                      setFullName(
                        e.target.value
                      )
                    }
                    className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
                  />

                </div>

                {/* EMAIL */}
                <div className='relative'>

                  <FaEnvelope className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

                  <input
                    type='email'
                    placeholder='Email Address'
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
                  />

                </div>

                {/* PASSWORD */}
                <div className='relative'>

                  <FaLock className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

                  <input
                    type={
                      showSignupPassword
                        ? 'text'
                        : 'password'
                    }
                    value={signupPassword}
                    onChange={(e) =>
                      setSignupPassword(
                        e.target.value
                      )
                    }
                    placeholder='Password'
                    className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-black transition-all text-sm sm:text-base'
                  />

                  <button
                    type='button'
                    onClick={() =>
                      setShowSignupPassword(
                        !showSignupPassword
                      )
                    }
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500'
                    aria-label='Toggle password visibility'
                  >
                    {showSignupPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

                {/* CONFIRM PASSWORD */}
                <div className='relative'>

                  <FaLock className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

                  <input
                    type={
                      showConfirmPassword
                        ? 'text'
                        : 'password'
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder='Repeat Password'
                    className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-black transition-all text-sm sm:text-base'
                  />

                  <button
                    type='button'
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500'
                    aria-label='Toggle password visibility'
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-black text-white py-3 text-sm rounded-2xl hover:opacity-90 transition-all duration-300 font-semibold tracking-wide disabled:opacity-60'
                >
                  {loading
                    ? 'Sending Verification...'
                    : 'CREATE ACCOUNT'}
                </button>

                <h5 className='text-center text-xs leading-tight text-gray-600'>

                  By continuing, you agree to our{' '}

                  <button
                    type='button'
                    onClick={() =>
                      setShowTerms(true)
                    }
                    className='underline hover:text-blue-700 cursor-pointer'
                  >
                    Terms of Service
                  </button>

                  <span>
                    {' '}
                    and{' '}
                  </span>

                  <button
                    type='button'
                    onClick={() =>
                      setShowPrivacyPolicy(true)
                    }
                    className='underline hover:text-blue-700 cursor-pointer'
                  >
                    Privacy Policy
                  </button>

                </h5>

              </form>
            )}

            {/* FORGOT PASSWORD */}
            {activeTab === 'forgot' && (

              <form
                className='space-y-5'
                onSubmit={handleResetPassword}
              >

                <div className='relative'>

                  <FaEnvelope className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm' />

                  <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    className='w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-sm sm:text-base'
                  />

                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-black text-white py-4 rounded-2xl hover:opacity-90 transition-all duration-300 font-semibold tracking-wide disabled:opacity-60'
                >
                  {loading
                    ? 'Sending...'
                    : 'SEND RESET LINK'}
                </button>

                <button
                  type='button'
                  onClick={() => {
                    setActiveTab('login');
                    navigate('/auth/login');
                  }}
                  className='w-full text-black hover:underline mt-2'
                >
                  Back to Login
                </button>

              </form>
            )}

          </div>

          {/* PRIVACY POLICY */}
          {showPrivacyPolicy && (

            <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>

              <div
                onClick={() =>
                  setShowPrivacyPolicy(false)
                }
                className='absolute inset-0 bg-black/50 backdrop-blur-sm'
              />

              <div className='relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 md:p-8 z-10'>

                <button
                  type='button'
                  onClick={() =>
                    setShowPrivacyPolicy(false)
                  }
                  className='absolute top-3 right-4 text-gray-500 hover:text-black text-xl'
                >
                  ✕
                </button>

                <h2 className='text-2xl font-bold mb-4'>
                  Privacy Policy
                </h2>

                <div className='text-sm text-gray-600 leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto'>

                  <p>
                    At NBLX, we respect your privacy and are committed
                    to protecting your personal information.
                  </p>

                  <p>
                    We collect basic information such as name, email,
                    phone number, and order details to improve your
                    shopping experience.
                  </p>

                  <p>
                    Your information is used to provide account,
                    shopping, order, and support services.
                  </p>

                  <p>
                    We may use cookies and similar technologies to
                    improve site performance and functionality.
                  </p>

                  <p>
                    You may request information about or deletion of
                    your account data by contacting NBLX support.
                  </p>

                </div>

                <button
                  type='button'
                  onClick={() =>
                    setShowPrivacyPolicy(false)
                  }
                  className='mt-6 w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition'
                >
                  I Understand
                </button>

              </div>

            </div>
          )}

          {/* TERMS */}
          {showTerms && (

            <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>

              <div
                onClick={() =>
                  setShowTerms(false)
                }
                className='absolute inset-0 bg-black/50 backdrop-blur-sm'
              />

              <div className='relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 md:p-8 z-10'>

                <button
                  type='button'
                  onClick={() =>
                    setShowTerms(false)
                  }
                  className='absolute top-3 right-4 text-gray-500 hover:text-black text-xl'
                >
                  ✕
                </button>

                <h2 className='text-2xl font-bold mb-4'>
                  Terms of Service
                </h2>

                <div className='text-sm text-gray-600 leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto'>

                  <p>
                    Welcome to NBLX. By creating an account or using
                    our platform, you agree to these terms.
                  </p>

                  <p>
                    You are responsible for keeping your account
                    credentials secure.
                  </p>

                  <p>
                    Account information should be accurate and kept
                    up to date.
                  </p>

                  <p>
                    NBLX may update these terms when necessary.
                  </p>

                  <p>
                    Continued use of the platform after changes means
                    you accept the updated terms.
                  </p>

                </div>

                <button
                  type='button'
                  onClick={() =>
                    setShowTerms(false)
                  }
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
