import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/nblx_logo.png';

function AdminLogIn() {
  return (
    <div className='h-full w-full flex justify-center  item-center  text-center mt-32 '>
      <div className=''>
        {' '}
        <Link to={'/'}>
          <img src={Logo} alt='' className='w-60 h-28' />
        </Link>
        <h3 className='text-sm'>ADMIN DASHBOARD</h3>
        {/* INPUTS */}
        <div className=''>
          {' '}
          <h2 className='text-left font-semibold'>Username</h2>
          <input
            className='border py-1 w-full  mb-4 rounded-lg'
            type='text;
'
          />
        </div>{' '}
        <h2 className='text-left font-semibold'>Password</h2>
        <input
          className='border py-1 w-full mb-4 rounded-lg'
          placeholder=''
          type='password'
          name=''
          id=''
        />
        {/* //LOGIN */}
        <div className='border bg-black text-white text-center py-2 w-52 ml-4 rounded-lg'>
          <button>Login </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogIn;
