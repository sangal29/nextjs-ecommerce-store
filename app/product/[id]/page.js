'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  //  Add to cart with quantity
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      exist.qty += qty;
    } else {
      cart.push({ ...product, qty });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Added to cart 🛒');
  };

  if (!product) return <h2 className='p-6'>Loading...</h2>;

  return (
    <div className='p-6 grid md:grid-cols-2 gap-8'>
      {/* Image */}
      <img src={product.image} className='h-80 mx-auto object-contain' />

      {/* Details */}
      <div>
        <h1 className='text-2xl font-bold mb-4'>{product.title}</h1>

        <p className='text-gray-600 mb-4'>{product.description}</p>

        <p className='text-green-600 text-xl font-bold mb-4'>
          ${product.price}
        </p>

        {/* Quantity Selector */}
        <div className='flex items-center gap-4 mb-6'>
          <button
            onClick={() => qty > 1 && setQty(qty - 1)}
            className='px-3 py-1 bg-gray-300 rounded'
          >
            -
          </button>

          <span className='text-lg font-bold'>{qty}</span>

          <button
            onClick={() => setQty(qty + 1)}
            className='px-3 py-1 bg-gray-300 rounded'
          >
            +
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={addToCart}
          className='bg-blue-600 text-white px-6 py-2 rounded'
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
