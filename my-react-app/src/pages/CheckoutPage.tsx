import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Link } from "@tanstack/react-router";
import { clearCart } from "../features/cart/cartSlice";

export function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const dispatch = useDispatch();

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipmentFee = 15;
  const total = subTotal + shipmentFee;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 mt-20 text-center">
        <h3 className="text-2xl font-semibold">
          There are no items to checkout
        </h3>
        <p className="text-gray-500 mt-2">
          Return to the main page to keep shopping!
        </p>
        <Link
          to="/"
          className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Home Page
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 mt-10">
      <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
      <p className="text-gray-500 mt-2">
        Please enter your shipping and payment information below.
      </p>

      <div className="flex flex-col lg:flex-row gap-10 mt-8">
        {/* LEFT SIDE */}
        <div className="flex-1 space-y-8">
          {/* SHIPPING ADDRESS */}
          <form className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
            <h4 className="text-2xl font-semibold">Shipping Address</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium">First Name</label>
                <input
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="John"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium">Last Name</label>
                <input
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                placeholder="john@email.com"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Street Address</label>
              <input
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                placeholder="123 Main St"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium">City</label>
                <input
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="New York"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium">State</label>
                <input
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="NY"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium">ZIP Code</label>
                <input
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="10001"
                />
              </div>
            </div>
          </form>

          {/* PAYMENT DETAILS */}
          <form className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
            <h4 className="text-2xl font-semibold">Payment Details</h4>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Cardholder Name</label>
              <input
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Card Number</label>
              <input
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium">Expiration Date</label>
                <input
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="MM/YY"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium">CVV</label>
                <input
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="123"
                />
              </div>
            </div>
            <Link
            to='/successful'>
              <button
                type="submit"
                className="hidden sm:block cursor-pointer w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition font-semibold"
              >
                Complete Order
              </button>            
            </Link>

          </form>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="w-full lg:w-96">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 lg:sticky lg:top-10">
            <h4 className="text-xl font-semibold border-b pb-3">
              Order Summary
            </h4>

            {/* ITEMS */}
            <div className="space-y-4 overflow-y-auto max-h-64 pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    className="w-16 h-16 object-cover rounded-lg"
                    src={item.image.url}
                    alt={item.image.alt}
                  />

                  <div className="flex-1">
                    <h5 className="text-sm font-medium">{item.title}</h5>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTALS */}
            <div className="border-t pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipmentFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link>
              <button
                type="submit"
                className="block sm:hidden w-full cursor-pointer bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition font-semibold"
              >
                Complete Order
              </button>            
            </Link>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full border border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-50 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}