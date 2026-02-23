import React from "react";
import { productRoute } from "../router/Router";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "@tanstack/react-router";
import { API_URL_PRODUCTS } from "./HomePage";
import { useQuery } from "@tanstack/react-query";

const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL_PRODUCTS}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const result = await response.json();
  console.log("Here is the result:", result);

  return result.data; // not result.data
};

export function ProductPage() {
  const { productId } = productRoute.useParams();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });

  if (isLoading) {
    return <p>Loading product...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  console.log(product);

  return (
 <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
    <div className="bg-white shadow-2xl rounded-3xl max-w-5xl w-full overflow-hidden">

      <div className="grid md:grid-cols-2 gap-8 p-8">
        
        {/* IMAGE */}
        <div className="flex justify-center items-center">
          <img
            src={product.image.url}
            alt={product.title}
            className="w-full max-h-[500px] object-contain rounded-2xl"
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col justify-between space-y-6">

          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-3xl font-semibold text-black">
              ${product.price}
            </p>

            <p className="text-yellow-500 font-medium">
              ⭐ {product.rating} / 5
            </p>

            <p className="text-sm text-gray-400">
              Product ID: {product.id}
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 active:scale-95"
            >
              Add to Cart
            </button>

            <Link
              to="/"
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 transition-all duration-200 text-center"
            >
              Back
            </Link>
          </div>

        </div>
      </div>

    </div>
  </div>
  );
}