"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import FacebookIcon from "../icons/facebook.svg";
import GoogleIcon from "../icons/google.svg";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  console.log("test", process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        await fetch("/api", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        setIsVerified(true);
      }
    } catch (e) {
      setIsVerified(false);
    }
  }

  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  function handleExpired() {
    setIsVerified(false);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here, e.g., API request
    if (!name || !email || !password) {
      setError("Name, email, and password are required.");
      return;
    }
    // For demonstration, we just log the credentials
    console.log("Registering with:", name, email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

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

          <ReCAPTCHA
            className="flex justify-between items-center mb-6"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            ref={recaptchaRef}
            onChange={handleChange}
            onExpired={handleExpired}
          />

          <div className="flex justify-between items-center mb-6">
            <button
              type="submit"
              className="w-full px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
              disabled={!isVerified}
            >
              Register
            </button>
          </div>
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in here
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
