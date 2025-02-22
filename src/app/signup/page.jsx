"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from 'lucide-react';
import { motion } from "framer-motion";
import "./styles.css";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your signup logic here
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen  flex flex-col items-center justify-center p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="w-full max-w-md space-y-6"
        variants={containerVariants}
      >
        {/* Logo and Header */}
        <motion.div 
          className="text-center space-y-4"
          variants={itemVariants}
        >
          <motion.h1 
            className="logo text-white text-4xl"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <span className='text-[#6366F1] logo'>S</span>
            hikshaVerse
          </motion.h1>
          <motion.h2 
            className="text-3xl font-medium text-white"
            variants={itemVariants}
          >
            Create Account
          </motion.h2>
          <motion.p 
            className="text-gray-500"
            variants={itemVariants}
          >
            Already have an account?{" "}
            <Link href="/login" className="text-[#6366F1] hover:text-[#6366F1]/90 transition-colors">
              Log in
            </Link>
          </motion.p>
        </motion.div>

        {/* Sign Up Form */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4"
          variants={containerVariants}
        >
          {/* Name Fields */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={itemVariants}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-4 py-3 bg-transparent border border-gray-800 rounded-md text-white focus:outline-none focus:border-[#6366F1] transition-colors"
                required
              />
            </motion.div>
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-4 py-3 bg-transparent border border-gray-800 rounded-md text-white focus:outline-none focus:border-[#6366F1] transition-colors"
                required
              />
            </motion.div>
          </motion.div>

          {/* Mobile Input */}
          <motion.div 
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className="w-full px-4 py-3 bg-transparent border border-gray-800 rounded-md text-white focus:outline-none focus:border-[#6366F1] transition-colors"
              required
            />
          </motion.div>

          {/* Email Input */}
          <motion.div 
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 bg-transparent border border-gray-800 rounded-md text-white focus:outline-none focus:border-[#6366F1] transition-colors"
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div 
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 bg-transparent border border-gray-800 rounded-md text-white focus:outline-none focus:border-[#6366F1] transition-colors pr-12"
              required
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              // whileHover={{ scale: 1.01 }}
              // whileTap={{ scale: 0.99 }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </motion.button>
          </motion.div>

          {/* Terms Checkbox */}
          <motion.div 
            className="flex items-center space-x-2"
            variants={itemVariants}
          >
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 border-2 border-gray-800 rounded bg-transparent checked:bg-[#6366F1] checked:border-[#6366F1] focus:ring-0 focus:ring-offset-0 transition-colors"
              required
            />
            <span className="text-gray-400 text-sm">
              I agree with{" "}
              <Link href="/terms" className="text-[#6366F1] hover:text-[#6366F1]/90">
                Terms
              </Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-[#6366F1] hover:text-[#6366F1]/90">
                Privacy Policy
              </Link>
            </span>
          </motion.div>

          {/* Sign Up Button */}
          <motion.div 
            className="pt-2"
            variants={itemVariants}
          >
            <motion.button
              type="submit"
              className="w-full bg-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="block -translate-x-[2px] -translate-y-[2px] border-2 text-white border-white bg-black hover:bg-[#57FF31] py-3 px-6 text-lg font-medium transition-all active:translate-x-0 active:translate-y-0 w-full">
                Sign Up
              </span>
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Divider */}
        <motion.div 
          className="relative py-4"
          variants={itemVariants}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 text-gray-500 bg-black">Or</span>
          </div>
        </motion.div>

        {/* Google Sign Up */}
        <motion.button
          type="button"
          className="w-full border border-gray-800 rounded-md py-3 px-4 flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-gray-400">Sign Up With Google</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
