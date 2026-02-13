import { Images } from "lucide-react";



const GalleryContent = () => (
  <div className="bg-gradient-to-br from-[#0f1729] to-[#1a1f3a] border border-cyan-500/10 rounded-xl p-6">
    <h3 className="text-xl font-semibold mb-4">Photo Gallery</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-all cursor-pointer flex items-center justify-center group"
          >
            <Images className="text-gray-600 group-hover:text-cyan-400 transition-colors" />
          </div>
        ))}
    </div>
  </div>
);


export default GalleryContent;