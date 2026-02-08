import React from "react";
import { productRoute } from "../router/Router";
import ProductCard from "../components/productCard";


export function ProductPage() {
  const { productId } = productRoute.useParams();
  console.log(productId);
  console.log(productId.title);
  return (
    <div>
      <h2>Product Page</h2>
      <p>Product ID: {productId}</p>
      <p>Product: {productId.title}</p>
    </div>
  );
}
