export default function AboutLoader() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#0B0F1A]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-400 md:md:border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-white tracking-wide">
          Loading About Us...
        </h2>
      </div>
    </div>
  );
}