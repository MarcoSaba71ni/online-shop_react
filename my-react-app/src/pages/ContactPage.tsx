import { motion } from "framer-motion";
import contactSchema from "../app/schemas/contactSchema";
import { ContactFormData } from "../app/schemas/contactSchema";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function ContactPage() {

  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting , isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData> ({
    resolver: zodResolver(contactSchema),
  });
    const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    await new Promise ((resolve) => setInterval(resolve, 2000));
    alert("Your contact form was submitted");
    reset();
  };
 
  const onError: SubmitErrorHandler<ContactFormData> = (errors) => {
    throw new Error
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex justify-center items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}>
      <motion.form
        onSubmit = {handleSubmit(onSubmit, onError)}
        className="bg-white shadow-2xl rounded-2xl p-10 max-w-2xl w-full space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}>
        <motion.h2
          className="text-4xl font-bold text-gray-800 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          Contact Us
        </motion.h2>
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}>
          <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            name="name"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
            aria-invalid = {errors.name ? "true" : "false"}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1" role="alert">
              {errors.name.message}
            </span>
          )}
        </motion.div>
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}>
          <label htmlFor="subject" className="mb-2 text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            {...register("subject")}
            type="text"
            id="subject"
            name="subject"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"/>
          {errors.subject && (
            <span className="text-red-500 text-sm mt-1" role="alert">
              {errors.subject.message}
            </span>
          )}
        </motion.div>
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}>
          <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1" role="alert">
              {errors.email.message}
            </span>
          )}
        </motion.div>
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}>
          <label htmlFor="message" className="mb-2 text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            {...register("message")}
            id="message"
            name="message"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition resize-none"
          ></textarea>
          {errors.message && (
            <span>
              {errors.message.message}
            </span>
          )}
        </motion.div>
        <motion.button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl cursor-pointer font-medium hover:bg-gray-800 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

export default ContactPage;
