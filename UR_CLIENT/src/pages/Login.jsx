import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API from "../services/api";
// import logo from "../assets/logo.png";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await API.post(
        "/auth/login",
        formData
      );

      login({
        token: res.data.token,
        user: res.data.user,
      });

      navigate("/");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }

  };

  const handleGoogleLogin = async (
    credentialResponse
  ) => {
    try {
      const res = await API.post(
        "/auth/google",
        {
          credential:
            credentialResponse.credential,
        }
      );

      login({
        token: res.data.token,
        user: res.data.user,
      });

      navigate("/");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Google login failed."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          {/* <img
            src="/src/assets/img/UR_Logo_Transparent.png"
            alt="Logo"
            className="h-12"
          /> */}

          <h1 className="text-3xl font-bold text-sky-950">
            Welcome Back
          </h1>

          <p className="text-sky-900 mt-2">
            Login to your account
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-sky-900"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-sky-900"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-950 hover:bg-sky-900 text-[#FFD700] p-3 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <div className="flex justify-center mt-5">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() =>
                setError("Google login failed")
              }
            />
          </div>
        </form>

        <p className="text-center text-sky-900 mt-6">
          Don't have an account?

          <Link
            to="/register"
            className="text-sky-950 font-bold ml-2"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;