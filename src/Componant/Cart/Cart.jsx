import React, { useDebugValue, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../Store/CartSlice';
import EmptyCart from './EmptyCart';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from 'react-icons/fa';
import {motion} from "motion/react"


function Cart() {
  const cartItem = useSelector((state) => state.cart)
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch()
  // const [productNum , setProductNum] = useState(1); x----x

  const [itemQuantity, setitemQuantity] = useState({})



  useEffect(() => {
    const quantityInfo = {}

    cartItem.forEach((item) => {
      quantityInfo[item.id] = itemQuantity[item.id] || 1
    })
    // console.log(quantityInfo)
    setitemQuantity(quantityInfo)
  }, [cartItem])

  // console.log(itemQuantity)

  useEffect(() => {
    const total = cartItem.reduce((acc, item) => {
      const quantity = itemQuantity[item.id];
      return acc + quantity * item.price
    }, 0);
    setTotalPrice(total.toFixed(2))
  }, [cartItem, itemQuantity])

  const handleAdd = (product) => {
    setitemQuantity((prev) => ({
      ...prev,
      [product.id]: prev[product.id] + 1
    }))
  }

  const handleReduce = (product) => {
    // console.log(product.id)
    // console.log(itemQuantity)
    if (itemQuantity[product.id] <= 1) {
      dispatch(removeFromCart(product.id))
    }
    setitemQuantity((prev) => ({
      ...prev,
      [product.id]: prev[product.id] > 1 ? prev[product.id] - 1 : 1,
    }));


  }
  console.log(cartItem.length)
  if (!cartItem || cartItem.length === 0) {
    console.log("Enter the product")
    return (<h1><EmptyCart /></h1>)
  }

  return (
    <section>
      <header className='text-[#7a364d] text-4xl ml-16 mt-5 '>
        Shopping Cart
      </header>
      <motion.section
      animate={{
        x:25,
      }}
      transition={{
        duration:1,
        delay:1
      }}
       className='mt-5 pl-2 text-3xl text-left ml-[63px] py-2 bg-[#a6a9d8] shadow-xl text-white rounded-lg border-l-4 border-green-600 w-1/3'
      
      >
        <h1>Subtotal ({cartItem.length} items) : <span > $ {totalPrice}</span></h1>
      </motion.section>
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5   mt-5 px-5 '>
        {
          cartItem && cartItem.map((product) => (
            <div key={product.id}
              className='bg-white  shadow-lg border-t-4 border-[#5d64be] shadow-blue-500/100 rounded-2xl overflow-hidden w-[90%] transition-transform hover:scale-105 duration-300 md:h-[78%] sm:h-[75%] mt-3'>
              <img src={product.Image || product.thumbnail} alt={product.title} className='h-[45%] w-full object-fill ' />

              <div className='p-4 mb-2 h-full bg-[#a6a9d8] text-black'>
                <h1 className='text-2xl h-[60px] font-semibold mb-1'>{product.title}</h1>
                <h1 className='text-[20px]'>$ {product.price}</h1>
                <h2 className='text-[18px]'>⭐ {product.rating} / 5</h2>

                <div className="flex items-center justify-center gap-3 my-3">
                  <button
                    className="bg-[#be723c] w-10 h-10 text-white text-2xl rounded-lg hover:bg-[#a35e32] flex justify-center items-center transition"
                    onClick={() => handleReduce(product)}
                  >
                    <FaMinus size={18}/>
                  </button>
                  <input
                    type="number"
                    name="itemNumber"
                    id="itemnumber"
                    readOnly
                    value={itemQuantity[product.id] || 1}
                    className=" w-18 h-10  text-center pl-1 font-semibold rounded-lg border border-gray-300 bg-white text-black"
                  />
                  <button
                    className="bg-[#be723c] w-10 h-10 text-white text-2xl rounded-lg hover:bg-[#a35e32] flex justify-center items-center "
                    onClick={() => handleAdd(product)}
                  >
                    <FaPlus size={18}/>
                  </button>
                </div>


                <button
                  className='text-[#001F3F] border-[#001F3F] border-2 mt-2 hover:bg-[#001F3F] hover:text-white
                 px-3 text-2xl w-full rounded-lg py-2  '
                  onClick={() => {
                    dispatch(removeFromCart(product.id))
                    // console.log("product removed from the cart")
                  }}
                >Remove To Cart</button>

              </div>
            </div>
          ))
        }
      </div>

    </section>
  )
}

export default Cart







