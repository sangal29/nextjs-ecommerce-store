'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const logged = localStorage.getItem('loggedIn');

    if (!logged) {
      toast.error('Please login first 🔒');
      router.push('/login');
      return;
    }

    // If logged in, load cart
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    setCheckingAuth(false);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    toast.error('Item removed ❌');
  };

  const updateQty = (id, type) => {
    const updated = cart.map((item) => {
      if (item.id === id) {
        if (type === 'inc') item.qty += 1;
        if (type === 'dec' && item.qty > 1) item.qty -= 1;
      }
      return item;
    });

    setCart([...updated]);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (checkingAuth) {
    return <h2 className='p-6 text-center'>Checking login...</h2>;
  }

  if (cart.length === 0) {
    return <h1 className='text-center mt-10 text-2xl'>Cart is empty 🛒</h1>;
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className='flex items-center justify-between border p-4 mb-4 rounded bg-white dark:bg-gray-800'
        >
          <div className='flex items-center gap-4'>
            <img src={item.image} className='h-16' />

            <div>
              <h2 className='font-semibold'>{item.title}</h2>

              <p>${item.price}</p>

              <div className='flex items-center gap-3 mt-2'>
                <button
                  onClick={() => updateQty(item.id, 'dec')}
                  className='px-2 bg-gray-300 rounded'
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => updateQty(item.id, 'inc')}
                  className='px-2 bg-gray-300 rounded'
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className='bg-red-500 text-white px-3 py-1 rounded'
          >
            Remove
          </button>
        </div>
      ))}

      <h2 className='text-xl font-bold mt-6'>Total: ${total.toFixed(2)}</h2>

      <button className='mt-4 bg-green-600 text-white px-6 py-2 rounded'>
        Checkout (Dummy)
      </button>
    </div>
  );
}
