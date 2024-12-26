import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GalleryCarousel = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Cache images to improve performance
  useEffect(() => {
    const cachedImages = sessionStorage.getItem("cachedImages");
    if (cachedImages) {
      setImages(JSON.parse(cachedImages));
      setIsLoading(false);
    } else {
      fetchImagesFromFirebase();
    }
  }, []);

  const fetchImagesFromFirebase = async () => {
    try {
      const storageRef = ref(storage, "GambarAman/");
      const imagesList = await listAll(storageRef);
      const imageURLs = await Promise.all(
        imagesList.items.map((item) => getDownloadURL(item))
      );
      setImages(imageURLs);
      sessionStorage.setItem("cachedImages", JSON.stringify(imageURLs));
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const settings = {
    centerMode: true,
    centerPadding: "100px",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "50px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "30px",
          slidesToShow: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "15px",
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <div id="gallery" className="bg-gradient-to-b from-black via-gray-900 to-orange-900 text-white min-h-screen flex flex-col items-center py-10">
      <h2 className="text-4xl font-bold mb-8 text-orange-500 drop-shadow-lg">Class Gallery</h2>
      <div className="w-full max-w-6xl relative">
        {isLoading ? (
          <p className="text-center text-gray-300 animate-pulse">Loading images...</p>
        ) : images.length === 0 ? (
          <p className="text-center text-gray-300">No images found.</p>
        ) : (
          <Slider {...settings}>
            {images.map((imageUrl, index) => (
              <div key={index} className="px-4">
                <img
                  src={imageUrl}
                  alt={`Class Photo ${index + 1}`}
                  className="w-full h-[400px] object-cover rounded-lg cursor-pointer border-4 border-transparent hover:border-orange-500 transition-all duration-300 shadow-lg"
                  onClick={() => handleImageClick(imageUrl)}
                />
              </div>
            ))}
          </Slider>
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-gray-800 p-4 rounded-lg shadow-xl max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white text-3xl hover:text-gray-300 focus:outline-none"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="rounded-lg max-h-screen w-full object-contain border-4 border-orange-500 shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryCarousel;
