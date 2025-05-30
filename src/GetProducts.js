import axios from "axios";
import { useEffect, useState } from 'react'

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000
})

function GetProducts() {
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get("/products");
        const productsData = response.data.products;
        setProductList(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);
  // console.log(productList)
  const filterdData = []
  productList.map((item) => {
    filterdData.push({ id: item.id, Image: item.thumbnail, rating: item.rating, price: item.price, title: item.title })
  })
  // console.log(filterdData)
  return { data: filterdData, loading };
}

export default GetProducts;



