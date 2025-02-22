// pages/index.tsx
import Navbar from "@/components/Navbar";
import TranslatorApp from "@/components/translation/TranslatorApp";

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* Main Content */}
      <main className="flex justify-center items-center h-screen p-6">
        <TranslatorApp />
      </main>
    </div>
  );
}
