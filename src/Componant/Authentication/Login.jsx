import React, { useState } from 'react'
import loginImg from "../../assets/Login.jpg"
import { userData } from './UserAuthdata'
import { useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { motion } from "motion/react"
import { toast } from 'react-toastify'

function Login() {
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [userPassword, setUserPassword] = useState('')
  const [error, setError] = useState({})

  const handleClick = () => {
    let newError = {}

    if (!userEmail || !userEmail.includes('@gmail.com')) {
      newError.emailError = "Enter a valid Email"
    }

    if (!userPassword || userPassword.length < 3) {
      newError.passwordError = "Password must be at least 3 characters"
    }

    setError(newError)

    const authenticated = userData.find(
      (user) => user.Email === userEmail && user.Password === userPassword
    )

    if (authenticated) {
      const token = btoa(`${userEmail}${userPassword}`)
      localStorage.setItem("Token", JSON.stringify(token))
      toast.success("Successfully Login!...")

      navigate("/")
    } else {
      toast.error("User Email or Password is Not Valid")
    }
  }

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-4 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-900">
      <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-[64rem] w-full">
        {/* Left Image Section */}
        <motion.div
          className="md:w-1/2 flex justify-center items-center"
          animate={{ x: 10 }}
          transition={{ duration: 1 }}
        >
          <img
            src={loginImg}
            alt="login"
            className="w-full h-[90%] rounded-[25px] object-cover"
          />
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="md:w-1/2 w-full p-8"
          animate={{ x: -10 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-center text-violet-700 dark:text-white mb-6">
            Welcome Back
          </h2>

          {/* Email Field */}
          <div className="mb-5">
            <label htmlFor="userEmail" className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
              Email*
            </label>
            <input
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your Email"
              className="w-full text-2xl px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
            />
            {error.emailError && <p className="text-sm text-red-500 mt-1">* {error.emailError}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-5 relative">
            <label htmlFor="userPassword" className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
              Password*
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="userPassword"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Enter your Password"
              className="w-full text-2xl px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
            />
            <span
              className="absolute right-4 top-[50px] text-gray-600 dark:text-gray-300 cursor-pointer"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
            </span>
            {error.passwordError && <p className="text-sm text-red-500 mt-1">* {error.passwordError}</p>}
          </div>

          {/* Login Button */}
          <button
            onClick={handleClick}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg text-lg font-semibold transition-all duration-200"
          >
            Login
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
