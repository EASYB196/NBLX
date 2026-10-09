import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/nblx_logo.png';

function AdminLogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      alert('Please enter your username and password.');
      return;
    }

    // Connect your admin authentication here.
    console.log('Login submitted');
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center text-center px-4 py-10">
      <div className="w-full max-w-sm">
        <Link to="/">
          <img
            src={Logo}
            alt="NBLX Logo"
            className="w-60 h-28 object-contain mx-auto"
          />
        </Link>

        <h3 className="text-sm mb-6">ADMIN DASHBOARD</h3>

        <form onSubmit={handleLogin}>
          {/* USERNAME */}
          <div className="mb-4">
            <h2 className="text-left font-semibold mb-2">Username</h2>
            <input
              className="border py-2 px-3 w-full rounded-lg outline-none focus:border-black"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-5">
            <h2 className="text-left font-semibold mb-2">Password</h2>
            <input
              className="border py-2 px-3 w-full rounded-lg outline-none focus:border-black"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </div>

          {/* LOGIN */}
          <button
            type="submit"
            className="border bg-black text-white text-center py-2 w-full rounded-lg transition duration-300 hover:bg-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogIn;
