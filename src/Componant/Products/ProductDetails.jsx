import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, matchRoutes, useLocation, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../Store/CartSlice';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import ProductDetailSkeleton from '../Common/ProductDetailSkeleton';

const ProductDetials = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [imageNum, setImageNum] = useState(0);
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const location = useLocation()

  const cartItem = useSelector((state) => state.cart)
  const theam = useSelector((state) => state.theme.mode)

  useEffect(() => {
    const fetchData = async (ProductId) => {
      try {
        const productInfo = await axios.get(`https://dummyjson.com/products/${ProductId}`);
        if (productInfo.data) {
          setProductData(productInfo.data);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
      finally {
        setLoading(false)
      }
    };



    fetchData(id.split(":")[1]);
  }, [id]);

  // console.log(productData)

  if (loading) {
    return <ProductDetailSkeleton />
  }


  return (
    <div className="flex flex-col animate-appear justify-center items-center min-h-[88.5vh] ">

      <div className='flex w-full'>
        <button
          className='bg-gray-500 dark:bg-gray-800  ml-5 sm:ml-5 md:ml-20 mb-6 w-[75px] flex justify-center mt-2 sm:mt-3 md:mt-0 p-2 rounded-[15px]'
          onClick={() => history.back()}
        ><FaArrowLeft color={theam === "light" ? "black" : "white"} size={22} />
        </button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-[95%] md:w-[90%] bg-white dark:bg-gray-800 dark:bg-dark-card rounded-2xl shadow-lg  shadow-blue-500">

        {/* Image section */}
        <div className="flex flex-col  items-center justify-center">
          {productData.images === null ? <></> : <img
            src={productData.images?.[imageNum]}
            alt={productData.title}
            className="w-full h-[375px] border-t-2 shadow-md shadow-pink-400 object-contain rounded-xl"
          />}

          <div className="flex gap-2 mt-4">
            {productData.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setImageNum(index)}
                className={`w-4 h-4 rounded-full ${imageNum === index ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Product details */}
        <div className="text-gray-800  dark:text-gray-200 font-semibold flex flex-col gap-3 justify-center">
          <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400">{productData.title}</h1>
          <p><strong>Brand:</strong> {productData.brand || "Not Specified"}</p>
          <p><strong>Rating:</strong> ⭐ {productData.rating} / 5</p>
          <p><strong>Return Policy:</strong> {productData.returnPolicy}</p>
          <p><strong>Discount:</strong> {productData.discountPercentage} %</p>
          <p><strong>Availability:</strong> {productData.availabilityStatus}</p>
          <p><strong>Stock:</strong> {productData.stock}</p>
          <p><strong>Warranty:</strong> {productData.warrantyInformation}</p>
          <p className="text-xl font-semibold text-white bg-green-600 dark:bg-green-700 px-4 py-2 rounded-md w-fit">
            $ {productData.price}
          </p>
        </div>

        {/* Description */}
        <div className="flex flex-col h-full md:sticky md:top-12">
          <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Category:</strong> {productData.category}
            </p>

            <h2 className="text-xl font-semibold text-pink-700 dark:text-pink-400">About Product:</h2>

            <p className="text-gray-700 dark:text-gray-300 text-[20px] ">
              {productData.description}
            </p>

            <div className="mt-auto pt-4">
              {cartItem.find(item => item.id === productData.id) ? (
                <button
                  className="w-full bg-red-500 text-white font-medium py-3 rounded-lg hover:bg-red-700 transition duration-300 text-2xl"
                  onClick={() => {
                    dispatch(removeFromCart(productData.id));
                  }}
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-600 hover:to-purple-700 transition duration-300 text-2xl text-white rounded-lg py-3"
                  onClick={() => {
                    toast.success('Added To Cart');
                    dispatch(addToCart(productData));
                  }}
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default ProductDetials;
