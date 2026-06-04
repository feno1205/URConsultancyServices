import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const saveAuthData = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  };

  const redirectUser = (user) => {
    navigate(
      user?.role === "admin"
        ? "/admin"
        : "/"
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Full name is required");
      return false;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        formData.email.trim()
      )
    ) {
      setError(
        "Please enter a valid email address"
      );
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (
      !phoneRegex.test(
        formData.phone.trim()
      )
    ) {
      setError(
        "Please enter a valid 10-digit phone number"
      );
      return false;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        email: formData.email
          .trim()
          .toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
      };

      await API.post(
        "/auth/register",
        payload
      );

      navigate("/login");
    } catch (err) {
      if (!err.response) {
        setError(
          "Network error. Please check your internet connection."
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Registration failed"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister =
    async (credentialResponse) => {
      try {
        setError("");

        const { data } =
          await API.post(
            "/auth/google",
            {
              credential:
                credentialResponse.credential,
            }
          );

        saveAuthData(data);
        redirectUser(data.user);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Google registration failed"
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-sky-950">
            Create Account
          </h1>

          <p className="text-sky-900 mt-2">
            Register to continue
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-center">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-900"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-900"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-900"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-900"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-lg bg-sky-950 hover:bg-sky-900 text-[#FFD700] transition disabled:opacity-60"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        <div className="flex justify-center mt-5">
          <GoogleLogin
            onSuccess={
              handleGoogleRegister
            }
            onError={() =>
              setError(
                "Google registration failed"
              )
            }
          />
        </div>

        <p className="mt-6 text-center text-sky-900">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-bold text-sky-950 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;