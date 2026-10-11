import crypto from 'node:crypto';

const OTP_SECRET = process.env.OTP_SECRET;

if (!OTP_SECRET) {
  throw new Error('OTP_SECRET environment variable is missing.');
}

export const generateOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

export const hashOtp = (otp, uid) => {
  return crypto.createHash('sha256').update(`${otp}:${uid}:${OTP_SECRET}`).digest('hex');
};
