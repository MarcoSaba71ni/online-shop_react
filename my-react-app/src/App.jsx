import { useState } from "react";
import ProductList from "./components/productList";
import React from 'react';



function App() {


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
  }

  return (
    <>
    <main>
      <h1>Online Shop</h1>

      <ProductList
        products={products}
        onAdd={addProduct}
        onRemove={removeProduct}/>
    </main>
    </>
    
  );


}

export default App;

