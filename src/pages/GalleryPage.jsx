import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { storage } from "../firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

// Komponen Header
const Header = () => (
  <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
    <h1 className="text-2xl md:text-7xl font-bold text-orange-500">
      Kenangan Tak Terlupakan <br /> di Kelas Casofin
    </h1>
    <p className="max-w-2xl text-base md:text-xl mt-8 text-gray-300">
      Ini dia galeri momen-momen seru kita selama di kelas Casofin. Mulai dari
      senyuman hangat, tawa lepas, hingga kenangan penuh makna yang selalu bikin
      rindu. Yuk, nostalgia bareng!
    </p>
  </div>
);

// Komponen ProductCard
const ProductCard = ({ product }) => (
  <motion.div
    whileHover={{ y: -20 }}
    className="group/product h-96 w-[30rem] relative flex-shrink-0 bg-gray-800 shadow-lg rounded-lg overflow-hidden"
  >
    <div className="block group-hover/product:shadow-2xl">
      <img
        src={product.thumbnail}
        height="600"
        width="600"
        className="object-cover object-center absolute h-full w-full inset-0"
        alt={product.title}
      />
    </div>
    <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-orange-500 bg-opacity-50 pointer-events-none"></div>
  </motion.div>
);

const GalleryPage = () => {
  const [products, setProducts] = useState([]);

  const firstRow = products.slice(0, 20);
  const secondRow = products.slice(20, 40);
  const thirdRow = products.slice(40, 60);

  // Duplikat gambar untuk loop horizontal
  const firstRowLoop = [...firstRow, ...firstRow];
  const secondRowLoop = [...secondRow, ...secondRow];
  const thirdRowLoop = [...thirdRow, ...thirdRow];

  const refContainer = useRef(null);
  const { scrollYProgress } = useScroll({
    target: refContainer,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-15, 0]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [35, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 600]),
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
      <NavBar />

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
              {/* Baris 1 */}
              <motion.div
                className="flex space-x-10 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {firstRowLoop.map((product, index) => (
                  <ProductCard
                    product={product}
                    key={`${product.title}-1-${index}`}
                  />
                ))}
              </motion.div>

              {/* Baris 2 */}
              <motion.div
                className="flex space-x-10 w-max"
                animate={{ x: ["-50%", "0%"] }}
                transition={{
                  duration: 70,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {secondRowLoop.map((product, index) => (
                  <ProductCard
                    product={product}
                    key={`${product.title}-2-${index}`}
                  />
                ))}
              </motion.div>

              {/* Baris 3 */}
              <motion.div
                className="flex space-x-10 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 80,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {thirdRowLoop.map((product, index) => (
                  <ProductCard
                    product={product}
                    key={`${product.title}-3-${index}`}
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