import { BrowserRouter, Routes, Route, useLocation , matchPath } from 'react-router-dom';
import './App.css';
import { useMemo } from 'react';
import Home from './Componant/Home/Home';
import Login from './Componant/Authentication/Login';
import Navbar from './Componant/Navbar/Navbar';
import Products from './Componant/Products/Products';
import PrivateRoutes from './Componant/Authentication/PrivateRoutes';
import Cart from './Componant/Cart/Cart';
import { Provider, useSelector } from 'react-redux';
import store from './Store/ProductStore';
import { Bounce, ToastContainer } from 'react-toastify';
import Pagenotfound from './Componant/ErrorPages/Pagenotfound';
import ProductDetials from './Componant/Products/ProductDetails';

function Layout() {
  const reduxMode = useSelector((state) => state.theme.mode);
  const mode = useMemo(() => reduxMode, [reduxMode]);
  const location = useLocation();

  const showRoutes = [
    '/',
    '/products/category',
    '/cart',
    '/login',
    "/product-details/:id"
  ];
  
  const isShowInDetailsPage = matchPath(location.pathname , "/product-detials/:id") 

  const isProductPage = matchPath(location.pathname,"/products/:category")

  const showNavbar = showRoutes.includes(location.pathname) || isShowInDetailsPage || isProductPage;

  
  

  return (
    <div className={mode === 'dark' ? 'dark' : ''}>
      <div className='min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300'>
        {showNavbar && <Navbar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:category' element={<PrivateRoutes><Products /></PrivateRoutes>} />
          <Route path='/cart' element={<PrivateRoutes><Cart /></PrivateRoutes>} />
          <Route path='/login' element={<Login />} />
          <Route path='/product-detials/:id' element={<ProductDetials />} />
          <Route path='*' element={<Pagenotfound />} />
        </Routes>
        <ToastContainer draggable autoClose={500} transition={Bounce} />
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
