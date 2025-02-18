"use client";

import Link from "next/link";
import { useState } from "react";
import FacebookIcon from "../icons/facebook.svg";
import GoogleIcon from "../icons/google.svg";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here, e.g., API request
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    // For demonstration, we just log the credentials
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            >
              Log In
            </button>
          </div>
        </form>

        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-t border-gray-300" />
          <span className="mx-4 text-gray-600">or</span>
          <hr className="flex-1 border-t border-gray-300" />
        </div>

        <button className="flex items-center w-full px-4 py-2 mb-4 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-300">
          <Image
            src={FacebookIcon}
            alt="Facebook"
            width={20}
            height={20}
            className="mr-2"
          />
          Continue with Facebook
        </button>
        <button className="flex items-center w-full px-4 py-2 rounded-md border border-black hover:bg-gray-200 transition duration-300">
          <Image
            src={GoogleIcon}
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
