import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import PrivateRoutes from '../Authentication/PrivateRoutes'
import { FaCartShopping, FaMoon, FaSun } from 'react-icons/fa6'
import { CiLogout } from 'react-icons/ci'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../../Store/TheameSlice'

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem("Token")
  const cartItem = useSelector((state) => state.cart)
  const theme = useSelector((state) => state.theme.mode)

  const handleLogout = () => {
    localStorage.removeItem('Token')
    navigate("/login")
  }

  const handleToggleTheme = () => {
    dispatch(toggleTheme())
  }

  return (
    <div className='bg-[#7a364d] text-white dar p-2 text-2xl'>
      <div>
        <ul className='flex justify-around items-center'>
          <li className='w-14'>
            <Link to={"/"}>
              <img src={Logo} alt="Logo" className='w-full rounded-full' />
            </Link>
          </li>

          {token && (
            <li>
              <Link to={"/products"}>Products</Link>
            </li>
          )}

          {!token && (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}

          <li className='cursor-pointer'>
            <button
              onClick={handleToggleTheme}
              className='text-sm px-3 py-1 rounded-md '
            >
              <span >{theme === 'light' ? <FaMoon size={24}/> : <FaSun color='yellow' size={24}/>}</span>
            </button>
          </li>

          <li className='flex gap-2 justify-center items-center'>
            <button onClick={handleLogout}>Logout</button>
            <span className='mt-1 hover:text-red-600 w-5'><CiLogout /></span>
          </li>

          {token && (
            <li className='relative cursor-pointer'>
              {cartItem.length > 0 && (
                <div className='absolute left-5 bottom-3 bg-red-500 rounded-full text-[15px] px-2 h-[24px] flex items-center justify-center'>
                  {cartItem.length}
                </div>
              )}
              <span>
                <Link to={"/cart"}>
                  <FaCartShopping />
                </Link>
              </span>
            </li>
          )}
        </ul>
      </div>
      <PrivateRoutes />
    </div>
  )
}

export default Navbar
