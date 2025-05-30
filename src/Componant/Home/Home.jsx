import React from 'react'
import homePageImg from "../../assets/Homepage.jpg"
import "../../App.css"
import { motion } from "framer-motion"
import {
  FaChild, FaUtensils, FaTshirt, FaCut, FaSprayCan,
  FaShoppingBasket, FaCouch, FaDog
} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

const categories = [
  { name: "Children", icon: <FaChild /> },
  { name: "Food", icon: <FaUtensils /> },
  { name: "Accessories", icon: <FaTshirt /> },
  { name: "Cutlery", icon: <FaCut /> },
  { name: "Perfumes", icon: <FaSprayCan /> },
  { name: "Groceries", icon: <FaShoppingBasket /> },
  { name: "Furniture", icon: <FaCouch /> },
  { name: "Pet Food", icon: <FaDog /> }
]

function Home() {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col justify-center gap-10 w-full mt-10 items-center transition-colors duration-300'>

      {/* Hero Section */}
      <section className='flex flex-col md:flex-row bg-gradient-to-r from-[#f2cccf] to-[#f66e79] 
        dark:from-gray-800 dark:to-gray-900 w-[90%] rounded-3xl shadow-xl p-8 items-center 
        gap-10 text-gray-700 dark:text-white'>

        {/* Text Content */}
        <motion.div
          className='w-full md:w-1/2 space-y-5 text-center md:text-left'
          animate={{ x: [25, -5] }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className='text-3xl md:text-5xl font-extrabold'>Welcome to S-Mart!</h1>
          <p className='text-base sm:text-lg font-medium'>
            Discover a variety of quality products at unbeatable prices.
            From cosmetics to daily essentials, we offer a seamless shopping experience.
            Start adding to your cart now and enjoy fast, secure, and reliable service.
          </p>
          <p className='text-sm sm:text-base font-semibold'>
            Explore. Choose. Shop smart.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className='w-full md:w-1/2 flex justify-center'
          animate={{ x: [-20, 1] }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img
            src={homePageImg}
            alt="Home Page"
            className='w-[350px] md:w-[400px] h-auto rounded-2xl object-cover shadow-lg'
          />
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className='w-[90%]'>
        <h2 className='text-2xl font-bold text-[#333] dark:text-white mb-4'>Shop by Category</h2>
        <ul
          className='grid grid-cols-1 md:grid-cols-2 py-5 gap-4 homeproducts'
          onClick={() => navigate("/products")}
        >
          {categories.map((category, index) => (
            <li
              key={index}
              className='bg-yellow-500 dark:bg-yellow-600 text-white py-4 px-3 
              rounded-xl shadow-md font-semibold text-lg cursor-pointer min-w-[120px] 
              flex items-center justify-center gap-2 transition-colors duration-300'
            >
              <span className='text-xl'>{category.icon}</span>
              {category.name}
            </li>
          ))}
        </ul>
      </section>

    </div>
  )
}

export default Home
