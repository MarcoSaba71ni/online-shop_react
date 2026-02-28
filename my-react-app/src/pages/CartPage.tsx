import { useSelector , useDispatch } from "react-redux";
import { addToCart , removeFromCart , clearCart } from "../features/cart/cartSlice";
import { RootState , AppDispatch} from "../app/store";

export function CartPage() {
    const cartItems = useSelector((state: RootState)=> state.cart.items);
    const dispatch = useDispatch<AppDispatch>();

    if (cartItems.length === 0) {
        return <h2 className="text-center text-2xl font-bold text-gray-800">No Items in Cart</h2>
}
    return (
        <div className="flex flex-col gap-2 ml-24 mt-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
            {cartItems.map((item) => (
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
                 key={item.id}>
                    <div className="highlight-div flex items-center justify-between mt-4">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p>Price: ${item.price} </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span>Qty:</span>
                            <div className="flex flex-row gap-2">
                                <button
                                onClick = {() => dispatch(addToCart(item))}
                                className="border px-2 rounded-md font-bold cursor-pointer bg-gray-200 hover:bg-gray-300"> + </button>
                                <span>{item.quantity}</span>
                                <button 
                                onClick={() => dispatch(removeFromCart(item.id))}
                                className="border px-2 rounded-md font-bold cursor-pointer bg-gray-200 hover:bg-gray-300"> - </button>
                            </div>
                            <p >Price: ${item.price * item.quantity}</p>
                        </div>
                    </div>
                    <button className="bg-red-500 text-white py-2 rounded-lg cursor-pointer hover:bg-red-600 transition-colors"
                        onClick = {() => dispatch(removeFromCart(item.id))}>
                            Remove from Cart
                    </button>
                </div>
            ))}
            <div className="mt-6">
                <button 
                className="bg-red-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-red-600 transition-colors"
                onClick={() => dispatch(clearCart())}>
                    Clear Cart
                </button>
            </div>
        </div>
    );
};

export default CartPage;