import React from "react";
import { useState } from "react";
import ProductList from "../components/productList";



export function HomePage() {
    const [products, setProducts] = useState([
        {
          id: 1,
          title: "Rain Jacket",
          price: 129,
        },
        {
          id: 2,
          title: "Winter Jacket",
          price: 199,
        },
        {
          id: 3,
          title: "Shell Jacket",
          price: 149,
        },
      ]);
    
      function addProduct(title, price) {
        const newProduct = {
          id: Date.now(),
          title,
          price,
        };
    
        setProducts([...products, newProduct]);
      }
    
      function removeProduct(id) {
        setProducts(products.filter((product) => product.id !== id));
      }; 
      
    return (
        <div className="flex flex-col gap-2 ml-24 mt-6">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <ProductList
            products={products}
            onAdd={addProduct}
            onRemove={removeProduct}/>
        </div>
    )
}