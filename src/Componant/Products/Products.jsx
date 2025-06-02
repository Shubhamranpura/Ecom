import React, { useState } from 'react'
import GetProducts from '../../GetProducts'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../Store/CartSlice'
import { toast } from 'react-toastify'
import Skeleton from '../Common/Skeleton'
import { useNavigate } from 'react-router-dom'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa6'

function Home() {
  const { data, loading } = GetProducts()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItem = useSelector((state) => state.cart)

  const itemsPerPage = 7;
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handleAddToCart = (product) => {
    const isInCart = cartItem.find(item => item.id === product.id)
    if (isInCart) {
      toast.info("Product already in cart")
    } else {
      dispatch(addToCart(product))
      toast.success("Added to cart")
    }
  }

  const handleClick = (e, product) => {
    if (!["Add To Cart", "Remove from Cart"].includes(e.target.innerText)) {
      navigate(`/product-detials/:${product.id}`)
    }
  }

  if (loading) {
    return <Skeleton />
  }

  return (
    <section className='min-h-screen bg-white dark:bg-gray-900 py-12'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4'>
        {data.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden border hover:shadow-2xl transition cursor-pointer shadow-blue-400 "
            onClick={(e) => handleClick(e, product)}
          >
            <img
              src={product.Image}
              alt={product.title}
              className="h-[220px] w-full object-contain"
            />
            <div className="p-4 bg-[#8b9ef5] dark:bg-[#1a1c2c]">
              <h3 className="text-xl font-semibold h-14 text-gray-800 dark:text-white">{product.title}</h3>
              <p className="text-indigo-600 font-bold text-lg mt-2">$ {product.price}</p>
              <p className="text-yellow-600 font-semibold">⭐ {product.rating} / 5</p>

              {cartItem.find(item => item.id === product.id) ? (
                <button
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="mt-4 w-full bg-red-500 text-white dark:text-gray-400 py-2 dark:bg-red-600 rounded-lg hover:bg-red-700 transition duration-300 text-2xl"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full text-2xl bg-gradient-to-r from-green-300 to-blue-500 text-white dark:text-gray-800 py-2 rounded-lg hover:from-green-600 hover:to-blue-700 transition duration-300 "
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-5 mt-12">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`p-2 rounded-full ${page === 1 ? 'opacity-0' : 'bg-gray-800 hover:bg-gray-400'}`}
        >
          <FaCaretLeft size={20} />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-lg ${page === i + 1
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 hover:bg-indigo-400 hover:text-white'}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`p-2 rounded-full ${page === totalPages ? 'opacity-0' : 'bg-gray-800 hover:bg-gray-400'}`}
        >
          <FaCaretRight size={20} />
        </button>
      </div>
    </section>
  )
}

export default Home
