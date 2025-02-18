// pages/index.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
        <p className="mb-8 text-xl">Please log in or register to continue.</p>
        <div>
          <Link href="/login">
            <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 mr-4">
              Log In
            </button>
          </Link>
          <Link href="/register">
            {" "}
            <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
