import React from 'react';
import incorrectimg from '../../assets/images/incorrectpageimg.jpg';
function IncorrectLinkPage() {
  return (
    <div className='w-full h-screen grid justify-center items-center    '>
      <div> 
      <img src={incorrectimg} alt='' className='w-180 h-90 mt-32 ' />{' '}</div>{' '}
      <div className='mt-'>
        <h2 className='text-black text-center mb-3 text-2xl font-bold'>
          This Page Does Not Exist
        </h2>
        <p className='text-black '>
          Sorry,the page you are looking for could not be found it's just an accident that was
          not intentional
        </p>
      </div>
    </div>
  );
}

export default IncorrectLinkPage;
