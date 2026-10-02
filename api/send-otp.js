// import { Resend } from 'resend';
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

// const resend = new Resend(
//   process.env.RESEND_API_KEY
// );

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

// const generateOtp = () => {
//   return crypto
//     .randomInt(100000, 1000000)
//     .toString();
// };

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
//     } = req.body || {};

//     if (!idToken) {
//       return res.status(401).json({
//         success: false,
//         message: 'Authentication token is required',
//       });
//     }

//     // ==================================================
//     // VERIFY FIREBASE USER
//     // ==================================================

//     const decodedToken =
//       await adminAuth.verifyIdToken(
//         idToken
//       );

//     const uid =
//       decodedToken.uid;

//     const email =
//       decodedToken.email;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'No email address is associated with this account',
//       });
//     }

//     // ==================================================
//     // GET USER
//     // ==================================================

//     const userRecord =
//       await adminAuth.getUser(uid);

//     // Already verified
//     if (userRecord.emailVerified) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'This email address is already verified',
//       });
//     }

//     // ==================================================
//     // RATE LIMIT
//     // ==================================================

//     const otpRef =
//       db.collection('emailOtps').doc(uid);

//     const existingOtp =
//       await otpRef.get();

//     if (existingOtp.exists) {
//       const existingData =
//         existingOtp.data();

//       const lastSentAt =
//         existingData?.lastSentAt?.toMillis?.() ||
//         0;

//       const now =
//         Date.now();

//       if (
//         now - lastSentAt <
//         30 * 1000
//       ) {
//         return res.status(429).json({
//           success: false,
//           message:
//             'Please wait 30 seconds before requesting another code',
//         });
//       }
//     }

//     // ==================================================
//     // GENERATE OTP
//     // ==================================================

//     const otp =
//       generateOtp();

//     const otpHash =
//       hashOtp(otp);

//     const expiresAt =
//       Date.now() + 10 * 60 * 1000;

//     // ==================================================
//     // SAVE HASHED OTP
//     // ==================================================

//     await otpRef.set({
//       uid,
//       email,
//       otpHash,

//       expiresAt,

//       attempts: 0,

//       lastSentAt:
//         new Date(),

//       createdAt:
//         new Date(),
//     });

//     // ==================================================
//     // SEND EMAIL
//     // ==================================================

//     const { data, error } =
//       await resend.emails.send({
//         from:
//           process.env.RESEND_FROM_EMAIL ||
//           'NBLX <onboarding@resend.dev>',

//         to: [email],

//         subject:
//           'Your NBLX verification code',

//         html: `
//           <!DOCTYPE html>

//           <html>
//             <head>
//               <meta
//                 name="viewport"
//                 content="width=device-width, initial-scale=1.0"
//               />
//             </head>

//             <body
//               style="
//                 margin:0;
//                 padding:0;
//                 background:#f5f5f5;
//                 font-family:Arial,Helvetica,sans-serif;
//               "
//             >

//               <div
//                 style="
//                   max-width:560px;
//                   margin:40px auto;
//                   background:#ffffff;
//                   border-radius:20px;
//                   overflow:hidden;
//                   box-shadow:0 10px 30px rgba(0,0,0,0.08);
//                 "
//               >

//                 <div
//                   style="
//                     background:#000000;
//                     padding:28px;
//                     text-align:center;
//                   "
//                 >
//                   <h1
//                     style="
//                       margin:0;
//                       color:#ffffff;
//                       font-size:30px;
//                       letter-spacing:5px;
//                     "
//                   >
//                     NBLX
//                   </h1>
//                 </div>

//                 <div
//                   style="
//                     padding:40px 30px;
//                     text-align:center;
//                   "
//                 >

//                   <h2
//                     style="
//                       margin:0 0 12px;
//                       color:#111111;
//                       font-size:24px;
//                     "
//                   >
//                     Verify Your Account
//                   </h2>

