import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

    const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
   

    try {

        const res = await  axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, formData);
        console.log("Signup response:", res.data);

        if(res.data.success){
            navigate("/login");
        }
        
        
    } catch (error) {
        console.error("Error during signup:", error);
        
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] px-4">
      <div className="w-full max-w-md bg-[#111827] rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#0B0F1A] text-white border border-gray-700 focus:outline-none focus:border-cyan-400"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#0B0F1A] text-white border border-gray-700 focus:outline-none focus:border-cyan-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#0B0F1A] text-white border border-gray-700 focus:outline-none focus:border-cyan-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <span 
          
          onClick={() => navigate("/login")}
          className="text-cyan-400 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
