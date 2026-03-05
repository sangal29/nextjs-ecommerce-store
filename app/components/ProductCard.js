import { addToCart } from '../utils/cart';
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className='border rounded-lg p-4 shadow hover:shadow-lg transition bg-white dark:bg-gray-800'>
      {/* Clickable Area */}
      <Link href={`/product/${product.id}`}>
        <div className='cursor-pointer'>
          {/* Image */}
          <img
            src={product.image}
            alt={product.title}
            className='h-40 mx-auto object-contain'
          />

          {/* Title */}
          <h2 className='mt-2 font-semibold line-clamp-1'>{product.title}</h2>

          {/* Price */}
          <p className='text-green-600 font-bold mt-1'>${product.price}</p>

          {/* Rating */}
          <p className='text-yellow-500'>⭐ {product.rating?.rate}</p>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className='mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
      >
        Add to Cart
      </button>
    </div>
  );
}