//                   <p
//                     style="
//                       margin:0 auto 28px;
//                       color:#666666;
//                       font-size:15px;
//                       line-height:1.6;
//                     "
//                   >
//                     Use the verification code below
//                     to complete your NBLX account setup.
//                   </p>

//                   <div
//                     style="
//                       display:inline-block;
//                       background:#f5f5f5;
//                       border-radius:14px;
//                       padding:18px 28px;
//                       margin-bottom:25px;
//                     "
//                   >
//                     <span
//                       style="
//                         font-size:34px;
//                         font-weight:700;
//                         letter-spacing:9px;
//                         color:#000000;
//                       "
//                     >
//                       ${otp}
//                     </span>
//                   </div>

//                   <p
//                     style="
//                       margin:0;
//                       color:#777777;
//                       font-size:13px;
//                       line-height:1.6;
//                     "
//                   >
//                     This code expires in
//                     <strong>10 minutes</strong>.
//                   </p>

//                   <p
//                     style="
//                       margin-top:25px;
//                       color:#999999;
//                       font-size:12px;
//                     "
//                   >
//                     If you did not create a NBLX account,
//                     you can safely ignore this email.
//                   </p>

//                 </div>

//                 <div
//                   style="
//                     border-top:1px solid #eeeeee;
//                     padding:20px;
//                     text-align:center;
//                   "
//                 >
//                   <p
//                     style="
//                       margin:0;
//                       color:#999999;
//                       font-size:12px;
//                     "
//                   >
//                     © ${new Date().getFullYear()} NBLX
//                   </p>
//                 </div>

//               </div>

//             </body>
//           </html>
//         `,
//       });

//     if (error) {
//       console.error(
//         'Resend error:',
//         error
//       );

//       await otpRef.delete();

//       return res.status(500).json({
//         success: false,
//         message:
//           'Unable to send verification email',
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message:
//         'Verification code sent successfully',
//       email,
//       id: data?.id || null,
//     });

//   } catch (error) {
//     console.error(
//       'Send OTP error:',
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         'Something went wrong while sending the verification code',
//     });
//   }
// }


import { Resend } from 'resend';
import { adminAuth, adminDb } from '../../lib/firebaseAdmin.js';
import { generateOtp, hashOtp } from '../../lib/otp.js';

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const OTP_EXPIRY = 10 * 60 * 1000;
const RESEND_COOLDOWN = 30 * 1000;

