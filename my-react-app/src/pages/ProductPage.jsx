import React from "react";
import { productRoute } from "../router/Router";
import ProductCard from "../components/productCard";


export function ProductPage() {
  const { productId } = productRoute.useParams();
  console.log(productId);
  console.log(productId.title);
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Product Page</h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-600">Product ID: {productId}</p>
          <p className="text-lg text-gray-600">Product: {productId.title}</p>
        </div>
        <div className="mt-8 flex gap-4">
          <button className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
          Add to Cart
          </button>

          <button className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors">
          Back
          </button>
        </div>
      </div>

    </div>
  );
}
