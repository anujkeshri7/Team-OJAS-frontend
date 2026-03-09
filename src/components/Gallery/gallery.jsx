import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import ImageViewer from "./ImagePreviewModal";

const GalleryViewer = ({ isAdminView = false, refresh, setRefresh }) => {

  const [galleries, setGalleries] = useState([]);
  const [viewerIndex, setViewerIndex] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {

    const fetchGalleries = async () => {

      try {

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/gallery`
        );

        if (res.data.success) {
          setGalleries(res.data.data);
        } else {
          setGalleries([]);
        }

      } catch (error) {
        console.error("Error fetching galleries:", error);
        setGalleries([]);
      }

    };

    fetchGalleries();

  }, [refresh]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6 text-center">

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Club Gallery
        </h1>

        <p className="text-gray-400 mt-3">
          Explore moments captured from our club events
        </p>

        <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>

      </div>


      {/* Gallery Sections */}
      <div className="max-w-7xl mx-auto px-6 pb-16 space-y-16">

        {galleries.map((gallery, index) => (

          <div
            key={index}
            className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-6 shadow-lg"
          >

            {/* Gallery Title */}
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">

              <span className="w-2 h-8 bg-blue-500 rounded"></span>

              {gallery.title}

            </h2>


            {/* Images Grid */}
            <div className="grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
              gap-5
            ">

              {gallery.images.map((img, i) => (

                <div
                  key={img._id}
                  onClick={() => {
                    setImages(gallery.images);
                    setViewerIndex(i);
                  }}
                  className="cursor-pointer transform hover:scale-[1.03] transition duration-300"
                >

                  <Card
                    img={img}
                    isAdminView={isAdminView}
                    setRefresh={setRefresh}
                  />

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>


      {/* Image Viewer */}
      {viewerIndex !== null && (
        <ImageViewer
          images={images}
          index={viewerIndex}
          setIndex={setViewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}

    </div>
  );
};

export default GalleryViewer;