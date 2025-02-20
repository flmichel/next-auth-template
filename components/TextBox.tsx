"use client";

import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { Button } from "./ui/button";

export default function TextBox() {
  const [input, setInput] = useState<string>(""); // Use string type for input

  return (
    <div className="container flex flex-col p-4 h-screen justify-center">
      <div className="space-x-2">
        <textarea
          id="user-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-lg bg-gray-100"
          placeholder="Paste or write some japanese text..."
        />
      </div>

      {/* Center the button vertically */}
      <div className="flex justify-center">
        <Button className="bg-blue-500 text-white p-2 rounded-lg">
          Translate
        </Button>
      </div>
    </div>
  );
}
