import axios from "axios";
import { useEffect, useState } from 'react';

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

function useGetProducts() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/products");
        const productsData = response.data.products;
        setProductList(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = productList.map((item) => ({
    id: item.id,
    Image: item.thumbnail,
    rating: item.rating,
    price: item.price,
    title: item.title,
    category: item.category
  }));

  return { data: filteredData, loading };
}

export default useGetProducts;
