import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] bg-[#fef3f4] dark:bg-gray-800 rounded-xl shadow-md mx-4 mt-10">
      <FaShoppingCart className="text-5xl text-[#c53030] dark:text-gray-300 mb-4" />
      <h1 className="text-2xl font-semibold text-[#c53030] mb-2
      dark:text-gray-300">Your cart is empty</h1>
      <p className="text-[#c53030] text-lg
      dark:text-gray-300">Please add some products to your cart.</p>
    </div>
  );
}

export default EmptyCart;
