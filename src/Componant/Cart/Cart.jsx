import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../Store/CartSlice';
import EmptyCart from './EmptyCart';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa';
import { motion } from "framer-motion"; // corrected import

function Cart() {
  const cartItem = useSelector((state) => state.cart);
  const theme = useSelector((state) => state.theme.mode); 
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemQuantity, setitemQuantity] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const quantityInfo = {};
    cartItem.forEach((item) => {
      quantityInfo[item.id] = itemQuantity[item.id] || 1;
    });
    setitemQuantity(quantityInfo);
  }, [cartItem]);

  useEffect(() => {
    const total = cartItem.reduce((acc, item) => {
      const quantity = itemQuantity[item.id];
      return acc + quantity * item.price;
    }, 0);
    setTotalPrice(total.toFixed(2));
  }, [cartItem, itemQuantity]);

  const handleAdd = (product) => {
    setitemQuantity((prev) => ({
      ...prev,
      [product.id]: prev[product.id] + 1,
    }));
  };

  const handleReduce = (product) => {
    if (itemQuantity[product.id] <= 1) {
      dispatch(removeFromCart(product.id));
    }
    setitemQuantity((prev) => ({
      ...prev,
      [product.id]: prev[product.id] > 1 ? prev[product.id] - 1 : 1,
    }));
  };

  if (!cartItem || cartItem.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className={`min-h-[88.5vh] transition duration-300 ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-white text-black'}`}>
      <header className='text-[#7a364d] dark:text-pink-300 text-4xl ml-8 pt-2'>
        Shopping Cart
      </header>

      <section
        animate={{ x: 25 }}
        transition={{ duration: 1, delay: 1 }}
        className='mt-5 pl-2 text-3xl text-left ml-[40px] py-2 bg-[#a6a9d8] dark:bg-gray-800 shadow-xl  text-white rounded-lg border-l-4 border-green-600 w-full  md:w-1/3 sm:w-1/2'
      >
        <h1>Subtotal ({cartItem.length} items) : <span>$ {totalPrice}</span></h1>
      </section>

      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 mt-5 px-5'>
        {cartItem.map((product) => (
          <div
            key={product.id}
            className={`shadow-lg border-t-4 border-[#5d64be] shadow-blue-500/100 rounded-2xl overflow-hidden w-[90%] transition-transform hover:scale-105 duration-300 md:h-[78%] sm:h-[75%] mt-3 ${theme === 'dark' ? 'bg-[#1f1f1f] text-white' : 'bg-white text-black'}`}
          >
            <img
              src={product.Image || product.thumbnail}
              alt={product.title}
              className='h-[45%] w-full object-fill'
            />

            <div className={`p-4 mb-2 h-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#a6a9d8] text-black'}`}>
              <h1 className='text-2xl h-[60px] font-semibold mb-1'>{product.title}</h1>
              <h1 className='text-[20px]'>$ {product.price}</h1>
              <h2 className='text-[18px]'>⭐ {product.rating} / 5</h2>

              <div className="flex items-center justify-center gap-3 my-3">
                <button
                  className="bg-[#be723c] w-10 h-10 text-white text-2xl rounded-lg hover:bg-[#a35e32] flex justify-center items-center transition"
                  onClick={() => handleReduce(product)}
                >
                  <FaMinus size={18} />
                </button>
                <input
                  type="number"
                  readOnly
                  value={itemQuantity[product.id] || 1}
                  className="w-18 h-10 text-center pl-1 font-semibold rounded-lg border border-gray-300 bg-white text-black"
                />
                <button
                  className="bg-[#be723c] w-10 h-10 text-white text-2xl rounded-lg hover:bg-[#a35e32] flex justify-center items-center"
                  onClick={() => handleAdd(product)}
                >
                  <FaPlus size={18} />
                </button>
              </div>

              <button
                className='text-[#001F3F] dark:text-white border-[#001F3F] dark:border-white border-2 mt-2 hover:bg-[#001F3F] hover:text-white px-3 text-2xl w-full rounded-lg py-2'
                onClick={() => dispatch(removeFromCart(product.id))}
              >
                Remove From Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Cart;
