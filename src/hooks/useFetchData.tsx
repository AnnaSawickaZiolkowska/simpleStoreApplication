import { useState, useEffect } from "react";

const useFetchData = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://www.rossmann.pl/products/api/Products";
      try {
        const response = await fetch(url);
        const json = await response.json();        
        const fetchingProducts = json.data.products;
        setProducts(fetchingProducts);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  
  return products;
};

export default useFetchData;
