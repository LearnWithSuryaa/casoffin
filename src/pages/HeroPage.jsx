import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CameraIcon, SparklesIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import ClassMember from "../components/ClassMember";
import "aos/dist/aos.css";
import AOS from "aos";
import Footer from "../components/Footer";
import ArtikelPilihan from "../components/ArtikelPilihan";
import AboutSection from "../components/AboutSection";

AOS.init();

const HeroPage = () => {
  const articles = [
    {
      image: "/kelas/artikel-grenda.jpg",
      title: "Artikel Grenda",
      description:
        "Studi ini mengungkap bagaimana guru lansia beradaptasi dengan teknologi dalam pendidikan modern, mengeksplorasi tantangan, strategi pembelajaran, dan kontribusi mereka dalam menghadirkan pengalaman belajar yang relevan di era digital.",
      link: "https://www.kompasiana.com/grendaagriansyah/676462f334777c222577e432/adaptasi-guru-lansia-terhadap-perkembangan-teknologi-dalam-pendidikan-modern",
    },
    {
      image: "/kelas/artikel-fira.jpg",
      title: "Artikel Fira",
      description:
        "Kisah perjuangan guru honorer desa menghadapi tantangan pendidikan modern dengan gaji terbatas, menunjukkan dedikasi dan semangat mereka dalam mencerdaskan generasi muda meski dalam keterbatasan ekonomi.",
      link: "https://www.kompasiana.com/safiraamin3102/6762f30534777c205767df53/perjuangan-guru-honorer-desa-terhadap-pendidikan-dengan-gaji-terbatas?utm_source=Whatsapp&utm_medium=Refferal&utm_campaign=Sharing_Desktop",
    },
    {
      image: "/kelas/artikel-nadif.jpg",
      title: "Artikel Nadif",
      description:
        "Eksplorasi penerapan etika penggunaan AI dalam pendidikan, menyoroti efisiensi, tantangan, dan dampaknya terhadap pembelajaran modern, sekaligus menjaga keseimbangan antara teknologi dan nilai-nilai pendidikan.",
      link: "https://www.kompasiana.com/ahmadnadhifzuvar2430707/6764d9e4c925c45ee3292912/efisiensi-penerapan-etika-penggunaan-artificial-intelligence-terhadap-dunia-pendidikan",
    },
    {
      image: "/kelas/artikel-chicka.jpg",
      title: "Artikel Chicka",
      description:
        "Artificial Intelligence (AI) memengaruhi kinerja belajar Gen Z dengan memberikan akses pembelajaran adaptif, personalisasi materi, efisiensi waktu, namun juga berpotensi menurunkan interaksi sosial.",
      link: "https://mahasiswaindonesia.id/pengaruh-artificial-intelligence-ai-terhadap-kinerja-belajar-gen-z/",
    },
  ];

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const audioRef = useRef(null);
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current) {
        audioRef.current.muted = false; // Menghapus mute setelah interaksi
      }
      window.removeEventListener("click", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
    };
  }, []);

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="overflow-x-hidden">
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-4 md:p-6 rounded-lg shadow-xl text-center w-11/12 sm:w-96">
            <p className="mb-4 text-gray-100 text-sm md:text-lg">
              Untuk tampilan yang lebih baik buka di mode desktop atau
              menggunakan laptop!
            </p>
            <button
              onClick={closePopup}
              className="px-4 py-2 md:px-6 md:py-2 bg-orange-500 text-gray-900 font-bold rounded-full hover:bg-orange-400 transition-transform transform hover:scale-105 text-sm md:text-base"
            >
              Oke, Mengerti
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-black text-white min-h-screen flex items-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="https://firebasestorage.googleapis.com/v0/b/website-kelas-bf7e0.appspot.com/o/video%2Fbg-fallback.jpg?alt=media"
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/website-kelas-bf7e0.appspot.com/o/video%2Fbg.mp4?alt=media"
            type="video/mp4"
          />
        </video>

        <audio ref={audioRef} autoPlay loop muted className="hidden">
          <source src="/audio/hero.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {/* Content */}
        <div className="relative container mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 text-orange-400">
            Yo! Selamat Datang di Casofin 🚀
          </h1>
          <p className="text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300">
            Tempatnya nostalgia vibes kelas plus fitur seru buat seru-seruan.
            Yuk cek galeri momen epic kita atau coba fitur gokil "Cek Khodam"!
            🔥
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Tombol Lihat Galeri */}
            <Link
              to={isLoggedIn ? "/gallery" : "/login"}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  navigate("/login");
                }
              }}
              className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:opacity-90 transition transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <CameraIcon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
              <span className="text-sm md:text-base lg:text-lg">
                Lihat Galeri
              </span>
            </Link>

            {/* Tombol Cek Khodam */}
            <Link
              to={isLoggedIn ? "/cek-khodam" : "/login"}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  navigate("/login");
                }
              }}
              className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full shadow-lg hover:opacity-90 transition transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <SparklesIcon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
              <span className="text-sm md:text-base lg:text-lg">
                Cek Khodam
              </span>
            </Link>

            <Link
              to={isLoggedIn ? "/wall-of-secrets" : "/login"}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  navigate("/login");
                }
              }}
              className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full shadow-lg hover:opacity-90 transition transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <KeyIcon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
              <span className="text-sm md:text-base lg:text-lg">
                Wall of Secrets
              </span>
            </Link>
          </div>
        </div>
      </section>

      <AboutSection />

      <ClassMember />

      <ArtikelPilihan articles={articles} />

      <Footer />
    </div>
  );
};

export default HeroPage;
