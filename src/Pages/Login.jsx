import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // clear error while typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate("/admin");
      } else {
        setError(res.data.message || "Invalid email or password.");
      }

    } catch (error) {
      if (error.response) {
        // Backend sent error response
        setError(error.response.data.message || "Invalid credentials.");
      } else if (error.request) {
        // Server not responding
        setError("Server not responding. Please try again later.");
      } else {
        // Other error
        setError("Something went wrong.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-[#0B0F1A] px-4">
                
      <div className="w-full max-w-md bg-[#111827] rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">


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
              className={`w-full px-4 py-2 rounded-lg bg-[#0B0F1A] text-white border ${
                error ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:border-cyan-400`}
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
              className={`w-full px-4 py-2 rounded-lg bg-[#0B0F1A] text-white border ${
                error ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:border-cyan-400`}
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-black font-semibold py-2 rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}