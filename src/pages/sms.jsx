// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Sms = () => {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const inputsRef = useRef([]);
//   const navigate = useNavigate();

//   const storedOtp = sessionStorage.getItem("otp");

//   useEffect(() => {
//     inputsRef.current[0]?.focus();
//   }, []);

//   const handleChange = (value, index) => {
//     if (!/^\d*$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value.slice(-1);
//     setOtp(newOtp);

//     // move next
//     if (value && index < 3) {
//       inputsRef.current[index + 1].focus();
//     }

//     // auto verify when filled
//     if (newOtp.join("").length === 4) {
//       verifyOtp(newOtp.join(""));
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   const verifyOtp = (enteredOtp) => {
//     if (enteredOtp === storedOtp) {
//       sessionStorage.removeItem("otp");

//       setTimeout(() => {
//         alert("Successful 🎉");
//         navigate("/signup");
//       }, 500);
//     } else {
//       alert("Invalid OTP ❌");
//       setOtp(["", "", "", ""]);
//       inputsRef.current[0].focus();
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white text-black">
//       <div className="bg-white/5 p-8 rounded-xl border border-white/10 text-center">

//         <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
//         <p className="text-black mb-6">Enter the 4-digit code sent to you</p>

//         <div className="flex gap-3 justify-center">
//           {otp.map((digit, i) => (
//             <input
//               key={i}
//               ref={(el) => (inputsRef.current[i] = el)}
//               value={digit}
//               onChange={(e) => handleChange(e.target.value, i)}
//               onKeyDown={(e) => handleKeyDown(e, i)}
//               maxLength={1}
//               className="w-12 h-12 text-center text-xl bg-white border  rounded-md outline-none"
//             />
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Sms;



import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  FaArrowLeft,
  FaCheck,
  FaRotateRight,
} from 'react-icons/fa6';

import {
  useNavigate,
} from 'react-router-dom';

import toast from 'react-hot-toast';

import {
  signOut,
} from 'firebase/auth';

import { auth } from '../firebase';

import Logo from '../assets/images/nblx_logo.png';

const OTP_LENGTH = 6;

