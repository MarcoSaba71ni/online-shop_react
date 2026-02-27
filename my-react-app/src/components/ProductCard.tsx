import { Link } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { ProductCardProp } from "../features/interfaces/interfaces";

function ProductCard({product}: ProductCardProp) {

    const dispatch = useDispatch();

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">

        <Link
            to="/products/$productId"
            params={{ productId: product.id }}
            className="flex flex-col flex-1"
        >

            {/* IMAGE */}
            <div className="h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
            <img
                src={product.image.url}
                alt={product.title}
                className="h-full object-contain transition-transform duration-300 hover:scale-105"
            />
            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col flex-1">

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-black transition-colors">
                {product.title}
            </h3>

            {/* PRICE + RATING */}
            <div className="mt-auto space-y-2">

                <p className="text-xl font-bold text-black">
                ${product.price}
                </p>

                <p className="text-yellow-500 text-sm font-medium">
                ⭐ {product.rating}
                </p>

            </div>
            </div>

        </Link>

        {/* BUTTON */}
        <div className="p-5 pt-0">
            <button
            onClick={() => dispatch(addToCart(product))}
            className="w-full bg-black text-white py-2.5 rounded-xl hover:bg-gray-800 active:scale-95 transition-all duration-200"
            >
            Add to Cart
            </button>
        </div>

        </div>
    );
}

export default ProductCard;