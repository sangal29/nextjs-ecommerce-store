'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (savedUser && savedUser.email === email && savedUser.pass === pass) {
      localStorage.setItem('loggedIn', 'true');
      toast.success('Login success ✅');
      router.push('/');
    } else {
      toast.error('Invalid credentials ❌');
    }
  };

  return (
    <div className='p-6 max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>

      <input
        placeholder='Email'
        className='border p-2 w-full mb-3'
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type='password'
        placeholder='Password'
        className='border p-2 w-full mb-3'
        onChange={(e) => setPass(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className='bg-green-600 text-white px-6 py-2 w-full rounded'
      >
        Login
      </button>
    </div>
  );
}
