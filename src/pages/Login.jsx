import { useState, useEffect } from "react";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const SignIn = () => {
  const navigate = useNavigate();
  const { user, signIn, loading, error, isAuthenticated, clearError } =
    useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.vDot.value == null) {
        navigate("/userSetUp");
      } else {
        navigate("/");
      }
    }

    // Clear any previous errors when component mounts
    return () => clearError();
  }, [isAuthenticated, navigate, clearError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(formData.email, formData.password);
      // Redirect happens automatically via the useEffect when isAuthenticated changes
    } catch (err) {
      // Error is handled by the store and displayed via the error state
      console.error("Sign in error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-zinc-400/20 backdrop-blur-2xl rounded-lg shadow-lg border border-gray-100/20">
        <h1 className="text-3xl font-bold text-center mb-6 pt-5 text-gray-100">
          Sign In to RunApp
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="text-white w-full px-4 py-2 bg-zinc-200/20 border border-gray-100/30 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="text-white w-full px-4 py-2 bg-zinc-200/20 border border-gray-200/30 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-100"
              >
                Remember me
              </label>
            </div>
            <div>
              <Link
                to="/forgot-password"
                className="text-sm text-sky-500 hover:text-sky-700"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-2 px-4 bg-sky-500 text-white font-semibold rounded hover:bg-sky-600 transition duration-200"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300/30 border-1"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white rounded-2xl text-gray-500">or</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => alert("Google Sign In not implemented")}
            className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <img
              src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            <span>Sign in with Google</span>
          </button>

          <button
            onClick={() => alert("Facebook Sign In not implemented")}
            className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
            <span>Sign in with Facebook</span>
          </button>

          <button
            onClick={() => alert("Apple Sign In not implemented")}
            className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900"
          >
            <FaApple className="h-5 w-5 mr-2" />
            <span>Sign in with Apple</span>
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-sky-500 hover:text-sky-700 font-medium"
            >
              Sign up »
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
