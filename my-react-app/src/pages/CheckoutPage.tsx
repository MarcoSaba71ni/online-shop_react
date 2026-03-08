import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Link } from "@tanstack/react-router";
import { clearCart } from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import checkoutSchema, { checkoutFormData } from "../app/schemas/checkoutSchema";
import { SubmitHandler , SubmitErrorHandler } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";

export function CheckoutPage() {

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const dispatch = useDispatch();

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipmentFee = 15;
  const total = subTotal + shipmentFee;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting },
    reset
  } = useForm<checkoutFormData> ({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange"
  })
    const onSubmit: SubmitHandler<checkoutFormData> = async (data) => {
    await new Promise ((resolve) => setTimeout(resolve, 2000));
    console.log("Submitted:", data);
    dispatch(clearCart());
    alert("Your contact form was submitted");
    reset();
    navigate({to:"/successful"})
  }
    const onError: SubmitErrorHandler<checkoutFormData> = (errors) => {
      console.log("Validation errors:", errors)
  }
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
    )
  }
  return (
    <div className="max-w-7xl mx-auto px-6 mt-10">
      <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
      <p className="text-gray-500 mt-2">
        Please enter your shipping and payment information below.
      </p>
      <div className="flex flex-col lg:flex-row gap-10 mt-8">
        <div className="flex-1 space-y-8">
          <form
            onSubmit = {handleSubmit(onSubmit, onError)}
            className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
            <h4 className="text-2xl font-semibold">Shipping Address</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium">First Name</label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  name="name"
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="Oskar"
                />
                {errors.name && (
                <span className="text-red-500 text-sm mt-1" role="alert">
                  {errors.name.message}
                </span>
              )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium">Last Name</label>
                <input
                  {...register("lastName")}
                  type="text"
                  id="last-name"
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="Karlsson"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm mt-1" role="alert">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Email</label>
              <input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                placeholder="john@email.com"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Street Address</label>
              <input
                {...register("address")}
                id="address"
                name="address"
                type="text"
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                placeholder="Storgatan 10, 123 45 Stockholm"
              />
              {errors.address && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </span>
              )}             
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium">City</label>
                <input
                  {...register("city")}
                  id="city"
                  name="city"
                  type="text"
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="Stockholm, Rio de Janeiro"
                />
                {errors.city && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </span>
                )}   
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium">State</label>
                <input
                  {...register("county")}
                  id="county"
                  name="county"
                  type="text"
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder=" Stockholm, Västra Götaland, Skåne "
                />
              {errors.county && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.county.message}
                </span>
              )}   
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium">ZIP Code</label>
                <input
                  {...register("zip")}
                  id="zip"
                  name="zip"
                  type="text"               
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="12345"
                />
                {errors.zip && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.zip.message}
                  </span>
                )}   
              </div>
            </div>          
            <h4 className="text-2xl font-semibold">Payment Details</h4>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Cardholder Name</label>
              <input
                {...register("cardName")}
                id="card-name"
                type="text"                 
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                placeholder="John Doe"
              />
                {errors.cardName && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.cardName.message}
                  </span>
                )}  
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Card Number</label>
              <input
                {...register("cardNumber")}
                id="card-number"
                type="string"     
                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                placeholder="1234 5678 9012 3456"/>
                {errors.cardNumber && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.cardNumber.message}
                </span>
              )}              
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium">Expiration Date</label>
                <input
                  {...register("expirationDate")}
                  type="text"
                  id="expiration-date"
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="MM/YY"/>
                {errors.expirationDate && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.expirationDate.message}
                  </span>
                )}  
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium">CVV</label>
                <input
                  {...register("cvv")}
                  type="text"
                  id="cvv"
                  className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                  placeholder="123"/>
                {errors.cvv && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.cvv.message}
                </span>
              )}                             
              </div>
            </div>
            <button
              className="w-full bg-black text-white py-3 rounded-xl cursor-pointer font-medium hover:bg-gray-800 transition-all"
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Complete Order"}
            </button>
          </form>
        </div>
        <div className="w-full lg:w-96">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 lg:sticky lg:top-10">
            <h4 className="text-xl font-semibold border-b pb-3">
              Order Summary
            </h4>
            <div className="space-y-4 overflow-y-auto max-h-64 pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    className="w-16 h-16 object-cover rounded-lg"
                    src={item.image.url}
                    alt={item.image.alt}/>
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
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full border cursor-pointer border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-50 transition">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}