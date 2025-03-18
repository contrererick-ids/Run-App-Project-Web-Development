import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaApple } from "react-icons/fa";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos de inicio de sesión
    console.log({ email, password, keepLoggedIn });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-10 bg-zinc-400/20 backdrop-blur-2xl rounded-lg shadow-md border border-gray-100/20">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-100">Log In To RunApp</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="text-white w-full px-4 py-2 bg-zinc-300/20 border border-gray-300/30 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="text-white w-full px-4 py-2 bg-zinc-300/20 border border-gray-300/30 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-sky-400 text-white font-semibold rounded hover:bg-sky-500 transition duration-200 cursor-pointer"
          >
            Log In
          </button>
        </form>
        
        <div className="flex justify-between items-center mt-4 mb-6">
          <div className="flex items-center">
            <input
              id="keepLoggedIn"
              type="checkbox"
              className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
            />
            <label htmlFor="keepLoggedIn" className="ml-2 block text-sm text-gray-300 disable-select:bg-transparent">
              Keep me logged in
            </label>
          </div>
          
          <Link to="/forgot-password" className="text-sm text-sky-500 hover:text-sky-700">
            Forgot password?
          </Link>
        </div>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300/30 border-1 "></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white rounded-2xl text-gray-500">or</span>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <button className="w-full flex items-center justify-center px-4 py-2 border  rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <img src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google" className="h-5 w-5 mr-2" />
            <span>Sign in with Google</span>
          </button>
          
          <button className="w-full flex items-center justify-center px-4 py-2  rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
            <span>Log In with Facebook</span>
          </button>
          
          <button className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900">
            <FaApple className="h-5 w-5 mr-2" />
            <span>Sign in with Apple</span>
          </button>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-300">
            New to RunApp?{' '}
            <Link to="/signup" className="text-sky-500 hover:text-sky-700 font-medium">
              Register new account »
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;