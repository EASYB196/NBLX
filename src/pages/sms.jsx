import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sms = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const storedOtp = sessionStorage.getItem("otp");

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // move next
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }

    // auto verify when filled
    if (newOtp.join("").length === 4) {
      verifyOtp(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const verifyOtp = (enteredOtp) => {
    if (enteredOtp === storedOtp) {
      sessionStorage.removeItem("otp");

      setTimeout(() => {
        alert("Successful 🎉");
        navigate("/signup");
      }, 500);
    } else {
      alert("Invalid OTP ❌");
      setOtp(["", "", "", ""]);
      inputsRef.current[0].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="bg-white/5 p-8 rounded-xl border border-white/10 text-center">

        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
        <p className="text-black mb-6">Enter the 4-digit code sent to you</p>

        <div className="flex gap-3 justify-center">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              maxLength={1}
              className="w-12 h-12 text-center text-xl bg-white border  rounded-md outline-none"
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Sms;