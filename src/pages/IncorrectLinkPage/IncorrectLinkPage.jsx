import React from 'react';
import incorrectimg from '../../assets/images/incorrectpageimg.jpg';

function IncorrectLinkPage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-8">
      <div className="w-full max-w-3xl flex justify-center">
        <img
          src={incorrectimg}
          alt="Page not found"
          className="w-full max-w-2xl h-auto object-contain"
        />
      </div>

      <div className="mt-6 text-center max-w-2xl">
        <h2 className="text-black mb-3 text-2xl font-bold">
          This Page Does Not Exist
        </h2>

        <p className="text-black text-sm sm:text-base leading-relaxed">
          Sorry, the page you are looking for could not be found.
          It may have been moved or the link may be incorrect.
        </p>
      </div>
    </div>
  );
}

export default IncorrectLinkPage;