const escapeHtml = (value = '') => {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      })[char]
  );
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const { idToken } = req.body || {};

    if (!idToken) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token is required',
      });
    }

    // ==========================================
    // VERIFY FIREBASE TOKEN
    // ==========================================

    const decodedToken =
      await adminAuth.verifyIdToken(idToken);

    const uid = decodedToken.uid;

    // ==========================================
    // GET FIREBASE USER
    // ==========================================

    const userRecord =
      await adminAuth.getUser(uid);

    const email =
      userRecord.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message:
          'No email address is associated with this account',
      });
    }

    // ==========================================
    // ALREADY VERIFIED
    // ==========================================

    if (userRecord.emailVerified) {
      return res.status(400).json({
        success: false,
        message:
          'This email address is already verified',
      });
    }

    // ==========================================
    // OTP DOCUMENT
    // ==========================================

    const otpRef =
      adminDb
        .collection('emailOtps')
        .doc(uid);

    const existingOtp =
      await otpRef.get();

    // ==========================================
    // RATE LIMIT
    // ==========================================

    if (existingOtp.exists) {
      const existingData =
        existingOtp.data();

      const lastSentAt =
        existingData?.lastSentAt?.toMillis?.() ||
        0;

      const elapsed =
        Date.now() - lastSentAt;

      if (elapsed < RESEND_COOLDOWN) {
        return res.status(429).json({
          success: false,
          message:
            'Please wait 30 seconds before requesting another code',
          retryAfter: Math.ceil(
            (RESEND_COOLDOWN - elapsed) / 1000
          ),
        });
      }
    }

    // ==========================================
    // GENERATE OTP
    // ==========================================

    const otp =
      generateOtp();

    const otpHash =
      hashOtp(
        otp,
        uid
      );

    const expiresAt =
      Date.now() + OTP_EXPIRY;

    // ==========================================
    // SAVE OTP
    // ==========================================

    await otpRef.set({
      uid,
      email,
      otpHash,
      expiresAt,
      attempts: 0,
      lastSentAt: new Date(),
      createdAt: new Date(),
    });

    // ==========================================
    // SEND EMAIL
    // ==========================================

    const displayName =
      escapeHtml(
        userRecord.displayName || 'there'
      );

    const {
      data,
      error,
    } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        'onboarding@resend.dev',

      to: [email],

      subject:
        'Your NBLX verification code',

      html: `
        <!DOCTYPE html>

        <html>
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </head>

          <body
            style="
              margin:0;
              padding:0;
              background:#f5f5f5;
              font-family:Arial,Helvetica,sans-serif;
            "
          >

            <div
              style="
                max-width:560px;
                margin:40px auto;
                background:#ffffff;
                border-radius:20px;
                overflow:hidden;
                box-shadow:0 10px 30px rgba(0,0,0,0.08);
              "
            >

              <div
                style="
                  background:#000000;
                  padding:28px;
                  text-align:center;
                "
              >
                <h1
                  style="
                    margin:0;
                    color:#ffffff;
                    font-size:30px;
                    letter-spacing:5px;
                  "
                >
                  NBLX
                </h1>
              </div>

              <div
                style="
                  padding:40px 30px;
                  text-align:center;
                "
              >

                <h2
                  style="
                    margin:0 0 12px;
                    color:#111111;
                    font-size:24px;
                  "
                >
                  Verify Your Account
                </h2>

                <p
                  style="
                    margin:0 auto 12px;
                    color:#333333;
                    font-size:15px;
                  "
                >
                  Hi ${displayName},
                </p>

                <p
                  style="
                    margin:0 auto 28px;
                    color:#666666;
                    font-size:15px;
                    line-height:1.6;
                  "
                >
                  Use the verification code below
                  to complete your NBLX account setup.
                </p>

                <div
                  style="
                    display:inline-block;
                    background:#f5f5f5;
                    border-radius:14px;
                    padding:18px 28px;
                    margin-bottom:25px;
                  "
                >
                  <span
                    style="
                      font-size:34px;
                      font-weight:700;
                      letter-spacing:9px;
                      color:#000000;
                    "
                  >
                    ${otp}
                  </span>
                </div>

                <p
                  style="
                    margin:0;
                    color:#777777;
                    font-size:13px;
                    line-height:1.6;
                  "
                >
                  This code expires in
                  <strong>10 minutes</strong>.
                </p>

                <p
                  style="
                    margin-top:25px;
                    color:#999999;
                    font-size:12px;
                  "
                >
                  If you did not create a NBLX account,
                  you can safely ignore this email.
                </p>

              </div>

              <div
                style="
                  border-top:1px solid #eeeeee;
                  padding:20px;
                  text-align:center;
                "
              >
                <p
                  style="
                    margin:0;
                    color:#999999;
                    font-size:12px;
                  "
                >
                  © ${new Date().getFullYear()} NBLX
                </p>
              </div>

            </div>

          </body>
        </html>
      `,
    });

    // ==========================================
    // RESEND ERROR
    // ==========================================

    if (error) {
      console.error(
        'Resend error:',
        error
      );

      await otpRef.delete();

      return res.status(500).json({
        success: false,
        message:
          'Unable to send verification email',
      });
    }

    return res.status(200).json({
      success: true,
      message:
        'Verification code sent successfully',
      email,
      id: data?.id || null,
    });

  } catch (error) {
    console.error(
      'Send OTP error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Something went wrong while sending the verification code',
    });
  }
}