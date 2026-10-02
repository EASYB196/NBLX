// import {
//   cert,
//   getApps,
//   initializeApp,
// } from 'firebase-admin/app';

// import {
//   getAuth,
// } from 'firebase-admin/auth';

// import {
//   getFirestore,
// } from 'firebase-admin/firestore';

// import crypto from 'crypto';

// // ======================================================
// // FIREBASE ADMIN
// // ======================================================

// const firebaseAdminApp =
//   getApps().length > 0
//     ? getApps()[0]
//     : initializeApp({
//         credential: cert({
//           projectId:
//             process.env.FIREBASE_PROJECT_ID,

//           clientEmail:
//             process.env.FIREBASE_CLIENT_EMAIL,

//           privateKey:
//             process.env.FIREBASE_PRIVATE_KEY.replace(
//               /\\n/g,
//               '\n'
//             ),
//         }),
//       });

// const adminAuth =
//   getAuth(firebaseAdminApp);

// const db =
//   getFirestore(firebaseAdminApp);

// // ======================================================
// // HELPERS
// // ======================================================

// const hashOtp = (otp) => {
//   return crypto
//     .createHash('sha256')
//     .update(otp)
//     .digest('hex');
// };

// // ======================================================
// // API HANDLER
// // ======================================================

// export default async function handler(
//   req,
//   res
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({
//       success: false,
//       message: 'Method not allowed',
//     });
//   }

//   try {
//     const {
//       idToken,
//       otp,
//     } = req.body || {};

//     // ==================================================
//     // VALIDATION
//     // ==================================================

//     if (!idToken) {
//       return res.status(401).json({
//         success: false,
//         message:
//           'Authentication token is required',
//       });
//     }

//     if (!otp || !/^\d{6}$/.test(otp)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Please enter the 6-digit verification code',
//       });
//     }

//     // ==================================================
//     // VERIFY FIREBASE TOKEN
//     // ==================================================

//     const decodedToken =
//       await adminAuth.verifyIdToken(
//         idToken
//       );

//     const uid =
//       decodedToken.uid;

//     // ==================================================
//     // GET OTP
//     // ==================================================

//     const otpRef =
//       db.collection('emailOtps').doc(uid);

//     const otpSnapshot =
//       await otpRef.get();

//     if (!otpSnapshot.exists) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Verification code not found. Please request a new code.',
//       });
//     }

//     const otpData =
//       otpSnapshot.data();

//     // ==================================================
//     // CHECK EXPIRY
//     // ==================================================

//     if (
//       Date.now() >
//       Number(otpData.expiresAt)
//     ) {
//       await otpRef.delete();

//       return res.status(400).json({
//         success: false,
//         message:
//           'Verification code expired. Please request a new one.',
//       });
//     }

//     // ==================================================
//     // CHECK ATTEMPTS
//     // ==================================================

//     const attempts =
//       Number(
//         otpData.attempts || 0
//       );

//     if (attempts >= 5) {
//       await otpRef.delete();

//       return res.status(429).json({
//         success: false,
//         message:
//           'Too many incorrect attempts. Please request a new code.',
//       });
//     }

//     // ==================================================
//     // COMPARE OTP
//     // ==================================================

//     const enteredHash =
//       hashOtp(otp);

//     if (
//       enteredHash !==
//       otpData.otpHash
//     ) {
//       await otpRef.update({
//         attempts:
//           attempts + 1,
//       });

//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid verification code',
//       });
//     }

//     // ==================================================
//     // MARK FIREBASE EMAIL AS VERIFIED
//     // ==================================================

//     await adminAuth.updateUser(
//       uid,
//       {
//         emailVerified: true,
//       }
//     );

//     // ==================================================
//     // DELETE USED OTP
//     // ==================================================

//     await otpRef.delete();

//     return res.status(200).json({
//       success: true,
//       message:
//         'Email verified successfully',
//     });

//   } catch (error) {
//     console.error(
//       'Verify OTP error:',
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         'Unable to verify the code. Please try again.',
//     });
//   }
// }




import {
  adminAuth,
  adminDb,
} from '../../lib/firebaseAdmin.js';

import {
  hashOtp,
} from '../../lib/otp.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const {
      idToken,
      otp,
    } = req.body || {};

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!idToken) {
      return res.status(401).json({
        success: false,
        message:
          'Authentication token is required',
      });
    }

    if (!otp || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message:
          'Please enter the 6-digit verification code',
      });
    }

    // ==========================================
    // VERIFY FIREBASE TOKEN
    // ==========================================

    const decodedToken =
      await adminAuth.verifyIdToken(
        idToken
      );

    const uid =
      decodedToken.uid;

    // ==========================================
    // GET OTP
    // ==========================================

    const otpRef =
      adminDb
        .collection('emailOtps')
        .doc(uid);

    const otpSnapshot =
      await otpRef.get();

    if (!otpSnapshot.exists) {
      return res.status(400).json({
        success: false,
        message:
          'Verification code not found. Please request a new code.',
      });
    }

    const otpData =
      otpSnapshot.data();

    // ==========================================
    // CHECK EXPIRY
    // ==========================================

    if (
      Date.now() >
      Number(otpData.expiresAt)
    ) {
      await otpRef.delete();

      return res.status(400).json({
        success: false,
        message:
          'Verification code expired. Please request a new one.',
      });
    }

    // ==========================================
    // CHECK ATTEMPTS
    // ==========================================

    const attempts =
      Number(
        otpData.attempts || 0
      );

    if (attempts >= 5) {
      await otpRef.delete();

      return res.status(429).json({
        success: false,
        message:
          'Too many incorrect attempts. Please request a new code.',
      });
    }

    // ==========================================
    // HASH ENTERED OTP
    // ==========================================

    const enteredHash =
      hashOtp(
        otp,
        uid
      );

    // ==========================================
    // INVALID OTP
    // ==========================================

    if (
      enteredHash !==
      otpData.otpHash
    ) {
      await otpRef.update({
        attempts:
          attempts + 1,
      });

      return res.status(400).json({
        success: false,
        message:
          'Invalid verification code',
      });
    }

    // ==========================================
    // MARK EMAIL VERIFIED
    // ==========================================

    await adminAuth.updateUser(
      uid,
      {
        emailVerified: true,
      }
    );

    // ==========================================
    // DELETE OTP
    // ==========================================

    await otpRef.delete();

    return res.status(200).json({
      success: true,
      message:
        'Email verified successfully',
    });

  } catch (error) {
    console.error(
      'Verify OTP error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Unable to verify the code. Please try again.',
    });
  }
}