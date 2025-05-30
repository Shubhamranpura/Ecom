import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../Store/CartSlice';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import { h1 } from 'motion/react-client';
import ProductDetailSkeleton from '../Common/ProductDetailSkeleton';

const ProductDetials = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [imageNum, setImageNum] = useState(0);
  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch()

  const cartItem = useSelector((state) => state.cart)

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
      finally{
        setLoading(false)
      }
    };

    fetchData(id.split(":")[1]);
  }, [id]);

  console.log(productData)
  if(loading){
    return <ProductDetailSkeleton/>
  }


  return (
    <div className="flex flex-col justify-center items-center min-h-[88.5vh] bg-gradient-to-br from-pink-200 to-red-300">
      
      <div className='flex w-full'>
      <button
        className='bg-[#68555b] ml-5 sm:ml-5 md:ml-20 mb-6 w-[75px] flex justify-center mt-2 sm:mt-3 md:mt-0 p-2 rounded-[15px]'
        onClick={() => history.back()}
      ><FaArrowLeft color='white' size={22} /></button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-[95%] md:w-[90%] bg-white rounded-2xl shadow-xl">

        {/* Image section */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={productData.images?.[imageNum]}
            alt={productData.title}
            className="w-full h-[80%] border-t-2 shadow-lg object-fill rounded-xl "
          />
          <div className="flex gap-2 mt-4">
            {productData.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setImageNum(index)}
                className={`w-4 h-4 rounded-full ${imageNum === index ? 'bg-red-500' : 'bg-gray-300'
                  }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Product details */}
        <div className="text-gray-800 font-semibold flex flex-col gap-3 justify-center">
          <h1 className="text-3xl font-bold text-pink-600">{productData.title}</h1>
          <p><strong>Brand:</strong> {productData.brand || "Not Specified"}</p>
          <p><strong>Rating:</strong> ⭐ {productData.rating} / 5</p>
          <p><strong>Return Policy:</strong> {productData.returnPolicy}</p>
          <p><strong>Discount:</strong> {productData.discountPercentage} %</p>
          <p><strong>Availability:</strong> {productData.availabilityStatus}</p>
          <p><strong>Stock:</strong> {productData.stock}</p>
          <p><strong>Warranty:</strong> {productData.warrantyInformation}</p>
          <p className="text-xl font-semibold text-white bg-green-600 px-4 py-2 rounded-md w-fit">
            $ {productData.price} 
          </p>
        </div>

        {/* Description */}
        <div className="flex flex-col justify-between  gap-4 mt-[75px]  min-h-[300px] font-semibold max-h-[200px]  pr-2">

          <p ><strong>Category:</strong> {productData.category}</p>

          <h2 className="text-xl font-semibold text-pink-700">About Product :</h2>

          <p className="text-gray-700 text-[20px] leading-relaxed">
            {productData.description}
          </p>

          <div>
            {cartItem.find(item => item.id === productData.id) ? (
              <button
                className="mt-2 w-full md:w-[70%] bg-red-500 text-white font-medium py-3 rounded-lg hover:bg-red-700 transition duration-300 text-2xl"
                onClick={() => {
                  console.log(productData.id)
                  dispatch(removeFromCart(productData.id))
                }}
              >
                Remove from Cart
              </button>
            ) :
              (<button className='bg-gradient-to-r from-pink-400 to-purple-400 w-full md:w-[70%] hover:from-pink-600 hover:to-purple-700 transition duration-300 mt-2 text-2xl text-white rounded-lg p-3'
                onClick={() => {
                  console.log(productData)
                  toast.success("Added To Cart")
                  dispatch(addToCart(productData))
                }}>
                Add To Cart
              </button>)}
          </div>
        </div>


      </section>
    </div>
  );
};

export default ProductDetials;
