import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Componant/Home/Home'
import Login from './Componant/Authentication/Login'
import Navbar from './Componant/Navbar/Navbar'
import Products from './Componant/Products/Products'
import PrivateRoutes from './Componant/Authentication/PrivateRoutes'
import Cart from './Componant/Cart/Cart'
import { Provider, useSelector } from 'react-redux'
import store from './Store/ProductStore'
import { Bounce, ToastContainer } from 'react-toastify'
import Pagenotfound from './Componant/ErrorPages/Pagenotfound'
import ProductDetials from './Componant/Products/ProductDetials'

function MainApp() {
  const mode = useSelector((state) => state.theme.mode)

  return (
    <div className={mode === 'dark' ? 'dark' : ''}>
      <div className='min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300'>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<PrivateRoutes><Products /></PrivateRoutes>} />
            <Route path='/cart' element={<PrivateRoutes><Cart /></PrivateRoutes>} />
            <Route path='/Login' element={<Login />} />
            <Route path='/product-detials/:id' element={<ProductDetials />} />
            <Route path='*' element={<Pagenotfound />} />
          </Routes>
          <ToastContainer draggable autoClose={500} transition={Bounce} />
        </BrowserRouter>
      </div>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <MainApp/>
    </Provider>
  )
}

export default App
