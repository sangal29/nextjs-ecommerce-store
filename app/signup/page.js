'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const handleSignup = () => {
    const user = { name, email, pass };
    localStorage.setItem('user', JSON.stringify(user));
    toast.success('Signup successful 🎉');
    router.push('/');
  };
  return (
    <div className='p-6 max-w-md mx-auto'>
      {' '}
      <h1 className='text-2xl font-bold mb-4'>Signup</h1>{' '}
      <input
        placeholder='Name'
        className='border p-2 w-full mb-3'
        onChange={(e) => setName(e.target.value)}
      />{' '}
      <input
        placeholder='Email'
        className='border p-2 w-full mb-3'
        onChange={(e) => setEmail(e.target.value)}
      />{' '}
      <input
        type='password'
        placeholder='Password'
        className='border p-2 w-full mb-3'
        onChange={(e) => setPass(e.target.value)}
      />{' '}
      <button
        onClick={handleSignup}
        className='bg-blue-600 text-white px-6 py-2 w-full rounded'
      >
        {' '}
        Signup{' '}
      </button>{' '}
    </div>
  );
}
