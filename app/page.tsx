// pages/index.tsx
import Navbar from "@/components/Navbar";
import TextBox from "@/components/TextBox";

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* Main Content */}
      <main className="flex justify-center items-center h-screen p-6">
        <TextBox />
      </main>
    </div>
  );
}
