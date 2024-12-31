import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { storage } from "../firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Footer from "../components/Footer";

// Komponen Header
const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold text-orange-500">
        Kenangan Tak Terlupakan <br /> di Kelas Casofin
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-gray-300">
        Ini dia galeri momen-momen seru kita selama di kelas Casofin. Mulai dari
        senyuman hangat, tawa lepas, hingga kenangan penuh makna yang selalu
        bikin rindu. Yuk, nostalgia bareng!
      </p>
    </div>
  );
};

// Komponen ProductCard
const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0 bg-gray-800 shadow-lg rounded-lg overflow-hidden"
    >
      <div className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0"
          alt="Product Image"
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-orange-500 bg-opacity-50 pointer-events-none"></div>
    </motion.div>
  );
};

const GalleryPage = () => {
  const [products, setProducts] = useState([]);

  const firstRow = products.slice(0, 15);
  const secondRow = products.slice(15, 30);
  const thirdRow = products.slice(30, 41);

  const refContainer = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: refContainer,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  useEffect(() => {
    const folderRef = ref(storage, "GambarAman");

    listAll(folderRef)
      .then((result) => {
        const fetchUrls = result.items.map((itemRef) =>
          getDownloadURL(itemRef).then((url) => ({
            title: itemRef.name,
            thumbnail: url,
          }))
        );
        return Promise.all(fetchUrls);
      })
      .then((fetchedProducts) => setProducts(fetchedProducts))
      .catch((error) =>
        console.error("Error fetching images from Firebase:", error)
      );
  }, []);

  return (
    <div className="relative">
      {/* Background Music */}
      <audio autoPlay loop className="hidden">
        <source src="/audio/gallery.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div
        ref={refContainer}
        className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-black"
      >
        <Header />
        <motion.div
          style={{ rotateX, rotateZ, translateY, opacity }}
          className="space-y-20"
        >
          {products.length > 0 ? (
            <>
              <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20 animate-slide-right">
                {firstRow.map((product) => (
                  <ProductCard
                    product={product}
                    translate={translateX}
                    key={product.title}
                  />
                ))}
              </motion.div>
              <motion.div className="flex flex-row mb-20 space-x-20 animate-slide-left">
                {secondRow.map((product) => (
                  <ProductCard
                    product={product}
                    translate={translateXReverse}
                    key={product.title}
                  />
                ))}
              </motion.div>
              <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 animate-slide-right">
                {thirdRow.map((product) => (
                  <ProductCard
                    product={product}
                    translate={translateX}
                    key={product.title}
                  />
                ))}
              </motion.div>
            </>
          ) : (
            <div className="text-center text-white">
              Sedang memuat gambar...
            </div>
          )}
        </motion.div>
      </div>
      <Footer className="text-justify" />
    </div>
  );
};

export default GalleryPage;
