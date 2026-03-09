import React ,{useEffect} from "react";
import axios from "axios";
import { set } from "react-hook-form";
import Card from "./Card";

const GalleryViewer = ({ isAdminView = false , refresh , setRefresh}) => {

 const [galleries, setGalleries] = React.useState([]);

 console.log(galleries)


  useEffect(()=>{

    const fetchGalleries = async () => {
      try {
        
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/gallery`);
        console.log("Fetched galleries:", res.data);
        if(res.data.success){
          setGalleries(res.data.data);
        } else {
          setGalleries([]);
        }


      } catch (error) {
        console.error("Error fetching galleries:", error);
        setGalleries([]);
        
      }
    }

    fetchGalleries();


  },[refresh])

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 text-white">

      <h1 className="text-4xl font-bold mb-10 text-center">
        Club Gallery
      </h1>

      {galleries.map((gallery, index) => (

        <div key={index} className="mb-12">

          {/* Title */}
          <h2 className="text-2xl font-semibold mb-5 border-l-4 border-blue-500 pl-3">
            {gallery.title}
          </h2>

          {/* Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

            {gallery.images.map((img, i) => (

              <Card
              i={i}
              img={img}
              isAdminView={isAdminView}
                key={img.publicId}
                setRefresh={setRefresh}
              
              />

            ))}

          </div>

        </div>

      ))}

    </div>
  );
};

export default GalleryViewer;