const Sms = () => {
  const [otp, setOtp] =
    useState(
      Array(OTP_LENGTH).fill('')
    );

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] =
    useState(false);

  const [countdown, setCountdown] =
    useState(30);

  const inputsRef =
    useRef([]);

  const navigate =
    useNavigate();

  // ======================================================
  // GET PENDING SIGNUP
  // ======================================================

  const getPendingSignup = () => {
    try {
      const data =
        sessionStorage.getItem(
          'pendingSignup'
        );

      return data
        ? JSON.parse(data)
        : null;

    } catch {
      return null;
    }
  };

  // ======================================================
  // INITIAL FOCUS
  // ======================================================

  useEffect(() => {
    const timer =
      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 100);

    return () =>
      clearTimeout(timer);
  }, []);

  // ======================================================
  // COUNTDOWN
  // ======================================================

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const timer =
      setInterval(() => {
        setCountdown(
          (previous) =>
            previous - 1
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [countdown]);

  // ======================================================
  // VERIFY OTP
  // ======================================================

  const verifyOtp = async (
    enteredOtp
  ) => {
    if (loading) {
      return;
    }

    const pendingSignup =
      getPendingSignup();

    if (!pendingSignup) {
      toast.error(
        'Signup session expired. Please start again.',
        {
          id:
            'signup-session-expired',
        }
      );

      navigate(
        '/auth/signup'
      );

      return;
    }

    if (!auth.currentUser) {
      toast.error(
        'Your signup session has expired. Please start again.',
        {
          id:
            'firebase-user-missing',
        }
      );

      navigate(
        '/auth/signup'
      );

      return;
    }

    try {
      setLoading(true);

      // ==================================================
      // GET CURRENT FIREBASE TOKEN
      // ==================================================

      const idToken =
        await auth.currentUser.getIdToken(
          true
        );

      // ==================================================
      // VERIFY OTP
      // ==================================================

      const response =
        await fetch(
          '/api/auth/verify-otp',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              idToken,
              otp: enteredOtp,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Invalid verification code'
        );
      }

      // ==================================================
      // CLEAN SESSION
      // ==================================================

      sessionStorage.removeItem(
        'pendingSignup'
      );

      // ==================================================
      // SIGN OUT
      // ==================================================

      await signOut(auth);

      toast.success(
        'Account verified successfully!',
        {
          id:
            'account-created',
        }
      );

      setTimeout(() => {
        navigate(
          '/auth/login'
        );
      }, 700);

    } catch (error) {
      console.error(
        'OTP verification error:',
        error
      );

      toast.error(
        error?.message ||
          'Unable to verify the code',
        {
          id:
            'otp-verification-error',
        }
      );

      setOtp(
        Array(OTP_LENGTH).fill('')
      );

      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 50);

    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // HANDLE OTP CHANGE
  // ======================================================

  const handleChange = (
    value,
    index
  ) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp =
      [...otp];

    newOtp[index] =
      value.slice(-1);

    setOtp(newOtp);

    if (
      value &&
      index <
        OTP_LENGTH - 1
    ) {
      inputsRef.current[
        index + 1
      ]?.focus();
    }

    const completeOtp =
      newOtp.join('');

    if (
      completeOtp.length ===
      OTP_LENGTH
    ) {
      verifyOtp(
        completeOtp
      );
    }
  };

  // ======================================================
  // KEYBOARD
  // ======================================================

  const handleKeyDown = (
    e,
    index
  ) => {
    if (
      e.key ===
        'Backspace' &&
      !otp[index] &&
      index > 0
    ) {
      inputsRef.current[
        index - 1
      ]?.focus();
    }

    if (
      e.key ===
        'ArrowLeft' &&
      index > 0
    ) {
      inputsRef.current[
        index - 1
      ]?.focus();
    }

    if (
      e.key ===
        'ArrowRight' &&
      index <
        OTP_LENGTH - 1
    ) {
      inputsRef.current[
        index + 1
      ]?.focus();
    }
  };

  // ======================================================
  // PASTE OTP
  // ======================================================

  const handlePaste = (
    e
  ) => {
    e.preventDefault();

    const pastedValue =
      e.clipboardData
        .getData('text')
        .replace(/\D/g, '')
        .slice(
          0,
          OTP_LENGTH
        );

    if (!pastedValue) {
      return;
    }

    const newOtp =
      Array(
        OTP_LENGTH
      ).fill('');

    pastedValue
      .split('')
      .forEach(
        (
          digit,
          index
        ) => {
          newOtp[index] =
            digit;
        }
      );

    setOtp(newOtp);

    if (
      pastedValue.length ===
      OTP_LENGTH
    ) {
      verifyOtp(
        pastedValue
      );
    } else {
      inputsRef.current[
        pastedValue.length
      ]?.focus();
    }
  };

  // ======================================================
  // RESEND OTP
  // ======================================================

  const resendOtp =
    async () => {
      if (
        countdown > 0 ||
        resending ||
        loading
      ) {
        return;
      }

      const pendingSignup =
        getPendingSignup();

      if (!pendingSignup) {
        toast.error(
          'Signup session expired. Please start again.',
          {
            id:
              'resend-session-expired',
          }
        );

        navigate(
          '/auth/signup'
        );

        return;
      }

      if (!auth.currentUser) {
        toast.error(
          'Your signup session has expired. Please start again.',
          {
            id:
              'resend-user-missing',
          }
        );

        navigate(
          '/auth/signup'
        );

        return;
      }

      try {
        setResending(
          true
        );

        // ==================================================
        // GET FIREBASE TOKEN
        // ==================================================

        const idToken =
          await auth.currentUser.getIdToken(
            true
          );

        // ==================================================
        // SEND NEW OTP
        // ==================================================

        const response =
          await fetch(
            '/api/auth/send-otp',
            {
              method:
                'POST',

              headers: {
                'Content-Type':
                  'application/json',
              },

              body:
                JSON.stringify({
                  idToken,
                }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              'Unable to resend verification code'
          );
        }

        setOtp(
          Array(
            OTP_LENGTH
          ).fill('')
        );

        setCountdown(
          30
        );

        toast.success(
          'A new verification code has been sent to your email',
          {
            id:
              'otp-resent',
          }
        );

        setTimeout(
          () => {
            inputsRef.current[
              0
            ]?.focus();
          },
          50
        );

      } catch (error) {
        console.error(
          'Resend OTP error:',
          error
        );

        toast.error(
          error?.message ||
            'Unable to resend verification code',
          {
            id:
              'otp-resend-error',
          }
        );

      } finally {
        setResending(
          false
        );
      }
    };

  // ======================================================
  // BACK
  // ======================================================

  const handleBack =
    () => {
      if (loading) {
        return;
      }

      navigate(
        '/auth/signup'
      );
    };

  return (
    <div className='min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-8'>

      <div className='w-full max-w-md bg-white rounded-[30px] shadow-2xl px-6 sm:px-10 py-10'>

        {/* LOGO */}
        <div className='flex justify-center mb-8'>

          <img
            src={Logo}
            alt='NBLX'
            className='w-32 h-16 object-cover'
          />

        </div>

        {/* HEADER */}
        <div className='text-center mb-8'>

          <div className='mx-auto w-14 h-14 rounded-full bg-black text-white flex items-center justify-center mb-5'>

            <FaCheck className='text-xl' />

          </div>

          <h2 className='text-2xl sm:text-3xl font-bold text-black'>
            Verify Your Account
          </h2>

          <p className='text-gray-500 text-sm sm:text-base mt-3 leading-relaxed'>
            Enter the 6-digit verification code sent to your email to complete your account setup.
          </p>

          {getPendingSignup()?.email && (
            <p className='text-black font-semibold text-sm mt-3 break-all'>
              {getPendingSignup().email}
            </p>
          )}

        </div>

        {/* OTP INPUTS */}
        <div
          className='flex gap-2 sm:gap-3 justify-center mb-7'
          onPaste={
            handlePaste
          }
        >

          {otp.map(
            (
              digit,
              index
            ) => (
              <input
                key={
                  index
                }
                ref={(
                  element
                ) => {
                  inputsRef.current[
                    index
                  ] =
                    element;
                }}
                type='text'
                inputMode='numeric'
                autoComplete='one-time-code'
                value={
                  digit
                }
                maxLength={1}
                disabled={
                  loading
                }
                onChange={(
                  e
                ) =>
                  handleChange(
                    e.target
                      .value,
                    index
                  )
                }
                onKeyDown={(
                  e
                ) =>
                  handleKeyDown(
                    e,
                    index
                  )
                }
                className='w-10 h-14 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-semibold bg-white border border-gray-200 rounded-xl outline-none focus:border-black transition-all disabled:bg-gray-100'
              />
            )
          )}

        </div>

        {/* STATUS */}
        {loading && (
          <div className='text-center text-sm text-gray-500 mb-5'>
            Verifying your NBLX account...
          </div>
        )}

        {/* RESEND */}
        <div className='text-center mb-7'>

          {countdown >
          0 ? (

            <p className='text-sm text-gray-500'>

              Resend code in{' '}

              <span className='font-semibold text-black'>
                {countdown}s
              </span>

            </p>

          ) : (

            <button
              type='button'
              onClick={
                resendOtp
              }
              disabled={
                resending ||
                loading
              }
              className='inline-flex items-center gap-2 text-sm font-semibold text-black hover:underline disabled:opacity-50'
            >

              <FaRotateRight />

              {resending
                ? 'Sending...'
                : 'Resend Code'}

            </button>

          )}

        </div>

        {/* BACK */}
        <button
          type='button'
          onClick={
            handleBack
          }
          disabled={
            loading
          }
          className='w-full flex items-center justify-center gap-2 border border-gray-200 text-black py-3 rounded-2xl hover:bg-black hover:text-white transition-all duration-300 font-semibold disabled:opacity-50'
        >

          <FaArrowLeft />

          Back to Sign Up

        </button>

      </div>

    </div>
  );
};

export default Sms;