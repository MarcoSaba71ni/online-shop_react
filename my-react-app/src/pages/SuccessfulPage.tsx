import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function SuccessfulPage () {

    const trackingNumber = Date.now();

    return (
        <motion.div className="max-w-7xl flex flex-col items-center mx-auto mt-10 gap-6">
        
        <motion.h1 className="text-3xl font-bold text-gray-800">
            🎉 Order Successful!
        </motion.h1>

        <motion.p className="text-lg text-gray-600">
            Thank you for your purchase.
        </motion.p>

        <motion.p className="text-lg font-semibold">
            Your tracking number is: {trackingNumber}
        </motion.p>

        <Link to="/">
            <button className="px-6 py-2 bg-black cursor-pointern text-white rounded-lg hover:opacity-80 transition">
            Back to Home
            </button>
        </Link>

        </motion.div>

    )
}

