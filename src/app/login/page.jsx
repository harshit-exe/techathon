"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import "./styles.css";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import dotenv from "dotenv";
import { jwtDecode } from "jwt-decode";

dotenv.config();

export default function LoginPage() {
  const { login, googleLogin } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
    const response = await login(formData);
    if (response.success) {
      toast.success("Login successful!");
      router.push("/dashboard");
    } else {
      toast.error(response.message);
    }
    // try {
    //   const result = await signIn("credentials", {
    //     mobile: formData.mobile,
    //     password: formData.password,
    //     redirect: false,
    //   })
    //   if (result?.error) {
    //     console.error(result.error)
    //   }
    // } catch (error) {
    //   console.error("Login failed:", error)
    // }
  };

  const handleGoogleLoginSuccess = async (response) => {
    console.log("Google Response:", response);

    // ✅ Directly backend ko Google token bhejo
    const res = await googleLogin(response.credential);

    if (res.success) {
      toast.success("Google login successful!");
      router.push("/dashboard");
    } else {
      console.log(res);
      toast.error(res.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <motion.div
      className="min-h-screen  flex flex-col items-center justify-center p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-full max-w-md space-y-8"
        variants={containerVariants}
      >
        {/* Logo and Header */}
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <motion.h1
            className="logo text-white text-4xl"
            variants={itemVariants}
          >
            <span className='text-[#6366F1] font-["Rammetto One"]'>D</span>
            ishaMarg
          </motion.h1>
          <motion.h2
            className="text-3xl font-medium text-white"
            variants={itemVariants}
          >
            Welcome back !
          </motion.h2>
          <motion.p className="text-gray-500" variants={itemVariants}>
            {"Don't have an account? "}
            <Link
              href="/signup"
              className="text-[#6366F1] hover:text-[#6366F1]/90 transition-colors"
            >
              Sign up now
            </Link>
          </motion.p>
        </motion.div>

        {/* Login Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 mt-8"
          variants={containerVariants}
        >
          {/* Email Input */}
          <motion.div className="relative" variants={itemVariants}>
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
          <motion.div className="relative" variants={itemVariants}>
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </motion.button>
          </motion.div>

          {/* Remember Me & Forgot Password */}
          <motion.div
            className="flex items-center justify-between"
            variants={itemVariants}
          >
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 border-2 border-gray-800 rounded bg-transparent checked:bg-[#6366F1] checked:border-[#6366F1] focus:ring-0 focus:ring-offset-0 transition-colors"
              />
              <span className="text-gray-400 text-sm">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-[#6366F1] text-sm hover:text-[#6366F1]/90 transition-colors"
            >
              Forgot password?
            </Link>
          </motion.div>

          {/* Login Button */}
          <motion.div className="pt-2" variants={itemVariants}>
            <motion.button
              type="submit"
              className="w-full bg-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="block -translate-x-[2px] -translate-y-[2px] border-2 text-white border-white bg-black hover:bg-[#57FF31] py-3 px-6 text-lg font-medium transition-all active:translate-x-0 active:translate-y-0 w-full">
                Login
              </span>
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Divider */}
        <motion.div className="relative py-4" variants={itemVariants}>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 text-gray-500 bg-black">Or</span>
          </div>
        </motion.div>

        {/* Google Login */}
        <motion.button
          type="button"
          className="w-full border border-gray-800 rounded-md py-3 px-4 flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => toast.warn("Login with suppressed Error")}
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
