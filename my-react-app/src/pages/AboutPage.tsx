import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

export function AboutPage() {
  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex justify-center items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}>
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl w-full text-center"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}>
        {/* Title */}
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          About Our Shop
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}>
          Welcome to our online shop. We focus on delivering quality products
          with a clean, modern shopping experience built with React,
          Tailwind and TanStack Router.
        </motion.p>
        <Link
          to="/">
          <motion.button
            className="bg-black text-white cursor-pointer px-6 py-3 rounded-xl hover:bg-gray-800 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Explore Products
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
