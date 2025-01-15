import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "aos/dist/aos.css";
import AOS from "aos";
import Footer from "../components/Footer";
import ArtikelPilihan from "../components/ArtikelPilihan";
import AboutSection from "../components/AboutSection";
import NavBar from "../components/NavBar";
import ClassMember from "../components/ClassMember";

AOS.init();

const HeroPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const audioRef = useRef(null);
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
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
              Hey, buat pengalaman yang lebih maksimal, coba buka pakai laptop
              atau mode desktop ya! ✨
            </p>
            <button
              onClick={closePopup}
              className="px-4 py-2 bg-orange-500 text-gray-900 font-bold rounded-full hover:bg-orange-400 transition-transform transform hover:scale-105"
            >
              Oke, Mengerti
            </button>
          </div>
        </div>
      )}

      {/* Navigasi */}
      <NavBar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative bg-black text-white min-h-screen flex items-center"
      >
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

        {/* Hero Content */}
        <div className="relative container mx-auto text-center px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-orange-400">
            Selamat Datang di Casofin 🚀
          </h1>
          <p className="text-sm sm:text-lg md:text-xl mb-6 text-gray-300">
            Nostalgia seru bareng teman-teman kelas dengan fitur menarik! 🎉
            Yuk, eksplorasi galeri kenangan dan temukan keseruan lainnya.
          </p>
          <button
            onClick={() => navigate(isLoggedIn ? "/gallery" : "/login")}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-full hover:opacity-90 transform hover:scale-105 transition"
          >
            Jelajahi Galeri
          </button>
        </div>
      </section>

      {/* Konten Lain */}
      <AboutSection />
      <ClassMember />
      <ArtikelPilihan
        articles={[
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
            link: "https://www.kompasiana.com/safiraamin3102/6762f30534777c205767df53/perjuangan-guru-honorer-desa-terhadap-pendidikan-dengan-gaji-terbatas",
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
          {
            image: "/kelas/artikel-alpin.jpg",
            title: "Artikel Alpin",
            description:
              "Artikel ini membahas dampak penggunaan gawai terhadap minat baca anak usia dini, mengulas bagaimana konten digital menggantikan buku fisik, serta solusi menyeimbangkan keduanya demi perkembangan anak.",
            link: "https://mahasiswaindonesia.id/pengaruh-penggunaan-gawai-terhadap-penurunan-minat-baca-anak-di-usia-dini/",
          },
          {
            image: "/kelas/artikel-eka.jpg",
            title: "Artikel Eka",
            description:
              "Google Forms mendukung peningkatan kualitas pendidikan Gen-Z dengan evaluasi cepat, pengumpulan data efektif, survei interaktif, dan kolaborasi digital yang relevan dalam pembelajaran berbasis teknologi modern.",
            link: "https://www.indonesiana.id/read/178595/peran-google-form-terhadap-peningkatan-kualitas-pendidikan-di-era-gen-z?utm_source=WhatsApp",
          },
        ]}
      />
      <Footer />
    </div>
  );
};

export default HeroPage;
