'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  const loadData = () => {
    const email = localStorage.getItem('loggedInUser');

    if (email) {
      const cart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
      setCount(cart.length);
    } else {
      setCount(0);
    }

    const u = JSON.parse(localStorage.getItem('user'));
    const logged = localStorage.getItem('loggedIn');
    if (u && logged) setUser(u);
    else setUser(null);

    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDark(false);
    }
  };

  useEffect(() => {
    loadData();
    const i = setInterval(loadData, 1000);
    return () => clearInterval(i);
  }, []);

  const toggleDark = () => {
    localStorage.setItem('theme', dark ? 'light' : 'dark');
  };

  const logout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedInUser');
  };

  return (
    <nav className='flex flex-wrap justify-between items-center p-4 bg-gray-200 dark:bg-gray-900 dark:text-white'>
      {/* Logo */}
      <h1 className='text-xl font-bold'>ShopEasy</h1>

      {/* Links */}
      <div className='flex flex-wrap gap-4 items-center text-sm sm:text-base'>
        <Link href='/'>Home</Link>

        <Link href='/cart' className='relative'>
          Cart 🛒
          {count > 0 && (
            <span className='absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full'>
              {count}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <span className='whitespace-nowrap'>Hello, {user.name}</span>

            <button
              onClick={logout}
              className='bg-red-500 px-3 py-1 rounded text-white text-sm'
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href='/login'>Login</Link>

            <Link
              href='/signup'
              className='bg-blue-600 text-white px-3 py-1 rounded text-sm'
            >
              Signup
            </Link>
          </>
        )}

        {/* Dark toggle */}
        <button
          onClick={toggleDark}
          className='px-3 py-1 bg-black text-white rounded dark:bg-white dark:text-black text-sm'
        >
          {dark ? 'Light' : 'Dark'}
        </button>
      </div>
    </nav>
  );
}
