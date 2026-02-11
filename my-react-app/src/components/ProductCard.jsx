import { Link } from "@tanstack/react-router";

function ProductCard({product , onAdd , onRemove}) {
    return (
        <div  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between">
            <Link
            to= "/products/$productId"
            params={{productId: product.id}}
            className="block">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-black transition-colors">{product.title}</h3>
                <p className="text-lg font-bold text-gray-600">Price: ${product.price}</p>
            </Link>
            <div className="mt-6 flex gap-3">
                <button  className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                onClick = {() => onAdd(product.title, product.price)}>
                    Add to Cart
                </button>
                <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                 onClick = {() => onRemove(product.id) }>
                    Remove
                </button>                
            </div>

        </div>
    );
}

export default ProductCard;